import { useEffect, useState } from 'react'
import { PageSkeleton } from '../components/Skeleton'
import Stage from '../components/Stage'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import QuestionPlayer from '../components/QuestionPlayer'
import { useRunGuard } from '../components/NavGuard'
import { fetchQuestions, fetchRecentAnswers, objectiveStats, questionWeight, recordAnswer } from '../lib/data'
import { isCorrect } from '../lib/exam'
import { shuffle, weightedSample } from '../lib/shuffle'
import type { Question, QuizKind } from '../lib/types'

const QUIZ_SIZE = 15

/** Human labels: the raw qtype enum ("mcq") was leaking into the UI. */
const QTYPE_LABEL: Record<string, string> = {
  mcq: 'Multiple choice',
  multi: 'Select all',
  ordering: 'Ordering',
  matching: 'Matching',
}

type Mode = { kind: QuizKind; domain?: number }

/** URL segment ⇄ quiz mode, so a run is deep-linkable and Back-able. */
function modeFromSegment(seg: string | undefined): Mode | null {
  if (!seg) return null
  if (seg === 'mixed' || seg === 'weak') return { kind: seg }
  if (seg.startsWith('domain-')) {
    const domain = Number(seg.slice('domain-'.length))
    if (Number.isFinite(domain) && domain > 0) return { kind: 'domain', domain }
  }
  return null
}

function segmentForMode(m: Mode): string {
  return m.kind === 'domain' ? `domain-${m.domain}` : m.kind
}

export default function Quiz() {
  const userId = useUserId()
  const { cert } = useCert()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [all, setAll] = useState<Question[] | null>(null)
  const [quiz, setQuiz] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [response, setResponse] = useState<unknown>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)

  const segment = pathname.split('/')[3]
  const mode = modeFromSegment(segment)

  useEffect(() => {
    setAll(null)
    void fetchQuestions(cert.id).then(setAll)
  }, [cert])

  // Build the quiz whenever the URL names a mode (including on a hard refresh
  // or a shared deep link).
  useEffect(() => {
    if (!all || !mode) {
      setQuiz([])
      return
    }
    let cancelled = false
    void (async () => {
      let questions: Question[]
      if (mode.kind === 'domain' && mode.domain) {
        questions = shuffle(all.filter((q) => q.domain === mode.domain)).slice(0, QUIZ_SIZE)
      } else if (mode.kind === 'weak') {
        const answers = await fetchRecentAnswers(userId)
        const stats = objectiveStats(answers, new Map(all.map((q) => [q.id, q])))
        questions = weightedSample(all, (q) => questionWeight(q, stats), QUIZ_SIZE)
      } else {
        // Mixed: interleaved across every domain.
        questions = weightedSample(all, () => 1, QUIZ_SIZE)
      }
      if (cancelled) return
      setQuiz(questions)
      setIdx(0)
      setScore(0)
      setResponse(null)
      setRevealed(false)
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, segment, userId])

  // Only guard once the user has actually invested answers in this run.
  const inProgress = quiz.length > 0 && idx < quiz.length && (idx > 0 || revealed || response !== null)
  useRunGuard(inProgress, 'This quiz is unfinished. Leaving now discards your progress and score.')

  function start(m: Mode) {
    navigate(`/practice/quiz/${segmentForMode(m)}`)
  }

  async function lockIn() {
    const q = quiz[idx]
    const correct = isCorrect(q, response)
    setRevealed(true)
    if (correct) setScore((s) => s + 1)
    await recordAnswer(userId, q.id, mode!.kind, correct, response)
  }

  function next() {
    setIdx((i) => i + 1)
    setResponse(null)
    setRevealed(false)
  }

  if (!all) return <PageSkeleton label="Loading questions" />

  if (!mode) {
    return (
      <Stage>
      <div className="max-w-2xl mx-auto space-y-5">
        <div>
          <h1 className="font-display text-2xl text-ink">Practice quiz</h1>
          <p className="text-sm text-soft mt-1">
            {QUIZ_SIZE} questions — answer before you see feedback.
          </p>
        </div>
        <div className="grid gap-3">
          <ModeCard
            title="Mixed (recommended daily)"
            desc="Interleaved across all five domains — the way your brain retains best, and the way the exam asks."
            onClick={() => start({ kind: 'mixed' })}
          />
          <ModeCard
            title="Weak areas"
            desc="Adaptively oversamples the objectives you miss most, based on your answer history."
            onClick={() => start({ kind: 'weak' })}
          />
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-wider text-faint mb-2">
              Single domain — before-exam patching only
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(cert.domains).map(([d, label]) => (
                <button
                  key={d}
                  onClick={() => start({ kind: 'domain', domain: Number(d) })}
                  className="text-xs px-3 py-1.5 rounded-full border border-line bg-surface text-soft hover:border-accent hover:text-accent transition-colors"
                >
                  <span className="font-mono">§{d}</span> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </Stage>
    )
  }

  // Mode is named in the URL but the set is still being assembled.
  if (quiz.length === 0) return <p className="text-soft">Building your quiz…</p>

  if (idx >= quiz.length) {
    const pct = Math.round((score / quiz.length) * 100)
    return (
      <Stage>
      <div className="max-w-2xl mx-auto text-center space-y-4 py-10">
        <p className="font-display text-5xl text-ink">
          {score}/{quiz.length}
        </p>
        <p className={`font-mono text-lg ${pct >= 83 ? 'text-good' : pct >= 70 ? 'text-warn' : 'text-bad'}`}>{pct}%</p>
        <p className="text-sm text-soft max-w-md mx-auto">
          {pct >= 83
            ? 'At exam pace. Keep interleaving.'
            : pct >= 70
              ? 'Close — review the explanations you just read, they are the study material.'
              : 'Rough patch found — that is the system working. These objectives now weigh more in Weak areas mode.'}
        </p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={() => navigate('/practice/quiz')}
            className="rounded-crisp bg-accent hover:bg-accent-deep text-paper px-5 py-2 text-sm font-semibold transition-colors"
          >
            Another quiz
          </button>
          <button
            onClick={() => navigate('/')}
            className="rounded-crisp border border-line bg-surface hover:border-line-strong px-5 py-2 text-sm text-ink transition-colors"
          >
            Back to dashboard
          </button>
        </div>
      </div>
      </Stage>
    )
  }

  const q = quiz[idx]
  const answered = response !== null && (q.qtype !== 'matching' || (response as (number | null)[]).every((p) => p !== null))
  return (
    <Stage>
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-faint">
        <span>
          {idx + 1}/{quiz.length} · §{q.domain} {q.objective} · {QTYPE_LABEL[q.qtype]}
        </span>
        <span className="flex items-center gap-3">
          <span>{score} correct so far</span>
          <button
            onClick={() => navigate('/practice/quiz')}
            className="font-sans text-soft hover:text-ink underline underline-offset-2 transition-colors"
          >
            Exit
          </button>
        </span>
      </div>
      {/* Progress through the set. */}
      <div
        className="h-1 rounded-full bg-wash overflow-hidden"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={quiz.length}
        aria-valuenow={idx + 1}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${((idx + 1) / quiz.length) * 100}%` }}
        />
      </div>
      <div className="bg-surface border border-line rounded-soft shadow-card p-5 sm:p-6">
        <QuestionPlayer question={q} value={response} onChange={setResponse} reveal={revealed} />
        <div className="mt-5">
          {!revealed ? (
            <div className="flex items-center gap-3 flex-wrap">
            <button
              disabled={!answered}
              onClick={() => void lockIn()}
              className="rounded-crisp bg-accent hover:bg-accent-deep disabled:opacity-40 text-paper px-5 py-2 text-sm font-semibold transition-colors"
            >
              Lock in answer
            </button>
            {!answered && (
              <span className="text-xs text-faint">Choose an answer to continue.</span>
            )}
            </div>
          ) : (
            <button
              onClick={next}
              className="rounded-crisp border border-line bg-surface hover:border-line-strong text-ink px-5 py-2 text-sm font-semibold transition-colors"
            >
              {idx + 1 === quiz.length ? 'See results' : 'Next question'}
            </button>
          )}
        </div>
      </div>
    </div>
    </Stage>
  )
}

function ModeCard({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-soft border border-line bg-surface shadow-card hover:shadow-lift hover:border-line-strong p-5 transition"
    >
      <p className="font-display text-base text-ink">{title}</p>
      <p className="text-xs text-soft mt-1">{desc}</p>
    </button>
  )
}
