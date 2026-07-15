import { useEffect, useState } from 'react'

interface Step {
  title: string
  phase: 'Before' | 'During' | 'After'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Preparation', phase: 'Before', detail: 'Build the program before an incident happens: an IR plan, playbooks, a trained team, tooling (EDR/SIEM), contact lists, and tested backups.' },
  { title: 'Detection & Analysis', phase: 'During', detail: 'Identify that an incident is actually occurring, validate it\'s not a false positive, determine scope and severity, and begin documentation — chain of custody starts here.' },
  { title: 'Containment', phase: 'During', detail: 'Stop the incident from spreading: short-term containment (isolate a host, disable an account) versus long-term containment (patch, rebuild in an isolated segment).' },
  { title: 'Eradication', phase: 'During', detail: 'Remove the root cause — malware, backdoors, compromised accounts, or the vulnerable configuration that allowed entry.' },
  { title: 'Recovery', phase: 'During', detail: 'Restore affected systems to normal production operation, validate they\'re clean, and monitor closely for recurrence before fully trusting them again.' },
  { title: 'Lessons Learned', phase: 'After', detail: 'Conduct an after-action review, update playbooks and controls based on what was learned, and document root cause for future prevention.' },
]

const PHASE_COLOR: Record<Step['phase'], string> = {
  Before: 'bg-accent text-paper',
  During: 'bg-warn text-paper',
  After: 'bg-good text-paper',
}

export default function IrProcessTimeline() {
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
          <h3 className="font-display text-lg text-ink">Incident Response Process</h3>
          <p className="text-sm text-soft">Domain 4.8 — step through the six-stage incident response lifecycle.</p>
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
                  i <= active ? PHASE_COLOR[s.phase] : 'bg-wash text-faint'
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
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${PHASE_COLOR[STEPS[active].phase]}`}>
            {STEPS[active].phase}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This is a cycle, not a one-way line — lessons learned feeds back into preparation for the next incident.
      </div>
    </div>
  )
}
