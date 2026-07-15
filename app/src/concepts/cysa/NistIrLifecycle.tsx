import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  { title: 'Preparation', detail: 'Build the IR plan and playbooks, staff and tool the team (forensic workstations, IR jump bag), train responders, maintain contact lists, and harden systems — all before an incident occurs.' },
  { title: 'Detection & Analysis', detail: 'Identify precursors/indicators via SIEM alerts, IDS/IPS, or user reports; validate the alert, determine scope and impact, and categorize/prioritize the incident.' },
  { title: 'Containment, Eradication & Recovery', detail: 'Contain (short-term isolate, long-term patch/rebuild), eradicate (remove malware, disable compromised accounts, close the vulnerability), and recover (restore to production while monitoring for reinfection).' },
  { title: 'Post-Incident Activity', detail: 'Hold a lessons-learned meeting, perform root cause analysis, update playbooks/controls, and file the formal report.' },
]

export default function NistIrLifecycle() {
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
          <h3 className="font-display text-lg text-ink">NIST SP 800-61 Incident Response Lifecycle</h3>
          <p className="text-sm text-soft">Domain 3.2 — step through the four phases of the NIST incident response lifecycle.</p>
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
        NIST 800-61's cycle is a loop, not a line — post-incident findings feed back into Preparation, which is why
        "lessons learned" is tested as a required step, not an optional nicety.
      </div>
    </div>
  )
}
