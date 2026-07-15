import { useState } from 'react'

interface Tier {
  name: string
  detail: string
}

const TIERS: Tier[] = [
  { name: 'Public', detail: 'No confidentiality impact — freely shared, no encryption or access-control mandate.' },
  { name: 'Internal Use', detail: 'Not for public release — employee/contractor access only, no encryption mandate.' },
  { name: 'Confidential', detail: 'Real business harm if disclosed — requires encryption at rest and in transit, need-to-know access, and audited access.' },
  { name: 'Restricted / Top Secret', detail: 'Severe or grave damage if disclosed — strong encryption, formal need-to-know authorization, and secure destruction (cross-cut shred, degauss, or incinerate).' },
]

const COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-4', 'bg-heat-6']
const TEXT = ['text-ink', 'text-ink', 'text-paper', 'text-paper']

export default function DataClassificationLadder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Data Classification Ladder</h3>
        <p className="text-sm text-soft">Domain 2.1 — click a tier to see how handling requirements escalate with classification.</p>
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
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Classification level drives handling requirements — encryption strength, access granularity, destruction
        method — linking asset classification (2.1) directly to handling requirements (2.2).
      </div>
    </div>
  )
}
