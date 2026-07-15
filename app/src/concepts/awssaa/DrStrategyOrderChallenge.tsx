import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'warm', label: 'Warm Standby', correctIndex: 2, detail: 'A scaled-down but fully functional copy of production runs at all times; failover scales it up. Faster than pilot light, costs more.' },
  { id: 'restore', label: 'Backup & Restore', correctIndex: 0, detail: 'Only backups (snapshots, AMIs) exist in the DR region; everything is provisioned from scratch during a disaster. Cheapest option, slowest recovery — RTO measured in hours.' },
  { id: 'multisite', label: 'Multi-Site Active-Active', correctIndex: 3, detail: 'Full production capacity runs simultaneously in two or more regions, actively serving traffic. Fastest possible recovery, but the most expensive and complex to operate.' },
  { id: 'pilot', label: 'Pilot Light', correctIndex: 1, detail: 'Core systems (typically just the database) are kept running and continuously replicated in the DR region; compute is provisioned only when needed. Cheaper and slower than warm standby.' },
]

export default function DrStrategyOrderChallenge() {
  const [order, setOrder] = useState(ITEMS.map((it) => it.id))
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
        <h3 className="font-display text-lg text-ink">Order the DR Strategies</h3>
        <p className="text-sm text-soft">Domain 2.2 — use the arrows to rank the four DR strategies from lowest cost/slowest recovery to highest cost/fastest recovery, then check.</p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const it = ITEMS.find((x) => x.id === id)!
          return (
            <div key={id} className="rounded-crisp border border-line bg-surface px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
                <span className="flex-1 text-sm font-medium text-ink">{it.label}</span>
                {checked && <span className={`text-xs font-semibold ${it.correctIndex === i ? 'text-good' : 'text-bad'}`}>{it.correctIndex === i ? '✓' : '✗'}</span>}
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => move(id, -1)} disabled={i === 0} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↑</button>
                  <button onClick={() => move(id, 1)} disabled={i === order.length - 1} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↓</button>
                </div>
              </div>
              {checked && <p className="text-xs text-soft mt-1.5 pl-7 leading-relaxed">{it.detail}</p>}
            </div>
          )
        })}
      </div>

      <button onClick={() => setChecked(true)} className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors">
        Check order
      </button>

      {checked && (
        <div className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'}`}>
          {isCorrect ? 'Correct — cost and recovery speed rise together across all four strategies.' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        All four strategies trade cost against RTO/RPO along the same line: Backup &amp; Restore is cheapest and
        slowest, Multi-Site Active-Active is most expensive and fastest, with Pilot Light and Warm Standby
        occupying the middle ground.
      </div>
    </div>
  )
}
