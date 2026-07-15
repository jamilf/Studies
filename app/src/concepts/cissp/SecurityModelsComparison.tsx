interface Point {
  label: string
  detail: string
}

const CLARK_WILSON: Point[] = [
  { label: 'Goal', detail: 'Preserve data integrity, not confidentiality.' },
  { label: 'Core idea', detail: 'Subjects never touch data directly — only through a "well-formed transaction" (a Transformation Procedure) that keeps Constrained Data Items in a valid state.' },
  { label: 'Enforcement', detail: 'Separation of duties: certification rules validate that a TP does what it claims, enforcement rules ensure only authorized subjects can invoke it.' },
  { label: 'Typical use', detail: 'Commercial and financial systems — e.g., a bank transfer that must debit and credit in the same atomic, audited transaction.' },
]

const BREWER_NASH: Point[] = [
  { label: 'Goal', detail: 'Prevent conflicts of interest, not just leak data.' },
  { label: 'Core idea', detail: 'Also called the "Chinese Wall" model — access permissions change dynamically based on what the subject has already accessed.' },
  { label: 'Enforcement', detail: 'Data is grouped into conflict-of-interest classes; once a subject accesses one company\'s data in a class, they are automatically barred from competitors in that same class.' },
  { label: 'Typical use', detail: 'Consulting, investment banking, and law firms — an analyst who works on Company A\'s audit cannot then access Company B, a direct competitor.' },
]

export default function SecurityModelsComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Clark-Wilson vs. Brewer-Nash</h3>
        <p className="text-sm text-soft">Domain 3.2 — compare an integrity model against a conflict-of-interest model side by side.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-accent-line bg-accent-tint p-4 space-y-3">
          <p className="font-display text-base font-semibold text-accent">Clark-Wilson</p>
          {CLARK_WILSON.map((p) => (
            <div key={p.label}>
              <p className="text-[11px] uppercase tracking-wider text-accent">{p.label}</p>
              <p className="text-sm text-ink leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-crisp border border-warn-line bg-warn-tint p-4 space-y-3">
          <p className="font-display text-base font-semibold text-warn">Brewer-Nash</p>
          {BREWER_NASH.map((p) => (
            <div key={p.label}>
              <p className="text-[11px] uppercase tracking-wider text-warn">{p.label}</p>
              <p className="text-sm text-ink leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Both models add structure beyond simple read/write rules — Clark-Wilson constrains *how* data can be changed
        so it stays valid, while Brewer-Nash constrains *what a subject may access next* based on their own access
        history. Neither is a confidentiality lattice like Bell-LaPadula or an integrity lattice like Biba; they
        solve different problems entirely.
      </div>
    </div>
  )
}
