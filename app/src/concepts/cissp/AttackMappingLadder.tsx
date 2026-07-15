import { useState } from 'react'

interface Tier {
  name: string
  type: string
  detail: string
}

const TIERS: Tier[] = [
  { name: 'Eavesdropping / Sniffing', type: 'Passive', detail: 'Silently capturing traffic (e.g., with Wireshark) — hard to detect, and needs unencrypted data to be useful.' },
  { name: 'Spoofing (IP/MAC/ARP)', type: 'Active — basic', detail: 'Falsifying an address to impersonate a trusted host.' },
  { name: 'Session Hijacking', type: 'Active', detail: 'Stealing or predicting a valid session token to take over an authenticated session.' },
  { name: 'On-Path (MITM)', type: 'Active', detail: 'Actively positioned between two parties, intercepting or altering traffic in real time.' },
  { name: 'Denial of Service', type: 'Availability attack', detail: 'Overwhelming a single target from one source.' },
  { name: 'Distributed Denial of Service', type: 'Availability attack, distributed', detail: 'The same goal as DoS but from many distributed sources (a botnet) — far larger scale and harder to filter.' },
]

const COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']
const TEXT = ['text-ink', 'text-ink', 'text-ink', 'text-paper', 'text-paper', 'text-paper']

export default function AttackMappingLadder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Network Attack Sophistication Ladder</h3>
        <p className="text-sm text-soft">Domain 4.1 — click a tier to see how complexity and impact escalate.</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${40 + (i / (TIERS.length - 1)) * 55}%` }}
            className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${COLOR[i]} ${TEXT[i]} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.03]' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${COLOR[selected]} ${TEXT[selected]}`}>{TIERS[selected].type}</span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Each tier up generally requires more attacker positioning or resources, and causes broader impact than the
        tier below it.
      </div>
    </div>
  )
}
