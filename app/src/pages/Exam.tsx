import { useEffect, useRef, useState } from 'react'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import QuestionPlayer from '../components/QuestionPlayer'
import { supabase } from '../lib/supabase'
import { fetchQuestions } from '../lib/data'
import { buildExamForm, isCorrect, scaledScore } from '../lib/exam'
import type { ExamAttempt, Question } from '../lib/types'

type Phase = 'idle' | 'running' | 'review'

export default function Exam() {
  const userId = useUserId()
  const { cert } = useCert()
  const [all, setAll] = useState<Question[] | null>(null)
  const [attempts, setAttempts] = useState<ExamAttempt[]>([])
  const [phase, setPhase] = useState<Phase>('idle')
  const [form, setForm] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<string, unknown>>({})
  const [flags, setFlags] = useState<Set<string>>(new Set())
  const [idx, setIdx] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(cert.exam.minutes * 60)
  const [result, setResult] = useState<{ raw: number; scaled: number; passed: boolean } | null>(null)
  const deadline = useRef<number>(0)
  const submitting = useRef(false)

  useEffect(() => {
    setAll(null)
    setPhase('idle')
    void fetchQuestions(cert.id).then(setAll)
    void supabase
      .from('exam_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('cert', cert.id)
      .order('started_at', { ascending: false })
      .limit(10)
      .then(({ data }) => setAttempts((data ?? []) as ExamAttempt[]))
  }, [userId, cert])

  useEffect(() => {
    if (phase !== 'running') return
    const t = setInterval(() => {
      const left = Math.max(0, Math.round((deadline.current - Date.now()) / 1000))
      setSecondsLeft(left)
      if (left === 0) void submit()
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function start() {
    if (!all) return
    const f = buildExamForm(all, cert)
    setForm(f)
    setResponses({})
    setFlags(new Set())
    setIdx(0)
    deadline.current = Date.now() + cert.exam.minutes * 60 * 1000
    setSecondsLeft(cert.exam.minutes * 60)
    setResult(null)
    setPhase('running')
  }

  async function submit() {
    if (submitting.current) return
    submitting.current = true
    let raw = 0
    const events = form.map((q) => {
      const correct = isCorrect(q, responses[q.id])
      if (correct) raw += 1
      return { user_id: userId, question_id: q.id, quiz_kind: 'exam', correct, chosen: responses[q.id] ?? null }
    })
    const scaled = scaledScore(raw, form.length, cert)
    const passed = scaled >= cert.exam.pass
    setResult({ raw, scaled, passed })
    setPhase('review')
    setIdx(0)
    await supabase.from('answer_events').insert(events)
    await supabase.from('exam_attempts').insert({
      user_id: userId,
      cert: cert.id,
      submitted_at: new Date().toISOString(),
      question_ids: form.map((q) => q.id),
      responses,
      raw_correct: raw,
      scaled_score: scaled,
      passed,
    })
    submitting.current = false
  }

  if (!all) return <p className="text-slate-400">Loading…</p>

  if (phase === 'idle') {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
          <h1 className="text-lg font-semibold text-slate-100">
            {cert.label} exam simulation <span className="text-slate-500 text-sm">({cert.examCode})</span>
          </h1>
          <ul className="text-sm text-slate-400 space-y-1 list-disc ml-5">
            <li>
              {cert.exam.questions} questions, blueprint-weighted across all {Object.keys(cert.domains).length} domains
            </li>
            <li>Hard {cert.exam.minutes}-minute timer — auto-submits at zero</li>
            <li>No feedback until you submit; flag questions to revisit</li>
            <li>
              Scaled score {cert.exam.scaleMin}–{cert.exam.scaleMax}, pass line {cert.exam.pass} (approximation of the
              vendor's equating)
            </li>
          </ul>
          <button onClick={start} className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-sm font-semibold">
            Start exam
          </button>
        </div>
        {attempts.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-200 mb-3">Past attempts</h2>
            <div className="space-y-1.5">
              {attempts.map((a) => (
                <div key={a.id} className="flex justify-between text-sm">
                  <span className="text-slate-400">{new Date(a.started_at).toLocaleDateString()}</span>
                  <span className={a.passed ? 'text-emerald-400' : 'text-red-400'}>
                    {a.scaled_score} {a.passed ? 'PASS' : 'FAIL'} ({a.raw_correct}/{(a.question_ids as string[]).length})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const q = form[idx]
  const isReview = phase === 'review'
  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {isReview && result && (
        <div
          className={`rounded-xl border p-5 text-center ${result.passed ? 'border-emerald-600 bg-emerald-950/40' : 'border-red-700 bg-red-950/30'}`}
        >
          <p className="text-3xl font-bold">
            {result.scaled} <span className="text-base font-semibold">{result.passed ? 'PASS' : 'FAIL'}</span>
          </p>
          <p className="text-sm text-slate-300 mt-1">
            {result.raw}/{form.length} correct · pass line {cert.exam.pass} · review every question below, especially the ones you got right by luck
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Question {idx + 1}/{form.length}
          {isReview && ` · D${q.domain} ${q.objective}`}
        </span>
        {!isReview ? (
          <span className={`font-mono text-sm ${secondsLeft < 600 ? 'text-red-400' : 'text-slate-300'}`}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        ) : (
          <span className={`text-xs font-semibold ${isCorrect(q, responses[q.id]) ? 'text-emerald-400' : 'text-red-400'}`}>
            {isCorrect(q, responses[q.id]) ? 'Correct' : 'Incorrect'}
          </span>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <QuestionPlayer
          key={q.id + (isReview ? '-r' : '')}
          question={q}
          value={responses[q.id] ?? null}
          onChange={(r) => setResponses((prev) => ({ ...prev, [q.id]: r }))}
          reveal={isReview}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={idx === 0}
          onClick={() => setIdx((i) => i - 1)}
          className="rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-4 py-2 text-sm"
        >
          ← Prev
        </button>
        <button
          disabled={idx === form.length - 1}
          onClick={() => setIdx((i) => i + 1)}
          className="rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-4 py-2 text-sm"
        >
          Next →
        </button>
        {!isReview && (
          <>
            <button
              onClick={() =>
                setFlags((f) => {
                  const n = new Set(f)
                  if (n.has(q.id)) n.delete(q.id)
                  else n.add(q.id)
                  return n
                })
              }
              className={`rounded-lg px-4 py-2 text-sm ${flags.has(q.id) ? 'bg-yellow-700' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              {flags.has(q.id) ? '⚑ Flagged' : '⚐ Flag'}
            </button>
            <div className="flex-1" />
            <button
              onClick={() => {
                if (confirm('Submit the exam? Unanswered questions count as wrong.')) void submit()
              }}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-2 text-sm font-semibold"
            >
              Submit exam
            </button>
          </>
        )}
        {isReview && (
          <>
            <div className="flex-1" />
            <button onClick={() => setPhase('idle')} className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm">
              Done reviewing
            </button>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {form.map((fq, i) => {
          const answered = responses[fq.id] !== undefined && responses[fq.id] !== null
          const flagged = flags.has(fq.id)
          const reviewState = isReview ? (isCorrect(fq, responses[fq.id]) ? 'ok' : 'bad') : null
          return (
            <button
              key={fq.id}
              onClick={() => setIdx(i)}
              className={`w-8 h-7 rounded text-[11px] font-mono ${
                i === idx
                  ? 'ring-2 ring-emerald-400 bg-slate-700'
                  : reviewState === 'ok'
                    ? 'bg-emerald-800/70'
                    : reviewState === 'bad'
                      ? 'bg-red-800/70'
                      : flagged
                        ? 'bg-yellow-700'
                        : answered
                          ? 'bg-slate-600'
                          : 'bg-slate-800'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
