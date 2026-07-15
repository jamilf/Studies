import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'path', label: 'Path Coverage', correctIndex: 4, detail: 'Every possible route through the code, including every combination of branches, is exercised. Exhaustive and the strongest guarantee — but combinatorially expensive, so it\'s rarely achieved on anything but small, critical modules.' },
  { id: 'statement', label: 'Statement Coverage', correctIndex: 0, detail: 'The weakest measure — only checks that every line of code executed at least once. It says nothing about whether every branch or condition was tested, so bugs can hide even at 100% statement coverage.' },
  { id: 'multi', label: 'Multiple Condition Coverage', correctIndex: 3, detail: 'Every possible combination of individual boolean sub-conditions within a decision is tested — much stronger than condition coverage alone because conditions are rarely independent of each other.' },
  { id: 'condition', label: 'Condition Coverage', correctIndex: 2, detail: 'Every individual boolean sub-condition within a decision is tested as both true and false — a step up from branch coverage, but the sub-conditions aren\'t tested in every combination.' },
  { id: 'branch', label: 'Branch (Decision) Coverage', correctIndex: 1, detail: 'Every branch (each true/false outcome of a decision point, like an if statement) is exercised at least once — stronger than statement coverage since it forces both outcomes of every decision to run.' },
]

export default function CoverageStrategyOrdering() {
  const [order, setOrder] = useState<string[]>(ITEMS.map((it) => it.id))
  const [checked, setChecked] = useState(false)

  const move = (id: string, dir: -1 | 1) => {
    setChecked(false)
    setOrder((cur) => {
      const idx = cur.indexOf(id)
      const swapIdx = idx + dir
      if (swapIdx < 0 || swapIdx >= cur.length) return cur
      const next = [...cur]
      ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
      return next
    })
  }

  const isCorrect = useMemo(() => order.every((id, i) => ITEMS.find((it) => it.id === id)!.correctIndex === i), [order])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Test Coverage Strategies, Weakest to Strongest</h3>
        <p className="text-sm text-soft">Domain 6.2 — use the arrows to order these from weakest to strongest rigor, then check.</p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const it = ITEMS.find((x) => x.id === id)!
          return (
            <div key={id} className="flex items-center gap-2 rounded-crisp border border-line bg-surface px-3 py-2">
              <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
              <span className="flex-1 text-sm text-ink">{it.label}</span>
              {checked && (
                <span className={`text-xs font-semibold ${it.correctIndex === i ? 'text-good' : 'text-bad'}`}>
                  {it.correctIndex === i ? '✓' : '✗'}
                </span>
              )}
              <div className="flex flex-col gap-0.5">
                <button onClick={() => move(id, -1)} disabled={i === 0} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↑</button>
                <button onClick={() => move(id, 1)} disabled={i === order.length - 1} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↓</button>
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={() => setChecked(true)} className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors">
        Check order
      </button>

      {checked && (
        <div className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'}`}>
          {isCorrect ? 'Correct — that\'s the real rigor ladder.' : 'Not quite — reorder and check again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Coverage metrics don't all mean the same thing: 100% statement coverage can still hide untested branches,
        and 100% branch coverage can still hide untested condition combinations. Path coverage is the strongest but
        least practical to fully achieve at scale.
      </div>
    </div>
  )
}
