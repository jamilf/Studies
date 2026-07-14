import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
  example: string
}

const STEPS: Step[] = [
  {
    title: '1. Identify the problem',
    detail: 'Gather information, question the user, and reproduce the issue before assuming anything.',
    example: 'User reports "the internet is slow" - ask what "slow" means, when it started, and which apps are affected.',
  },
  {
    title: '2. Establish a theory of probable cause',
    detail: 'Form a hypothesis based on the symptoms, starting with the most obvious/common cause.',
    example: 'Slow internet on one PC only, right after a driver update - theory: the new NIC driver is misbehaving.',
  },
  {
    title: '3. Test the theory to determine cause',
    detail: 'Actually test the theory. If confirmed, proceed. If not, form a new theory or escalate.',
    example: 'Roll back the NIC driver and see if speed returns to normal.',
  },
  {
    title: '4. Establish a plan of action and implement',
    detail: 'Once the cause is confirmed, plan the fix (considering side effects) and carry it out.',
    example: 'Schedule the driver rollback for a low-impact time and apply it, noting a fallback if it fails.',
  },
  {
    title: '5. Verify full system functionality',
    detail: "Confirm the fix actually resolved the issue, and check that nothing else broke as a side effect.",
    example: 'Run a speed test, confirm normal browsing, and check that no other network features regressed.',
  },
  {
    title: '6. Document findings, actions, and outcomes',
    detail: 'Record what was wrong, what was done, and the result - for the ticket and for future reference.',
    example: 'Log "outdated NIC driver caused slow speeds; rolled back to v2.1; confirmed resolved" in the ticket.',
  },
]

export default function TroubleshootingMethodology() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setPlaying(false)
          return s
        }
        return s + 1
      })
    }, 2200)
    return () => clearInterval(id)
  }, [playing])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">The CompTIA Troubleshooting Methodology</h3>
        <p className="text-sm text-soft">
          Domain 5.1 (Core 1) / Domain 3.1 (Core 2) — the six-step process tested throughout both A+ exams.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (step >= STEPS.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep text-paper text-sm font-semibold px-4 py-2 transition-colors"
        >
          {playing ? 'Pause' : step >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
        <div className="flex-1 flex gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setStep(i)
              }}
              className={`flex-1 h-2 rounded-full transition-colors ${i <= step ? 'bg-accent' : 'bg-wash'}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-5 py-4 animate-fadein">
        <h4 className="font-display font-semibold text-accent mb-2">{STEPS[step].title}</h4>
        <p className="text-sm text-ink mb-3">{STEPS[step].detail}</p>
        <div className="rounded-crisp border border-line bg-surface p-3 text-sm text-soft">
          <span className="font-semibold text-ink">Example: </span>
          {STEPS[step].example}
        </div>
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm text-ink">
        <span className="font-semibold text-warn">Exam tip:</span> Documentation (step 6) is always last, and testing
        the theory (step 3) always comes before implementing a fix (step 4) — a frequent trap is jumping straight to
        a fix before confirming the theory is actually correct.
      </div>
    </div>
  )
}
