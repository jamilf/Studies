import { useMemo, useState } from 'react'

export default function ReadReplicaScalingCalculator() {
  const [readQps, setReadQps] = useState(4000)
  const [writeQps, setWriteQps] = useState(1000)
  const [replicaCapacity, setReplicaCapacity] = useState(1500)
  const [replicaLag, setReplicaLag] = useState(200)

  const totalQps = readQps + writeQps
  const replicasNeeded = useMemo(() => Math.max(0, Math.ceil(readQps / replicaCapacity)), [readQps, replicaCapacity])
  const readShare = useMemo(() => Math.round((readQps / totalQps) * 100), [readQps, totalQps])
  const staleness = useMemo(() => (replicaLag > 500 ? 'High' : replicaLag > 150 ? 'Moderate' : 'Low'), [replicaLag])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Read Replica Scaling Calculator</h3>
        <p className="text-sm text-soft">Domain 2.1 — adjust query load to see how many read replicas an RDS primary needs.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Slider label="Read queries / sec" value={readQps} onChange={setReadQps} min={100} max={20000} step={100} format={(n) => `${n.toLocaleString()} qps`} />
        <Slider label="Write queries / sec" value={writeQps} onChange={setWriteQps} min={50} max={5000} step={50} format={(n) => `${n.toLocaleString()} qps`} />
        <Slider label="Capacity per replica" value={replicaCapacity} onChange={setReplicaCapacity} min={500} max={5000} step={100} format={(n) => `${n.toLocaleString()} qps`} />
        <Slider label="Replication lag" value={replicaLag} onChange={setReplicaLag} min={10} max={1000} step={10} format={(n) => `${n} ms`} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <ResultCard label="Read replicas needed" value={`${replicasNeeded}`} formula="ceil(read qps ÷ capacity/replica)" accent />
        <ResultCard label="Reads as % of total traffic" value={`${readShare}%`} formula="reads ÷ (reads + writes)" />
        <ResultCard label="Read staleness risk" value={staleness} formula="based on replication lag" />
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Writes always go to the primary — replicas only offload reads. A standard RDS primary (MySQL, MariaDB,
        PostgreSQL, Oracle) supports up to 5 read replicas, while an Aurora cluster supports up to 15 low-lag
        Aurora Replicas. Because replication is asynchronous, a replica can lag behind the primary, so
        read-your-own-write scenarios still need to hit the primary directly.
      </div>
    </div>
  )
}

function Slider({ label, value, onChange, min, max, step, format }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; format: (n: number) => string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-soft">{label}</span>
        <span className="font-mono text-ink font-medium">{format(value)}</span>
      </div>
      <input type="range" aria-label="Read Replica Scaling Calculator" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  )
}

function ResultCard({ label, value, formula, accent }: { label: string; value: string; formula: string; accent?: boolean }) {
  return (
    <div className={`rounded-crisp border px-4 py-3 ${accent ? 'border-accent-line bg-accent-tint' : 'border-line bg-wash'}`}>
      <p className="text-[11px] uppercase tracking-wider text-faint mb-1">{label}</p>
      <p className="font-mono text-xl font-semibold text-ink">{value}</p>
      <p className="text-[11px] text-faint mt-1">{formula}</p>
    </div>
  )
}
