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

const PAIN_COLOR = ['bg-slate-600', 'bg-sky-600', 'bg-emerald-600', 'bg-lime-600', 'bg-amber-600', 'bg-red-600']

export default function PyramidOfPain() {
  const [selected, setSelected] = useState(TIERS.length - 1)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">The Pyramid of Pain</h3>
        <p className="text-sm text-slate-400">
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
              className={`transition-all duration-300 rounded-md py-2.5 text-center text-white text-sm font-semibold ${PAIN_COLOR[i]} ${
                i === selected ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-white scale-[1.03]' : 'opacity-80 hover:opacity-100'
              }`}
            >
              {tier.name}
            </button>
          )
        })}
      </div>

      <div key={selected} className="rounded-xl border border-slate-800 bg-slate-900 p-5 animate-[fadein_0.3s_ease-out]">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded px-2 py-0.5 text-[11px] font-semibold text-white ${PAIN_COLOR[selected]}`}>
            Pain: {TIERS[selected].pain}
          </span>
          <h4 className="font-semibold text-slate-100">{TIERS[selected].name}</h4>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-lg border border-amber-800/50 bg-amber-950/30 p-4 text-sm text-amber-200">
        <p className="font-semibold mb-1">Why this matters for detection strategy</p>
        <p className="text-amber-200/80">
          Detections built on hashes or IPs (bottom of the pyramid) expire almost as fast as you write them. Building
          detections around TTPs — the top — forces an attacker to change how they fundamentally operate, which is
          slow, expensive, and sometimes impossible for them to do quickly.
        </p>
      </div>
    </div>
  )
}
