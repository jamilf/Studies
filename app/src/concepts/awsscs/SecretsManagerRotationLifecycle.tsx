import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Secrets Manager' | 'Rotation Lambda' | 'Target Service'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'createSecret',
    who: 'Rotation Lambda',
    detail:
      'Secrets Manager invokes the rotation Lambda with the "createSecret" step. The function generates a brand-new secret value and stores it as a new version labeled AWSPENDING, alongside the still-active AWSCURRENT version.',
  },
  {
    title: 'setSecret',
    who: 'Rotation Lambda',
    detail:
      "The \"setSecret\" step applies the AWSPENDING value to the actual target service — for example, creating or updating a database user's password — without yet touching what applications are currently using.",
  },
  {
    title: 'testSecret',
    who: 'Target Service',
    detail:
      'The "testSecret" step logs in or calls the target service using the AWSPENDING credentials to confirm they actually work before anything depends on them.',
  },
  {
    title: 'finishSecret',
    who: 'Secrets Manager',
    detail:
      'The "finishSecret" step atomically moves the AWSPENDING label to AWSCURRENT (the prior AWSCURRENT becomes AWSPREVIOUS). From this instant, GetSecretValue calls return the new credential.',
  },
  {
    title: 'Repeat on schedule',
    who: 'Secrets Manager',
    detail:
      'Secrets Manager runs this whole four-step cycle again at the configured rotation interval, so credentials rotate automatically — application code just calls GetSecretValue and never handles the rotation logic itself.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  'Secrets Manager': 'bg-accent text-paper',
  'Rotation Lambda': 'bg-warn text-paper',
  'Target Service': 'bg-good text-paper',
}

export default function SecretsManagerRotationLifecycle() {
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
          <h3 className="font-display text-lg text-ink">Secrets Manager Rotation Lifecycle</h3>
          <p className="text-sm text-soft">Domain 5.3 — step through the AWSPENDING/AWSCURRENT dance behind automatic secret rotation.</p>
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
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
          <span className={`rounded-crisp px-2 py-0.5 text-[10px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>{STEPS[active].who}</span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The four-step createSecret / setSecret / testSecret / finishSecret contract is the same whether you use an
        AWS-provided rotation template (RDS, DocumentDB, Redshift) or a custom Lambda — and because the old
        version becomes AWSPREVIOUS rather than being deleted, a bad rotation can be diagnosed against a known
        working value before anything is cleaned up.
      </div>
    </div>
  )
}
