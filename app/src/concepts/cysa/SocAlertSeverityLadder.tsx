import { useState } from 'react'

interface Tier {
  name: string
  sla: string
  detail: string
}

// Bottom (informational, lowest urgency) to top (critical, page-someone-now urgency).
const TIERS: Tier[] = [
  {
    name: 'Informational',
    sla: 'No SLA — logged for context only',
    detail:
      'Expected/benign activity worth recording but not acting on: a successful admin login from a known IP, a routine vulnerability scan kicking off, a service restart. Analysts triage these in bulk during downtime, never interrupt a shift for one.',
  },
  {
    name: 'Low',
    sla: 'Review within 1 business day',
    detail:
      'Minor policy violations or noisy-but-low-risk signals: a single failed login, a blocked port scan from an external IP, an expired certificate warning. Gets queued and reviewed in the next triage pass — no immediate response required.',
  },
  {
    name: 'Medium',
    sla: 'Triage within 4 hours',
    detail:
      'Suspicious activity that could indicate early-stage compromise but lacks confirmation: a user account with several failed logins followed by success, a workstation reaching out to a newly-registered domain, malware detected and auto-quarantined by EDR with no lateral spread. An analyst must investigate the same shift.',
  },
  {
    name: 'High',
    sla: 'Respond within 1 hour',
    detail:
      'Strong indicators of active compromise: confirmed malware execution, credential dumping tool signatures (e.g., Mimikatz), lateral movement between hosts, or a phishing click followed by C2 beaconing. Triggers incident response procedures and likely escalation to Tier 2/3.',
  },
  {
    name: 'Critical',
    sla: 'Immediate response (minutes, page on-call)',
    detail:
      'Active, high-impact compromise in progress: ransomware encryption activity, confirmed data exfiltration, domain admin account compromise, or a critical production system down due to an attack. Pages the on-call responder immediately and often triggers executive/CIRT notification per the incident response plan.',
  },
]

const SEV_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-5', 'bg-heat-6']
const SEV_TEXT = ['text-ink', 'text-ink', 'text-ink', 'text-paper', 'text-paper']

export default function SocAlertSeverityLadder() {
  const [selected, setSelected] = useState(2)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">SOC Alert Severity Ladder</h3>
        <p className="text-sm text-soft">
          Domain 1.1 — click a severity tier to see its typical triage SLA and what drives an alert into that tier.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {[...TIERS].reverse().map((tier, revIdx) => {
          const i = TIERS.length - 1 - revIdx
          const widthPct = 40 + (i / (TIERS.length - 1)) * 55
          return (
            <button
              key={tier.name}
              onClick={() => setSelected(i)}
              style={{ width: `${widthPct}%` }}
              className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${SEV_COLOR[i]} ${SEV_TEXT[i]} ${
                i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.03]' : 'opacity-80 hover:opacity-100'
              }`}
            >
              {tier.name}
            </button>
          )
        })}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${SEV_COLOR[selected]} ${SEV_TEXT[selected]}`}>
            {TIERS[selected].sla}
          </span>
          <h4 className="font-semibold text-ink">{TIERS[selected].name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Severity is not the same as priority — priority also weighs asset criticality. A "high" severity alert on a
        disposable test VM may be triaged after a "medium" alert on a domain controller. CS0-003 expects you to know
        that SLAs shrink as severity rises, and that consistent tiering is what keeps a SOC from drowning in alert
        fatigue.
      </div>
    </div>
  )
}
