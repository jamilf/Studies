export default function GovernanceComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Policy vs Procedure</h3>
        <p className="text-sm text-soft">Domain 1.6 — compare two levels of the governance document hierarchy.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4 space-y-2">
          <p className="text-sm font-semibold text-accent mb-1">Policy</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Purpose:</span> High-level intent — what and why.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Detail level:</span> Broad, technology-agnostic.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Approved by:</span> Senior management / board.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Example:</span> "Acceptable Use Policy: company data must be protected from unauthorized disclosure."</p>
        </div>
        <div className="rounded-crisp border border-warn-line bg-warn-tint/50 p-4 space-y-2">
          <p className="text-sm font-semibold text-warn mb-1">Procedure</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Purpose:</span> Exact how-to, step-by-step.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Detail level:</span> Granular, often tool-specific.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Approved by:</span> Operational / IT management.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Example:</span> "Steps to provision a new Active Directory user account."</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The full hierarchy is Policy → Standard → Procedure → Guideline. A Standard is a mandatory specific
        requirement (e.g., "passwords must be 14+ characters"); a Guideline is discretionary best-practice advice —
        both sit between the broad Policy and the granular Procedure.
      </div>
    </div>
  )
}
