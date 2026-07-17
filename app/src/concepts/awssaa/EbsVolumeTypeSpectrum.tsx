import { useState } from 'react'

interface Tier {
  name: string
  iops: number
  throughput: number
  cost: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'sc1 (Cold HDD)', iops: 1, throughput: 2, cost: 1, desc: 'The cheapest EBS volume type, meant for large, sequential, infrequently-accessed cold data. Cannot be a boot volume and has the lowest IOPS ceiling of any EBS type.' },
  { name: 'st1 (Throughput Optimized HDD)', iops: 1, throughput: 3, cost: 2, desc: 'Low-cost HDD tuned for throughput over IOPS — big data, data warehouses, and log processing that stream large sequential reads/writes. Also cannot be a boot volume.' },
  { name: 'gp3 (General Purpose SSD)', iops: 4, throughput: 3, cost: 3, desc: 'The default choice for most workloads: a flat 3,000 IOPS and 125 MiB/s baseline included regardless of size, with IOPS and throughput provisionable independently of capacity — and cheaper per GB than gp2.' },
  { name: 'io2 Block Express (Provisioned IOPS SSD)', iops: 5, throughput: 5, cost: 5, desc: 'The highest-performance EBS volume, provisioning up to 256,000 IOPS and 4,000 MB/s with sub-millisecond latency and 99.999% durability — built for the most demanding, latency-sensitive relational and NoSQL databases.' },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function EbsVolumeTypeSpectrum() {
  const [selected, setSelected] = useState(2)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">EBS Volume Type Spectrum</h3>
        <p className="text-sm text-soft">Domain 3.1 — slide across EBS volume types to compare IOPS, throughput, and relative cost.</p>
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
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Max IOPS</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.iops ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Throughput</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.throughput ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Relative $/GB cost</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.cost ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        HDD types (st1, sc1) are priced and rated by throughput, not IOPS, and can never be a boot volume — the exam
        loves catching that detail. SSD types (gp3, io2) are what you reach for when a workload needs consistent
        low-latency random I/O, like a boot volume or a database.
      </div>
    </div>
  )
}
