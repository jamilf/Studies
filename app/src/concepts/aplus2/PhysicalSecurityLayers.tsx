import { useState } from 'react'

interface Tier {
  name: string
  strength: string
  detail: string
}

const TIERS: Tier[] = [
  {
    name: 'Privacy/door lock',
    strength: 'Baseline',
    detail:
      'A standard door lock keeps out casual, opportunistic entry but offers little resistance to a determined intruder — it is a deterrent, not a real barrier, and the weakest layer here.',
  },
  {
    name: 'Cable lock',
    strength: 'Baseline, device-level',
    detail:
      'Physically tethers a laptop or small device to a fixed object. It stops grab-and-go theft in a shared space but does nothing to protect the room itself or the data on the device.',
  },
  {
    name: 'Badge/proximity card reader',
    strength: 'Moderate',
    detail:
      'Requires possession of a valid access card to unlock a door, and logs every entry attempt. Stronger than a shared key because access can be revoked per-badge and audited, but a lost or cloned badge still grants entry.',
  },
  {
    name: 'Biometric lock',
    strength: 'Strong',
    detail:
      'Ties access to a physical trait — fingerprint, retina, or facial scan — that is far harder to lose, share, or duplicate than a badge or key, tightly binding "who unlocked this" to a specific person.',
  },
  {
    name: 'Access control vestibule (mantrap)',
    strength: 'Strong, anti-tailgating',
    detail:
      'A two-door interlocking chamber that only opens the second door after the first is closed and access is verified, specifically defeating tailgating/piggybacking — where an unauthorized person slips in behind an authorized one.',
  },
  {
    name: 'Security guard',
    strength: 'Highest, human judgment',
    detail:
      'A trained person can verify identity against a badge or visitor log, question anomalies, and respond to situations no automated control can — the most adaptable and highest layer of physical defense, usually paired with the controls below it rather than replacing them.',
  },
]

const HEAT = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']
const HEAT_TEXT = ['text-ink', 'text-ink', 'text-ink', 'text-paper', 'text-paper', 'text-paper']

export default function PhysicalSecurityLayers() {
  const [selected, setSelected] = useState(TIERS.length - 1)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Physical Security Control Ladder</h3>
        <p className="text-sm text-soft">Domain 2.1 — click a control to see how strong a physical barrier it really is.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${40 + (i / (TIERS.length - 1)) * 55}%` }}
            className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${HEAT[i]} ${HEAT_TEXT[i]} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.02]' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${HEAT[selected]} ${HEAT_TEXT[selected]}`}>
            {TIERS[selected].strength}
          </span>
          <h4 className="font-semibold text-ink">{TIERS[selected].name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: physical security is defense in depth — a real facility layers several of these controls
        rather than picking one. Know the specific vocabulary: "access control vestibule" is the current
        CompTIA term for what used to be called a mantrap, and it exists specifically to stop tailgating.
      </div>
    </div>
  )
}
