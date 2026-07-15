import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Document the change proposal',
    detail:
      'Record what is changing, why, the systems affected, and the requester — this becomes the paper trail every later step references.',
  },
  {
    title: 'Scope the purpose and impact',
    detail:
      'Define exactly what the change touches and who/what could be affected if it goes wrong, including downstream systems and end users.',
  },
  {
    title: 'Risk analysis',
    detail:
      'Classify the change as low, moderate, or high risk. High-risk changes typically require more approvers and a more detailed rollback plan.',
  },
  {
    title: 'Plan for change (rollback plan)',
    detail:
      'Before anything is approved, a documented rollback/backout plan must exist — the single most tested change-management concept on the exam.',
  },
  {
    title: 'Sandbox testing',
    detail:
      'Validate the change in an isolated test environment that mirrors production as closely as possible before it ever touches live systems.',
  },
  {
    title: 'Responsible staff member / change board approval',
    detail:
      'A named responsible party (or change advisory board for larger orgs) formally signs off — nothing ships without an accountable approver.',
  },
  {
    title: 'End-user acceptance',
    detail:
      'Communicate the change to affected users ahead of time and, where applicable, get their sign-off so the change isn\'t a surprise.',
  },
]

export default function ChangeManagementTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Change Management Process</h3>
          <p className="text-sm text-soft">Domain 4.1 — step through the documented process every IT change should follow.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? 'bg-accent text-paper' : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{STEPS[active].title}</h4>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A rollback plan and a named approver are the two elements exam scenarios most often test — a change without
        either is a change that skipped the process, even if it "worked."
      </div>
    </div>
  )
}
