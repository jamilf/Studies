import { useMemo } from 'react'
import type { Question } from '../lib/types'
import { shuffledIndexes } from '../lib/shuffle'
import { isCorrect } from '../lib/exam'

interface Props {
  question: Question
  /** Response in ORIGINAL index space (see lib/types.ts for shapes). */
  value: unknown
  onChange: (response: unknown) => void
  /** Lock inputs and show correct answer + explanation. */
  reveal: boolean
}

/**
 * Renders every question type. Stored content keys answers to original
 * indexes, so display order is shuffled per mount and grading maps back
 * through the permutation - no answer-position memorization.
 */
export default function QuestionPlayer({ question, value, onChange, reveal }: Props) {
  const q = question
  return (
    <div className="space-y-4">
      <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">{q.stem}</p>
      {q.qtype === 'mcq' && <Mcq {...{ q, value, onChange, reveal }} />}
      {q.qtype === 'multi' && <Multi {...{ q, value, onChange, reveal }} />}
      {q.qtype === 'ordering' && <Ordering {...{ q, value, onChange, reveal }} />}
      {q.qtype === 'matching' && <Matching {...{ q, value, onChange, reveal }} />}
      {reveal && (
        <div
          className={`rounded-lg border p-4 text-sm leading-relaxed ${
            isCorrect(q, value)
              ? 'border-emerald-700 bg-emerald-950/40 text-emerald-100'
              : 'border-red-800 bg-red-950/30 text-red-100'
          }`}
        >
          <p className="font-semibold mb-1">{isCorrect(q, value) ? 'Correct' : 'Incorrect'}</p>
          <p className="text-slate-200">{q.explanation}</p>
        </div>
      )}
    </div>
  )
}

type PartProps = { q: Question; value: unknown; onChange: (r: unknown) => void; reveal: boolean }

function Mcq({ q, value, onChange, reveal }: PartProps) {
  const choices = q.choices as string[]
  const perm = useMemo(() => shuffledIndexes(choices.length), [q.id, choices.length])
  return (
    <div className="space-y-2">
      {perm.map((orig) => {
        const selected = value === orig
        const correct = reveal && orig === q.answer
        const wrongPick = reveal && selected && orig !== q.answer
        return (
          <button
            key={orig}
            disabled={reveal}
            onClick={() => onChange(orig)}
            className={`w-full text-left rounded-lg border px-4 py-2.5 text-sm transition ${
              correct
                ? 'border-emerald-500 bg-emerald-900/40'
                : wrongPick
                  ? 'border-red-500 bg-red-900/30'
                  : selected
                    ? 'border-emerald-400 bg-slate-800'
                    : 'border-slate-700 bg-slate-900 hover:border-slate-500'
            }`}
          >
            {choices[orig]}
          </button>
        )
      })}
    </div>
  )
}

function Multi({ q, value, onChange, reveal }: PartProps) {
  const choices = q.choices as string[]
  const perm = useMemo(() => shuffledIndexes(choices.length), [q.id, choices.length])
  const picked = new Set((value as number[]) ?? [])
  const answerSet = new Set(q.answer as number[])
  function toggle(orig: number) {
    const next = new Set(picked)
    if (next.has(orig)) next.delete(orig)
    else next.add(orig)
    onChange([...next])
  }
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400">Select all that apply.</p>
      {perm.map((orig) => {
        const selected = picked.has(orig)
        const correct = reveal && answerSet.has(orig)
        return (
          <button
            key={orig}
            disabled={reveal}
            onClick={() => toggle(orig)}
            className={`w-full text-left rounded-lg border px-4 py-2.5 text-sm ${
              correct
                ? 'border-emerald-500 bg-emerald-900/40'
                : selected
                  ? 'border-emerald-400 bg-slate-800'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-500'
            }`}
          >
            {selected ? '☑ ' : '☐ '}
            {choices[orig]}
          </button>
        )
      })}
    </div>
  )
}

function Ordering({ q, value, onChange, reveal }: PartProps) {
  const items = q.choices as string[]
  const perm = useMemo(() => shuffledIndexes(items.length), [q.id, items.length])
  const chosen = (value as number[]) ?? []
  const remaining = perm.filter((orig) => !chosen.includes(orig))
  const correctOrder = q.answer as number[]
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">Tap items in the correct order. Tap a placed item to remove it.</p>
      <div className="space-y-1.5">
        {chosen.map((orig, i) => (
          <button
            key={orig}
            disabled={reveal}
            onClick={() => onChange(chosen.filter((c) => c !== orig))}
            className={`w-full text-left rounded-lg border px-4 py-2 text-sm ${
              reveal
                ? correctOrder[i] === orig
                  ? 'border-emerald-500 bg-emerald-900/40'
                  : 'border-red-500 bg-red-900/30'
                : 'border-emerald-400 bg-slate-800'
            }`}
          >
            <span className="text-slate-400 mr-2">{i + 1}.</span>
            {items[orig]}
          </button>
        ))}
      </div>
      {remaining.length > 0 && !reveal && (
        <div className="space-y-1.5 border-t border-slate-800 pt-3">
          {remaining.map((orig) => (
            <button
              key={orig}
              onClick={() => onChange([...chosen, orig])}
              className="w-full text-left rounded-lg border border-slate-700 bg-slate-900 hover:border-slate-500 px-4 py-2 text-sm"
            >
              {items[orig]}
            </button>
          ))}
        </div>
      )}
      {reveal && (
        <div className="text-xs text-slate-300 space-y-0.5">
          <p className="font-semibold text-slate-200">Correct order:</p>
          {correctOrder.map((orig, i) => (
            <p key={orig}>
              {i + 1}. {items[orig]}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function Matching({ q, value, onChange, reveal }: PartProps) {
  const { left, right } = q.choices as { left: string[]; right: string[] }
  const perm = useMemo(() => shuffledIndexes(right.length), [q.id, right.length])
  const picks = (value as (number | null)[]) ?? left.map(() => null)
  const correct = q.answer as number[]
  function setPick(i: number, orig: number | null) {
    const next = [...picks]
    next[i] = orig
    onChange(next)
  }
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400">Match each item on the left to an option on the right.</p>
      {left.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          <span
            className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
              reveal
                ? picks[i] === correct[i]
                  ? 'border-emerald-500 bg-emerald-900/40'
                  : 'border-red-500 bg-red-900/30'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            {label}
          </span>
          <select
            disabled={reveal}
            value={picks[i] ?? ''}
            onChange={(e) => setPick(i, e.target.value === '' ? null : Number(e.target.value))}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-2 text-sm"
          >
            <option value="">— choose —</option>
            {perm.map((orig) => (
              <option key={orig} value={orig}>
                {right[orig]}
              </option>
            ))}
          </select>
        </div>
      ))}
      {reveal && (
        <div className="text-xs text-slate-300 space-y-0.5 pt-1">
          <p className="font-semibold text-slate-200">Correct pairs:</p>
          {left.map((label, i) => (
            <p key={i}>
              {label} → {right[correct[i]]}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
