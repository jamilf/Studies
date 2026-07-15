import { useEffect, useState } from 'react'

interface Step {
  title: string
  phase: 'Info' | 'Theory' | 'Action' | 'Wrap-up'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Identify the problem',
    phase: 'Info',
    detail: 'Gather information, question users, identify symptoms, determine if anything has changed, and duplicate the problem if possible. Approach multiple problems individually.',
  },
  {
    title: 'Establish a theory of probable cause',
    phase: 'Theory',
    detail: 'Question the obvious first, then consider multiple approaches — top-to-bottom or bottom-to-top through the OSI model, or divide and conquer.',
  },
  {
    title: 'Test the theory to determine cause',
    phase: 'Theory',
    detail: 'If confirmed, move on to the plan of action. If not confirmed, establish a new theory or escalate.',
  },
  {
    title: 'Establish a plan of action & identify potential effects',
    phase: 'Action',
    detail: 'Plan the fix and consider what else the change might impact before touching anything.',
  },
  {
    title: 'Implement the solution or escalate',
    phase: 'Action',
    detail: 'Carry out the fix, or escalate to someone with the scope or authority to do so.',
  },
  {
    title: 'Verify full system functionality & implement preventive measures',
    phase: 'Wrap-up',
    detail: 'Confirm the fix resolved the issue without introducing side effects, and put measures in place to prevent recurrence.',
  },
  {
    title: 'Document findings, actions, and outcomes',
    phase: 'Wrap-up',
    detail: 'Record the whole process — what happened, what was tried, and what worked — for future reference.',
  },
]

const PHASE_COLOR: Record<Step['phase'], string> = {
  Info: 'bg-accent text-paper',
  Theory: 'bg-warn text-paper',
  Action: 'bg-heat-5 text-paper',
  'Wrap-up': 'bg-good text-paper',
}

export default function TroubleshootingMethodologyTimeline() {
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
          <h3 className="font-display text-lg text-ink">Network Troubleshooting Methodology</h3>
          <p className="text-sm text-soft">Domain 5.1 — step through CompTIA's seven-stage troubleshooting process.</p>
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

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Exam tip</p>
        <p className="text-ink">
          This is a cyclical process, not strictly linear — steps 2 and 3 loop until a theory is confirmed. The order
          (information first, documentation last) is a common exam trap: know what the FIRST and LAST steps are.
        </p>
      </div>
    </div>
  )
}
