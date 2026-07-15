import { useMemo, useState } from 'react'

interface Site {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const SITES: Site[] = [
  {
    id: 'cold',
    label: 'Cold Site',
    correctIndex: 2,
    detail: 'Bare space with power and cooling but no pre-installed hardware or data. Everything must be procured, shipped, and configured from scratch, so recovery takes days to weeks.',
  },
  {
    id: 'hot',
    label: 'Hot Site',
    correctIndex: 0,
    detail: 'A fully mirrored facility with live, continuously synced data and standby hardware ready to go. Failover takes minutes to hours, but it is the most expensive option to keep running.',
  },
  {
    id: 'warm',
    label: 'Warm Site',
    correctIndex: 1,
    detail: 'A partially equipped facility with hardware and connectivity already in place, but data must be restored from recent backups. Recovery takes hours to a couple of days.',
  },
]

export default function DrSiteReorder() {
  const [order, setOrder] = useState<string[]>(SITES.map((s) => s.id))
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

  const isCorrect = useMemo(
    () => order.every((id, i) => SITES.find((s) => s.id === id)!.correctIndex === i),
    [order],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Disaster Recovery Site Types</h3>
        <p className="text-sm text-soft">Domain 3.2 — use the arrows to order these sites from fastest to slowest recovery, then check.</p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const s = SITES.find((x) => x.id === id)!
          return (
            <div key={id} className="flex items-center gap-2 rounded-crisp border border-line bg-surface px-3 py-2">
              <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{s.label}</p>
                {checked && <p className="text-xs text-soft mt-0.5 leading-relaxed">{s.detail}</p>}
              </div>
              {checked && (
                <span className={`text-xs font-semibold ${s.correctIndex === i ? 'text-good' : 'text-bad'}`}>
                  {s.correctIndex === i ? '✓' : '✗'}
                </span>
              )}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => move(id, -1)}
                  disabled={i === 0}
                  className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(id, 1)}
                  disabled={i === order.length - 1}
                  className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => setChecked(true)}
        className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
      >
        Check order
      </button>

      {checked && (
        <div
          className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${
            isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'
          }`}
        >
          {isCorrect ? 'Correct — hot, then warm, then cold.' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The trade-off is always the same: readiness costs money. A hot site's near-instant recovery time comes from
        paying to keep duplicate infrastructure running around the clock; a cold site is cheap to hold but slow to
        activate.
      </div>
    </div>
  )
}
