import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'Message-based', back: 'Phishing email, SMS (smishing), or instant message carrying a malicious link or attachment straight into a user\'s inbox.' },
  { front: 'File-based', back: 'A macro-laden document or disguised executable delivered via email attachment, download, or removable media.' },
  { front: 'Voice call', back: 'Vishing: an attacker calls and impersonates IT support or an executive to extract credentials or trigger a wire transfer.' },
  { front: 'Removable device', back: 'A USB drive — sometimes intentionally dropped in a parking lot — that auto-runs malware the instant it is plugged in.' },
  { front: 'Vulnerable software', back: 'An unpatched or outdated application with a known, publicly documented CVE that has not been remediated.' },
  { front: 'Default credentials', back: 'A device or account still using its factory-set or well-known default username and password.' },
  { front: 'Open service port', back: 'An unnecessary listening network service that expands the attack surface with no business justification.' },
  { front: 'Supply chain', back: 'Compromise introduced through a trusted vendor, hardware component, or software dependency before it ever reaches the target.' },
]

export default function ThreatVectorFlipCards() {
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
        <h3 className="font-display text-lg text-ink">Threat Vectors &amp; Attack Surfaces</h3>
        <p className="text-sm text-soft">Domain 2.2 — click a card to flip between the vector name and how it is used.</p>
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
        A threat vector is the path an attacker takes in; an attack surface is every point that could be used as
        one. Reducing attack surface — closing unused ports, decommissioning unsupported software, disabling
        unused accounts — removes vectors before an attacker ever has to use them.
      </div>
    </div>
  )
}
