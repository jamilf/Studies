import { useEffect, useState } from 'react'

interface Node {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
}

interface Phase {
  from: string
  to: string
  caption: string
}

const NODES: Node[] = [
  { id: 'client', x: 10, y: 70, w: 80, h: 44, label: 'Client' },
  { id: 's3', x: 130, y: 70, w: 80, h: 44, label: 'S3 Bucket' },
  { id: 'lambda', x: 250, y: 70, w: 80, h: 44, label: 'Lambda' },
  { id: 'ddb', x: 250, y: 10, w: 80, h: 44, label: 'DynamoDB' },
  { id: 'sns', x: 370, y: 70, w: 80, h: 44, label: 'SNS Topic' },
  { id: 'sub', x: 370, y: 130, w: 80, h: 44, label: 'Subscribers' },
]

const PHASES: Phase[] = [
  { from: 'client', to: 's3', caption: 'The client uploads a file to an S3 bucket with a PUT request.' },
  { from: 's3', to: 'lambda', caption: 'S3 emits an s3:ObjectCreated event notification that asynchronously invokes a Lambda function.' },
  { from: 'lambda', to: 'ddb', caption: 'Lambda processes the object (e.g., extracts metadata or resizes an image) and writes a structured record to DynamoDB.' },
  { from: 'lambda', to: 'sns', caption: 'Lambda publishes a completion message to an SNS topic once processing succeeds.' },
  { from: 'sns', to: 'sub', caption: 'SNS fans the message out to every subscriber at once — an SQS queue for further async work, an email endpoint for a human alert, and so on.' },
]

function findNode(id: string): Node {
  return NODES.find((n) => n.id === id)!
}

export default function ServerlessEventPipeline() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Serverless Event-Driven Pipeline</h3>
          <p className="text-sm text-soft">Domain 3.5 — step through a decoupled S3 → Lambda → DynamoDB → SNS ingestion pipeline.</p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 460 190" className="w-full h-48" aria-hidden>
          <defs>
            <marker id="pipeline-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
            </marker>
          </defs>
          {PHASES.map((p, i) => {
            const from = findNode(p.from)
            const to = findNode(p.to)
            const x1 = from.x + from.w / 2
            const y1 = from.y + from.h / 2
            const x2 = to.x + to.w / 2
            const y2 = to.y + to.h / 2
            const active = i <= phase
            return (
              <line
                key={`${p.from}-${p.to}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={active ? 'stroke-accent' : 'stroke-line'}
                strokeWidth={active ? 2 : 1.5}
                markerEnd={i === phase ? 'url(#pipeline-arrow)' : undefined}
              />
            )
          })}
          {NODES.map((n) => {
            const reached = PHASES.slice(0, phase + 1).some((p) => p.from === n.id || p.to === n.id)
            return (
              <g key={n.id}>
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={5} className={reached ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'} strokeWidth="1.5" />
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 4} textAnchor="middle" className={`text-[10px] font-medium ${reached ? 'fill-accent' : 'fill-soft'}`}>
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{PHASES[phase].caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Every hop here is asynchronous and decoupled — if Lambda or a downstream subscriber is briefly unavailable,
        the event source (S3, SNS) retries delivery instead of the whole pipeline failing, which is what lets each
        piece scale independently under load.
      </div>
    </div>
  )
}
