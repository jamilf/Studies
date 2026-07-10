import { useEffect, useState } from 'react'
import { useUserId } from '../auth/AuthContext'
import QuestionPlayer from '../components/QuestionPlayer'
import { fetchQuestions, fetchRecentAnswers, objectiveStats, questionWeight, recordAnswer } from '../lib/data'
import { isCorrect } from '../lib/exam'
import { shuffle, weightedSample } from '../lib/shuffle'
import type { Question, QuizKind } from '../lib/types'
import { DOMAIN_NAMES } from '../lib/types'

const QUIZ_SIZE = 15

type Mode = { kind: QuizKind; domain?: number }

export default function Quiz() {
  const userId = useUserId()
  const [all, setAll] = useState<Question[] | null>(null)
  const [mode, setMode] = useState<Mode | null>(null)
  const [quiz, setQuiz] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [response, setResponse] = useState<unknown>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    void fetchQuestions().then(setAll)
  }, [])

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

  if (!all) return <p className="text-slate-400">Loading…</p>

  if (!mode) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-lg font-semibold">Practice quiz — {QUIZ_SIZE} questions, answer before you see feedback</h1>
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
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="font-semibold text-slate-200 text-sm mb-2">Single domain (before-exam patching only)</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(DOMAIN_NAMES).map(([d, label]) => (
                <button
                  key={d}
                  onClick={() => void start({ kind: 'domain', domain: Number(d) })}
                  className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {d}. {label}
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
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
        <p className="text-3xl font-bold text-slate-100">
          {score}/{quiz.length} <span className={pct >= 83 ? 'text-emerald-400' : pct >= 70 ? 'text-yellow-400' : 'text-red-400'}>({pct}%)</span>
        </p>
        <p className="text-sm text-slate-400">
          {pct >= 83
            ? 'At exam pace. Keep interleaving.'
            : pct >= 70
              ? 'Close — review the explanations you just read, they are the study material.'
              : 'Rough patch found — that is the system working. These objectives now weigh more in Weak areas mode.'}
        </p>
        <button onClick={() => setMode(null)} className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-2 text-sm font-semibold">
          Another quiz
        </button>
      </div>
    )
  }

  const q = quiz[idx]
  const answered = response !== null && (q.qtype !== 'matching' || (response as (number | null)[]).every((p) => p !== null))
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between text-xs text-slate-400">
        <span>
          Question {idx + 1}/{quiz.length} · D{q.domain} {q.objective} · {q.qtype.toUpperCase()}
        </span>
        <span>
          {score} correct so far
        </span>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <QuestionPlayer question={q} value={response} onChange={setResponse} reveal={revealed} />
        <div className="mt-5">
          {!revealed ? (
            <button
              disabled={!answered}
              onClick={() => void lockIn()}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 px-5 py-2 text-sm font-semibold"
            >
              Lock in answer
            </button>
          ) : (
            <button onClick={next} className="rounded-lg bg-slate-700 hover:bg-slate-600 px-5 py-2 text-sm font-semibold">
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
    <button onClick={onClick} className="text-left rounded-xl border border-slate-800 bg-slate-900 hover:border-emerald-700 p-4">
      <p className="font-semibold text-slate-200 text-sm">{title}</p>
      <p className="text-xs text-slate-400 mt-1">{desc}</p>
    </button>
  )
}
