import { useState } from 'react'

type SseId = 'sse-s3' | 'sse-kms' | 'sse-c'

interface Scenario {
  id: string
  question: string
  answer: SseId
}

interface SseRow {
  label: string
  value: string
}

interface SseInfo {
  id: SseId
  name: string
  tagline: string
  rows: SseRow[]
}

const SCENARIOS: Scenario[] = [
  { id: 'simple', question: '"Just encrypt it — I don\'t want to manage any keys."', answer: 'sse-s3' },
  { id: 'audit', question: '"I need a CloudTrail record of every time this key is used, and I control who can use it."', answer: 'sse-kms' },
  { id: 'ownkey', question: '"Compliance requires that AWS never stores our encryption key at all."', answer: 'sse-c' },
]

const OPTIONS: SseInfo[] = [
  {
    id: 'sse-s3',
    name: 'SSE-S3',
    tagline: 'AWS manages everything',
    rows: [
      { label: 'Key held by', value: 'AWS, fully managed' },
      { label: 'Algorithm', value: 'AES-256' },
      { label: 'Your effort', value: 'None — enabled by default' },
    ],
  },
  {
    id: 'sse-kms',
    name: 'SSE-KMS',
    tagline: 'AWS KMS-managed key, you control policy',
    rows: [
      { label: 'Key held by', value: 'AWS KMS, key policy set by you' },
      { label: 'Audit trail', value: 'Every use logged to CloudTrail' },
      { label: 'Your effort', value: 'Manage key policy, optional rotation' },
    ],
  },
  {
    id: 'sse-c',
    name: 'SSE-C',
    tagline: 'You supply the key, every request',
    rows: [
      { label: 'Key held by', value: 'You — sent with each request, never stored by AWS' },
      { label: 'Audit trail', value: 'No key usage logged by AWS (AWS never sees the key at rest)' },
      { label: 'Your effort', value: 'Highest — manage, rotate, and transmit the key yourself' },
    ],
  },
]

export default function EncryptionAtRestComparison() {
  const [scenario, setScenario] = useState<Scenario | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">S3 Server-Side Encryption: SSE-S3 vs SSE-KMS vs SSE-C</h3>
        <p className="text-sm text-soft">Domain 5.1 — same goal (encrypt at rest), three very different key-management trade-offs.</p>
      </div>

      <div className="flex flex-col gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenario(s)}
            className={`rounded-crisp border px-3 py-2 text-left text-sm transition-colors ${
              scenario?.id === s.id ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {s.question}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {OPTIONS.map((opt) => {
          const isAnswer = scenario?.answer === opt.id
          return (
            <div
              key={opt.id}
              className={`rounded-crisp border p-4 space-y-3 transition-colors ${isAnswer ? 'border-accent bg-accent-tint' : 'border-line bg-wash'}`}
            >
              <div>
                <h4 className="font-display font-semibold text-ink">{opt.name}</h4>
                <p className="text-[11px] text-faint">{opt.tagline}</p>
              </div>
              <dl className="text-xs space-y-1.5 text-ink">
                {opt.rows.map((r) => (
                  <div key={r.label}>
                    <dt className="text-soft font-sans">{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              {isAnswer && <p className="text-[11px] font-semibold text-accent">✓ Best fit</p>}
            </div>
          )
        })}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        All three encrypt the object with AES-256 at rest — the difference is entirely about who manages the key
        and what visibility/control you get. SSE-KMS is the usual answer whenever the scenario mentions auditing
        key usage or restricting who can decrypt via a key policy.
      </div>
    </div>
  )
}
