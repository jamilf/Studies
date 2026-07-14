import { useState } from 'react'

interface Tier {
  name: string
  pain: string
  detail: string
}

// Bottom of pyramid (widest, easiest for attacker to change) to top (hardest).
const TIERS: Tier[] = [
  {
    name: 'Hash Values',
    pain: 'Trivial',
    detail: 'A file hash changes the instant the attacker recompiles or even flips one byte. Blocking a hash denies exactly one file, once.',
  },
  {
    name: 'IP Addresses',
    pain: 'Easy',
    detail: 'Attackers rotate IPs via new hosting, VPNs, or compromised infrastructure in minutes. Blocking one IP barely slows a well-resourced actor.',
  },
  {
    name: 'Domain Names',
    pain: 'Simple',
    detail: 'Registering a new domain takes minutes and costs little, but it is slightly more friction than rotating an IP — DNS records, propagation, some reputation to rebuild.',
  },
  {
    name: 'Network / Host Artifacts',
    pain: 'Annoying',
    detail: 'Distinctive User-Agent strings, registry keys, file paths, or C2 URI patterns. Changing these requires modifying tooling configuration, not just infrastructure.',
  },
  {
    name: 'Tools',
    pain: 'Challenging',
    detail: 'Denying the actual malware/tool (e.g., a specific RAT) forces the attacker to find, buy, or build a replacement — real time and cost.',
  },
  {
    name: 'TTPs',
    pain: 'Tough!',
    detail: "Detecting HOW an attacker operates — their tradecraft, not their tools — is the ceiling. To evade this, they must relearn their entire playbook. This is what durable detection should target.",
  },
]

// Heat ramp: bottom tier (trivial to change) is pale, top tier (toughest) is deep brick.
const PAIN_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']
const PAIN_TEXT = ['text-ink', 'text-ink', 'text-ink', 'text-paper', 'text-paper', 'text-paper']

export default function PyramidOfPain() {
  const [selected, setSelected] = useState(TIERS.length - 1)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">The Pyramid of Pain</h3>
        <p className="text-sm text-soft">
          Domain 1.2 — click a tier to see how costly it is for an attacker to change that indicator.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {[...TIERS].reverse().map((tier, revIdx) => {
          const i = TIERS.length - 1 - revIdx
          const widthPct = 30 + (i / (TIERS.length - 1)) * 65
          return (
            <button
              key={tier.name}
              onClick={() => setSelected(i)}
              style={{ width: `${widthPct}%` }}
              className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${PAIN_COLOR[i]} ${PAIN_TEXT[i]} ${
                i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.03]' : 'opacity-80 hover:opacity-100'
              }`}
            >
              {tier.name}
            </button>
          )
        })}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${PAIN_COLOR[selected]} ${PAIN_TEXT[selected]}`}
          >
            Pain: {TIERS[selected].pain}
          </span>
          <h4 className="font-semibold text-ink">{TIERS[selected].name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Why this matters for detection strategy</p>
        <p className="text-ink">
          Detections built on hashes or IPs (bottom of the pyramid) expire almost as fast as you write them. Building
          detections around TTPs — the top — forces an attacker to change how they fundamentally operate, which is
          slow, expensive, and sometimes impossible for them to do quickly.
        </p>
      </div>
    </div>
  )
}
