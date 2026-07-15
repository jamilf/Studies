import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  {
    id: 'plan',
    label: 'Establish a plan of action to resolve the problem, then implement the solution',
    correctIndex: 3,
    detail: 'Once the cause is confirmed, decide the fix and any precautions (e.g., backing up data) before applying it.',
  },
  {
    id: 'document',
    label: 'Document findings, actions, and outcomes',
    correctIndex: 5,
    detail: 'Record the symptom, cause, and fix in a ticket or knowledge base entry — the last step, every time.',
  },
  {
    id: 'identify',
    label: 'Identify the problem',
    correctIndex: 0,
    detail: 'Gather information, question the user, identify symptoms, and determine if anything has changed recently — the starting point for every scenario.',
  },
  {
    id: 'verify',
    label: 'Verify full system functionality and implement preventive measures if applicable',
    correctIndex: 4,
    detail: 'Confirm the original symptom is gone and nothing else broke, then add safeguards so the issue does not recur.',
  },
  {
    id: 'test',
    label: 'Test the theory to determine the cause',
    correctIndex: 2,
    detail: 'Confirm or rule out the theory before touching anything else — if it is not confirmed, re-establish a new theory or escalate.',
  },
  {
    id: 'theory',
    label: 'Establish a theory of probable cause (question the obvious)',
    correctIndex: 1,
    detail: 'Start with the simplest, most likely explanation before chasing rare edge cases.',
  },
]

export default function TroubleshootingMethodologySequence() {
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
        <h3 className="font-display text-lg text-ink">General Troubleshooting Methodology</h3>
        <p className="text-sm text-soft">
          Domain 3.0 — use the arrows to put CompTIA's six troubleshooting steps in the correct order, then check.
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
          {isCorrect ? 'Correct — that is the six-step methodology in order.' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This six-step methodology sits above every symptom-specific scenario in Domain 3 — the exam expects you to
        recognize which step a scenario describes even when the specific technology changes.
      </div>
    </div>
  )
}
