import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 120, label: 'Device lost or stolen', detail: 'The device leaves the owner\'s control — the clock starts on how much exposure the data on it has before a response kicks in.' },
  { x: 150, y: 40, label: 'Screen lock holds the line', detail: 'A PIN, pattern, or biometric lock is the first and cheapest safeguard — it blocks casual access immediately, buying time for the rest of the response.' },
  { x: 260, y: 120, label: 'Locator service pinpoints it', detail: 'Find My (iOS) or Find My Device (Android) reports the device\'s last known location, which can guide recovery or confirm it needs to be treated as unrecoverable.' },
  { x: 370, y: 40, label: 'Remote lock via MDM/cloud account', detail: 'If recovery looks unlikely, the owner or an MDM console issues a remote lock, displaying a custom message (e.g. a contact number) on the lock screen.' },
  { x: 440, y: 120, label: 'Remote wipe as last resort', detail: 'When the device is confirmed unrecoverable, a remote wipe erases all data — a full factory reset triggered remotely — trading the hardware for protecting the data it held.' },
]

export default function MobileDeviceSecurityFlow() {
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
          <h3 className="font-display text-lg text-ink">Lost Mobile Device Response</h3>
          <p className="text-sm text-soft">Domain 2.7 — watch the response escalate from a screen lock to a full remote wipe.</p>
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
                {p.label.split(' ').slice(0, 2).join(' ')}
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
        Exam tip: 1102 wants the escalation order — lock, locate, remote-lock, then wipe — not "wipe
        immediately." A remote wipe is irreversible, so it is the last step, used only once recovery is no
        longer realistic.
      </div>
    </div>
  )
}
