import { useState } from 'react'

interface Tier {
  name: string
  customer: number
  aws: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'On-premises', customer: 5, aws: 1, desc: 'Customer manages everything — hardware, OS, network, applications, and data.' },
  { name: 'IaaS (EC2)', customer: 4, aws: 2, desc: 'AWS manages the physical infrastructure and hypervisor. Customer manages the guest OS, patching, applications, and data.' },
  { name: 'PaaS (RDS)', customer: 3, aws: 3, desc: 'AWS manages the OS and database engine. Customer manages schema, queries, IAM access, and data.' },
  { name: 'SaaS', customer: 1, aws: 5, desc: 'AWS (or the SaaS vendor) manages nearly everything. Customer manages user access and the data they put in.' },
]

export default function SharedResponsibilitySpectrum() {
  const [selected, setSelected] = useState(1)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Shared Responsibility Spectrum</h3>
        <p className="text-sm text-soft">Domain 1.1 — drag across service models to see the line move between what you manage and what AWS manages.</p>
      </div>

      <input type="range" min={0} max={TIERS.length - 1} step={1} value={selected} onChange={(e) => setSelected(Number(e.target.value))} className="w-full" />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button key={tier.name} onClick={() => setSelected(i)} className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`} style={{ width: `${100 / TIERS.length}%` }}>
            {tier.name}
          </button>
        ))}
      </div>

      <div className="rounded-crisp border border-line bg-wash p-3">
        <div className="flex h-6 rounded-crisp overflow-hidden">
          <div className="bg-accent flex items-center justify-center text-[10px] text-paper font-semibold transition-all duration-300" style={{ width: `${(t.customer / 6) * 100}%` }}>
            Customer
          </div>
          <div className="bg-good flex items-center justify-center text-[10px] text-paper font-semibold transition-all duration-300" style={{ width: `${(t.aws / 6) * 100}%` }}>
            AWS
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The customer always keeps responsibility for their data, identity configuration, and client-side settings —
        AWS takes over more of the OS and platform layer as you move from IaaS toward SaaS.
      </div>
    </div>
  )
}
