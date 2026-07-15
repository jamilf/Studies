import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'disk', label: 'Local disk storage (installed programs, files)', correctIndex: 4, detail: 'Survives a reboot, but is still far more volatile than offline archival media — collect it after memory-resident evidence.' },
  { id: 'registers', label: 'CPU registers and cache', correctIndex: 0, detail: 'Changes on every clock cycle and is gone the instant power drops — the single most volatile evidence on the system.' },
  { id: 'archive', label: 'Archival media and backup tapes', correctIndex: 5, detail: 'Offline and durable — the least volatile evidence, so it can safely wait until last.' },
  { id: 'network', label: 'Network state: ARP cache, routing table, active connections', correctIndex: 2, detail: 'Kernel tables that reflect the live network state; they age out or get overwritten within minutes of activity.' },
  { id: 'ram', label: 'RAM and running process list', correctIndex: 1, detail: 'Holds decrypted data, injected code, and active malware — lost completely on power-down, so it is captured right after registers.' },
  { id: 'temp', label: 'Temporary file systems and swap/page files', correctIndex: 3, detail: 'More persistent than live memory but still gets overwritten as the OS churns through temp space.' },
]

const SCRAMBLED_ORDER: string[] = ['disk', 'registers', 'archive', 'network', 'ram', 'temp']

export default function OrderOfVolatility() {
  const [order, setOrder] = useState<string[]>(SCRAMBLED_ORDER)
  const [checked, setChecked] = useState(false)

  const move = (id: string, dir: -1 | 1): void => {
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
        <h3 className="font-display text-lg text-ink">Order of Volatility</h3>
        <p className="text-sm text-soft">Domain 3.2 — use the arrows to sequence evidence collection from most to least volatile, then check.</p>
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
          {isCorrect
            ? 'Correct — that is the RFC 3227 order of volatility, most fragile evidence first.'
            : 'Not quite yet. Think about what disappears first when the machine loses power, and reorder.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Collecting evidence out of order can destroy the most fragile artifacts before they are ever captured — a
        responder who images the disk first and only then checks running processes has already lost any malware that
        only ever existed in memory.
      </div>
    </div>
  )
}
