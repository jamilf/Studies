import { useState } from 'react'

interface Tier {
  name: string
  consistency: number // 1-5
  agility: number // 1-5
  localFit: number // 1-5
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Fully centralized',
    consistency: 5,
    agility: 1,
    localFit: 1,
    desc: 'A single enterprise security governance board — often chaired by the CISO and reporting to the board of directors — sets policy, standards, and risk appetite for every business unit. Maximizes consistency but can be slow to adapt.',
  },
  {
    name: 'Centralized, regional input',
    consistency: 4,
    agility: 2,
    localFit: 2,
    desc: 'Core policy still comes from the top, but regional or business-unit committees can request documented exceptions — a common middle ground for multinational organizations facing different local regulations.',
  },
  {
    name: 'Federated / hybrid',
    consistency: 3,
    agility: 3,
    localFit: 4,
    desc: 'Business units own and tailor their own policies and standards, but must operate within guardrails set by a central governance committee that coordinates and audits them. Most large enterprises converge here.',
  },
  {
    name: 'Fully decentralized',
    consistency: 1,
    agility: 5,
    localFit: 5,
    desc: 'Each subsidiary or business unit runs an independent security governance program with its own policies and risk decisions — fast and locally optimized, but produces inconsistent controls and hard-to-aggregate risk reporting.',
  },
]

const METER_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-crisp border border-line bg-wash p-3">
      <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">{label}</p>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < value ? METER_COLOR[i] : 'bg-line/50'}`} />
        ))}
      </div>
    </div>
  )
}

export default function GovernanceModelSpectrum() {
  const [selected, setSelected] = useState(2)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Governance Model Spectrum</h3>
        <p className="text-sm text-soft">
          Domain 5.1 — drag across the tiers to see how centralized and decentralized governance trade off.
        </p>
      </div>

      <input
        type="range" aria-label="Governance Model Spectrum"
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
        <Meter label="Decision consistency" value={t.consistency} />
        <Meter label="Response agility" value={t.agility} />
        <Meter label="Local context fit" value={t.localFit} />
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-2">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Effective governance runs through named structures — boards, committees, and external government entities —
        not just documents. The exam expects you to recognize that a governance structure's shape (centralized vs.
        decentralized) is itself a risk decision, trading consistency for speed and local fit.
      </div>
    </div>
  )
}
