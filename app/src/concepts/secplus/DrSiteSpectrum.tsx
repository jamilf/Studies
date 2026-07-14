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

export default function DrSiteSpectrum() {
  const [selected, setSelected] = useState(2)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">Disaster Recovery Site Spectrum</h3>
        <p className="text-sm text-slate-400">
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
        className="w-full accent-emerald-500"
      />
      <div className="flex justify-between text-[10px] text-slate-500 px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center transition-colors ${i === selected ? 'text-emerald-300 font-semibold' : 'hover:text-slate-300'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Stat label="Recovery Time Objective" value={t.rto} />
        <Stat label="Recovery Point Objective" value={t.rpo} />
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
          <p className="text-[11px] text-slate-500 mb-1.5">Relative cost</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded-sm transition-colors ${i < t.cost ? 'bg-emerald-500' : 'bg-slate-800'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-xl border border-slate-800 bg-slate-900 p-5 animate-[fadein_0.3s_ease-out]">
        <h4 className="font-semibold text-slate-100 mb-2">{t.name}</h4>
        <p className="text-sm text-slate-300 leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-lg border border-amber-800/50 bg-amber-950/30 p-4 text-sm text-amber-200">
        <p className="font-semibold mb-1">Exam framing</p>
        <p className="text-amber-200/80">
          Pick the CHEAPEST tier that still satisfies the RTO/RPO your BIA (Business Impact Analysis) requires. A
          24-hour MTD doesn't justify a hot site; a 15-minute MTD can't survive on a cold site.
        </p>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
      <p className="text-[11px] text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-100">{value}</p>
    </div>
  )
}
