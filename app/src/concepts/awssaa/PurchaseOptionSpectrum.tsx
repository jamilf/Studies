import { useState } from 'react'

interface Tier {
  name: string
  discount: number
  commitment: number
  interruption: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'On-Demand', discount: 1, commitment: 1, interruption: 1, desc: 'No commitment, highest per-hour cost, full flexibility to start and stop anytime.' },
  { name: 'Savings Plans / Reserved', discount: 4, commitment: 4, interruption: 1, desc: 'A 1-3 year commitment in exchange for up to ~72% off On-Demand pricing — less flexibility, but predictable steady-state workloads benefit most.' },
  { name: 'Spot Instances', discount: 5, commitment: 1, interruption: 5, desc: 'Up to ~90% off On-Demand, but capacity can be reclaimed with a 2-minute warning — best for fault-tolerant, flexible, or stateless workloads.' },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function PurchaseOptionSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">EC2 Purchase Option Spectrum</h3>
        <p className="text-sm text-soft">Domain 4.1 — slide across purchase options to see how discount, commitment, and interruption risk trade off.</p>
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
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Relative discount</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.discount ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Commitment</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.commitment ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Interruption risk</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.interruption ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Match the purchase option to the workload's tolerance for interruption and predictability — steady-state
        production fits Savings Plans, fault-tolerant batch/big-data jobs fit Spot.
      </div>
    </div>
  )
}
