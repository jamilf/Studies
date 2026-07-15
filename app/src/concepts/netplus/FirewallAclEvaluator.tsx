import { useMemo, useState } from 'react'

type Port = '22' | '80' | '443' | '3389'
type RuleSetId = 'web-only' | 'block-rdp'

const PORT_LABELS: Record<Port, string> = {
  '22': '22 (SSH)',
  '80': '80 (HTTP)',
  '443': '443 (HTTPS)',
  '3389': '3389 (RDP)',
}

const RULE_SETS: Record<RuleSetId, { label: string; rules: string[] }> = {
  'web-only': {
    label: 'Web-only ACL',
    rules: ['1: permit tcp any any eq 80', '2: permit tcp any any eq 443', '3: implicit deny all'],
  },
  'block-rdp': {
    label: 'Block RDP ACL',
    rules: ['1: deny tcp any any eq 3389', '2: permit ip any any'],
  },
}

function evaluateAcl(port: Port, ruleSetId: RuleSetId): { verdict: 'ALLOW' | 'DENY'; matchedRule: string } {
  if (ruleSetId === 'web-only') {
    if (port === '80') return { verdict: 'ALLOW', matchedRule: '1: permit tcp any any eq 80' }
    if (port === '443') return { verdict: 'ALLOW', matchedRule: '2: permit tcp any any eq 443' }
    return { verdict: 'DENY', matchedRule: '3: implicit deny all (nothing else matched)' }
  }
  if (port === '3389') return { verdict: 'DENY', matchedRule: '1: deny tcp any any eq 3389' }
  return { verdict: 'ALLOW', matchedRule: '2: permit ip any any' }
}

export default function FirewallAclEvaluator() {
  const [port, setPort] = useState<Port>('80')
  const [ruleSetId, setRuleSetId] = useState<RuleSetId>('web-only')

  const result = useMemo(() => evaluateAcl(port, ruleSetId), [port, ruleSetId])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Firewall ACL Evaluator</h3>
        <p className="text-sm text-soft">
          Domain 4.2 — pick a destination port and a rule set to see how top-down evaluation decides the outcome.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Destination port</p>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(PORT_LABELS) as Port[]).map((p) => (
              <button
                key={p}
                onClick={() => setPort(p)}
                className={`rounded-crisp border px-3 py-1.5 text-xs font-mono transition-colors ${
                  port === p ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {PORT_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Rule set</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(RULE_SETS) as RuleSetId[]).map((id) => (
              <button
                key={id}
                onClick={() => setRuleSetId(id)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  ruleSetId === id ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {RULE_SETS[id].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-3 font-mono text-xs text-soft space-y-1">
        {RULE_SETS[ruleSetId].rules.map((r) => (
          <p key={r}>{r}</p>
        ))}
      </div>

      <div
        key={`${port}-${ruleSetId}`}
        className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${
          result.verdict === 'ALLOW' ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
        }`}
      >
        <p className={`font-display text-2xl font-semibold ${result.verdict === 'ALLOW' ? 'text-good' : 'text-bad'}`}>
          {result.verdict}
        </p>
        <p className="text-sm text-ink mt-1 font-mono">{result.matchedRule}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Firewalls and ACLs evaluate rules top-down and stop at the first match. If nothing matches, the implicit deny
        at the end blocks it — rule ORDER matters as much as rule content, and a broad permit placed too early can
        shadow a more specific deny below it.
      </div>
    </div>
  )
}
