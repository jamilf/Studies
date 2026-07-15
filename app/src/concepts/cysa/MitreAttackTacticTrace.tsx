import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 30, y: 110, label: 'Initial Access', detail: 'Phishing email with a malicious attachment lands the attacker\'s first foothold on a workstation.' },
  { x: 110, y: 40, label: 'Execution', detail: 'A macro or script runs, launching the attacker\'s payload under the logged-in user\'s context.' },
  { x: 190, y: 110, label: 'Persistence', detail: 'A scheduled task or registry run key is created so the payload survives a reboot or logoff.' },
  { x: 270, y: 40, label: 'Privilege Escalation', detail: 'A local exploit or token abuse technique elevates the attacker from a standard user to admin/SYSTEM.' },
  { x: 350, y: 110, label: 'Lateral Movement', detail: 'Harvested credentials or pass-the-hash let the attacker pivot from the first host to a domain controller or file server.' },
  { x: 430, y: 40, label: 'Exfiltration', detail: 'Staged data is compressed and sent out over an encrypted C2 channel or a cloud storage upload.' },
]

export default function MitreAttackTacticTrace() {
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
          <h3 className="font-display text-lg text-ink">MITRE ATT&amp;CK Tactic Trace</h3>
          <p className="text-sm text-soft">Domain 3.1 — watch a token move across ATT&amp;CK tactics in a typical intrusion path.</p>
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
        <svg viewBox="0 0 460 150" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
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
        ATT&amp;CK isn't a fixed sequence like the Kill Chain — an adversary can revisit tactics (more Discovery, more
        Persistence) at any point. The value for a SOC is mapping each observed technique to a tactic so you can spot
        where in the attack you are, and which technique-specific detections/mitigations to pull up.
      </div>
    </div>
  )
}
