import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  {
    x: 40,
    y: 110,
    label: 'Finding identified',
    detail: 'A control gap, breach, or violation surfaces through monitoring, an audit, or a self-assessment.',
  },
  {
    x: 150,
    y: 50,
    label: 'Internal compliance review',
    detail: 'The compliance/legal team scopes the finding, determines which regulations or contracts apply, and classifies its severity.',
  },
  {
    x: 260,
    y: 110,
    label: 'Regulatory notification',
    detail: 'If a legal deadline applies, regulators are notified within the mandated window — some breach notification laws require this within as little as 72 hours.',
  },
  {
    x: 370,
    y: 50,
    label: 'Public / customer disclosure',
    detail: 'Affected data subjects and customers are notified when required, following legal guidance on timing and required content.',
  },
  {
    x: 480,
    y: 110,
    label: 'Documentation & corrective action',
    detail: 'The response, root cause, and remediation steps are documented to close the loop and reduce the chance — and penalty — of a repeat finding.',
  },
]

export default function ComplianceReportingTrace() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1700)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Compliance Reporting Flow</h3>
          <p className="text-sm text-soft">
            Domain 5.4 — watch a finding move from internal review to external disclosure and closure.
          </p>
        </div>
        <button
          onClick={() => {
            if (step >= WAYPOINTS.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : step >= WAYPOINTS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[160px]">
        <svg viewBox="0 0 520 160" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {p.label}
              </text>
            </g>
          ))}
          <circle
            cx={w.x}
            cy={w.y}
            r="9"
            className="fill-none stroke-accent transition-all duration-700 ease-out"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Compliance reporting has both an internal track (audit committee, leadership) and an external one
        (regulators, affected individuals) — missing a mandated external notification window is itself a
        compliance failure, separate from the original finding.
      </div>
    </div>
  )
}
