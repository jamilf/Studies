import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'Automatic rotation', back: 'Secrets Manager — built-in scheduled rotation with Lambda rotation functions, including native integrations for RDS, Redshift, and DocumentDB credentials.' },
  { front: 'Cost', back: 'Parameter Store Standard tier is free; Secrets Manager charges per secret per month plus API calls. Parameter Store Advanced tier adds a small per-parameter charge.' },
  { front: 'Best for plain config values', back: 'Systems Manager Parameter Store — simple key/value config (feature flags, AMI IDs, endpoint URLs) that does not need rotation, stored as String, StringList, or SecureString.' },
  { front: 'Best for database credentials', back: 'Secrets Manager — purpose-built for secrets like DB passwords and API keys, with automatic rotation and native cross-service integration.' },
  { front: 'Cross-account sharing', back: 'Secrets Manager supports resource policies for direct cross-account access to a secret; Parameter Store parameters are typically accessed only within the same account unless proxied.' },
  { front: 'Encryption at rest', back: 'Both integrate with AWS KMS to encrypt SecureString parameters / secret values — encryption itself is not a differentiator between the two.' },
]

export default function SecretsManagerVsParameterStore() {
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
        <h3 className="font-display text-lg text-ink">Secrets Manager vs Parameter Store</h3>
        <p className="text-sm text-soft">Domain 1.3 — click a card to reveal which service the trait belongs to.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'}`}
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
        Default heuristic for the exam: if the scenario says "database credentials" or "rotation," pick Secrets
        Manager; if it says "configuration value" or "cheap/free," pick Parameter Store.
      </div>
    </div>
  )
}
