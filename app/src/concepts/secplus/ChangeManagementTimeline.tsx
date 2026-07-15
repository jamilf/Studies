import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Requester' | 'Change Analyst' | 'Change Advisory Board'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Request submitted (RFC)',
    who: 'Requester',
    detail: 'A formal Request for Change documents what is changing, why, which systems are affected, and the proposed schedule — the starting point for governance and an audit trail.',
  },
  {
    title: 'Impact and risk analysis',
    who: 'Change Analyst',
    detail: 'Technical impact, dependencies, and risk level are assessed before anything is touched. A rushed or unreviewed change is one of the most common causes of unplanned outages.',
  },
  {
    title: 'Backout plan defined',
    who: 'Change Analyst',
    detail: 'A tested rollback procedure must exist before implementation begins — if the change fails, the team needs a documented way back to the last known-good state.',
  },
  {
    title: 'CAB review and approval',
    who: 'Change Advisory Board',
    detail: 'The Change Advisory Board reviews risk, scheduling conflicts, and business impact, then formally approves, rejects, or sends the request back for revision.',
  },
  {
    title: 'Maintenance window implementation',
    who: 'Change Analyst',
    detail: 'The approved change is implemented inside a scheduled maintenance window, minimizing disruption to normal business operations.',
  },
  {
    title: 'Documentation and post-review',
    who: 'Change Analyst',
    detail: 'The CMDB and system documentation are updated, and a post-implementation review confirms the change achieved its intended effect without introducing new risk.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Requester: 'bg-accent text-paper',
  'Change Analyst': 'bg-warn text-paper',
  'Change Advisory Board': 'bg-good text-paper',
}

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
          <p className="text-sm text-soft">Domain 1.3 — step through a well-governed change from request to review.</p>
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
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>
            {STEPS[active].who}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Change management is a security control in its own right: an unreviewed, undocumented change is a common
        root cause of both outages and new vulnerabilities. The CAB, backout plan, and maintenance window exist to
        make change predictable and reversible.
      </div>
    </div>
  )
}
