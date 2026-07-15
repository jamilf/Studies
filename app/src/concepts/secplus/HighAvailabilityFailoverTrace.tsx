import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 90, label: 'Client request', detail: 'A client sends a request that must reach a healthy application server with minimal downtime, regardless of the state of any single node.' },
  { x: 170, y: 40, label: 'Load balancer', detail: 'The load balancer distributes traffic across a cluster of nodes and continuously health-checks each one, so it always knows which nodes are actually available.' },
  { x: 300, y: 100, label: 'Active node fails', detail: 'A node stops responding to health checks — hardware failure, a crashed process, or a lost network link. In a well-designed cluster, this alone should not cause an outage.' },
  { x: 300, y: 40, label: 'Failover triggered', detail: 'The load balancer removes the failed node from rotation within seconds and routes new and in-flight requests to the remaining healthy nodes automatically.' },
  { x: 440, y: 40, label: 'Standby node serves traffic', detail: 'A standby or peer node in the cluster picks up the load. To the client, the failure is invisible or shows up as, at most, a brief retried request.' },
]

export default function HighAvailabilityFailoverTrace() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1700)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]
  const nodeFailed = step >= 2

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">High Availability Failover</h3>
          <p className="text-sm text-soft">Domain 3.4 — watch load balancing and clustering absorb a node failure.</p>
        </div>
        <button
          onClick={() => {
            if (step >= WAYPOINTS.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : step >= WAYPOINTS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[180px]">
        <svg viewBox="0 0 480 150" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => {
            const isFailedNode = i === 2
            const dotColor = isFailedNode && nodeFailed ? 'fill-bad' : i <= step ? 'fill-accent' : 'fill-line'
            return (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="6" className={`transition-colors duration-500 ${dotColor}`} />
                <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[9px] font-medium">
                  {p.label}
                </text>
              </g>
            )
          })}
          <circle cx={w.x} cy={w.y} r="9" className="fill-none stroke-accent transition-all duration-700 ease-out" strokeWidth="2.5" />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        High availability is a resilience control, not a backup strategy: clustering and load balancing protect
        against a single node or component failing, while backups and DR sites protect against loss of an entire
        site or data set. A mature architecture uses both.
      </div>
    </div>
  )
}
