import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 120, label: 'User in Account A', detail: 'A user or role in the trusting account (Account A) wants to work with resources that live in Account B.' },
  { x: 150, y: 40, label: 'Calls sts:AssumeRole', detail: 'The caller invokes sts:AssumeRole, naming the ARN of an IAM role that exists in Account B.' },
  { x: 260, y: 120, label: 'Trust policy checked', detail: 'AWS STS checks the target role\'s trust policy (its resource-based policy) — it must explicitly list Account A (or the calling principal) as a trusted principal.' },
  { x: 370, y: 40, label: 'Temporary credentials issued', detail: 'STS returns a short-lived access key, secret key, and session token — no long-term secret ever crosses the account boundary.' },
  { x: 440, y: 120, label: 'Access granted in Account B', detail: 'The caller uses the temporary credentials to act in Account B, but only within the permissions granted by the role\'s own IAM policy.' },
]

export default function CrossAccountAssumeRoleFlow() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) { setPlaying(false); return }
    const t = setTimeout(() => setStep((s) => s + 1), 1700)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Cross-Account AssumeRole Flow</h3>
          <p className="text-sm text-soft">Domain 1.1 — watch a caller in one account assume a role in another.</p>
        </div>
        <button
          onClick={() => { if (step >= WAYPOINTS.length - 1) setStep(0); setPlaying((p) => !p) }}
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
        Two policies must both agree: the target role's trust policy (who may assume it) and the role's permissions
        policy (what the assumer can then do). Missing either one is the classic reason cross-account access fails
        on the exam.
      </div>
    </div>
  )
}
