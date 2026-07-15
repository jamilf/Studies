import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  { title: 'Requirements', detail: 'Capture security requirements up front — e.g., "PII fields encrypted at rest" — since bolted-on security is far costlier later.' },
  { title: 'Design', detail: 'Architecture and threat modeling (e.g., STRIDE) happen before any code is written.' },
  { title: 'Development', detail: 'Secure coding practices — input validation, parameterized queries, output encoding — plus SAST on the source code.' },
  { title: 'Testing', detail: 'DAST and penetration testing against the running application catch what static analysis can\'t.' },
  { title: 'Deployment', detail: 'Secure configuration baselines, hardening, least privilege, and secrets management.' },
  { title: 'Maintenance', detail: 'Continuous patching, monitoring, and vulnerability management as new CVEs emerge.' },
  { title: 'Disposal', detail: 'Secure decommissioning — sanitize or destroy data per retention policy, revoke credentials, retire infrastructure.' },
]

export default function SdlcTimeline() {
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
          <h3 className="font-display text-lg text-ink">Secure SDLC</h3>
          <p className="text-sm text-soft">Domain 8.1 — step through security integrated at every phase of development.</p>
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
        Security integrated at every phase is cheaper and more effective than bolting it on at the end — the
        "shift-left" principle.
      </div>
    </div>
  )
}
