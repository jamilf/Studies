import { useState } from 'react'

interface Tier {
  name: string
  assurance: number
  cost: number
  disruption: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'No plan', assurance: 1, cost: 1, disruption: 1, desc: 'No documented continuity plan exists — recovery, if it happens at all, is entirely improvised.' },
  { name: 'Documented plan only', assurance: 2, cost: 2, disruption: 1, desc: 'A plan exists on paper but has never been tested — assurance is purely theoretical.' },
  { name: 'Plan + tabletop exercise', assurance: 3, cost: 3, disruption: 1, desc: 'The team walks through the plan in a discussion-based exercise, surfacing gaps without touching production systems.' },
  { name: 'Plan + parallel test', assurance: 4, cost: 4, disruption: 3, desc: 'A parallel test brings the recovery systems online and processes real transactions alongside production, without cutting over — stronger proof, some operational effort.' },
  { name: 'Plan + full interruption test', assurance: 5, cost: 5, disruption: 5, desc: 'Production is actually failed over to the recovery environment — the strongest possible proof, but with real business risk if something goes wrong.' },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function BcpSpectrum() {
  const [selected, setSelected] = useState(1)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Business Continuity Test Maturity</h3>
        <p className="text-sm text-soft">Domain 7.13 — slide across BCP testing maturity to see how assurance, cost, and disruption trade off.</p>
      </div>

      <input type="range" min={0} max={TIERS.length - 1} step={1} value={selected} onChange={(e) => setSelected(Number(e.target.value))} className="w-full" />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button key={tier.name} onClick={() => setSelected(i)} className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`} style={{ width: `${100 / TIERS.length}%` }}>
            {tier.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Assurance level</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.assurance ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Relative cost</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.cost ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Disruption during test</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.disruption ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Pick the tier that matches the organization's risk tolerance — full interruption tests give the strongest
        proof but are used sparingly given the real business risk involved.
      </div>
    </div>
  )
}
