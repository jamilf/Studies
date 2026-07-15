import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'HR / Manager' | 'IAM Team' | 'System Owner' | 'Auditor'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Request & approval', who: 'HR / Manager', detail: 'A new hire, transfer, or contractor start triggers a formal access request. A manager or sponsor approves the request before any account is touched — access is never self-granted.' },
  { title: 'Provisioning', who: 'IAM Team', detail: 'The IAM team (or an automated identity governance tool) creates the account from an authoritative source (HR system) and assigns a unique identifier — never a shared or generic account.' },
  { title: 'Entitlement assignment', who: 'IAM Team', detail: 'Group memberships and role assignments are applied based on job function, following least privilege — the user gets only what the role requires, not a copy of a coworker\'s access ("access cloning" is an anti-pattern).' },
  { title: 'Periodic access review', who: 'Auditor', detail: 'On a scheduled cadence, a manager or data owner recertifies that each entitlement is still needed. Unused or excessive access ("privilege creep") is flagged for removal.' },
  { title: 'Modification (transfer)', who: 'IAM Team', detail: 'When a user changes roles, old entitlements tied to the previous role are revoked and new ones granted — access should reflect the current role, not accumulate over a career.' },
  { title: 'Deprovisioning', who: 'IAM Team', detail: 'On termination, HR triggers immediate account disablement, credential revocation, and session termination — ideally automated and same-day to close the window for insider misuse.' },
  { title: 'Archival & audit', who: 'Auditor', detail: 'The disabled account and its access history are retained per the data retention policy and made available for audit — the identity is deactivated, not silently deleted, to preserve the audit trail.' },
]

const WHO_COLOR: Record<Step['who'], string> = {
  'HR / Manager': 'bg-accent text-paper',
  'IAM Team': 'bg-good text-paper',
  'System Owner': 'bg-warn text-paper',
  Auditor: 'bg-heat-5 text-paper',
}

export default function IdentityLifecycleTimeline() {
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
          <h3 className="font-display text-lg text-ink">The Identity & Access Provisioning Lifecycle</h3>
          <p className="text-sm text-soft">Domain 5.5 — step through an identity from hire to deprovisioning.</p>
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
        This full loop — request, provision, entitle, review, modify, deprovision, archive — is the identity and
        access provisioning lifecycle. Slow deprovisioning is one of the most commonly exploited IAM gaps, since a
        terminated employee's still-active account bypasses every other control.
      </div>
    </div>
  )
}
