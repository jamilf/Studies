import { useState } from 'react'

export default function PermissionBoundaryVsScp() {
  const [showExample, setShowExample] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Permission Boundary vs Service Control Policy</h3>
        <p className="text-sm text-soft">Domain 4.2 — two different "guardrails" that both cap permissions without ever granting any.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">Permission Boundary</h4>
          <dl className="text-xs space-y-1.5 font-mono text-ink">
            <div className="flex justify-between"><dt className="text-soft font-sans">Attaches to</dt><dd>One IAM user or role</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Scope</dt><dd>That single identity</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Effect</dt><dd>Caps the MAX permissions that identity can have</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Grants perms?</dt><dd>Never — ceiling only</dd></div>
          </dl>
          <p className="text-[11px] text-faint">
            Typical use: let a team self-service create IAM roles, but no role they create can ever exceed the boundary — even if its attached policy says otherwise.
          </p>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">Service Control Policy</h4>
          <dl className="text-xs space-y-1.5 font-mono text-ink">
            <div className="flex justify-between"><dt className="text-soft font-sans">Attaches to</dt><dd>An OU or account in Organizations</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Scope</dt><dd>Every identity in that account/OU</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Effect</dt><dd>Caps the MAX permissions for the whole account</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Grants perms?</dt><dd>Never — ceiling only</dd></div>
          </dl>
          <p className="text-[11px] text-faint">
            Typical use: org-wide guardrail, e.g. "no account in this OU may ever disable CloudTrail," regardless of what any IAM policy in that account allows.
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowExample((s) => !s)}
        className="w-full rounded-crisp border border-line bg-surface px-3 py-2 text-sm font-medium text-soft hover:border-line-strong transition-colors"
      >
        {showExample ? 'Hide combined-effect example' : 'Show what happens when both apply at once'}
      </button>

      {showExample && (
        <div className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm animate-fadein space-y-1.5">
          <p className="text-ink">
            <span className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">IAM policy</span> grants{' '}
            <code className="font-mono text-xs">s3:*</code> on all buckets.
          </p>
          <p className="text-ink">
            <span className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">Permission boundary</span> caps this role to{' '}
            <code className="font-mono text-xs">s3:Get*</code> / <code className="font-mono text-xs">s3:List*</code> only.
          </p>
          <p className="text-ink">
            <span className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">SCP</span> on the account denies any S3 action
            outside <code className="font-mono text-xs">us-east-1</code>.
          </p>
          <p className="text-soft pt-1">
            Effective permission = the INTERSECTION of all three: read-only S3 access, and only in us-east-1 — no single layer's grant survives
            a stricter layer above or beside it.
          </p>
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tell: both are described as a "maximum" or a "guardrail," never a "grant." If the question says
        "applies to everyone in this OU/account," think SCP. If it says "applies to this one role/user," think
        permission boundary.
      </div>
    </div>
  )
}
