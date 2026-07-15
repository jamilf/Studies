import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 100, label: 'Recon', detail: 'The attacker probes input fields (a login form, a search box, a URL parameter) looking for one that is not sanitized before being used in a database query.' },
  { x: 150, y: 40, label: 'Inject', detail: 'A crafted string like `\' OR \'1\'=\'1` is submitted through the vulnerable field, breaking out of the intended query logic instead of being treated as plain data.' },
  { x: 260, y: 100, label: 'Bypass auth', detail: 'Because the injected logic always evaluates true, the application\'s WHERE clause is satisfied without a valid username or password — authentication is bypassed entirely.' },
  { x: 370, y: 40, label: 'Extract data', detail: 'Further crafted queries (often using UNION SELECT) pull rows from tables the application was never meant to expose, such as a full user credential table.' },
  { x: 430, y: 130, label: 'Persist / pivot', detail: 'A skilled attacker may use database features (stored procedures, xp_cmdshell-style extensions) to write a web shell or pivot further into the host.' },
]

export default function SqlInjectionAttackTrace() {
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
          <h3 className="font-display text-lg text-ink">SQL Injection Attack Trace</h3>
          <p className="text-sm text-soft">Domain 2.4 — watch an unsanitized input field turn into a full data breach.</p>
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
        <svg viewBox="0 0 470 170" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-bad' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[9px] font-medium">
                {p.label}
              </text>
            </g>
          ))}
          <circle cx={w.x} cy={w.y} r="9" className="fill-none stroke-bad transition-all duration-700 ease-out" strokeWidth="2.5" />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-bad px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Parameterized queries (prepared statements) and strict input validation stop this entire chain at the
        injection step — the database engine never treats user-supplied data as executable query logic in the
        first place.
      </div>
    </div>
  )
}
