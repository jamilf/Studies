import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  {
    id: 'recovery',
    label: 'Boot into recovery/safe mode to rule out a rogue app or bad update',
    correctIndex: 3,
    detail: 'If the device shows any sign of life, safe mode isolates a software cause before you assume a hardware fault.',
  },
  {
    id: 'charge',
    label: 'Plug into a known-good charger/cable and wait several minutes',
    correctIndex: 0,
    detail: 'A fully drained battery can look "dead" for several minutes before any charging indicator appears — always rule this out first, it costs nothing.',
  },
  {
    id: 'battery-pull',
    label: 'Disconnect/reseat the battery (or perform the equivalent forced power cut) and inspect for swelling',
    correctIndex: 4,
    detail: 'A more invasive step: removing power at the battery level and visually checking for physical damage or swelling before going further.',
  },
  {
    id: 'reset',
    label: 'Try the device\'s forced-restart / hard-reset button combination',
    correctIndex: 1,
    detail: 'Still non-invasive and free — a hung device that never got past a frozen boot screen often responds to a forced restart.',
  },
  {
    id: 'escalate',
    label: 'Escalate to a repair technician for board-level diagnosis',
    correctIndex: 5,
    detail: 'Reserved for when nothing above works — likely a charging IC failure, water damage, or another board-level fault outside field-repair scope.',
  },
  {
    id: 'port',
    label: 'Inspect the charging port for lint/damage and try a different cable',
    correctIndex: 2,
    detail: 'A blocked or damaged port is a very common, easily overlooked cause — check it before assuming the battery or board has failed.',
  },
]

export default function MobileDevicePowerTroubleshootingOrder() {
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
        <h3 className="font-display text-lg text-ink">Mobile Device Won't Power On — Troubleshooting Order</h3>
        <p className="text-sm text-soft">
          Domain 5.5 — use the arrows to put these steps in the right order, least invasive first, then check.
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
                <button onClick={() => move(id, -1)} disabled={i === 0} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">
                  ↑
                </button>
                <button onClick={() => move(id, 1)} disabled={i === order.length - 1} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">
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
        <div className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'}`}>
          {isCorrect ? 'Correct order!' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The pattern mirrors general troubleshooting methodology applied to mobile hardware: rule out the cheapest,
        least destructive cause (drained battery) first, escalate through free/non-invasive fixes, and only reach
        for physical disassembly or a technician once everything reversible has been tried.
      </div>
    </div>
  )
}
