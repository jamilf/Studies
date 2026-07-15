export default function AuditTypeComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Internal vs External Audit</h3>
        <p className="text-sm text-soft">Domain 6.5 — compare who performs each audit type and how much assurance it provides.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4 space-y-2">
          <p className="text-sm font-semibold text-accent mb-1">Internal Audit</p>
          <p className="text-sm text-soft">Performed by the organization's own staff.</p>
          <p className="text-sm text-soft">Ongoing self-assessment.</p>
          <p className="text-sm text-soft">Limited independence — reports to the audited organization.</p>
          <p className="text-sm text-soft">No independent assurance to outsiders.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Example:</span> A quarterly access-review check by IT internal audit.</p>
        </div>
        <div className="rounded-crisp border border-good-line bg-good-tint/50 p-4 space-y-2">
          <p className="text-sm font-semibold text-good mb-1">External / Third-Party Audit</p>
          <p className="text-sm text-soft">Performed by an independent outside firm.</p>
          <p className="text-sm text-soft">Objective assurance that controls work as designed.</p>
          <p className="text-sm text-soft">High independence.</p>
          <p className="text-sm text-soft">Assurance that outsiders can actually rely on.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Example:</span> A SOC 2 Type II report, or a PCI DSS QSA assessment.</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Internal audits keep the organization honest day-to-day; external audits are what customers, regulators, and
        partners actually trust, since the auditor has no stake in the outcome.
      </div>
    </div>
  )
}
