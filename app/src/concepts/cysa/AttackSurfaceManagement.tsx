import { useEffect, useState } from 'react'

interface Node {
  x: number
  y: number
  label: string
  detail: string
}

const CENTER = { x: 260, y: 90 }

const NODES: Node[] = [
  { x: 90, y: 30, label: 'External Web Apps', detail: 'Internet-facing applications and APIs — the most obvious and most frequently scanned part of the attack surface.' },
  { x: 430, y: 30, label: 'Cloud Storage Buckets', detail: 'Object storage that is easy to spin up and easy to leave misconfigured as publicly readable/writable.' },
  { x: 60, y: 150, label: 'VPN / Remote Access', detail: 'Remote-access gateways are a favorite initial-access target — unpatched or weakly authenticated, they lead straight to the internal network.' },
  { x: 460, y: 150, label: 'Third-Party Integrations', detail: 'Vendors and SaaS integrations with API access to your data extend your attack surface beyond systems you directly control.' },
  { x: 175, y: 165, label: 'Shadow IT', detail: 'Unsanctioned tools and unmanaged assets that never went through security review — invisible to the asset inventory until something goes wrong.' },
  { x: 345, y: 165, label: 'DNS / Subdomains', detail: 'Forgotten or stale subdomains (dev/staging environments, expired records) are commonly abused for subdomain takeover.' },
]

export default function AttackSurfaceManagement() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= NODES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1600)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Mapping the Attack Surface</h3>
          <p className="text-sm text-soft">Domain 2.1 — reveal, one category at a time, everything an attacker could try before you even start scanning.</p>
        </div>
        <button
          onClick={() => {
            if (phase >= NODES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= NODES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>
      <div className="relative rounded-crisp border border-line bg-wash p-4 min-h-[220px]">
        <svg viewBox="0 0 520 200" className="w-full h-52" aria-hidden>
          {NODES.map((n, i) => (
            <line
              key={`line-${n.label}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={n.x}
              y2={n.y}
              className={i <= phase ? 'stroke-accent' : 'stroke-line'}
              strokeWidth="1.5"
              strokeDasharray={i <= phase ? undefined : '4 3'}
            />
          ))}
          <rect x={CENTER.x - 42} y={CENTER.y - 16} width="84" height="32" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
          <text x={CENTER.x} y={CENTER.y + 5} textAnchor="middle" className="fill-ink text-[10px] font-semibold">
            Organization
          </text>
          {NODES.map((n, i) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="7" className={i <= phase ? 'fill-accent' : 'fill-line'} />
              <text
                x={n.x}
                y={n.y < CENTER.y ? n.y - 12 : n.y + 20}
                textAnchor="middle"
                className={`text-[9px] font-medium ${i <= phase ? 'fill-ink' : 'fill-faint'}`}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{NODES[phase].label}</h4>
        <p className="text-sm text-soft leading-relaxed">{NODES[phase].detail}</p>
      </div>
      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Attack surface management starts before a scanner ever runs — you cannot scan or protect an asset you do not
        know exists. Continuous discovery is what keeps this map current as new services and integrations appear.
      </div>
    </div>
  )
}
