import { useEffect, useState } from 'react'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import QuestionPlayer from '../components/QuestionPlayer'
import { fetchQuestions, fetchRecentAnswers, objectiveStats, questionWeight, recordAnswer } from '../lib/data'
import { isCorrect } from '../lib/exam'
import { shuffle, weightedSample } from '../lib/shuffle'
import type { Question, QuizKind } from '../lib/types'

const QUIZ_SIZE = 15

type Mode = { kind: QuizKind; domain?: number }

export default function Quiz() {
  const userId = useUserId()
  const { cert } = useCert()
  const [all, setAll] = useState<Question[] | null>(null)
  const [mode, setMode] = useState<Mode | null>(null)
  const [quiz, setQuiz] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [response, setResponse] = useState<unknown>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setAll(null)
    setMode(null)
    void fetchQuestions(cert.id).then(setAll)
  }, [cert])

  async function start(m: Mode) {
    if (!all) return
    let questions: Question[]
    if (m.kind === 'domain' && m.domain) {
      questions = shuffle(all.filter((q) => q.domain === m.domain)).slice(0, QUIZ_SIZE)
    } else if (m.kind === 'weak') {
      const answers = await fetchRecentAnswers(userId)
      const stats = objectiveStats(answers, new Map(all.map((q) => [q.id, q])))
      questions = weightedSample(all, (q) => questionWeight(q, stats), QUIZ_SIZE)
    } else {
      // Mixed: interleaved across every domain.
      questions = weightedSample(all, () => 1, QUIZ_SIZE)
    }
    setQuiz(questions)
    setMode(m)
    setIdx(0)
    setScore(0)
    setResponse(null)
    setRevealed(false)
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

  if (!all) return <p className="text-soft">Loading…</p>

  if (!mode) {
    return (
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
            onClick={() => void start({ kind: 'mixed' })}
          />
          <ModeCard
            title="Weak areas"
            desc="Adaptively oversamples the objectives you miss most, based on your answer history."
            onClick={() => void start({ kind: 'weak' })}
          />
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-wider text-faint mb-2">
              Single domain — before-exam patching only
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(cert.domains).map(([d, label]) => (
                <button
                  key={d}
                  onClick={() => void start({ kind: 'domain', domain: Number(d) })}
                  className="text-xs px-3 py-1.5 rounded-full border border-line bg-surface text-soft hover:border-accent hover:text-accent transition-colors"
                >
                  <span className="font-mono">§{d}</span> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (idx >= quiz.length) {
    const pct = Math.round((score / quiz.length) * 100)
    return (
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
        <button
          onClick={() => setMode(null)}
          className="rounded-crisp bg-accent hover:bg-accent-deep text-paper px-5 py-2 text-sm font-semibold transition-colors"
        >
          Another quiz
        </button>
      </div>
    )
  }

  const q = quiz[idx]
  const answered = response !== null && (q.qtype !== 'matching' || (response as (number | null)[]).every((p) => p !== null))
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between font-mono text-xs text-faint">
        <span>
          {idx + 1}/{quiz.length} · §{q.domain} {q.objective} · {q.qtype}
        </span>
        <span>{score} correct so far</span>
      </div>
      <div className="bg-surface border border-line rounded-soft shadow-card p-6">
        <QuestionPlayer question={q} value={response} onChange={setResponse} reveal={revealed} />
        <div className="mt-5">
          {!revealed ? (
            <button
              disabled={!answered}
              onClick={() => void lockIn()}
              className="rounded-crisp bg-accent hover:bg-accent-deep disabled:opacity-40 text-paper px-5 py-2 text-sm font-semibold transition-colors"
            >
              Lock in answer
            </button>
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
