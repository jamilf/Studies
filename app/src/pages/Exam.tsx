import { useEffect, useRef, useState } from 'react'
import { PageSkeleton } from '../components/Skeleton'
import { useSearchParams } from 'react-router-dom'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import QuestionPlayer from '../components/QuestionPlayer'
import { useRunGuard } from '../components/NavGuard'
import { supabase } from '../lib/supabase'
import { fetchQuestions } from '../lib/data'
import { buildExamForm, isCorrect, scaledScore } from '../lib/exam'
import type { ExamAttempt, Question } from '../lib/types'

type Phase = 'idle' | 'running' | 'review'

/**
 * Phase lives in a search param (`?attempt=run|review`) so Back, refresh and
 * history all behave — and, unlike a child route, changing it does not remount
 * this component and destroy the in-memory form and timer.
 */
function phaseFromParam(value: string | null): Phase {
  if (value === 'run') return 'running'
  if (value === 'review') return 'review'
  return 'idle'
}

export default function Exam() {
  const userId = useUserId()
  const { cert } = useCert()
  const [searchParams, setSearchParams] = useSearchParams()
  const [all, setAll] = useState<Question[] | null>(null)
  const [attempts, setAttempts] = useState<ExamAttempt[]>([])
  const phase = phaseFromParam(searchParams.get('attempt'))
  const [form, setForm] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<string, unknown>>({})
  const [flags, setFlags] = useState<Set<string>>(new Set())
  const [idx, setIdx] = useState(0)
  const [gridOpen, setGridOpen] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(cert.exam.minutes * 60)
  const [result, setResult] = useState<{ raw: number; scaled: number; passed: boolean } | null>(null)
  const deadline = useRef<number>(0)
  const submitting = useRef(false)

  useEffect(() => {
    setAll(null)
    setForm([])
    void fetchQuestions(cert.id).then(setAll)
    void supabase
      .from('exam_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('cert', cert.id)
      .order('started_at', { ascending: false })
      .limit(10)
      .then(({ data }) => setAttempts((data ?? []) as ExamAttempt[]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, cert])

  // A form lives only in memory, so a /run or /review URL with nothing behind
  // it (hard refresh, hand-typed link, cert switch) returns to the briefing.
  useEffect(() => {
    if (phase !== 'idle' && form.length === 0) setSearchParams({}, { replace: true })
  }, [phase, form.length, setSearchParams])

  // A timed, unsaved attempt is the most destructive thing to navigate away
  // from, so it is always guarded.
  useRunGuard(
    phase === 'running',
    'Your exam is still running. Leaving now discards every answer and the timer.',
  )

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
    setSearchParams({ attempt: 'run' })
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
    setSearchParams({ attempt: 'review' }, { replace: true })
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

  if (!all) return <PageSkeleton label="Loading exam" />

  // Safety net: a run/review URL with no form behind it (hand-typed URL) falls
  // back to the briefing instead of rendering an undefined question.
  if (phase === 'idle' || form.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-surface border border-line rounded-soft shadow-card p-6 space-y-4">
          <h1 className="font-display text-2xl text-ink">
            {cert.label} exam simulation <span className="font-mono text-sm text-faint">{cert.examCode}</span>
          </h1>
          <ul className="text-sm text-soft space-y-1.5 list-disc ml-5">
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
          {/* A bank smaller than a form still runs, but the blueprint weighting
              cannot hold and the score is off a short paper. Say so up front
              rather than presenting a "90-question" result that isn't one. */}
          {all.length < cert.exam.questions && (
            <p className="rounded-crisp border-l-2 border-warn-line bg-warn-tint px-4 py-3 text-sm leading-relaxed text-ink">
              <span className="font-display font-semibold text-warn">Short question bank.</span>{' '}
              This cert has {all.length} questions, so a full {cert.exam.questions}-question form can't be built yet.
              You'll get {all.length} — every question in the bank, with the blueprint weighting relaxed to fill it.
              Treat the score as rough.
            </p>
          )}
          <button
            onClick={start}
            className="rounded-crisp bg-accent hover:bg-accent-deep text-paper px-6 py-2.5 text-sm font-semibold transition-colors"
          >
            Start exam
          </button>
        </div>
        {attempts.length > 0 && (
          <section>
            <h2 className="font-display text-lg text-ink pb-2 border-b border-line mb-1">Past attempts</h2>
            <div className="divide-y divide-line">
              {attempts.map((a) => (
                <div key={a.id} className="flex justify-between font-mono text-sm py-2">
                  <span className="text-soft">{new Date(a.started_at).toLocaleDateString()}</span>
                  <span className={a.passed ? 'text-good' : 'text-bad'}>
                    {a.scaled_score} {a.passed ? 'PASS' : 'FAIL'} ({a.raw_correct}/{(a.question_ids as string[]).length})
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  }

  const q = form[idx]
  const isReview = phase === 'review'
  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const answeredCount = form.filter((f) => responses[f.id] !== undefined && responses[f.id] !== null).length

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {isReview && result && (
        <div
          className={`rounded-crisp border-l-2 px-5 py-4 text-center ${
            result.passed ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
          }`}
        >
          <p className="font-display text-4xl text-ink">
            {result.scaled}{' '}
            <span className={`font-sans text-base font-semibold ${result.passed ? 'text-good' : 'text-bad'}`}>
              {result.passed ? 'PASS' : 'FAIL'}
            </span>
          </p>
          <p className="text-sm text-soft mt-1">
            {result.raw}/{form.length} correct · pass line {cert.exam.pass} · review every question below, especially
            the ones you got right by luck
          </p>
        </div>
      )}

      {/* Sticky during a run: the clock is the most important thing on screen
          and used to scroll away on longer questions. */}
      <div
        className={`flex items-center justify-between gap-3 ${
          !isReview ? 'sticky top-14 z-10 -mx-2 px-2 py-2 bg-paper/95 backdrop-blur border-b border-line' : ''
        }`}
      >
        <span className="font-mono text-xs text-faint">
          {idx + 1}/{form.length}
          {!isReview && <span className="text-soft"> · {answeredCount} answered</span>}
          {isReview && ` · §${q.domain} ${q.objective}`}
        </span>
        {!isReview ? (
          // Announced politely: a screen-reader user needs the time remaining
          // without it interrupting them on every tick.
          <span
            role="timer"
            aria-live="off"
            aria-label={`Time remaining: ${mins} minutes ${secs} seconds`}
            className={`font-mono text-lg font-semibold tabular-nums ${
              secondsLeft < 600 ? 'text-bad' : 'text-ink'
            }`}
          >
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        ) : (
          <span
            role="status"
            className={`text-xs font-semibold ${isCorrect(q, responses[q.id]) ? 'text-good' : 'text-bad'}`}
          >
            {isCorrect(q, responses[q.id]) ? 'Correct' : 'Incorrect'}
          </span>
        )}
      </div>

      <div className="bg-surface border border-line rounded-soft shadow-card p-6">
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
          className="rounded-crisp border border-line bg-surface hover:border-line-strong disabled:opacity-40 px-3 sm:px-4 py-2.5 sm:py-2 min-h-11 sm:min-h-0 text-sm text-ink transition-colors whitespace-nowrap"
        >
          ←<span className="hidden sm:inline"> Prev</span>
        </button>
        <button
          disabled={idx === form.length - 1}
          onClick={() => setIdx((i) => i + 1)}
          className="rounded-crisp border border-line bg-surface hover:border-line-strong disabled:opacity-40 px-3 sm:px-4 py-2.5 sm:py-2 min-h-11 sm:min-h-0 text-sm text-ink transition-colors whitespace-nowrap"
        >
          <span className="hidden sm:inline">Next </span>→
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
              className={`rounded-crisp border px-3 sm:px-4 py-2.5 sm:py-2 min-h-11 sm:min-h-0 text-sm transition-colors whitespace-nowrap ${
                flags.has(q.id)
                  ? 'bg-warn-tint border-warn-line text-warn'
                  : 'border-line bg-surface text-ink hover:border-line-strong'
              }`}
            >
              {flags.has(q.id) ? '⚑ Flagged' : '⚐ Flag'}
            </button>
            <div className="flex-1" />
            <button
              onClick={() => {
                if (confirm('Submit the exam? Unanswered questions count as wrong.')) void submit()
              }}
              className="rounded-crisp bg-accent hover:bg-accent-deep text-paper px-4 sm:px-5 py-2.5 sm:py-2 min-h-11 sm:min-h-0 text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Submit
            </button>
          </>
        )}
        {isReview && (
          <>
            <div className="flex-1" />
            <button
              onClick={() => setSearchParams({})}
              className="rounded-crisp border border-line bg-surface hover:border-line-strong px-4 py-2 text-sm text-ink transition-colors"
            >
              Done reviewing
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => setGridOpen((o) => !o)}
        aria-expanded={gridOpen}
        className="sm:hidden w-full rounded-crisp border border-line bg-surface px-3 py-2.5 text-sm text-ink transition-colors hover:border-line-strong flex items-center justify-between"
      >
        <span>Jump to question · {answeredCount}/{form.length} answered</span>
        <span aria-hidden className={`text-faint transition-transform ${gridOpen ? 'rotate-180' : ''}`}>▾</span>
      </button>

      <div
        className={`${gridOpen ? 'flex' : 'hidden'} sm:flex flex-wrap gap-1`}
        role="group"
        aria-label="Jump to question"
      >
        {form.map((fq, i) => {
          const answered = responses[fq.id] !== undefined && responses[fq.id] !== null
          const flagged = flags.has(fq.id)
          const reviewState = isReview ? (isCorrect(fq, responses[fq.id]) ? 'ok' : 'bad') : null
          // The colour alone carries the state visually; spell it out for
          // assistive tech.
          const state = reviewState
            ? reviewState === 'ok'
              ? 'correct'
              : 'incorrect'
            : [answered ? 'answered' : 'unanswered', flagged ? 'flagged' : null].filter(Boolean).join(', ')
          return (
            <button
              key={fq.id}
              aria-label={`Question ${i + 1}, ${state}`}
              aria-current={i === idx ? 'true' : undefined}
              onClick={() => setIdx(i)}
              className={`w-11 h-11 sm:w-8 sm:h-7 rounded-crisp text-xs sm:text-[11px] font-mono border transition-colors ${
                i === idx ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper ' : ''
              }${
                reviewState === 'ok'
                  ? 'bg-good-tint border-good-line text-good'
                  : reviewState === 'bad'
                    ? 'bg-bad-tint border-bad-line text-bad'
                    : flagged
                      ? 'bg-warn-tint border-warn-line text-warn'
                      : answered
                        ? 'bg-ink border-ink text-paper'
                        : 'bg-wash border-line text-faint'
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
