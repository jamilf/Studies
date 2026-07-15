import { useEffect, useState } from 'react'

interface Step {
  title: string
  phase: 'Develop' | 'Deliver' | 'Measure'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Needs Assessment & Development',
    phase: 'Develop',
    detail: 'Identify the top risks facing the organization — phishing, insider threat, removable media — and build role-appropriate content and simulated phishing campaigns tailored to what staff actually encounter.',
  },
  {
    title: 'Onboarding Training',
    phase: 'Deliver',
    detail: 'New hires complete baseline security awareness training before or shortly after gaining system access, covering acceptable use, password management, and how to report something suspicious.',
  },
  {
    title: 'Phishing Simulation Campaign',
    phase: 'Deliver',
    detail: 'Periodic simulated phishing emails test real-world recognition. Users who click get just-in-time remedial training — the goal is behavior change, not punishment.',
  },
  {
    title: 'Recurring / Refresher Training',
    phase: 'Deliver',
    detail: 'Annual or more frequent refreshers keep material current as tactics evolve — vishing, deepfake voice cloning, and new pretexting angles all need to reach staff eventually.',
  },
  {
    title: 'Reporting & Monitoring',
    phase: 'Measure',
    detail: 'Track completion rates, phishing click/report rates, and flag users or departments needing extra attention — turning training into measurable, trackable metrics for leadership.',
  },
  {
    title: 'Program Update',
    phase: 'Measure',
    detail: "Feed those metrics and emerging threat trends back into the next cycle's needs assessment, closing the loop so the program keeps pace with real attacker behavior.",
  },
]

const PHASE_COLOR: Record<Step['phase'], string> = {
  Develop: 'bg-accent text-paper',
  Deliver: 'bg-warn text-paper',
  Measure: 'bg-good text-paper',
}

export default function AwarenessTrainingTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1800)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Security Awareness Training Cycle</h3>
          <p className="text-sm text-soft">
            Domain 5.6 — step through how an awareness program is built, delivered, and measured.
          </p>
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
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
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
                  i <= active ? PHASE_COLOR[s.phase] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${PHASE_COLOR[STEPS[active].phase]}`}>
            {STEPS[active].phase}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A mature awareness program treats phishing simulations and metrics as a feedback loop, not a compliance
        checkbox — click rates and reporting rates should trend in opposite directions over successive cycles.
      </div>
    </div>
  )
}
