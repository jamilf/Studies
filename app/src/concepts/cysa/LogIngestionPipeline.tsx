import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 120, label: 'Log Sources', detail: 'Endpoints, servers, network devices, and applications generate raw events — Windows Event Log, syslog, firewall logs, and cloud API logs.' },
  { x: 130, y: 50, label: 'Collector / Forwarder', detail: 'A lightweight agent or syslog listener picks up events at the source and ships them onward, buffering locally if the pipeline is briefly unavailable.' },
  { x: 220, y: 120, label: 'Normalization', detail: 'Raw, inconsistent formats are parsed into a common schema (CEF, LEEF, or vendor-specific) and timestamps are aligned to a single time source.' },
  { x: 310, y: 50, label: 'Enrichment', detail: 'Events are tagged with context — GeoIP, asset ownership, user identity, and threat-intel indicators — so an analyst does not look it up manually later.' },
  { x: 400, y: 120, label: 'SIEM Index / Storage', detail: 'Normalized, enriched events are indexed for fast search and retained per policy — often 90 days hot, a year or more cold for compliance.' },
  { x: 480, y: 50, label: 'Correlation & Alerting', detail: 'Correlation rules and analytics run across the indexed data; events matching a detection pattern generate an alert for triage.' },
]

export default function LogIngestionPipeline() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1600)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Log Ingestion Pipeline</h3>
          <p className="text-sm text-soft">Domain 1.1 — watch a raw event travel from source to a correlated alert.</p>
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
      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[170px]">
        <svg viewBox="0 0 520 160" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[9px] font-medium">
                {p.label}
              </text>
            </g>
          ))}
          <circle
            cx={w.x}
            cy={w.y}
            r="9"
            className="fill-none stroke-accent transition-all duration-700 ease-out"
            strokeWidth="2.5"
          />
        </svg>
      </div>
      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>
      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Every stage here is a place things can silently break — a misconfigured collector drops events before they
        ever reach the SIEM, and unsynchronized clocks make correlation across sources unreliable even when the data
        itself arrived intact.
      </div>
    </div>
  )
}
