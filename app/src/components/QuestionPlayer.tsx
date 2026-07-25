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
      <p className="text-ink leading-relaxed whitespace-pre-wrap">{q.stem}</p>
      {q.qtype === 'mcq' && <Mcq {...{ q, value, onChange, reveal }} />}
      {q.qtype === 'multi' && <Multi {...{ q, value, onChange, reveal }} />}
      {q.qtype === 'ordering' && <Ordering {...{ q, value, onChange, reveal }} />}
      {q.qtype === 'matching' && <Matching {...{ q, value, onChange, reveal }} />}
      {reveal && (
        <div
          role="status"
          className={`rounded-crisp border-l-2 px-4 py-3 text-sm leading-relaxed animate-rise ${
            isCorrect(q, value) ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
          }`}
        >
          <p className={`font-display font-semibold mb-1 ${isCorrect(q, value) ? 'text-good' : 'text-bad'}`}>
            {isCorrect(q, value) ? 'Correct' : 'Incorrect'}
          </p>
          <p className="text-ink">{q.explanation}</p>
        </div>
      )}
    </div>
  )
}

type PartProps = { q: Question; value: unknown; onChange: (r: unknown) => void; reveal: boolean }

/** A, B, C … Exam convention, and far easier to scan. */
const LETTERS = 'ABCDEFGH'

const optionBase =
  'w-full text-left rounded-crisp border px-4 py-2.5 text-sm text-ink transition-all duration-150 enabled:active:scale-[0.99]'
const optionIdle = 'border-line bg-surface hover:border-line-strong'
const optionSelected = 'border-accent bg-accent-tint'
const optionCorrect = 'border-good-line bg-good-tint'
const optionWrong = 'border-bad-line bg-bad-tint'

function Mcq({ q, value, onChange, reveal }: PartProps) {
  const choices = q.choices as string[]
  const perm = useMemo(() => shuffledIndexes(choices.length), [q.id, choices.length])
  return (
    <div className="space-y-2">
      {perm.map((orig, i) => {
        const selected = value === orig
        const correct = reveal && orig === q.answer
        const wrongPick = reveal && selected && orig !== q.answer
        return (
          <button
            key={orig}
            disabled={reveal}
            aria-pressed={selected}
            onClick={() => onChange(orig)}
            className={`${optionBase} ${
              correct ? optionCorrect : wrongPick ? optionWrong : selected ? optionSelected : optionIdle
            }`}
          >
            <span aria-hidden className="font-mono text-faint mr-2">{LETTERS[i]}</span>
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
      <p className="text-xs text-faint italic">Select all that apply.</p>
      {perm.map((orig) => {
        const selected = picked.has(orig)
        const correct = reveal && answerSet.has(orig)
        return (
          <button
            key={orig}
            disabled={reveal}
            aria-pressed={selected}
            onClick={() => toggle(orig)}
            className={`${optionBase} ${correct ? optionCorrect : selected ? optionSelected : optionIdle}`}
          >
            <span aria-hidden className={`font-mono mr-2 ${selected ? 'text-accent' : 'text-faint'}`}>
              {selected ? '☑' : '☐'}
            </span>
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
      <p className="text-xs text-faint italic">Tap items in the correct order. Tap a placed item to remove it.</p>
      <div className="space-y-1.5">
        {chosen.map((orig, i) => (
          <button
            key={orig}
            disabled={reveal}
            onClick={() => onChange(chosen.filter((c) => c !== orig))}
            className={`${optionBase} ${
              reveal ? (correctOrder[i] === orig ? optionCorrect : optionWrong) : optionSelected
            }`}
          >
            <span className="font-mono text-faint mr-2">{i + 1}.</span>
            {items[orig]}
          </button>
        ))}
      </div>
      {remaining.length > 0 && !reveal && (
        <div className="space-y-1.5 border-t border-line pt-3">
          {remaining.map((orig) => (
            <button
              key={orig}
              onClick={() => onChange([...chosen, orig])}
              className={`${optionBase} ${optionIdle}`}
            >
              {items[orig]}
            </button>
          ))}
        </div>
      )}
      {reveal && (
        <div className="text-xs text-soft space-y-0.5">
          <p className="font-semibold text-ink">Correct order:</p>
          {correctOrder.map((orig, i) => (
            <p key={orig}>
              <span className="font-mono">{i + 1}.</span> {items[orig]}
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
      <p className="text-xs text-faint italic">Match each item on the left to an option on the right.</p>
      {left.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          <span
            className={`flex-1 rounded-crisp border px-3 py-2 text-sm text-ink ${
              reveal
                ? picks[i] === correct[i]
                  ? 'border-good-line bg-good-tint'
                  : 'border-bad-line bg-bad-tint'
                : 'border-line bg-surface'
            }`}
          >
            {label}
          </span>
          <select
            disabled={reveal}
            aria-label={`Match for ${label}`}
            value={picks[i] ?? ''}
            onChange={(e) => setPick(i, e.target.value === '' ? null : Number(e.target.value))}
            className="flex-1 rounded-crisp border border-line bg-surface px-2 py-2 text-sm text-ink"
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
        <div className="text-xs text-soft space-y-0.5 pt-1">
          <p className="font-semibold text-ink">Correct pairs:</p>
          {left.map((label, i) => (
            <p key={i}>
              {label} <span className="font-mono">→</span> {right[correct[i]]}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
