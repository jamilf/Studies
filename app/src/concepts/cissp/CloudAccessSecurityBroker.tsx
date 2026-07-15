import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 35, y: 100, label: 'User request', detail: 'A user (or an unmanaged device) tries to reach a SaaS application — the request is routed through the CASB rather than straight to the internet.' },
  { x: 150, y: 50, label: 'Visibility', detail: 'The CASB discovers and logs the request, identifying shadow IT usage of cloud apps the security team never explicitly approved.' },
  { x: 265, y: 130, label: 'Compliance', detail: 'The CASB checks the request against regulatory and internal policy — e.g., is this app approved for regulated data, is the user\'s device compliant.' },
  { x: 380, y: 50, label: 'Data security', detail: 'DLP rules inspect the payload for sensitive data leaving the org, and encryption/tokenization can be applied before the data reaches the cloud service.' },
  { x: 440, y: 110, label: 'Threat protection', detail: 'The CASB screens for malware and anomalous behavior (e.g., impossible-travel logins) before allowing the session through to the cloud application.' },
]

export default function CloudAccessSecurityBroker() {
  const [step, setStep] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)

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
          <h3 className="font-display text-lg text-ink">CASB: The Four Pillars</h3>
          <p className="text-sm text-soft">Domain 3.5 — watch a cloud request pass through a Cloud Access Security Broker's core functions.</p>
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

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[160px]">
        <svg viewBox="0 0 480 160" className="w-full h-40" aria-hidden>
          <polyline points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')} className="fill-none stroke-line-strong" strokeWidth="1.5" strokeDasharray="4 3" />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {p.label}
              </text>
            </g>
          ))}
          <circle cx={w.x} cy={w.y} r="9" className="fill-none stroke-accent transition-all duration-700 ease-out" strokeWidth="2.5" />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A CASB can sit inline (forward proxy on the endpoint, or reverse proxy in front of the cloud app) or
        out-of-band (via the cloud provider's API, scanning data already at rest) — either way it gives security
        teams a policy enforcement point they don't otherwise have once data leaves the corporate network.
      </div>
    </div>
  )
}
