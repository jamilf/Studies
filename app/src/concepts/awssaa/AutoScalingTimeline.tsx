import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  { title: 'CloudWatch alarm breaches threshold', detail: 'A metric — e.g., average CPU utilization above 70% — crosses the configured alarm threshold.' },
  { title: 'Scaling policy triggers', detail: 'The Auto Scaling Group\'s scaling policy reacts to the alarm and decides how many instances to add.' },
  { title: 'New EC2 instance launched', detail: 'A new instance launches from the launch template, using the same AMI and configuration as the rest of the fleet.' },
  { title: 'Instance passes health checks', detail: 'The instance boots and must pass EC2 and/or ELB health checks before it\'s considered ready to serve traffic.' },
  { title: 'Registered with target group', detail: 'The healthy instance is registered with the load balancer\'s target group.' },
  { title: 'Traffic distributed to new instance', detail: 'The load balancer begins routing a share of traffic to the new instance.' },
  { title: 'Scale-in when demand drops', detail: 'When the metric falls back below threshold, the group terminates instances to scale back down — respecting the cooldown period so it doesn\'t flap.' },
]

export default function AutoScalingTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

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
          <h3 className="font-display text-lg text-ink">Auto Scaling Group Timeline</h3>
          <p className="text-sm text-soft">Domain 2.2 — step through a scale-out and scale-in cycle.</p>
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
            <button key={s.title} onClick={() => { setPlaying(false); setActive(i) }} className="flex flex-col items-center gap-2 group" style={{ width: `${100 / STEPS.length}%` }}>
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${i <= active ? 'bg-accent text-paper' : 'bg-wash text-faint'} ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}>
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{STEPS[active].title}</h4>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Health checks (step 4) are what separate Auto Scaling from just "launching more instances" — an unhealthy
        instance never gets traffic, and the group will replace it automatically.
      </div>
    </div>
  )
}
