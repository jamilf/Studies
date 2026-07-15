import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  {
    x: 30,
    y: 110,
    label: 'Finding generated',
    detail:
      'GuardDuty detects, for example, UnauthorizedAccess:EC2/TorIPCaller and publishes the finding to EventBridge as a native AWS service event — no extra logging setup required.',
  },
  {
    x: 170,
    y: 40,
    label: 'EventBridge rule matches',
    detail:
      'A custom EventBridge rule with an event pattern matching GuardDuty findings (optionally filtered by severity or finding type) routes the event to a target — most commonly a Lambda function.',
  },
  {
    x: 310,
    y: 110,
    label: 'Lambda evaluates and acts',
    detail:
      "The Lambda function inspects the finding detail (resource, severity, finding type) and calls AWS APIs to remediate — e.g. attaching a no-egress \"quarantine\" security group or revoking a compromised instance's temporary credentials.",
  },
  {
    x: 450,
    y: 40,
    label: 'Evidence preserved',
    detail:
      'Instead of terminating the resource outright, the function isolates it and snapshots its EBS volume(s) first, preserving forensic evidence for the investigation.',
  },
  {
    x: 530,
    y: 110,
    label: 'Team notified',
    detail:
      'The function (or a second EventBridge target) publishes to SNS or opens a ticket so the security team knows a finding triggered an automated action and can follow up.',
  },
]

export default function AutomatedRemediationFlowTrace() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1600)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Automated Remediation: EventBridge + Lambda</h3>
          <p className="text-sm text-soft">Domain 1.3 — watch a GuardDuty finding travel through an automated response pipeline.</p>
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
        <svg viewBox="0 0 570 160" className="w-full h-40" aria-hidden>
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
          <circle cx={w.x} cy={w.y} r="9" className="fill-none stroke-accent transition-all duration-700 ease-out" strokeWidth="2.5" />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This EventBridge-rule-plus-Lambda pattern is the standard exam answer for "automatically respond to a
        finding without human intervention" — it decouples detection (GuardDuty/Security Hub) from response
        (Lambda), so you can add or change remediation logic without touching the detection service at all.
      </div>
    </div>
  )
}
