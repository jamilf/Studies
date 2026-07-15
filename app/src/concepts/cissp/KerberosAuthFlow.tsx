import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 130, label: '1. AS request', detail: 'The client sends a request to the Authentication Server (part of the KDC) with its identity and a timestamp encrypted using a key derived from the user\'s password — the password itself never crosses the network.' },
  { x: 40, y: 30, label: '2. TGT issued', detail: 'The AS verifies the timestamp, then returns a Ticket Granting Ticket (TGT) encrypted with the KDC\'s own secret key, plus a session key encrypted with the client\'s key. The client caches the TGT — it never sees the KDC\'s secret key.' },
  { x: 230, y: 30, label: '3. TGS request', detail: 'When the client needs to reach a specific service, it presents the TGT plus a freshly built authenticator to the Ticket Granting Service (TGS), asking for a service ticket — the user is not re-prompted for a password.' },
  { x: 230, y: 130, label: '4. Service ticket issued', detail: 'The TGS validates the TGT and authenticator, then issues a service ticket encrypted with the target service\'s own secret key, along with a new client/service session key.' },
  { x: 420, y: 130, label: '5. Present to service', detail: 'The client sends the service ticket plus a new authenticator directly to the application server.' },
  { x: 420, y: 30, label: '6. Access granted', detail: 'The server decrypts the ticket with its own secret key, validates the authenticator\'s timestamp to prevent replay, and grants access — optionally proving its own identity back to the client for mutual authentication.' },
]

export default function KerberosAuthFlow() {
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
          <h3 className="font-display text-lg text-ink">Kerberos Authentication Flow</h3>
          <p className="text-sm text-soft">Domain 5.6 — watch the ticket-granting handshake between client, KDC, and service.</p>
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

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[190px]">
        <svg viewBox="0 0 460 170" className="w-full h-44" aria-hidden>
          <text x="40" y="155" textAnchor="middle" className="fill-faint text-[9px] font-medium">Client</text>
          <text x="230" y="155" textAnchor="middle" className="fill-faint text-[9px] font-medium">KDC (AS / TGS)</text>
          <text x="420" y="155" textAnchor="middle" className="fill-faint text-[9px] font-medium">App Server</text>

          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 12} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {p.label.replace(/^\d+\.\s*/, '')}
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
        Kerberos is a single-sign-on, ticket-based protocol built on symmetric cryptography and mutual trust in the
        KDC. Because the password never travels over the network and tickets are time-stamped and short-lived, it
        resists both eavesdropping and replay — but it makes the KDC a single point of failure and a high-value
        target (a compromised KDC can forge tickets, the classic "golden ticket" attack).
      </div>
    </div>
  )
}
