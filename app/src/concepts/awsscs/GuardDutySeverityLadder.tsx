import { useState } from 'react'

type Severity = 'high' | 'medium' | 'low'

interface Tier {
  id: Severity
  name: string
  scoreRange: string
  example: string
  action: string
}

const TIERS: Tier[] = [
  {
    id: 'high',
    name: 'High',
    scoreRange: '7.0 – 8.9',
    example:
      'Communication with a known malicious/command-and-control IP, credential exfiltration behavior (e.g. InstanceCredentialExfiltration), or cryptocurrency mining activity on an EC2 instance.',
    action:
      'Treat as likely compromise. Isolate the resource immediately (quarantine security group, revoke/rotate credentials) and begin incident response.',
  },
  {
    id: 'medium',
    name: 'Medium',
    scoreRange: '4.0 – 6.9',
    example:
      'An unusual API call pattern for the account (e.g. a user calling APIs from a Tor exit node, or an EC2 instance calling IAM APIs it has never called before).',
    action:
      "Investigate promptly — correlate with CloudTrail and recent changes. Not confirmed malicious, but worth an analyst's attention the same business day.",
  },
  {
    id: 'low',
    name: 'Low',
    scoreRange: '1.0 – 3.9',
    example:
      'Informational findings such as a port scan against an EC2 instance, or an unusual but benign protocol on a nonstandard port.',
    action:
      'Record and monitor. Often expected background noise (e.g. routine internet-wide scanning) — triage in aggregate rather than individually.',
  },
]

const TIER_COLOR: Record<Severity, string> = {
  high: 'bg-heat-6',
  medium: 'bg-heat-4',
  low: 'bg-heat-2',
}
const TIER_TEXT: Record<Severity, string> = {
  high: 'text-paper',
  medium: 'text-paper',
  low: 'text-ink',
}
const TIER_WIDTH: Record<Severity, number> = {
  high: 95,
  medium: 65,
  low: 35,
}

export default function GuardDutySeverityLadder() {
  const [selected, setSelected] = useState<Severity>('high')
  const active = TIERS.find((t) => t.id === selected) ?? TIERS[0]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">GuardDuty Finding Severity Ladder</h3>
        <p className="text-sm text-soft">
          Domain 1.1 — click a severity tier to see example findings and the expected response urgency.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelected(tier.id)}
            style={{ width: `${TIER_WIDTH[tier.id]}%` }}
            className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${TIER_COLOR[tier.id]} ${TIER_TEXT[tier.id]} ${
              tier.id === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.03]' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {tier.name} <span className="font-mono font-normal">({tier.scoreRange})</span>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${TIER_COLOR[active.id]} ${TIER_TEXT[active.id]}`}>
            {active.name} · {active.scoreRange}
          </span>
        </div>
        <p className="text-sm text-ink leading-relaxed mb-2">
          <span className="font-semibold">Example finding: </span>
          {active.example}
        </p>
        <p className="text-sm text-soft leading-relaxed">
          <span className="font-semibold text-ink">Response: </span>
          {active.action}
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        GuardDuty severity is a numeric score (1.0–8.9) bucketed into Low/Medium/High. It reflects GuardDuty's
        confidence and the potential impact of the activity — not a guarantee of compromise — so triage still
        requires correlating the finding with CloudTrail, VPC Flow Logs, and the resource's normal baseline.
      </div>
    </div>
  )
}
