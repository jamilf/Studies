import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  { title: 'Reconstruct the Timeline', detail: 'Walk through the incident minute by minute using logs, tickets, and chat transcripts — agree on one factual sequence of events before anyone assigns blame.' },
  { title: 'Discuss Root Cause', detail: 'Present the root cause analysis findings (5 Whys, fishbone, or fault tree) and confirm the group agrees on what actually let this happen.' },
  { title: 'Evaluate Response Effectiveness', detail: 'Review what worked (fast detection, clean containment) and what didn\'t (slow escalation, missing runbook step) without turning it into a blame session.' },
  { title: 'Identify Gaps & Improvements', detail: 'Capture concrete gaps — a missing detection rule, an outdated contact list, a playbook step nobody followed — as candidate action items.' },
  { title: 'Assign Action Items', detail: 'Every gap becomes a ticket with a named owner and a due date; "we should probably" items that don\'t get an owner rarely get done.' },
  { title: 'Finalize & Distribute the Report', detail: 'Publish the incident summary report (with any IOC updates) to the IR plan owner, affected teams, and leadership, and feed changes back into the playbooks.' },
]

export default function PostIncidentReviewAgenda() {
  const [active, setActive] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)

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
          <h3 className="font-display text-lg text-ink">Post-Incident Review Meeting</h3>
          <p className="text-sm text-soft">Domain 4.2 — step through the agenda a lessons-learned meeting should follow.</p>
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
              <span className={`text-[10px] text-center leading-tight transition-colors ${i === active ? 'text-ink' : 'text-faint group-hover:text-soft'}`}>
                {s.title}
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
        The point of this meeting is blameless improvement — it closes the loop from Post-Incident Activity back
        into Preparation, so the next responder inherits a better playbook instead of relearning the same lesson.
      </div>
    </div>
  )
}
