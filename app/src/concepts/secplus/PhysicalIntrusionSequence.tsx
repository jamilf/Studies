import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'clone', label: 'Clone an employee\'s RFID badge from a distance', correctIndex: 1, detail: 'Comes after reconnaissance, once the attacker knows which credential to target and has the equipment to skim it.' },
  { id: 'recon', label: 'Watch the building to learn shift changes and badge-in points', correctIndex: 0, detail: 'Reconnaissance always comes first — the attacker needs to know the routine before attempting entry.' },
  { id: 'dwell', label: 'Move through the facility posing as a legitimate visitor or vendor', correctIndex: 3, detail: 'After gaining entry, the attacker dwells and blends in, using the false legitimacy created by getting past the door.' },
  { id: 'tailgate', label: 'Follow an authorized employee through a secured door (tailgating)', correctIndex: 2, detail: 'With a cloned badge or simply by timing, tailgating exploits an employee holding the door — an entry technique, not a reconnaissance one.' },
  { id: 'exfil', label: 'Access an unlocked workstation or server room and extract data', correctIndex: 4, detail: 'The final objective — physical access to a system is often the fastest path to data that would otherwise be well defended on the network.' },
]

export default function PhysicalIntrusionSequence() {
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
        <h3 className="font-display text-lg text-ink">Physical Intrusion Attempt Sequence</h3>
        <p className="text-sm text-soft">
          Domain 2.4 — use the arrows to put a physical social-engineering intrusion in the order it typically unfolds, then check.
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
        Physical attacks are indicators of malicious activity just like network or application attacks. Controls
        like mantraps, badge-plus-PIN access, and visitor escort policies are designed to break this chain at the
        entry step, before tailgating or badge cloning ever succeeds.
      </div>
    </div>
  )
}
