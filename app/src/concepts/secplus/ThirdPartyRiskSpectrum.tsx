import { useState } from 'react'

interface Tier {
  name: string
  assurance: number
  cost: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'No due diligence', assurance: 1, cost: 1, desc: 'The vendor is used with no formal vetting — risk is entirely unknown and unmanaged.' },
  { name: 'Right-to-audit clause only', assurance: 2, cost: 2, desc: 'The contract includes the legal right to audit the vendor, but no audit has actually been performed yet — assurance is purely contractual and theoretical.' },
  { name: 'Vendor questionnaire / self-assessment', assurance: 3, cost: 3, desc: 'The vendor fills out a security questionnaire (e.g., a SIG) describing their own controls — better than nothing, but self-reported and unverified.' },
  { name: 'Independent security assessment', assurance: 4, cost: 4, desc: 'A third party (or the customer) actively tests or audits the vendor\'s environment — verified, point-in-time assurance.' },
  { name: 'Continuous monitoring + SLA', assurance: 5, cost: 5, desc: 'Ongoing automated/contractual monitoring of the vendor\'s security posture combined with an SLA carrying enforceable financial penalties for failures — the highest assurance and lowest information latency.' },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function ThirdPartyRiskSpectrum() {
  const [selected, setSelected] = useState(2)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Third-Party Risk Management Spectrum</h3>
        <p className="text-sm text-soft">Domain 5.4 — drag across the tiers to see how vendor oversight rigor trades off with cost.</p>
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

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Assurance level</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.assurance ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Relative cost/effort</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.cost ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Exam framing</p>
        <p className="text-ink">
          Third-party risk never reaches zero — the goal is matching the rigor of oversight to how much risk that
          vendor relationship introduces. A payroll processor handling PII needs far more scrutiny than a
          stationery supplier.
        </p>
      </div>
    </div>
  )
}
