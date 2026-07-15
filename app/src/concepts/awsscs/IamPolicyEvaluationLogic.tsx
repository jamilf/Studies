import { useMemo, useState } from 'react'

type Stance = 'allow' | 'silent' | 'deny'
type Scope = 'same-account' | 'cross-account'

interface Verdict {
  outcome: 'allow' | 'deny'
  tone: 'good' | 'bad' | 'warn'
  reason: string
}

function evaluate(identity: Stance, resource: Stance, scope: Scope): Verdict {
  if (identity === 'deny' || resource === 'deny') {
    return {
      outcome: 'deny',
      tone: 'bad',
      reason:
        'An explicit Deny in EITHER the identity-based policy or the resource-based policy always wins, no matter what any other policy says. Explicit deny is the single highest-precedence rule in the entire evaluation.',
    }
  }
  if (scope === 'same-account') {
    if (identity === 'allow' || resource === 'allow') {
      return {
        outcome: 'allow',
        tone: 'good',
        reason:
          'Within the same account, an Allow in EITHER policy is enough to grant access — the resource policy can grant access on its own even if the identity policy is silent, and vice versa, as long as nothing explicitly denies it.',
      }
    }
    return {
      outcome: 'deny',
      tone: 'warn',
      reason:
        'Neither the identity-based policy nor the resource-based policy contains an Allow statement for this action. With no explicit Allow anywhere, the default-deny rule applies — access is denied by omission, not by an explicit Deny.',
    }
  }
  if (identity === 'allow' && resource === 'allow') {
    return {
      outcome: 'allow',
      tone: 'good',
      reason:
        "For cross-account access, BOTH sides must explicitly Allow: the caller's identity policy must grant the action on the resource ARN, AND the resource's policy must name the calling account/principal as trusted. Same-account's \"either side\" shortcut does not apply across accounts.",
    }
  }
  return {
    outcome: 'deny',
    tone: 'warn',
    reason:
      identity === 'allow'
        ? "The caller's identity policy allows this, but the resource-based policy in the other account never named this caller as a trusted principal — the resource owner never opened the door."
        : resource === 'allow'
          ? "The resource-based policy trusts this caller, but the caller's own identity policy never granted permission to actually take the action — having an invitation is not the same as having a key."
          : 'Cross-account access needs an explicit Allow on both sides; here neither policy grants it.',
  }
}

const STANCES: { value: Stance; label: string }[] = [
  { value: 'allow', label: 'Allow' },
  { value: 'silent', label: 'Not specified' },
  { value: 'deny', label: 'Explicit Deny' },
]

const TONE_CLASSES: Record<Verdict['tone'], string> = {
  good: 'border-good bg-good-tint text-good',
  bad: 'border-bad bg-bad-tint text-bad',
  warn: 'border-warn bg-warn-tint text-warn',
}

export default function IamPolicyEvaluationLogic() {
  const [identity, setIdentity] = useState<Stance>('allow')
  const [resource, setResource] = useState<Stance>('silent')
  const [scope, setScope] = useState<Scope>('same-account')

  const verdict = useMemo(() => evaluate(identity, resource, scope), [identity, resource, scope])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Identity-Based vs Resource-Based Policy Evaluation</h3>
        <p className="text-sm text-soft">
          Domain 4.2 — pick each policy's stance and the account scope to see whether the request is allowed.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Identity-based policy (attached to the caller)</p>
          <div className="flex gap-1.5">
            {STANCES.map((s) => (
              <button
                key={s.value}
                onClick={() => setIdentity(s.value)}
                className={`flex-1 rounded-crisp border px-2 py-2 text-xs font-medium transition-colors ${
                  identity === s.value ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Resource-based policy (attached to the target)</p>
          <div className="flex gap-1.5">
            {STANCES.map((s) => (
              <button
                key={s.value}
                onClick={() => setResource(s.value)}
                className={`flex-1 rounded-crisp border px-2 py-2 text-xs font-medium transition-colors ${
                  resource === s.value ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1">Account scope</p>
        <div className="flex gap-1.5">
          {(['same-account', 'cross-account'] as Scope[]).map((sc) => (
            <button
              key={sc}
              onClick={() => setScope(sc)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                scope === sc ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {sc === 'same-account' ? 'Same account' : 'Cross-account'}
            </button>
          ))}
        </div>
      </div>

      <div key={`${identity}-${resource}-${scope}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${TONE_CLASSES[verdict.tone]}`}>
        <p className="font-display text-lg font-semibold">{verdict.outcome === 'allow' ? 'ALLOWED' : 'DENIED'}</p>
        <p className="text-sm text-ink mt-1 leading-relaxed">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        AWS evaluates every applicable policy and merges them into one decision: an explicit Deny anywhere always
        wins; otherwise, same-account requests are allowed if any policy says Allow, but cross-account requests
        need an explicit Allow from both the caller's identity policy AND the resource's policy — with no
        matching Allow, the request falls through to the implicit default deny.
      </div>
    </div>
  )
}
