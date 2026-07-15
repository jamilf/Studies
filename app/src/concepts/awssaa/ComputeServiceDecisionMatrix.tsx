import { useMemo, useState } from 'react'

type Overhead = 'managed' | 'control'
type Shape = 'event' | 'continuous'

interface Verdict {
  service: string
  reason: string
}

const MATRIX: Record<Overhead, Record<Shape, Verdict>> = {
  managed: {
    event: {
      service: 'AWS Lambda',
      reason: 'Fully managed and event-driven: it scales from zero to thousands of concurrent executions automatically and you pay only per invocation and duration. Best fit for short-lived (≤15 minute) handlers triggered by S3, API Gateway, SQS, or EventBridge.',
    },
    continuous: {
      service: 'Amazon ECS / EKS on AWS Fargate',
      reason: 'Fully managed containers with no EC2 instances to patch or scale — Fargate provisions the exact vCPU/memory a task needs. Ideal for long-running services (APIs, workers) where you still want zero server management.',
    },
  },
  control: {
    event: {
      service: 'Amazon ECS / EKS on EC2',
      reason: 'You still want to react to events or scale on demand, but need control over the underlying instances — custom AMIs, GPU types, kernel tuning, or licensing — so containers run on a self-managed EC2 capacity provider instead of Fargate.',
    },
    continuous: {
      service: 'Amazon EC2',
      reason: 'A long-running workload that needs full OS-level control: custom kernels, specialized licensing (e.g., BYOL), persistent local storage, or software that cannot run in a container. You manage patching, scaling, and placement yourself.',
    },
  },
}

export default function ComputeServiceDecisionMatrix() {
  const [overhead, setOverhead] = useState<Overhead>('managed')
  const [shape, setShape] = useState<Shape>('event')
  const verdict = useMemo(() => MATRIX[overhead][shape], [overhead, shape])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Compute Service Selection</h3>
        <p className="text-sm text-soft">Domain 3.2 — pick your operational preference and workload shape to see which compute service fits.</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-faint mb-1.5 uppercase tracking-wider">Operational overhead you want</p>
          <div className="flex gap-2">
            {(['managed', 'control'] as Overhead[]).map((o) => (
              <button key={o} onClick={() => setOverhead(o)} className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${overhead === o ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
                {o === 'managed' ? 'No servers to manage' : 'Full instance/OS control'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-faint mb-1.5 uppercase tracking-wider">Workload shape</p>
          <div className="flex gap-2">
            {(['event', 'continuous'] as Shape[]).map((s) => (
              <button key={s} onClick={() => setShape(s)} className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${shape === s ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
                {s === 'event' ? 'Short, event-triggered bursts' : 'Long-running / always-on'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${overhead}-${shape}`} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein">
        <p className="font-display text-lg font-semibold text-accent">{verdict.service}</p>
        <p className="text-sm text-ink mt-1 leading-relaxed">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam frequently tests this exact 2x2: how much undifferentiated heavy lifting (patching, scaling, capacity
        planning) you're willing to own versus how the workload actually runs — a quick burst reacting to an event,
        or a continuously running process.
      </div>
    </div>
  )
}
