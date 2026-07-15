import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'User' | 'SP' | 'IdP'
  detail: string
}

const STEPS: Step[] = [
  { title: 'User requests access', who: 'User', detail: 'Tries to reach a protected resource at the Service Provider without being logged in there.' },
  { title: 'SP redirects to IdP', who: 'SP', detail: 'The SP has no local password for this user, so it redirects the browser to the trusted Identity Provider.' },
  { title: 'User authenticates at IdP', who: 'User', detail: 'Logs in once — password plus MFA — the only place credentials are ever entered.' },
  { title: 'IdP issues a signed assertion', who: 'IdP', detail: 'Creates a signed SAML assertion or an OIDC/JWT token certifying the user\'s identity.' },
  { title: 'Assertion returned to SP', who: 'IdP', detail: 'The browser carries the signed assertion or token back to the SP.' },
  { title: 'SP validates and trusts it', who: 'SP', detail: 'Verifies the IdP\'s digital signature and checks expiry and tampering.' },
  { title: 'Access granted (SSO)', who: 'SP', detail: 'The user is in without ever entering SP-specific credentials.' },
]

const WHO_COLOR: Record<Step['who'], string> = {
  User: 'bg-accent text-paper',
  SP: 'bg-warn text-paper',
  IdP: 'bg-good text-paper',
}

export default function SsoFederationTimeline() {
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
          <h3 className="font-display text-lg text-ink">SSO via Federated Identity</h3>
          <p className="text-sm text-soft">Domain 5.3 — step through a SAML/OIDC single sign-on flow.</p>
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
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'} ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}>
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>{STEPS[active].who}</span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        One login at the IdP, trusted everywhere federated — this reduces password sprawl and shrinks the phishing
        surface compared to each service maintaining its own credentials.
      </div>
    </div>
  )
}
