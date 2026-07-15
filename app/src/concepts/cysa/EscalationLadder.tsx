import { useState } from 'react'

interface Tier {
  name: string
  time: string
  detail: string
}

const TIERS: Tier[] = [
  { name: 'Tier 1 — SOC Analyst (Initial Triage)', time: 'Minutes', detail: 'Reviews the alert, rules out an obvious false positive, gathers basic context (source, asset, alert type), and decides whether to escalate per the runbook.' },
  { name: 'Tier 2 — Senior/Investigative Analyst', time: 'Within the hour', detail: 'Digs deeper: correlates with other logs and threat intel, scopes likely intent, and decides whether this meets the bar to be declared an incident.' },
  { name: 'Tier 3 / Incident Response Team', time: 'Immediate, on declaration', detail: 'Takes ownership of a confirmed incident: leads containment, eradication, and recovery, coordinating with system owners.' },
  { name: 'CIRT / Executive & Legal', time: 'Immediate, parallel track', detail: 'Engaged for major incidents (large-scale breach, regulated data exposure, business-critical outage); starts the regulatory notification clock and manages executive/legal/customer communication.' },
]

const COLOR = ['bg-heat-1', 'bg-heat-3', 'bg-heat-5', 'bg-heat-6']
const TEXT = ['text-ink', 'text-ink', 'text-paper', 'text-paper']

export default function EscalationLadder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Incident Escalation Ladder</h3>
        <p className="text-sm text-soft">Domain 4.2 — click a tier to see who owns it and how fast it must move.</p>
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
              className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${COLOR[i]} ${TEXT[i]} ${
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
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${COLOR[selected]} ${TEXT[selected]}`}>
            {TIERS[selected].time}
          </span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Escalation speed compounds with severity — the higher the tier, the smaller the time budget, because the
        blast radius (and legal exposure) grows faster than the SOC's ability to contain it manually.
      </div>
    </div>
  )
}
