import { useState } from 'react'

interface Tier {
  name: string
  scope: string
  detail: string
}

// Bottom of stack (broadest population, least sensitive) to top (narrowest, most sensitive).
const TIERS: Tier[] = [
  {
    name: 'Tier 3 — Standard User Accounts',
    scope: 'Broadest',
    detail: 'Everyday end-user accounts, limited to email, file shares, and approved business applications. Highest headcount, but the lowest individual blast radius if one is compromised.',
  },
  {
    name: 'Tier 2 — Workstation / Help Desk Admin',
    scope: 'Moderate',
    detail: 'Local admin rights on end-user workstations for support staff. A compromised account can pivot to whichever workstation it touches, but not to servers or identity infrastructure.',
  },
  {
    name: 'Tier 1 — Server / Application Admin',
    scope: 'High',
    detail: 'Administrative rights over application and member servers. Compromise can expose business data and configuration across many servers, not just a single endpoint.',
  },
  {
    name: 'Tier 0 — Identity Infrastructure (PAM / Domain Controllers)',
    scope: 'Critical',
    detail: 'Control over Active Directory, PAM vaults, and identity providers. Compromise of a Tier 0 account is effectively a total takeover of the enterprise identity plane.',
  },
]

const COLOR = ['bg-heat-1', 'bg-heat-3', 'bg-heat-5', 'bg-heat-6']
const TEXT = ['text-ink', 'text-ink', 'text-paper', 'text-paper']

export default function IdentityAccessSocTiers() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Privileged Access Tiering</h3>
        <p className="text-sm text-soft">Domain 1.1 — click a tier to see why identity infrastructure sits above everyday user accounts.</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {[...TIERS].reverse().map((tier, revIdx) => {
          const i = TIERS.length - 1 - revIdx
          const widthPct = 40 + (i / (TIERS.length - 1)) * 55
          return (
            <button
              key={tier.name}
              onClick={() => setSelected(i)}
              style={{ width: `${widthPct}%` }}
              className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${COLOR[i]} ${TEXT[i]} ${
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
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${COLOR[selected]} ${TEXT[selected]}`}>
            Blast radius: {TIERS[selected].scope}
          </span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Tiered administration keeps a compromised Tier 3 helpdesk password from ever being usable against a Tier 0
        domain controller — credentials for higher tiers should never be entered on a lower-tier, less-trusted host.
      </div>
    </div>
  )
}
