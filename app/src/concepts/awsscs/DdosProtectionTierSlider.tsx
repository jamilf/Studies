import { useState } from 'react'

interface Tier {
  name: string
  description: string
  cost: number
  layer7Coverage: number
  drtAccess: number
}

const TIERS: Tier[] = [
  {
    name: 'Shield Standard',
    description:
      'Automatic protection included at no extra cost for every AWS customer, defending against the most common, frequently occurring network/transport layer (L3/L4) DDoS attacks like SYN floods and reflection attacks.',
    cost: 1,
    layer7Coverage: 1,
    drtAccess: 0,
  },
  {
    name: 'Shield Advanced',
    description:
      'A paid subscription that adds enhanced L3/L4 and application-layer detection tuned to your resources, near-real-time attack visibility and metrics, and cost protection (SLA credits) for scaling charges incurred during an attack.',
    cost: 4,
    layer7Coverage: 3,
    drtAccess: 2,
  },
  {
    name: 'Shield Advanced + WAF',
    description:
      'Combines Shield Advanced with AWS WAF Web ACLs on the protected resource (at no extra WAF cost when associated for DDoS protection) to add Layer 7 mitigation via rate-based and custom rules.',
    cost: 5,
    layer7Coverage: 5,
    drtAccess: 3,
  },
  {
    name: 'Shield Advanced + DRT engagement',
    description:
      'Grants the account 24/7 access to the AWS DDoS Response Team (DRT) for direct incident support, including proactive engagement and custom mitigations during high-severity events.',
    cost: 5,
    layer7Coverage: 5,
    drtAccess: 6,
  },
  {
    name: 'Full edge stack',
    description:
      'Shield Advanced plus routing traffic through CloudFront, Route 53, and/or Global Accelerator maximizes distributed absorption capacity at the edge and unlocks the broadest set of Shield Advanced protections and automatic application-layer mitigations.',
    cost: 6,
    layer7Coverage: 6,
    drtAccess: 6,
  },
]

const HEAT_CLASS: Record<number, string> = {
  0: 'bg-heat-1 text-ink',
  1: 'bg-heat-1 text-ink',
  2: 'bg-heat-2 text-ink',
  3: 'bg-heat-3 text-ink',
  4: 'bg-heat-4 text-paper',
  5: 'bg-heat-5 text-paper',
  6: 'bg-heat-6 text-paper',
}

function Meter({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-crisp border border-line bg-surface px-3 py-2">
      <p className="text-xs text-soft mb-1">{label}</p>
      <div className="h-2 w-full rounded-crisp bg-wash overflow-hidden">
        <div className={`h-full transition-all duration-500 ${HEAT_CLASS[value]}`} style={{ width: `${(value / 6) * 100}%` }} />
      </div>
    </div>
  )
}

export default function DdosProtectionTierSlider() {
  const [tierIndex, setTierIndex] = useState(1)
  const tier = TIERS[tierIndex]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">DDoS Protection Tiers: Shield Standard to Full Edge Stack</h3>
        <p className="text-sm text-soft">Domain 3.1 — slide across tiers to see how coverage, cost, and DRT access scale.</p>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={TIERS.length - 1}
          step={1}
          value={tierIndex}
          onChange={(e) => setTierIndex(Number(e.target.value))}
          className="w-full accent-accent"
        />
        <div className="flex justify-between mt-1">
          {TIERS.map((t, i) => (
            <span key={t.name} className={`text-[10px] text-center flex-1 ${i === tierIndex ? 'text-ink font-semibold' : 'text-faint'}`}>
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Meter value={tier.cost} label="Relative cost" />
        <Meter value={tier.layer7Coverage} label="Layer 7 (app) coverage" />
        <Meter value={tier.drtAccess} label="DRT engagement level" />
      </div>

      <div key={tierIndex} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{tier.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{tier.description}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Shield Standard is automatic and free for everyone — the exam tests whether you know Shield ADVANCED is
        what adds cost protection (SLA credits), DRT access, and the ability to layer WAF at no extra cost for
        Layer 7 mitigation. Routing traffic through CloudFront/Route 53/Global Accelerator maximizes what Shield
        Advanced can actually do.
      </div>
    </div>
  )
}
