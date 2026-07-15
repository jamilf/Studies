import { useMemo, useState } from 'react'

interface Stage {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const STAGES: Stage[] = [
  { id: 'deep-archive', label: 'Day 365+: Glacier Deep Archive', correctIndex: 3, detail: 'Cheapest long-term archive tier, retrieval measured in hours — objects land here once they are almost never needed but must be retained.' },
  { id: 'standard', label: 'Day 0: S3 Standard', correctIndex: 0, detail: 'Newly created object, actively read and written — highest per-GB storage cost but no retrieval fee and millisecond access.' },
  { id: 'expire', label: 'Day 730: Expiration', correctIndex: 4, detail: 'A lifecycle expiration action permanently deletes the object once it has outlived its retention requirement, stopping storage charges entirely.' },
  { id: 'glacier-flexible', label: 'Day 90: Glacier Flexible Retrieval', correctIndex: 2, detail: 'Cheaper archival storage for data that is rarely accessed but still needed occasionally, with retrieval times from minutes to hours.' },
  { id: 'standard-ia', label: 'Day 30: S3 Standard-IA', correctIndex: 1, detail: 'Lower storage cost than Standard once access frequency drops, in exchange for a per-GB retrieval fee — still millisecond access.' },
]

export default function S3LifecycleTransitionChallenge() {
  const [order, setOrder] = useState(STAGES.map((s) => s.id))
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

  const isCorrect = useMemo(() => order.every((id, i) => STAGES.find((s) => s.id === id)!.correctIndex === i), [order])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Order the S3 Lifecycle Transitions</h3>
        <p className="text-sm text-soft">Domain 4.2 — use the arrows to put a single object's lifecycle policy transitions in chronological order, then check.</p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const s = STAGES.find((x) => x.id === id)!
          return (
            <div key={id} className="rounded-crisp border border-line bg-surface px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
                <span className="flex-1 text-sm font-medium text-ink">{s.label}</span>
                {checked && <span className={`text-xs font-semibold ${s.correctIndex === i ? 'text-good' : 'text-bad'}`}>{s.correctIndex === i ? '✓' : '✗'}</span>}
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => move(id, -1)} disabled={i === 0} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↑</button>
                  <button onClick={() => move(id, 1)} disabled={i === order.length - 1} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↓</button>
                </div>
              </div>
              {checked && <p className="text-xs text-soft mt-1.5 pl-7 leading-relaxed">{s.detail}</p>}
            </div>
          )
        })}
      </div>

      <button onClick={() => setChecked(true)} className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors">
        Check order
      </button>

      {checked && (
        <div className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'}`}>
          {isCorrect ? 'Correct — storage cost falls (and retrieval time rises) at each transition, ending in permanent deletion.' : 'Not quite — check the day markers and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A lifecycle policy automates this ladder so nobody has to manually move objects — transition rules push
        aging, cold data to cheaper storage classes, and an expiration rule deletes it once retention requirements
        are met, all without touching application code.
      </div>
    </div>
  )
}
