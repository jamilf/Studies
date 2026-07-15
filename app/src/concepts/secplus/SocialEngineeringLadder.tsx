import { useState } from 'react'

interface Tier {
  name: string
  scope: string
  detail: string
}

const TIERS: Tier[] = [
  { name: 'Phishing', scope: 'Mass / untargeted', detail: 'Generic email blasts sent to as many people as possible. Low effort, low customization — relies on volume rather than precision.' },
  { name: 'Spear phishing', scope: 'Targeted individual/group', detail: 'Uses personal or organizational details about a specific target to increase credibility over generic phishing.' },
  { name: 'Whaling', scope: 'Executive-targeted', detail: 'Spear phishing aimed specifically at executives or other high-value targets, often referencing real business context to seem legitimate.' },
  { name: 'Vishing', scope: 'Voice-based', detail: 'Phone-based social engineering, often impersonating IT support, a bank, or an executive — adds real-time pressure and urgency a text-based attack can\'t.' },
  { name: 'Pretexting', scope: 'Fabricated identity', detail: 'The attacker fabricates a detailed false scenario or identity — e.g. posing as an auditor or vendor — to build sustained trust before extracting information or access.' },
  { name: 'Business Email Compromise', scope: 'Highly researched', detail: 'Impersonates or compromises an executive\'s or vendor\'s email account to authorize a fraudulent wire transfer. Typically the most researched, targeted, and financially damaging form.' },
]

const COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']
const TEXT = ['text-ink', 'text-ink', 'text-ink', 'text-paper', 'text-paper', 'text-paper']

export default function SocialEngineeringLadder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Social Engineering Ladder</h3>
        <p className="text-sm text-soft">
          Domain 2.2 — click a tier to see how sophistication and targeting escalate from mass phishing to BEC.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${40 + (i / (TIERS.length - 1)) * 55}%` }}
            className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${COLOR[i]} ${TEXT[i]} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.03]' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${COLOR[selected]} ${TEXT[selected]}`}>
            {TIERS[selected].scope}
          </span>
          <h4 className="font-semibold text-ink">{TIERS[selected].name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This ladder ranks targeting and sophistication, not necessarily impact — a mass phishing campaign can still
        cause huge damage. BEC ranks highest because of the research and trust-building required per attack.
      </div>
    </div>
  )
}
