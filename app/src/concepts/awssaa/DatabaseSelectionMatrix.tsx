import { useMemo, useState } from 'react'

type Need = 'relational' | 'flexible-scale' | 'in-memory' | 'warehouse'

const NEED_LABELS: Record<Need, string> = {
  relational: 'Relational data with joins & transactions',
  'flexible-scale': 'Flexible schema at massive scale & single-digit-ms latency',
  'in-memory': 'In-memory, ultra-low-latency access',
  warehouse: 'Data warehousing & complex analytics',
}

const RECOMMENDATION: Record<Need, { service: string; reason: string }> = {
  relational: { service: 'RDS / Aurora', reason: 'Managed relational databases with full SQL support, joins, and ACID transactions — Aurora adds higher throughput and faster failover than stock RDS engines.' },
  'flexible-scale': { service: 'DynamoDB', reason: 'A fully managed NoSQL key-value/document store designed for massive scale with predictable single-digit-millisecond latency and a flexible, schema-less item structure.' },
  'in-memory': { service: 'ElastiCache', reason: 'An in-memory data store (Redis or Memcached) delivering sub-millisecond reads — used as a cache or, with Redis, a lightweight primary store.' },
  warehouse: { service: 'Redshift', reason: 'A columnar data warehouse built for complex analytical queries across huge datasets — not designed for transactional (OLTP) workloads.' },
}

export default function DatabaseSelectionMatrix() {
  const [need, setNeed] = useState<Need>('relational')
  const rec = useMemo(() => RECOMMENDATION[need], [need])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Database Selection Matrix</h3>
        <p className="text-sm text-soft">Domain 3.2 — pick a data-model need to get the recommended AWS database service.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {(Object.keys(NEED_LABELS) as Need[]).map((n) => (
          <button key={n} onClick={() => setNeed(n)} className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${need === n ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
            {NEED_LABELS[n]}
          </button>
        ))}
      </div>

      <div key={need} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein">
        <p className="font-display text-lg font-semibold text-accent">{rec.service}</p>
        <p className="text-sm text-ink mt-1">{rec.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam pattern is consistent: relational/joins → RDS or Aurora; massive-scale key-value → DynamoDB;
        analytics across huge datasets → Redshift; sub-millisecond cache → ElastiCache.
      </div>
    </div>
  )
}
