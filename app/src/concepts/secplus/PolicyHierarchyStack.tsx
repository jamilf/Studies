import { useState } from 'react'

interface Tier {
  name: string
  mandatory: boolean
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Governance',
    mandatory: true,
    desc: 'Board- and executive-level direction: who is accountable for security, what risk appetite the organization accepts, and which committees oversee the rest of this stack. Sets the "why" behind everything below it.',
  },
  {
    name: 'Policy',
    mandatory: true,
    desc: 'A high-level, mandatory statement of intent — an Acceptable Use Policy or Information Security Policy. States what must happen and why, without prescribing exact technical settings.',
  },
  {
    name: 'Standard',
    mandatory: true,
    desc: 'Specific, mandatory requirements that implement a policy — e.g., a password standard defining minimum length, complexity, and rotation. Standards make a policy measurable and auditable.',
  },
  {
    name: 'Procedure',
    mandatory: true,
    desc: 'Mandatory, step-by-step instructions for carrying out a standard — e.g., the exact steps a help desk technician follows to reset a password securely and verify identity first.',
  },
  {
    name: 'Guideline',
    mandatory: false,
    desc: 'Recommended, non-mandatory best practices that fill gaps where no strict standard applies — offering suggested approaches without requiring one specific implementation.',
  },
]

const WIDTH = [95, 80, 65, 50, 35]
const COLOR = ['bg-heat-5', 'bg-heat-4', 'bg-heat-3', 'bg-heat-2', 'bg-heat-1']
const TEXT = ['text-paper', 'text-paper', 'text-ink', 'text-ink', 'text-ink']

export default function PolicyHierarchyStack() {
  const [selected, setSelected] = useState(1)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Security Documentation Hierarchy</h3>
        <p className="text-sm text-soft">
          Domain 5.1 — click a tier to see how governance flows down into policies, standards, procedures, and guidelines.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${WIDTH[i]}%` }}
            className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${COLOR[i]} ${TEXT[i]} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.02]' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${TIERS[selected].mandatory ? 'bg-warn text-paper' : 'bg-good text-paper'}`}
          >
            {TIERS[selected].mandatory ? 'Mandatory' : 'Recommended'}
          </span>
          <h4 className="font-semibold text-ink">{TIERS[selected].name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Only guidelines are optional — governance, policies, standards, and procedures are all mandatory. Exam
        questions often test whether you can tell a mandatory "standard" (specific numbers) apart from an optional
        "guideline" (suggested practice) describing the same topic.
      </div>
    </div>
  )
}
