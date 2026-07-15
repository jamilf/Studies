import { useMemo, useState } from 'react'

type Need = 'session' | 'kv' | 'structures' | 'edge'

const NEED_LABELS: Record<Need, string> = {
  session: 'Session state that must survive across servers',
  kv: 'Sub-millisecond simple key-value lookups',
  structures: 'Complex data structures & pub-sub',
  edge: 'Static content close to global users',
}

const RECOMMENDATION: Record<Need, { service: string; reason: string }> = {
  session: { service: 'ElastiCache (Redis or Memcached)', reason: 'Externalizing session state to a shared in-memory cache lets any web server handle any request, instead of pinning users to one instance.' },
  kv: { service: 'ElastiCache Memcached', reason: 'A simple, multi-threaded in-memory cache built for fast key-value lookups with minimal overhead — no persistence or complex data types needed.' },
  structures: { service: 'ElastiCache Redis', reason: 'Redis supports rich data structures (sorted sets, hashes, lists) and pub-sub messaging, plus optional persistence — Memcached can\'t do either.' },
  edge: { service: 'Amazon CloudFront', reason: 'A CDN caches content at edge locations physically close to users, cutting latency for static (and some dynamic) content at global scale.' },
}

export default function CachingDecisionTree() {
  const [need, setNeed] = useState<Need>('session')
  const rec = useMemo(() => RECOMMENDATION[need], [need])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Caching Service Decision Tree</h3>
        <p className="text-sm text-soft">Domain 3.3 — pick a caching need to get the recommended AWS service.</p>
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
        Redis vs Memcached is a favorite exam contrast: Redis for persistence and rich data types, Memcached for pure
        speed and simplicity with multi-threading.
      </div>
    </div>
  )
}
