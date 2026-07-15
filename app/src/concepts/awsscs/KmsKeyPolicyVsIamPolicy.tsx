interface Point {
  text: string
}

const KEY_POLICY_POINTS: Point[] = [
  { text: "Attached directly to the KMS key itself — it is always evaluated, for every request, no matter who is calling." },
  {
    text: 'By default it is the ONLY source of authorization for the key. IAM policies have no effect at all unless the key policy contains an "Enable IAM User Permissions" statement delegating to IAM.',
  },
  { text: 'Only the key policy can grant permissions on a KMS-specific action like kms:PutKeyPolicy — IAM policies alone cannot.' },
  { text: 'Cross-account key access must be opened here first — the key policy has to name the external account/principal as trusted.' },
]

const IAM_POLICY_POINTS: Point[] = [
  { text: 'Attached to IAM users, groups, or roles — the familiar identity-based policy pattern used everywhere else in AWS.' },
  {
    text: 'Only takes effect for a given key once that key\'s policy contains the "Enable IAM User Permissions" statement delegating authorization to IAM.',
  },
  { text: 'Lets you manage access to many keys centrally through roles/groups, instead of hand-editing every individual key policy.' },
  { text: 'Cannot by itself grant a caller in another account access — the key policy (or an explicit grant) must also allow it.' },
]

export default function KmsKeyPolicyVsIamPolicy() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">KMS Key Policy vs IAM Policy: Who Actually Grants Access</h3>
        <p className="text-sm text-soft">Domain 5.1 — the key policy is the root of trust; IAM policies only help once the key policy delegates to them.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line-strong bg-wash p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">Key policy (resource-based)</h4>
          <ul className="space-y-2 text-sm text-soft">
            {KEY_POLICY_POINTS.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-crisp border border-line bg-surface p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">IAM policy (identity-based)</h4>
          <ul className="space-y-2 text-sm text-soft">
            {IAM_POLICY_POINTS.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Unlike almost every other AWS resource, a KMS key defaults to trusting nobody but the account root user
        unless its key policy explicitly hands authorization decisions off to IAM. Once it does, both the key
        policy AND the caller's IAM policy are checked together, and — same as any resource-based policy — an
        explicit Deny in either one wins.
      </div>
    </div>
  )
}
