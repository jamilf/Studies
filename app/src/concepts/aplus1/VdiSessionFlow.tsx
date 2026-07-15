import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  {
    x: 35,
    y: 110,
    label: 'Thin/zero client',
    detail:
      'The user sits at a lightweight endpoint — often just enough hardware to render a screen and capture keyboard/mouse input. No real processing happens here.',
  },
  {
    x: 150,
    y: 40,
    label: 'Network',
    detail:
      'Login credentials and, once connected, only screen updates and input events cross the network — not application data. This is why VDI works well over relatively thin WAN links.',
  },
  {
    x: 270,
    y: 110,
    label: 'Connection broker',
    detail:
      'Authenticates the user and decides which virtual desktop they get — a pooled, non-persistent desktop or their own dedicated persistent one — then hands off the session.',
  },
  {
    x: 390,
    y: 40,
    label: 'VM host (virtual desktop)',
    detail:
      'The actual OS, applications, and data all live and execute here on host-side hardware. CPU, RAM, and storage requirements are the host\'s problem, not the endpoint\'s.',
  },
  {
    x: 425,
    y: 130,
    label: 'Rendered frames back',
    detail:
      'Only the rendered display is streamed back to the thin client. Because the desktop never actually leaves the datacenter, VDI is popular for centralizing data security and patching.',
  },
]

export default function VdiSessionFlow() {
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
          <h3 className="font-display text-lg text-ink">VDI Session Flow</h3>
          <p className="text-sm text-soft">
            Domain 4.1 — watch a virtual desktop infrastructure session travel from endpoint to host and back.
          </p>
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
        <svg viewBox="0 0 460 160" className="w-full h-40" aria-hidden>
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
        The exam-testable distinction: in VDI, processing stays on the host and only display output plus input events
        cross the wire, unlike a traditional remote-file/thick-client setup. That's why VDI endpoints can be cheap,
        low-power thin clients while still running full desktop workloads.
      </div>
    </div>
  )
}
