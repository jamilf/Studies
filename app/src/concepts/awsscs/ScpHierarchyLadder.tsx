import { useState } from 'react'

interface Tier {
  name: string
  scope: string
  detail: string
}

const TIERS: Tier[] = [
  {
    name: 'Organization root SCP',
    scope: 'Every account in the organization',
    detail:
      "Attached at the root of AWS Organizations, this SCP applies to every OU and every account below it — the broadest possible guardrail (e.g. \"deny leaving the organization's approved regions,\" org-wide).",
  },
  {
    name: 'OU-level SCP',
    scope: 'Every account inside that OU',
    detail:
      'Attached to an Organizational Unit, it applies to every account nested in that OU (and any nested OUs below it) — e.g. a stricter guardrail just for the "Sandbox" OU.',
  },
  {
    name: 'Account-level SCP',
    scope: 'One member account',
    detail: 'Attached directly to a single account, it applies to every IAM identity inside that one account only.',
  },
  {
    name: 'IAM identity policy',
    scope: 'One IAM user or role',
    detail:
      'The identity-based (or resource-based) policy on the specific principal making the call — the only layer that can actually GRANT a permission, everything above it can only restrict.',
  },
]

const TIER_COLOR: string[] = ['bg-heat-6', 'bg-heat-5', 'bg-heat-3', 'bg-heat-1']
const TIER_TEXT: string[] = ['text-paper', 'text-paper', 'text-ink', 'text-ink']
const TIER_WIDTH: number[] = [95, 75, 55, 35]

export default function ScpHierarchyLadder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">SCP Hierarchy: Scope Narrows, Restrictions Stack</h3>
        <p className="text-sm text-soft">Domain 6.1 — click a layer to see what it applies to. Effective permission is the intersection of ALL of them.</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${TIER_WIDTH[i]}%` }}
            className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${TIER_COLOR[i]} ${TIER_TEXT[i]} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.03]' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${TIER_COLOR[selected]} ${TIER_TEXT[selected]}`}>
            Applies to: {TIERS[selected].scope}
          </span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        SCPs never grant a permission by themselves — they only filter what the identity's own policy is allowed
        to use. A user with <code className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">s3:*</code> in
        their IAM policy still gets denied if ANY SCP above them (root, OU, or account) doesn't allow it. Think
        AND across every layer, not OR.
      </div>
    </div>
  )
}
