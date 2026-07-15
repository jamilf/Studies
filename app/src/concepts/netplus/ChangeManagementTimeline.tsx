import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Requester' | 'Change Team' | 'CAB'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Request Submitted',
    who: 'Requester',
    detail: 'A formal request for change (RFC) documents what is changing, why, which systems are affected, and the proposed timeline.',
  },
  {
    title: 'Risk & Impact Assessment',
    who: 'Change Team',
    detail: 'The team evaluates what could go wrong, who is affected, and writes a rollback/backout plan in case the change needs to be reversed.',
  },
  {
    title: 'CAB Approval',
    who: 'CAB',
    detail: 'The Change Advisory Board reviews the risk, business impact, and rollback plan, then approves, rejects, or sends the request back for revision.',
  },
  {
    title: 'Maintenance Window',
    who: 'Change Team',
    detail: 'The change is scheduled for a low-impact time and all affected stakeholders are notified in advance of the outage window.',
  },
  {
    title: 'Implementation',
    who: 'Change Team',
    detail: 'The change is executed following the approved plan, with the rollback plan ready to execute immediately if something goes wrong.',
  },
  {
    title: 'Documentation Update',
    who: 'Change Team',
    detail: 'Network diagrams, configuration backups, and the change log are updated so the documentation reflects the new state of the network.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Requester: 'bg-accent text-paper',
  'Change Team': 'bg-good text-paper',
  CAB: 'bg-warn text-paper',
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
    const t = setTimeout(() => setActive((a) => a + 1), 1800)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Network Change Management Process</h3>
          <p className="text-sm text-soft">Domain 3.1 — step through how a network change moves from request to documented reality.</p>
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
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>{STEPS[active].who}</span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Skipping the assessment or approval steps is the classic exam wrong-answer trap — an unauthorized or
        undocumented change is one of the most common causes of unplanned network outages.
      </div>
    </div>
  )
}
