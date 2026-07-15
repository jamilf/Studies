export default function KmsKeyComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">AWS-Managed vs Customer-Managed KMS Keys</h3>
        <p className="text-sm text-soft">Domain 1.2 — compare the two key ownership models in AWS KMS.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4">
          <p className="text-sm font-semibold text-accent mb-2">AWS-managed key</p>
          <p className="text-xs font-mono text-faint mb-3">aws/service-name</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Free — no monthly key fee</li>
            <li>AWS rotates it automatically every year</li>
            <li>You cannot control or view the key policy</li>
            <li>Cannot be shared across accounts</li>
          </ul>
        </div>
        <div className="rounded-crisp border border-warn-line bg-warn-tint/50 p-4">
          <p className="text-sm font-semibold text-warn mb-2">Customer-managed key</p>
          <p className="text-xs font-mono text-faint mb-3">alias/my-key</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Small monthly cost per key</li>
            <li>You create it and set the key policy</li>
            <li>Can enable, disable, or schedule deletion</li>
            <li>Can configure custom rotation, and share across accounts</li>
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Reach for a customer-managed key whenever you need fine-grained key policy control, custom rotation timing,
        or cross-account key sharing — the AWS-managed default is fine for simple, single-account encryption needs.
      </div>
    </div>
  )
}
