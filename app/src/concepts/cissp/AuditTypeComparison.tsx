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
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Performed by:</span> The organization's own audit staff, ideally reporting to the audit committee or board, not to the department being reviewed.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Cadence:</span> Ongoing, risk-based self-assessment on a recurring schedule.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Independence:</span> Limited — auditors are still employees of the audited organization.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Assurance value:</span> Keeps management informed, but carries no independent weight with outside parties.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Example:</span> A quarterly access-review check by IT internal audit.</p>
        </div>
        <div className="rounded-crisp border border-good-line bg-good-tint/50 p-4 space-y-2">
          <p className="text-sm font-semibold text-good mb-1">External / Third-Party Audit</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Performed by:</span> An independent outside firm with no stake in the outcome.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Cadence:</span> Point-in-time, typically annual or per a contractual/regulatory requirement.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Independence:</span> High — the auditor's opinion is what gives the report credibility.</p>
          <p className="text-sm text-soft"><span className="font-semibold text-ink">Assurance value:</span> Produces a report that customers, regulators, and partners can actually rely on.</p>
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
