import { useEffect, useState } from 'react'

type Phase = 'detect' | 'contain' | 'recover' | 'review'

interface Step {
  title: string
  phase: Phase
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Detect',
    phase: 'detect',
    detail:
      'A GuardDuty finding, CloudTrail anomaly, or Security Hub aggregation flags suspicious activity. Detection is the trigger that starts the response.',
  },
  {
    title: 'Isolate',
    phase: 'contain',
    detail:
      'Contain the blast radius without destroying evidence: revoke or rotate the affected IAM credentials, attach a restrictive "quarantine" security group, or tag the resource for isolation. Do not terminate the instance yet.',
  },
  {
    title: 'Investigate',
    phase: 'contain',
    detail:
      'Gather evidence before remediating: review CloudTrail and VPC Flow Logs for the blast radius, and take an EBS snapshot / AMI of the affected instance for forensics so the timeline of the attack is preserved.',
  },
  {
    title: 'Eradicate',
    phase: 'contain',
    detail:
      'Remove the root cause: delete any malicious IAM users/roles/access keys the attacker created, rotate every credential that may have been exposed, and patch the vulnerability that allowed entry.',
  },
  {
    title: 'Recover',
    phase: 'recover',
    detail:
      'Restore the workload from a known-clean AMI/snapshot rather than trusting the compromised instance, redeploy into the environment, and monitor closely for signs of reinfection.',
  },
  {
    title: 'Post-incident review',
    phase: 'review',
    detail:
      'Document the timeline and root cause, update runbooks and detection rules (e.g. new GuardDuty/Config rules), and feed lessons learned back into the Detect stage for next time.',
  },
]

const PHASE_COLOR: Record<Phase, string> = {
  detect: 'bg-accent text-paper',
  contain: 'bg-bad text-paper',
  recover: 'bg-good text-paper',
  review: 'bg-warn text-paper',
}
const PHASE_LABEL: Record<Phase, string> = {
  detect: 'Detect',
  contain: 'Contain / Eradicate',
  recover: 'Recover',
  review: 'Review',
}

export default function AwsIrTimeline() {
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
          <h3 className="font-display text-lg text-ink">AWS Incident Response Lifecycle</h3>
          <p className="text-sm text-soft">Domain 1.3 — walk through an AWS-native incident from detection to lessons learned.</p>
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
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-ink' : ''}`}
              >
                {i + 1}
              </span>
              <span
                className={`text-[10px] text-center leading-tight transition-colors ${
                  i === active ? 'text-ink' : 'text-faint group-hover:text-soft'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${PHASE_COLOR[STEPS[active].phase]}`}>
            {PHASE_LABEL[STEPS[active].phase]}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tell: "isolate" comes before "eradicate" — you contain and preserve evidence (snapshot, log review)
        before you start deleting IAM users or terminating instances, otherwise you destroy the forensic trail.
      </div>
    </div>
  )
}
