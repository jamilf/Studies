import { useMemo, useState } from 'react'

interface Verdict {
  success: boolean
  reason: string
}

function evaluate(trustPolicyAllows: boolean, callerHasPermission: boolean): Verdict {
  if (trustPolicyAllows && callerHasPermission) {
    return {
      success: true,
      reason:
        "The target role's trust policy names the caller as a trusted principal, AND the caller's own identity policy grants sts:AssumeRole on that role's ARN. Both sides agree, so AssumeRole succeeds.",
    }
  }
  if (!trustPolicyAllows && !callerHasPermission) {
    return {
      success: false,
      reason:
        "Neither side agrees to this: the role's trust policy does not list the caller as a trusted principal, and the caller has no sts:AssumeRole permission for this role's ARN either.",
    }
  }
  if (!trustPolicyAllows) {
    return {
      success: false,
      reason:
        "The caller has sts:AssumeRole permission, but the target role's trust policy (a resource-based policy attached to the role) does not list the caller's account/role as a trusted principal. The role itself refuses the assumption — like having a key but no invitation.",
    }
  }
  return {
    success: false,
    reason:
      "The role's trust policy trusts this caller, but the caller's own identity policy does not grant it sts:AssumeRole for this role's ARN. The invitation exists, but the caller was never given permission to accept it.",
  }
}

export default function CrossAccountTrustEvaluator() {
  const [trustPolicyAllows, setTrustPolicyAllows] = useState(true)
  const [callerHasPermission, setCallerHasPermission] = useState(true)

  const verdict = useMemo(() => evaluate(trustPolicyAllows, callerHasPermission), [trustPolicyAllows, callerHasPermission])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cross-Account AssumeRole: Two Locks, Two Keys</h3>
        <p className="text-sm text-soft">Domain 4.1 — sts:AssumeRole needs BOTH the role's trust policy and the caller's permission policy to agree.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Target role's trust policy lists the caller as a trusted principal?</p>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => setTrustPolicyAllows(v)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  trustPolicyAllows === v ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-soft mb-1">Caller has sts:AssumeRole permission for this role's ARN?</p>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => setCallerHasPermission(v)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  callerHasPermission === v ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        key={`${trustPolicyAllows}-${callerHasPermission}`}
        className={`rounded-crisp border-l-2 px-4 py-3 text-sm animate-fadein ${verdict.success ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
      >
        <p className={`font-display font-semibold mb-1 ${verdict.success ? 'text-good' : 'text-bad'}`}>
          {verdict.success ? 'AssumeRole succeeds' : 'AssumeRole is denied'}
        </p>
        <p className="text-ink">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The trust policy is a resource-based policy attached to the ROLE (who may knock on this door). The
        permission policy is an identity-based policy attached to the CALLER (may this identity even try to
        knock). Cross-account access needs both — this is the single most common cause of "AccessDenied" on
        AssumeRole in exam scenarios.
      </div>
    </div>
  )
}
