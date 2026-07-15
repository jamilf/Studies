import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Deter' | 'Deny' | 'Detect' | 'Delay' | 'Respond'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Deter', who: 'Deter', detail: 'Discourage an attacker before they act: perimeter lighting, "premises monitored" signage, and visible fencing rely on CPTED\'s natural surveillance and territorial reinforcement to make the site look like a poor target.' },
  { title: 'Deny', who: 'Deny', detail: 'Physically prevent entry: perimeter fencing, locked doors, mantraps, and bollards implement CPTED\'s natural access control by funneling everyone through controlled, monitored entry points.' },
  { title: 'Detect', who: 'Detect', detail: 'Notice an intrusion as it happens: CCTV, motion sensors, and door contacts feed a monitoring station so a bypass of the "deny" layer doesn\'t go unnoticed.' },
  { title: 'Delay', who: 'Delay', detail: 'Slow the attacker down once detected: reinforced doors, security glazing, and interior mantraps buy time for a response team to arrive before the target is reached.' },
  { title: 'Respond', who: 'Respond', detail: 'React to the confirmed intrusion: on-site guards, alarm dispatch to law enforcement, and incident procedures close the loop — detection without response is just a log entry.' },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Deter: 'bg-heat-1 text-ink',
  Deny: 'bg-heat-2 text-ink',
  Detect: 'bg-heat-3 text-ink',
  Delay: 'bg-heat-5 text-paper',
  Respond: 'bg-heat-6 text-paper',
}

export default function PhysicalSecurityLayers() {
  const [active, setActive] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Layered Physical Defense</h3>
          <p className="text-sm text-soft">Domain 3.8 — step through the five stages of physical security, from discouraging an attacker to responding to one.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out" style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }} />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
              <span className="text-[11px] text-soft text-center">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{STEPS[active].title}</h4>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This deter/deny/detect/delay/respond sequence is physical security's version of defense in depth — CPTED
        (Crime Prevention Through Environmental Design) supplies the "deter" and "deny" layers by shaping the
        built environment itself, before any alarm or guard is ever involved.
      </div>
    </div>
  )
}
