import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'Log Review', back: 'Manually or programmatically inspecting system, application, and security logs for anomalies, policy violations, or evidence a control failed — foundational and often the cheapest control-testing technique available.' },
  { front: 'Synthetic Transactions', back: 'Scripted, artificial transactions run against a live system (e.g., a fake "purchase" on an e-commerce site) to continuously verify that a control or process is functioning correctly without waiting for a real user to trigger it.' },
  { front: 'Misuse Case Testing', back: 'Testing built around how a malicious actor would deliberately abuse a feature (the inverse of a normal "use case"), verifying that the system rejects or safely handles the abusive path.' },
  { front: 'Interface Testing', back: 'Verifying that the boundaries between components — APIs, user interfaces, and interconnections with external systems — correctly enforce validation, authentication, and authorization at each handoff.' },
  { front: 'Compliance Checks', back: 'Comparing a system\'s actual configuration against a required baseline or standard (e.g., a CIS benchmark) to confirm settings haven\'t drifted out of an approved, hardened state.' },
  { front: 'Breach & Attack Simulation (BAS)', back: 'Automated, repeatable tooling that continuously launches known attack techniques against production defenses to validate that detective and preventive controls still catch them — without the scope and cost of a full red team.' },
]

export default function ControlTestingMethodMatcher() {
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
        <h3 className="font-display text-lg text-ink">Security Control Testing Techniques</h3>
        <p className="text-sm text-soft">Domain 6.2 — click a card to reveal how each control-testing technique actually works.</p>
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
        Security control testing covers more than penetration testing and vulnerability scanning — log review,
        synthetic transactions, misuse case testing, interface testing, compliance checks, and breach and attack
        simulation are all ways to continuously verify that a control is actually doing what it's supposed to do.
      </div>
    </div>
  )
}
