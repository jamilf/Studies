import { useState } from 'react'

export default function MfaEnforcementApproaches() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Enforcing MFA: Optional vs Conditionally Required</h3>
        <p className="text-sm text-soft">Domain 4.1 — toggle to compare an unenforced setup with a policy that actually requires MFA.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Before</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>After</span>
      </div>

      <div
        key={after ? 'after' : 'before'}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-2 ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'MFA conditionally required' : 'MFA merely available'}
        </p>
        {after ? (
          <div className="text-sm text-ink space-y-1.5">
            <p>
              An IAM policy statement denies sensitive actions unless{' '}
              <code className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">aws:MultiFactorAuthPresent</code> is{' '}
              <code className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">true</code>, so a stolen password alone is
              useless for anything the policy guards.
            </p>
            <p>
              A tight <code className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">aws:MultiFactorAuthAge</code> condition
              can also force re-authentication before high-risk actions, and IAM Identity Center can require MFA at every sign-in for
              federated users.
            </p>
          </div>
        ) : (
          <div className="text-sm text-ink space-y-1.5">
            <p>
              MFA devices are permitted but not required — an IAM user can register one, but no policy checks for it, so signing in or
              calling the API with only a password or a static access key is sufficient.
            </p>
            <p>A leaked password or access key is enough on its own to exercise every permission that identity holds.</p>
          </div>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Simply enabling MFA as an option does nothing to protect an account — enforcement means a Deny statement
        conditioned on <code className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">aws:MultiFactorAuthPresent</code>{' '}
        (or an equivalent Identity Center sign-in requirement), so the permission genuinely cannot be exercised
        without the second factor.
      </div>
    </div>
  )
}
