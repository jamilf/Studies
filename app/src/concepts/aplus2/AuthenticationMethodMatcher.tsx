import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'Smart card', back: 'A physical card embedded with a chip and certificate that must be inserted or tapped, usually combined with a PIN, to authenticate. Common in government and enterprise environments (e.g. CAC cards).' },
  { front: 'Biometrics', back: 'Authentication based on a physical or behavioral trait — fingerprint, facial recognition, retina/iris scan, or voiceprint. Something you are, not something you know or have.' },
  { front: 'Hard token', back: 'A dedicated physical device (like an RSA SecurID fob) that generates a rotating one-time passcode. It proves possession — something you have — independent of any phone or computer.' },
  { front: 'Soft token', back: 'A one-time-passcode generator implemented as an app (like Google Authenticator or Microsoft Authenticator) instead of dedicated hardware. Same time-based-OTP concept as a hard token, just software-based.' },
  { front: 'Multifactor authentication (MFA)', back: 'Requires two or more distinct factor categories — something you know (password), something you have (token/smart card), something you are (biometric) — before granting access. A password plus an SMS code is MFA; two passwords is not.' },
  { front: 'Single sign-on (SSO)', back: "One authentication event grants access to multiple independent systems without re-entering credentials for each. Convenient for users, but it also means a single compromised credential can reach everything it's federated with." },
]

export default function AuthenticationMethodMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Authentication Method Matcher</h3>
        <p className="text-sm text-soft">Domain 2.3 — click a term to flip it and reveal what it actually authenticates with.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-display text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 questions often test whether you can tell factor categories apart. Sort each method
        into know / have / are before answering — a question describing "a password and a fingerprint" is
        testing MFA across two different categories, not just "two security steps."
      </div>
    </div>
  )
}
