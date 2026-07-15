import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  {
    x: 40,
    y: 110,
    label: 'Internal Host',
    detail: 'A host at 192.168.1.10:51000 sends a packet toward a server on the internet. Its source address is private and not routable beyond the local network.',
  },
  {
    x: 150,
    y: 50,
    label: 'NAT/PAT Router (Outbound)',
    detail: 'The router creates a translation table entry, rewriting the source to its own public address and a unique port — e.g. 203.0.113.5:40001. PAT lets many internal hosts share one public IP by giving each flow a unique port.',
  },
  {
    x: 260,
    y: 110,
    label: 'Public Internet',
    detail: 'The packet now crosses the internet carrying only the public source address and translated port — the destination has no visibility into the private addressing behind the router.',
  },
  {
    x: 380,
    y: 50,
    label: 'Destination Server',
    detail: 'The server replies to the public address and port it saw, 203.0.113.5:40001, with no knowledge that a private host originated the request.',
  },
  {
    x: 150,
    y: 110,
    label: 'NAT/PAT Router (Return)',
    detail: 'The router looks up 203.0.113.5:40001 in its NAT table, rewrites the destination back to 192.168.1.10:51000, and forwards the reply to the original internal host.',
  },
]

export default function NatPatFlowTrace() {
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

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">NAT / PAT Translation Flow</h3>
          <p className="text-sm text-soft">Domain 2.2 — watch a packet's address get translated out to the internet, and back.</p>
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
        <svg viewBox="0 0 420 150" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={`${p.label}-${i}`}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[7px] font-medium">
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
        PAT (NAT overload) is what makes home and office networks work behind a single public IP — the port number,
        not the address, is what lets the router tell dozens of simultaneous internal flows apart.
      </div>
    </div>
  )
}
