import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 30, y: 110, label: 'Client device', detail: 'A laptop sends a request for an external website. It has an IP from the router\'s DHCP scope and the router\'s LAN address set as its default gateway.' },
  { x: 140, y: 40, label: 'Switch / AP', detail: 'The frame reaches the switch (or Wi-Fi access point) on the LAN side, which forwards it toward the router based on the destination MAC address.' },
  { x: 250, y: 110, label: 'SOHO router', detail: 'The router sees the destination IP is outside the LAN subnet, so it routes the packet toward the WAN interface — performing NAT to translate the private source IP to its one public IP.' },
  { x: 360, y: 40, label: 'Modem', detail: 'The modem converts the router\'s Ethernet signal into whatever the ISP\'s medium requires (DOCSIS, DSL, fiber ONT) and hands it off on the wire toward the provider.' },
  { x: 440, y: 110, label: 'ISP / Internet', detail: 'From here the packet is routed across the ISP\'s network and the wider Internet toward the destination server, hopping between many routers along the way.' },
]

export default function PacketJourneyThroughSoho() {
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
          <h3 className="font-display text-lg text-ink">A Packet's Journey Out of a SOHO Network</h3>
          <p className="text-sm text-soft">Domain 2.5 — watch the token trace a request from a laptop out to the Internet.</p>
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
        <svg viewBox="0 0 470 150" className="w-full h-40" aria-hidden>
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
        The router is the boundary the exam cares about most: everything before it is the private LAN (RFC 1918
        addressing), and NAT at the router is what lets every device inside share the single public IP the ISP
        assigned to the modem/router.
      </div>
    </div>
  )
}
