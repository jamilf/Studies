import { useState } from 'react'

export default function DynamoDbPartitionKeyToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">DynamoDB Partition Key Design</h3>
        <p className="text-sm text-soft">Domain 3.3 — toggle between a low-cardinality key and a well-distributed one to see why hot partitions happen.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Before</span>
        <button onClick={() => setAfter((a) => !a)} className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>After</span>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 400 130" className="w-full h-32" aria-hidden>
          {!after ? (
            <g>
              {['P0', 'P1', 'P2'].map((label, i) => {
                const x = 30 + i * 130
                const isHot = i === 0
                return (
                  <g key={label}>
                    <rect x={x} y={20} width={100} height={90} rx={4} className={isHot ? 'fill-bad-tint stroke-bad' : 'fill-surface stroke-line'} strokeWidth="1.5" />
                    <text x={x + 50} y={45} textAnchor="middle" className={`text-[11px] font-semibold ${isHot ? 'fill-bad' : 'fill-soft'}`}>
                      Partition {label}
                    </text>
                    <text x={x + 50} y={70} textAnchor="middle" className={`text-[10px] ${isHot ? 'fill-bad' : 'fill-faint'}`}>
                      {isHot ? 'status = PENDING' : i === 1 ? 'status = SHIPPED' : 'status = DELIVERED'}
                    </text>
                    <text x={x + 50} y={95} textAnchor="middle" className={`font-mono text-[11px] font-bold ${isHot ? 'fill-bad' : 'fill-faint'}`}>
                      {isHot ? 'ALL writes →' : 'idle'}
                    </text>
                  </g>
                )
              })}
            </g>
          ) : (
            <g>
              {['P0', 'P1', 'P2', 'P3'].map((label, i) => {
                const x = 20 + i * 95
                return (
                  <g key={label}>
                    <rect x={x} y={20} width={75} height={90} rx={4} className="fill-good-tint stroke-good" strokeWidth="1.5" />
                    <text x={x + 37} y={45} textAnchor="middle" className="fill-good text-[11px] font-semibold">
                      {label}
                    </text>
                    <text x={x + 37} y={70} textAnchor="middle" className="fill-good text-[9px]">
                      CustomerId
                    </text>
                    <text x={x + 37} y={95} textAnchor="middle" className="fill-good font-mono text-[10px] font-bold">
                      ~25% each
                    </text>
                  </g>
                )
              })}
            </g>
          )}
        </svg>
      </div>

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'High-cardinality key (e.g., CustomerId)' : 'Low-cardinality key (e.g., OrderStatus)'}
        </p>
        <p className="text-sm text-ink mt-1 leading-relaxed">
          {after
            ? 'Using a high-cardinality attribute like CustomerId (or a composite CustomerId#OrderId) spreads items — and therefore read/write traffic — evenly across many partitions, so no single partition becomes a bottleneck as the table scales.'
            : 'A partition key with only a handful of possible values (like an order status) forces every item sharing a value onto the same partition. All the traffic for that value concentrates on one partition\'s throughput ceiling, causing throttling even when the table has plenty of unused overall capacity.'}
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        DynamoDB spreads data across partitions based on the hash of the partition key, and each partition has its own
        fixed throughput ceiling. When you can't avoid a low-cardinality key, a common fix is "write sharding" — append
        a random or calculated suffix to the key to fan writes out across virtual partitions.
      </div>
    </div>
  )
}
