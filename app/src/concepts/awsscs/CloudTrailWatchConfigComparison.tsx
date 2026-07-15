import { useState } from 'react'

type ServiceId = 'cloudtrail' | 'cloudwatch' | 'config'

interface Scenario {
  id: string
  question: string
  answer: ServiceId
}

interface ServiceRow {
  label: string
  value: string
}

interface ServiceInfo {
  id: ServiceId
  name: string
  tagline: string
  rows: ServiceRow[]
}

const SCENARIOS: Scenario[] = [
  { id: 'who', question: '"Who deleted this S3 bucket, and when?"', answer: 'cloudtrail' },
  { id: 'cpu', question: '"CPU utilization on this instance just spiked — alarm the on-call team."', answer: 'cloudwatch' },
  { id: 'drift', question: '"Was this security group ever changed to allow 0.0.0.0/0, and is it still non-compliant?"', answer: 'config' },
]

const SERVICES: ServiceInfo[] = [
  {
    id: 'cloudtrail',
    name: 'CloudTrail',
    tagline: 'Who did what API call, and when',
    rows: [
      { label: 'Records', value: 'Every API call (management + optional data events)' },
      { label: 'Answers', value: 'Identity, source IP, request/response for an action' },
      { label: 'Use for', value: 'Auditing, forensics, "who did this"' },
    ],
  },
  {
    id: 'cloudwatch',
    name: 'CloudWatch',
    tagline: 'Metrics, logs, and alarms',
    rows: [
      { label: 'Records', value: 'Metrics (CPU, latency...), log streams, custom metrics' },
      { label: 'Answers', value: 'Is the system healthy right now, and should someone be paged' },
      { label: 'Use for', value: 'Operational monitoring, alarming, dashboards' },
    ],
  },
  {
    id: 'config',
    name: 'AWS Config',
    tagline: 'Configuration state over time',
    rows: [
      { label: 'Records', value: 'Point-in-time resource configuration + change history' },
      { label: 'Answers', value: 'What did this resource look like, and is it compliant with a rule' },
      { label: 'Use for', value: 'Drift detection, compliance evaluation, change timelines' },
    ],
  },
]

export default function CloudTrailWatchConfigComparison() {
  const [scenario, setScenario] = useState<Scenario | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">CloudTrail vs CloudWatch vs AWS Config</h3>
        <p className="text-sm text-soft">
          Domain 2.1 — three different questions about your account, three different tools. Pick a question to see which service answers it.
        </p>
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
        {SERVICES.map((svc) => {
          const isAnswer = scenario?.answer === svc.id
          return (
            <div
              key={svc.id}
              className={`rounded-crisp border p-4 space-y-3 transition-colors ${
                isAnswer ? 'border-accent bg-accent-tint' : 'border-line bg-wash'
              }`}
            >
              <div>
                <h4 className="font-display font-semibold text-ink">{svc.name}</h4>
                <p className="text-[11px] text-faint">{svc.tagline}</p>
              </div>
              <dl className="text-xs space-y-1.5 text-ink">
                {svc.rows.map((r) => (
                  <div key={r.label}>
                    <dt className="text-soft font-sans">{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              {isAnswer && <p className="text-[11px] font-semibold text-accent">✓ Answers this question</p>}
            </div>
          )
        })}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        They stack, not compete: CloudTrail is the audit log of API activity, CloudWatch is the operational
        heartbeat (metrics/alarms), and Config is the configuration-and-compliance history. A full investigation
        often pulls from all three.
      </div>
    </div>
  )
}
