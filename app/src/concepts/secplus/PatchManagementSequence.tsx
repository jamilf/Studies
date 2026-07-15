import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  {
    id: 'verify',
    label: 'Verify & document — rescan to confirm the vulnerability is closed and log the change',
    correctIndex: 4,
    detail: 'Closes the loop back into vulnerability management and provides an audit trail.',
  },
  {
    id: 'identify',
    label: 'Identify — a scan, vendor bulletin, or threat feed flags a missing patch',
    correctIndex: 0,
    detail: 'Vulnerability management surfaces what needs patching and how urgently.',
  },
  {
    id: 'deploy',
    label: 'Deploy — roll the patch out to production, often in waves or rings',
    correctIndex: 3,
    detail: 'Staged rollout limits the blast radius if something unexpected still breaks.',
  },
  {
    id: 'test',
    label: 'Test — apply the patch in a non-production environment to check for breakage',
    correctIndex: 1,
    detail: 'Catches compatibility issues before they hit live systems.',
  },
  {
    id: 'schedule',
    label: 'Schedule & approve — submit through change management and pick a maintenance window',
    correctIndex: 2,
    detail: 'Formal change control prevents an unapproved change from taking down production.',
  },
]

export default function PatchManagementSequence() {
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

  const isCorrect = useMemo(
    () => order.every((id, i) => ITEMS.find((it) => it.id === id)!.correctIndex === i),
    [order],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Patch Management Sequence</h3>
        <p className="text-sm text-soft">
          Domain 4.3 — use the arrows to put the patch management process in order, then check.
        </p>
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
          className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'}`}
        >
          {isCorrect ? 'Correct order!' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The two steps exam questions most often test are testing before deployment and routing changes through
        change management for approval — skipping either is the classic wrong answer in a patching scenario.
      </div>
    </div>
  )
}
