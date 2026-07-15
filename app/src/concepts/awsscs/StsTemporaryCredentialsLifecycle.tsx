import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Caller' | 'STS' | 'Role'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Request',
    who: 'Caller',
    detail:
      'A user, application, or federated identity calls an STS API — AssumeRole, AssumeRoleWithSAML, or AssumeRoleWithWebIdentity — naming the target role ARN and an optional session duration.',
  },
  {
    title: 'Trust check',
    who: 'Role',
    detail:
      "STS checks the target role's trust policy to confirm the caller (or the federation provider) is a listed, trusted principal, and evaluates any conditions such as requiring MFA to be present.",
  },
  {
    title: 'Issue credentials',
    who: 'STS',
    detail:
      "STS returns a fresh AccessKeyId, SecretAccessKey, and SessionToken bound to the role's permissions — valid from 15 minutes up to the role's MaxSessionDuration (1 hour by default, configurable up to 12 hours).",
  },
  {
    title: 'Sign requests',
    who: 'Caller',
    detail:
      'The caller signs subsequent API calls with all three values together. Unlike a long-lived IAM user access key, the SessionToken is mandatory — a request signed with only the AccessKeyId/SecretAccessKey pair fails.',
  },
  {
    title: 'Automatic expiry',
    who: 'STS',
    detail:
      'When the session duration elapses, the credentials simply stop working — there is no key to find, disable, or rotate. This is why temporary credentials shrink the exposure window compared to static access keys.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Caller: 'bg-accent text-paper',
  STS: 'bg-good text-paper',
  Role: 'bg-warn text-paper',
}

export default function StsTemporaryCredentialsLifecycle() {
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
          <h3 className="font-display text-lg text-ink">Lifecycle of STS Temporary Credentials</h3>
          <p className="text-sm text-soft">Domain 4.1 — follow a role assumption from request to automatic expiry.</p>
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
              <span className="text-[10px] text-soft text-center leading-tight hidden sm:block">{s.title}</span>
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
        Every AssumeRole-family call produces credentials with the same three-part shape and the same fate: they
        expire on their own. That property is why STS is the backbone of federation, cross-account access, and
        EC2/Lambda execution roles — nobody has to remember to revoke anything.
      </div>
    </div>
  )
}
