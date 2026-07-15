import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  { title: 'Health check detects outage', detail: 'A Route 53 health check (or CloudWatch alarm) starts failing against the primary region\'s endpoint after repeated failed probes.' },
  { title: 'DNS failover triggers', detail: 'Route 53 marks the primary record unhealthy and, per the failover routing policy, starts returning the secondary region\'s record to resolvers instead.' },
  { title: 'Standby resources scale up', detail: 'In a pilot-light or warm-standby design, Auto Scaling Groups in the standby region scale out from a minimal footprint to full production capacity.' },
  { title: 'Standby database promoted', detail: 'If using a cross-region read replica, it is manually (or, for Aurora Global Database, automatically) promoted to become the new writable primary.' },
  { title: 'Traffic reaches standby region', detail: 'New DNS lookups now resolve to the standby region, and it begins serving live production traffic.' },
  { title: 'Post-incident failback', detail: 'Once the original region is healthy again, data is resynchronized and traffic is deliberately shifted back — never automatically, to avoid a second unplanned cutover.' },
]

export default function BackupDrFailoverSequence() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) { setPlaying(false); return }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Disaster Recovery Failover Sequence</h3>
          <p className="text-sm text-soft">Domain 2.2 — step through a regional failover from outage to recovery.</p>
        </div>
        <button
          onClick={() => { if (active >= STEPS.length - 1) setActive(0); setPlaying((p) => !p) }}
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
        How much of this sequence is automated versus manual depends on the DR strategy chosen: backup &amp;
        restore requires almost every step to be manual, while a multi-site active-active design skips most of
        it because both regions are already serving traffic.
      </div>
    </div>
  )
}
