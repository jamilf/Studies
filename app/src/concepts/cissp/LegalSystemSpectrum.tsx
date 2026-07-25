import { useMemo, useState } from 'react'

interface LegalSystem {
  name: string
  source: string
  role: string
  example: string
}

const SYSTEMS: LegalSystem[] = [
  { name: 'Civil Law', source: 'Comprehensive written codes and statutes', role: 'Judges apply the written code to facts; limited precedent role.', example: 'France, Germany, most of continental Europe.' },
  { name: 'Common Law', source: 'Statutes plus binding judicial precedent (case law)', role: 'Courts interpret statutes and prior rulings bind future decisions (stare decisis).', example: 'United States, United Kingdom, Canada, Australia.' },
  { name: 'Customary Law', source: 'Long-standing traditions and customs of a community', role: 'Unwritten norms govern behavior, often alongside a formal system.', example: 'Regions of Africa and Asia with tribal or local custom.' },
  { name: 'Religious Law', source: 'Religious texts and doctrine', role: 'Religious authority interprets and applies doctrine as law.', example: 'Sharia law in parts of the Middle East; Halakha, Canon law.' },
  { name: 'Mixed / Hybrid', source: 'Combination of two or more of the above', role: 'Different domains (e.g., family law vs commercial law) draw from different sources.', example: 'India (common + religious + customary), South Africa.' },
]

export default function LegalSystemSpectrum() {
  const [idx, setIdx] = useState(1)
  const system = useMemo(() => SYSTEMS[idx], [idx])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">World Legal System Families</h3>
        <p className="text-sm text-soft">Domain 1.3 — slide across the major legal system types recognized for cross-border compliance work.</p>
      </div>

      <div className="space-y-2">
        <input
          type="range" aria-label="World Legal System Families"
          min={0}
          max={SYSTEMS.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-[11px] text-faint font-mono px-0.5">
          {SYSTEMS.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setIdx(i)}
              className={`transition-colors ${i === idx ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            >
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div key={system.name} className="grid sm:grid-cols-2 gap-3 animate-fadein">
        <div className="rounded-crisp border border-line bg-surface p-3">
          <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-1">Primary source of law</p>
          <p className="text-sm text-ink">{system.source}</p>
        </div>
        <div className="rounded-crisp border border-line bg-surface p-3">
          <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-1">Role of the court</p>
          <p className="text-sm text-ink">{system.role}</p>
        </div>
      </div>

      <div key={`${system.name}-detail`} className="rounded-crisp bg-accent-tint border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="font-semibold text-accent">{system.name}</p>
        <p className="text-sm text-soft leading-relaxed mt-1">Found in: {system.example}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A CISSP working across jurisdictions must recognize which family governs a given contract, breach-notification
        duty, or data-transfer requirement — common law relies heavily on precedent while civil law relies on the
        written code, which changes how quickly legal obligations can shift.
      </div>
    </div>
  )
}
