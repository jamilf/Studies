import { useMemo, useState } from 'react'

type Level = 'instance' | 'subnet'
type Rule = 'allow-only' | 'allow-and-deny'

interface Verdict {
  tool: string
  good: boolean
  reason: string
}

function evaluate(level: Level, rule: Rule): Verdict {
  if (level === 'instance' && rule === 'allow-only') {
    return {
      tool: 'Security Group',
      good: true,
      reason: 'Security groups operate at the ENI/instance level and are stateful — a return packet for an allowed request is automatically permitted. They only support "allow" rules; there is no explicit deny.',
    }
  }
  if (level === 'subnet' && rule === 'allow-and-deny') {
    return {
      tool: 'Network ACL',
      good: true,
      reason: 'NACLs operate at the subnet boundary and are stateless — inbound and outbound rules are evaluated independently. They support both explicit allow and explicit deny rules, evaluated in numbered order.',
    }
  }
  if (level === 'instance' && rule === 'allow-and-deny') {
    return {
      tool: 'Neither matches cleanly',
      good: false,
      reason: 'Security groups cannot express an explicit deny — if you need to block a specific IP while allowing others at the instance level, you actually need a NACL at the subnet level instead.',
    }
  }
  return {
    tool: 'Neither matches cleanly',
    good: false,
    reason: 'A NACL applies to every instance in the subnet, not a single one — if you only need simple allow rules for one instance, a security group is the simpler, more scoped tool.',
  }
}

export default function NaclVsSecurityGroupDecision() {
  const [level, setLevel] = useState<Level>('instance')
  const [rule, setRule] = useState<Rule>('allow-only')
  const verdict = useMemo(() => evaluate(level, rule), [level, rule])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Security Groups vs Network ACLs</h3>
        <p className="text-sm text-soft">Domain 1.2 — pick a scope and rule type to see which network control fits.</p>
      </div>

      <div>
        <p className="text-xs text-faint uppercase tracking-wider mb-1.5">Where does the control need to apply?</p>
        <div className="flex gap-2">
          {(['instance', 'subnet'] as Level[]).map((l) => (
            <button key={l} onClick={() => setLevel(l)} className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${level === l ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
              {l === 'instance' ? 'Single instance / ENI' : 'Whole subnet'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-faint uppercase tracking-wider mb-1.5">What rule type do you need?</p>
        <div className="flex gap-2">
          {(['allow-only', 'allow-and-deny'] as Rule[]).map((r) => (
            <button key={r} onClick={() => setRule(r)} className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${rule === r ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
              {r === 'allow-only' ? 'Allow rules only' : 'Allow AND explicit deny'}
            </button>
          ))}
        </div>
      </div>

      <div key={`${level}-${rule}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${verdict.good ? 'border-good bg-good-tint' : 'border-warn bg-warn-tint'}`}>
        <p className={`font-display text-xl font-semibold ${verdict.good ? 'text-good' : 'text-warn'}`}>{verdict.tool}</p>
        <p className="text-sm text-ink mt-1 leading-relaxed">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Remember the two axes: scope (instance vs subnet) and state (stateful vs stateless). Security groups are
        instance-scoped and stateful with allow-only rules; NACLs are subnet-scoped and stateless with numbered
        allow/deny rules. Most designs use both, layered together.
      </div>
    </div>
  )
}
