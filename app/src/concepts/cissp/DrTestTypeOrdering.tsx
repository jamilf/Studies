import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'parallel', label: 'Parallel Test', correctIndex: 3, detail: 'The alternate/recovery site is actually brought online and made to process real transactions in parallel with production — strong proof the recovery environment works, without cutting production over.' },
  { id: 'checklist', label: 'Checklist Review', correctIndex: 0, detail: 'Copies of the plan are distributed to team members and departments to review for accuracy and completeness. No systems are touched — this is the least disruptive and lowest-assurance test.' },
  { id: 'full', label: 'Full Interruption Test', correctIndex: 4, detail: 'Production processing is actually stopped and failed over to the recovery site for real. This is the strongest possible proof the plan works, but it carries genuine business risk if the failover doesn\'t go as planned.' },
  { id: 'walkthrough', label: 'Structured Walkthrough (Tabletop)', correctIndex: 1, detail: 'The team gathers and talks through the plan step by step, often against a specific disaster scenario, to catch gaps in logic or missing dependencies before anything is tested live.' },
  { id: 'simulation', label: 'Simulation Test', correctIndex: 2, detail: 'The team responds to a simulated disaster scenario, and may perform some recovery actions, but stops short of actually failing over the alternate site — a rehearsal that goes beyond discussion but avoids full disruption.' },
]

export default function DrTestTypeOrdering() {
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
        <h3 className="font-display text-lg text-ink">Disaster Recovery Plan Test Types</h3>
        <p className="text-sm text-soft">Domain 7.12 — order these DR test types from least to most disruptive, then check.</p>
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
          {isCorrect ? 'Correct — that\'s the real disruption ladder.' : 'Not quite — reorder and check again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        DR-specific testing runs on its own escalating scale from a paper checklist review up through a full
        production interruption. Most organizations stop at parallel testing for routine cycles and reserve a full
        interruption test for mature programs willing to accept the real operational risk it carries.
      </div>
    </div>
  )
}
