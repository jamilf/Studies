import { useState } from 'react'

interface Tier {
  name: string
  purpose: string
}

const TIERS: Tier[] = [
  {
    name: 'Management account (root)',
    purpose:
      'Creates the organization, owns consolidated billing, and is the only account that can create OUs, invite/remove member accounts, and apply Service Control Policies. It should run no workloads at all — the blast radius of compromising it is the entire organization.',
  },
  {
    name: 'Security OU — Log Archive account',
    purpose:
      'A dedicated account that receives an immutable copy of CloudTrail logs, Config snapshots, and other audit data from every account, so evidence survives even if the source account is compromised.',
  },
  {
    name: 'Security OU — Audit/Security Tooling account',
    purpose:
      'Delegated administrator for GuardDuty, Security Hub, and Config, giving the security team an org-wide view without granting them standing access into workload accounts themselves.',
  },
  {
    name: 'Infrastructure OU',
    purpose:
      'Shared-services accounts — networking hubs (Transit Gateway), CI/CD, and shared tooling that multiple workload teams depend on but that isn\'t itself customer-facing.',
  },
  {
    name: 'Workloads OU (prod / non-prod)',
    purpose:
      'Where application teams actually run production and pre-production environments, each isolated into its own account so a mistake or breach in one workload cannot reach another.',
  },
  {
    name: 'Sandbox OU',
    purpose:
      'Loosely-governed accounts for experimentation, often with automatic account closure or spend limits, kept fully isolated from anything that touches real data.',
  },
]

const TIER_COLOR: string[] = ['bg-heat-6', 'bg-heat-5', 'bg-heat-4', 'bg-heat-3', 'bg-heat-2', 'bg-heat-1']
const TIER_TEXT: string[] = ['text-paper', 'text-paper', 'text-paper', 'text-ink', 'text-ink', 'text-ink']
const TIER_WIDTH: number[] = [95, 85, 78, 68, 58, 42]

export default function OrganizationsAccountStructure() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">AWS Organizations: A Typical Account Structure</h3>
        <p className="text-sm text-soft">Domain 6.1 — click a tier to see why that account or OU exists and what it should (and shouldn't) run.</p>
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
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].purpose}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The guiding principle is isolation by blast radius: the management account is the most privileged and
        should be the emptiest, while workload and sandbox accounts hold the actual risk surface but are the most
        replaceable. OUs let SCPs and Control Tower guardrails apply consistently to whole groups of accounts at
        once instead of one at a time.
      </div>
    </div>
  )
}
