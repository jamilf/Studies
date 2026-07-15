import { useEffect, useState } from 'react'

interface Step {
  title: string
  phase: 'Identify' | 'Assess' | 'Validate' | 'Prioritize'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Identify the Asset', phase: 'Identify', detail: 'Note the host, IP/hostname, operating system, and business owner. A finding is meaningless without knowing what it affects and who to route it to.' },
  { title: 'Read the Finding', phase: 'Identify', detail: 'Check the plugin/check ID and CVE reference, and read the description — it tells you what the scanner actually detected, not just a severity label.' },
  { title: 'Check CVSS & Vector String', phase: 'Assess', detail: 'The base score alone can mislead; the vector string (AV, AC, PR, UI) tells you whether this is remotely exploitable with no authentication or a low-risk local issue.' },
  { title: 'Validate: True or False Positive', phase: 'Validate', detail: 'Confirm the vulnerability actually exists — check the running version, compensating controls, or reproduce it manually. Scanners misfire on banner-only checks and outdated signatures.' },
  { title: 'Check Exploitability (EPSS / KEV)', phase: 'Assess', detail: 'Cross-reference the EPSS score and the CISA Known Exploited Vulnerabilities catalog — a lower CVSS score actively being exploited in the wild often outranks a higher score that is purely theoretical.' },
  { title: 'Assign Priority & Owner', phase: 'Prioritize', detail: 'Combine severity, exploitability, and asset criticality into a remediation SLA, and route the ticket to the system owner responsible for patching.' },
]

const PHASE_COLOR: Record<Step['phase'], string> = {
  Identify: 'bg-accent text-paper',
  Assess: 'bg-warn text-paper',
  Validate: 'bg-heat-5 text-paper',
  Prioritize: 'bg-good text-paper',
}

export default function ScanReportWalkthrough() {
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
          <h3 className="font-display text-lg text-ink">Reading a Vulnerability Scan Finding</h3>
          <p className="text-sm text-soft">Domain 2.2 — walk through how an analyst turns one raw scan finding into a prioritized ticket.</p>
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
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${PHASE_COLOR[STEPS[active].phase]}`}>{STEPS[active].phase}</span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>
      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A scan report is raw material, not a to-do list. CS0-003 expects you to validate before you remediate — acting
        on an unvalidated finding wastes effort, and ignoring one that turns out to be real leaves a real gap open.
      </div>
    </div>
  )
}
