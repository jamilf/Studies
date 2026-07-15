import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 120, label: 'Host A owns .50', detail: 'Host A has been on the network for hours, correctly using 192.168.1.50 with no issues.' },
  { x: 160, y: 40, label: 'Host B joins', detail: 'Host B connects with a manually configured static IP that was never checked against the DHCP scope or existing leases — also 192.168.1.50.' },
  { x: 280, y: 100, label: 'Gratuitous ARP', detail: 'Host B broadcasts a gratuitous ARP announcing 192.168.1.50 is at its own MAC address, as devices normally do when they bring an interface up.' },
  { x: 380, y: 40, label: 'Conflict detected', detail: "Host A sees the announcement for an IP it already holds and its OS raises a 'duplicate IP address' warning; the switch's MAC table also starts flapping between two ports for the same IP." },
  { x: 440, y: 120, label: 'Connectivity breaks', detail: 'One or both hosts intermittently lose connectivity as ARP replies for .50 keep changing — traffic gets delivered to the wrong MAC address.' },
]

export default function DuplicateIpConflictTrace() {
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
          <h3 className="font-display text-lg text-ink">Duplicate IP Address Conflict</h3>
          <p className="text-sm text-soft">
            Domain 5.5 — trace how a stray static IP collides with an address already in use.
          </p>
        </div>
        <button
          onClick={() => {
            if (step >= WAYPOINTS.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors shrink-0"
        >
          {playing ? 'Pause' : step >= WAYPOINTS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[160px]">
        <svg viewBox="0 0 480 160" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? (i >= 3 ? 'fill-bad' : 'fill-accent') : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {p.label}
              </text>
            </g>
          ))}
          <circle cx={w.x} cy={w.y} r="9" className={`fill-none transition-all duration-700 ease-out ${step >= 3 ? 'stroke-bad' : 'stroke-accent'}`} strokeWidth="2.5" />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The fix is almost always the same: move the offending host to DHCP, or if it truly needs a static address,
        carve it out of the DHCP scope's exclusion range so the pool never hands it out again to anyone else.
      </div>
    </div>
  )
}
