export default function SavingsPlansComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Compute SP vs EC2 Instance SP vs Reserved Instances</h3>
        <p className="text-sm text-soft">Domain 4.1 — compare the three ways to commit spend for a discount, from most to least flexible.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4">
          <p className="text-sm font-semibold text-accent mb-2">Compute Savings Plans</p>
          <p className="text-xs font-mono text-faint mb-3">up to ~66% off</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Commit to $/hr, applies automatically</li>
            <li>Any instance family, size, OS, or region</li>
            <li>Covers EC2, Fargate, and Lambda usage</li>
            <li>Most flexible, so the discount ceiling is lowest</li>
          </ul>
        </div>
        <div className="rounded-crisp border border-line-strong bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-2">EC2 Instance Savings Plans</p>
          <p className="text-xs font-mono text-faint mb-3">up to ~72% off</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Commit to $/hr for one instance family + region</li>
            <li>Size, OS, and tenancy remain flexible</li>
            <li>Covers EC2 usage only</li>
            <li>Mid-range flexibility and discount</li>
          </ul>
        </div>
        <div className="rounded-crisp border border-warn-line bg-warn-tint/50 p-4">
          <p className="text-sm font-semibold text-warn mb-2">Reserved Instances</p>
          <p className="text-xs font-mono text-faint mb-3">up to ~72% off</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Locks a specific instance type + region (Standard RIs)</li>
            <li>Convertible RIs allow limited attribute changes</li>
            <li>Standard RIs can be resold on the RI Marketplace</li>
            <li>Least flexible, but the oldest and most granular option</li>
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        All three require a 1- or 3-year commitment for a discount off On-Demand pricing — the exam distinction is
        flexibility versus discount ceiling: Compute Savings Plans flex across services, EC2 Instance Savings Plans
        flex within a family, and Reserved Instances lock the most detail but can be resold if Standard.
      </div>
    </div>
  )
}
