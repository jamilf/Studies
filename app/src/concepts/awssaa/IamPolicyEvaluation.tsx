import { useMemo, useState } from 'react'

type Presence = 'none' | 'yes'

export default function IamPolicyEvaluation() {
  const [explicitDeny, setExplicitDeny] = useState<Presence>('none')
  const [explicitAllow, setExplicitAllow] = useState<Presence>('yes')

  const result = useMemo(() => {
    if (explicitDeny === 'yes') {
      return { verdict: 'DENY', reason: 'An explicit Deny anywhere — SCP, permission boundary, or identity/resource policy — always wins, no matter what else grants access.' }
    }
    if (explicitAllow === 'yes') {
      return { verdict: 'ALLOW', reason: 'No explicit Deny was found, and there is an explicit Allow, so the request is permitted.' }
    }
    return { verdict: 'DENY', reason: 'No explicit Deny and no explicit Allow — IAM defaults to implicit deny when nothing grants access.' }
  }, [explicitDeny, explicitAllow])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">IAM Policy Evaluation Logic</h3>
        <p className="text-sm text-soft">Domain 1.1 — pick which explicit statements exist to see how IAM resolves the request.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Explicit Deny present? (SCP / boundary / policy)</p>
          <div className="flex gap-2">
            {(['none', 'yes'] as Presence[]).map((p) => (
              <button key={p} onClick={() => setExplicitDeny(p)} className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${explicitDeny === p ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
                {p === 'none' ? 'No' : 'Yes'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Explicit Allow present?</p>
          <div className="flex gap-2">
            {(['none', 'yes'] as Presence[]).map((p) => (
              <button key={p} onClick={() => setExplicitAllow(p)} className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${explicitAllow === p ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
                {p === 'none' ? 'No' : 'Yes'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${explicitDeny}-${explicitAllow}`} className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${result.verdict === 'ALLOW' ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-2xl font-semibold ${result.verdict === 'ALLOW' ? 'text-good' : 'text-bad'}`}>{result.verdict}</p>
        <p className="text-sm text-ink mt-2">{result.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Evaluation order: explicit Deny always wins → else explicit Allow → else implicit deny (the default). This
        is why an SCP or permission boundary can silently block access even when an identity policy grants it.
      </div>
    </div>
  )
}
