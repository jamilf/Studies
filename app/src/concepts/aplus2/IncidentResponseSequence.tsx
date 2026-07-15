import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  {
    id: 'preserve',
    label: 'Preserve the data and device',
    correctIndex: 2,
    detail: 'Secure the device so evidence cannot be altered — avoid using it further, and image/clone drives when required rather than working from the original.',
  },
  {
    id: 'identify',
    label: 'Identify the prohibited content or activity',
    correctIndex: 0,
    detail: 'Recognize that what you have found meets the definition of prohibited content/activity before acting — this determines everything that follows.',
  },
  {
    id: 'track',
    label: 'Track the evidence through final disposition',
    correctIndex: 4,
    detail: 'Continue logging custody until the matter is fully resolved (internal action, legal proceeding, or law enforcement handoff) — the chain cannot have gaps.',
  },
  {
    id: 'document',
    label: 'Document the chain of custody',
    correctIndex: 3,
    detail: 'Record who handled the evidence, when, and why for every single transfer — a broken chain of custody can make evidence inadmissible.',
  },
  {
    id: 'report',
    label: 'Report through proper channels',
    correctIndex: 1,
    detail: 'Escalate to a supervisor, legal, or law enforcement as your organization\'s policy requires — do not investigate further or act unilaterally.',
  },
]

export default function IncidentResponseSequence() {
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
        <h3 className="font-display text-lg text-ink">Incident Response & Chain of Custody</h3>
        <p className="text-sm text-soft">
          Domain 4.6 — use the arrows to order the first-response steps for handling prohibited content or activity, then check.
        </p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const it = ITEMS.find((x) => x.id === id)!
          return (
            <div key={id} className="rounded-crisp border border-line bg-surface px-3 py-2">
              <div className="flex items-center gap-2">
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
              {checked && <p className="text-xs text-soft mt-1 pl-7">{it.detail}</p>}
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
          {isCorrect ? 'Correct — identify, report, preserve, document, then track through disposition.' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: a technician's job is to identify, report, and preserve — never to personally investigate or
        decide the outcome. Acting outside proper channels can break the chain of custody and jeopardize any later
        legal action.
      </div>
    </div>
  )
}
