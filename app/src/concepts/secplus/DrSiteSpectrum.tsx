import { useState } from 'react'

interface Tier {
  name: string
  rto: string
  rpo: string
  cost: number // 1-5 relative scale
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Cold site',
    rto: 'Days–weeks',
    rpo: 'Days',
    cost: 1,
    desc: 'Just space, power, and cooling. You bring and configure everything from scratch when disaster strikes. Cheapest to maintain, slowest to activate.',
  },
  {
    name: 'Pilot light',
    rto: 'Tens of minutes–hours',
    rpo: 'Minutes–hours',
    cost: 2,
    desc: 'A minimal core (e.g., a database replica) runs continuously in the background. When needed, you scale the rest of the stack up around that already-running core.',
  },
  {
    name: 'Warm site',
    rto: 'Hours',
    rpo: 'Hours',
    cost: 3,
    desc: 'Equipment and infrastructure are in place and mostly configured, but data is refreshed periodically rather than continuously — some staleness on failover.',
  },
  {
    name: 'Hot site',
    rto: 'Minutes',
    rpo: 'Seconds–minutes',
    cost: 4,
    desc: 'A fully running duplicate environment with near-real-time data replication. Failover is fast, but you are paying to run two full environments constantly.',
  },
  {
    name: 'Multi-site active/active',
    rto: 'Near zero',
    rpo: 'Near zero',
    cost: 5,
    desc: 'Multiple sites actively serve production traffic simultaneously. Losing one is invisible to users. The most expensive and complex tier, reserved for the tightest RTO/RPO requirements.',
  },
]

// Cost meter fills with the heat ramp: more cost = hotter.
const COST_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function DrSiteSpectrum() {
  const [selected, setSelected] = useState(2)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Disaster Recovery Site Spectrum</h3>
        <p className="text-sm text-soft">
          Domain 3.4 — drag across the tiers to see how RTO, RPO, and cost trade off.
        </p>
      </div>

      <input
        type="range"
        min={0}
        max={TIERS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Stat label="Recovery Time Objective" value={t.rto} />
        <Stat label="Recovery Point Objective" value={t.rpo} />
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Relative cost</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded-xs transition-colors ${i < t.cost ? COST_COLOR[i] : 'bg-line/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-2">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Exam framing</p>
        <p className="text-ink">
          Pick the CHEAPEST tier that still satisfies the RTO/RPO your BIA (Business Impact Analysis) requires. A
          24-hour MTD doesn't justify a hot site; a 15-minute MTD can't survive on a cold site.
        </p>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-crisp border border-line bg-wash p-3">
      <p className="text-[11px] uppercase tracking-wider text-faint mb-1">{label}</p>
      <p className="font-mono text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}
