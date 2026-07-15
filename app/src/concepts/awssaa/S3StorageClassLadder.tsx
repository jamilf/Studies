import { useState } from 'react'

interface Tier {
  name: string
  retrieval: string
  detail: string
}

const TIERS: Tier[] = [
  { name: 'S3 Standard', retrieval: 'Milliseconds', detail: 'Frequent access, highest cost per GB, no retrieval fee — the default for actively-used data.' },
  { name: 'S3 Intelligent-Tiering', retrieval: 'Milliseconds', detail: 'Automatically moves objects between access tiers based on usage patterns, with no retrieval fees or performance impact.' },
  { name: 'S3 Standard-IA', retrieval: 'Milliseconds', detail: 'Infrequent access, lower storage cost than Standard, but a per-GB retrieval fee applies.' },
  { name: 'S3 One Zone-IA', retrieval: 'Milliseconds', detail: 'Same as Standard-IA but stored in a single Availability Zone — cheaper, but less durable against an AZ loss.' },
  { name: 'S3 Glacier Instant Retrieval', retrieval: 'Milliseconds', detail: 'Archive-priced storage with millisecond retrieval — ideal for rarely-accessed data that still needs instant access when it is.' },
  { name: 'S3 Glacier Flexible Retrieval', retrieval: 'Minutes-hours', detail: 'Cheaper archival storage where retrieval can take minutes to hours, depending on the requested retrieval speed tier.' },
  { name: 'S3 Glacier Deep Archive', retrieval: '12+ hours', detail: 'The cheapest S3 storage class, meant for data accessed once or twice a year at most, with the longest retrieval time.' },
]

const COLOR = ['bg-heat-1', 'bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']
const TEXT = ['text-ink', 'text-ink', 'text-ink', 'text-ink', 'text-paper', 'text-paper', 'text-paper']

export default function S3StorageClassLadder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">S3 Storage Class Ladder</h3>
        <p className="text-sm text-soft">Domain 4.2 — click a storage class to see its retrieval time and use case.</p>
      </div>

      <div className="flex flex-col gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`w-full text-left rounded-crisp px-4 py-2 transition-all duration-200 ${COLOR[i]} ${TEXT[i]} ${
              selected === i ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.01]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-sm">{tier.name}</span>
              <span className="font-mono text-[11px] opacity-80">{tier.retrieval}</span>
            </div>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Cost decreases and retrieval time increases as you move down the ladder — the exam tests picking the
        cheapest class that still meets the access-pattern and retrieval-time requirement in the scenario.
      </div>
    </div>
  )
}
