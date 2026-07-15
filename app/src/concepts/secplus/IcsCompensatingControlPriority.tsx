import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'segment', label: 'Isolate the ICS/SCADA network from IT and the internet', correctIndex: 0, detail: 'Network segmentation is the foundational control — an unreachable device cannot be directly attacked, regardless of what flaws it has.' },
  { id: 'monitor', label: 'Deploy passive monitoring for anomalous traffic on the OT network', correctIndex: 1, detail: 'Once isolated, continuous passive monitoring (rather than active scanning, which can crash fragile devices) detects attempts to breach the segment.' },
  { id: 'compensate', label: 'Add compensating controls like a firewall rule or jump box in front of the device', correctIndex: 2, detail: 'Where the device itself cannot be hardened, a compensating control in front of it enforces the security the device cannot enforce on its own.' },
  { id: 'physical', label: 'Restrict and log physical access to the device or control cabinet', correctIndex: 3, detail: 'Physical security matters more for embedded/ICS gear precisely because it usually lacks modern authentication — anyone with a screwdriver may have full control.' },
  { id: 'patch', label: 'Apply a vendor patch, if and when one is ever released', correctIndex: 4, detail: 'Patching is last because it is often unavailable: many ICS/embedded devices run outdated, unsupported, or proprietary firmware with rare or no vendor updates, and any patch may require a costly planned outage to apply.' },
]

export default function IcsCompensatingControlPriority() {
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

  const isCorrect = useMemo(
    () => order.every((id, i) => ITEMS.find((it) => it.id === id)!.correctIndex === i),
    [order],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">ICS/SCADA &amp; Embedded Device Security Priority</h3>
        <p className="text-sm text-soft">
          Domain 3.1 — since these devices often cannot be patched, use the arrows to rank these controls in the order you should apply them, then check.
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
          {isCorrect ? 'Correct order!' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        IoT, embedded systems, and ICS/SCADA gear are frequently unable to run traditional endpoint agents or accept
        frequent patches — availability requirements (an assembly line cannot simply reboot) often outweigh the
        ability to remediate quickly, so architecture-level controls do most of the work.
      </div>
    </div>
  )
}
