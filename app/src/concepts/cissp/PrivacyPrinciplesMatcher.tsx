import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'Data minimization', back: 'Collect only the data actually needed for the stated purpose — no gathering "just in case" it might be useful later. Fewer fields collected means less exposure if a breach occurs.' },
  { front: 'Purpose limitation', back: 'Use data only for the purpose disclosed at collection time. Repurposing marketing analytics data for, say, credit decisions without new notice/consent violates this principle.' },
  { front: 'Storage limitation', back: 'Keep personal data only as long as needed to fulfill its purpose, then delete or anonymize it — this is what drives retention schedules and secure disposal requirements.' },
  { front: 'Data quality / accuracy', back: 'Personal data must be accurate and kept up to date, with a mechanism for the data subject to correct errors — inaccurate data can cause real harm to the individual it describes.' },
  { front: 'Consent', back: 'Processing personal data generally requires a freely given, specific, informed, and unambiguous indication of the data subject\'s wishes — silence or a pre-ticked box is not valid consent under most modern privacy law.' },
  { front: 'Accountability', back: 'The organization processing data must be able to demonstrate compliance with these principles, not just assert it — this is why privacy impact assessments and audit trails matter.' },
]

export default function PrivacyPrinciplesMatcher() {
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
        <h3 className="font-display text-lg text-ink">Core Privacy Principles</h3>
        <p className="text-sm text-soft">Domain 2.2 — click a principle to flip it and reveal what it actually requires.</p>
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
        These principles recur across privacy frameworks (GDPR, ISC2's privacy-by-design guidance, most national data
        protection laws) even when the exact wording differs — they exist to limit how much data an organization
        holds and for how long, which directly shrinks its breach exposure.
      </div>
    </div>
  )
}
