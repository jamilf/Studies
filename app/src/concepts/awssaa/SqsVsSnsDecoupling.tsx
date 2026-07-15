interface Approach {
  name: string
  model: string
  detail: string
  bullets: string[]
}

const APPROACHES: Approach[] = [
  {
    name: 'Amazon SQS',
    model: 'Point-to-point queue (pull)',
    detail: 'A message sits in the queue until a consumer polls and processes it, then explicitly deletes it.',
    bullets: [
      'One message is (by default) processed by one consumer',
      'Messages persist up to 14 days if nothing consumes them',
      'Visibility timeout hides an in-flight message from other consumers',
      'Great for buffering work between decoupled application tiers',
    ],
  },
  {
    name: 'Amazon SNS',
    model: 'Pub/sub topic (push)',
    detail: 'A published message is immediately pushed to every subscriber attached to the topic.',
    bullets: [
      'One message can fan out to many subscribers at once',
      'Subscribers include SQS queues, Lambda, HTTP(S), email, and SMS',
      'No polling — delivery is push-based and near-instant',
      'Great for broadcasting an event to multiple independent systems',
    ],
  },
]

export default function SqsVsSnsDecoupling() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">SQS vs SNS Messaging Patterns</h3>
        <p className="text-sm text-soft">Domain 2.1 — compare queue-based and topic-based decoupling.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {APPROACHES.map((a) => (
          <div key={a.name} className="rounded-crisp border border-line bg-surface p-4">
            <p className="font-display text-base font-semibold text-ink">{a.name}</p>
            <p className="text-xs text-accent font-medium mt-0.5">{a.model}</p>
            <p className="text-sm text-soft mt-2 leading-relaxed">{a.detail}</p>
            <ul className="text-xs text-soft space-y-1 mt-3">
              {a.bullets.map((b) => (
                <li key={b} className="flex gap-1.5">
                  <span className="text-accent">-</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The classic combined pattern is "fan-out": an SNS topic publishes one event, which fans out to several SQS
        queues, each buffering work for a different downstream service — durable delivery plus multi-consumer
        broadcast in one design.
      </div>
    </div>
  )
}
