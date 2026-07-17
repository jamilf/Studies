import { useState } from 'react'

interface Path {
  name: string
  cost: number
  latency: number
  desc: string
}

const PATHS: Path[] = [
  { name: 'Same-AZ (private IP)', cost: 1, latency: 1, desc: 'Traffic between resources in the same Availability Zone over private IPs is free — always the cheapest and fastest path when it is architecturally possible.' },
  { name: 'Cross-AZ, same region', cost: 2, latency: 2, desc: 'Traffic between AZs in the same region is billed per GB in each direction (sender and receiver both pay) — a small but easy-to-overlook cost multiplied across chatty multi-AZ architectures.' },
  { name: 'Cross-region', cost: 4, latency: 4, desc: 'Traffic leaving one AWS region for another (e.g. replication, cross-region requests) is billed per GB and typically costs more than intra-region transfer, on top of added round-trip latency.' },
  { name: 'Internet egress', cost: 5, latency: 3, desc: 'Data leaving AWS to the public internet is the most expensive tier, billed per GB with volume-based tiering (cheaper past the first 10 TB/month). Inbound data transfer from the internet is free.' },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function DataTransferCostSpectrum() {
  const [selected, setSelected] = useState(0)
  const p = PATHS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Data Transfer Cost Spectrum</h3>
        <p className="text-sm text-soft">Domain 4.3 — slide across traffic paths to see how cost and latency change as data crosses more boundaries.</p>
      </div>

      <input type="range" min={0} max={PATHS.length - 1} step={1} value={selected} onChange={(e) => setSelected(Number(e.target.value))} className="w-full" />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {PATHS.map((path, i) => (
          <button key={path.name} onClick={() => setSelected(i)} className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`} style={{ width: `${100 / PATHS.length}%` }}>
            {path.name.split(',')[0].split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Relative cost per GB</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < p.cost ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Relative latency</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < p.latency ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
      </div>

      <div key={p.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{p.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{p.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Cost-optimized designs keep chatty traffic same-AZ where possible, use VPC endpoints to avoid routing S3/DynamoDB
        traffic over the internet, and remember that data transfer IN to AWS is free — it's transfer OUT that's billed.
      </div>
    </div>
  )
}
