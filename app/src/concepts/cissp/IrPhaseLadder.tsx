import { useState } from 'react'

interface Tier {
  name: string
  detail: string
}

const TIERS: Tier[] = [
  { name: 'Detection', detail: 'Identify a possible incident via alerts, IDS/IPS, SIEM, or user reports.' },
  { name: 'Response', detail: 'Formally activate the IR process: assemble the team, classify severity, and act per plan.' },
  { name: 'Mitigation', detail: 'Contain the incident — isolate a host, disable an account, block IPs.' },
  { name: 'Reporting', detail: 'Notify stakeholders, legal, regulators, and customers per breach-notification law and policy.' },
  { name: 'Recovery', detail: 'Restore systems from clean backups, verifying the threat is fully removed before returning to production.' },
  { name: 'Remediation', detail: 'Fix the root cause — patch, reconfigure — so it can\'t recur the same way.' },
  { name: 'Lessons Learned', detail: 'Post-incident review; update the IR plan, playbooks, and controls.' },
]

const COLOR = ['bg-heat-6', 'bg-heat-5', 'bg-heat-4', 'bg-heat-4', 'bg-heat-3', 'bg-heat-2', 'bg-heat-1']
const TEXT = ['text-paper', 'text-paper', 'text-paper', 'text-paper', 'text-ink', 'text-ink', 'text-ink']

export default function IrPhaseLadder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Incident Response Phases</h3>
        <p className="text-sm text-soft">Domain 7.6 — click a phase to see what happens and how time-critical it is.</p>
      </div>

      <div className="flex flex-col gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`w-full text-left rounded-crisp px-4 py-2 transition-all duration-200 ${COLOR[i]} ${TEXT[i]} ${
              selected === i ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.01]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <span className="font-semibold text-sm">{i + 1}. {tier.name}</span>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The color ramp here tracks time-criticality of each phase, not attacker cost — Detection demands the fastest
        response, Lessons Learned is the calmest and most reflective. This maps directly to the NIST IR lifecycle as
        tested on the CISSP.
      </div>
    </div>
  )
}
