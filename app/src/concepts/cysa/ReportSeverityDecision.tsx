import { useMemo, useState } from 'react'

type Scope = 'single' | 'multiple' | 'domain'
type Sensitivity = 'none' | 'pii'

const SCOPE_LABELS: Record<Scope, string> = {
  single: 'Single workstation',
  multiple: 'Multiple systems',
  domain: 'Entire domain compromised',
}
const SENSITIVITY_LABELS: Record<Sensitivity, string> = {
  none: 'No sensitive data',
  pii: 'PII or regulated data involved',
}

const MATRIX: Record<Scope, Record<Sensitivity, { audience: string; style: string }>> = {
  single: {
    none: { audience: 'IT/SOC team only', style: 'border-good bg-good-tint text-good' },
    pii: { audience: 'IT team + Privacy/Compliance officer', style: 'border-warn bg-warn-tint text-warn' },
  },
  multiple: {
    none: { audience: 'IT team + IT management', style: 'border-warn bg-warn-tint text-warn' },
    pii: { audience: 'Management + Legal + Compliance', style: 'border-bad bg-bad-tint text-bad' },
  },
  domain: {
    none: { audience: 'Executive leadership + IT management', style: 'border-bad bg-bad-tint text-bad' },
    pii: { audience: 'Executive leadership + Legal + Compliance + regulators/customers as required', style: 'border-bad bg-bad-tint text-bad' },
  },
}

export default function ReportSeverityDecision() {
  const [scope, setScope] = useState<Scope>('single')
  const [sensitivity, setSensitivity] = useState<Sensitivity>('none')

  const result = useMemo(() => MATRIX[scope][sensitivity], [scope, sensitivity])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Who Needs to Know? Report Audience Selector</h3>
        <p className="text-sm text-soft">Domain 4.1 — pick the incident's scope and data sensitivity to see who the report should go to.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Scope</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(SCOPE_LABELS) as Scope[]).map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  scope === s ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {SCOPE_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Data sensitivity</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(SENSITIVITY_LABELS) as Sensitivity[]).map((s) => (
              <button
                key={s}
                onClick={() => setSensitivity(s)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  sensitivity === s ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {SENSITIVITY_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${scope}-${sensitivity}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${result.style}`}>
        <p className="font-display text-lg font-semibold">{result.audience}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Report audience scales along two independent axes — how far the compromise spread, and how sensitive the
        exposed data is — and either one alone can be enough to pull in legal and executives.
      </div>
    </div>
  )
}
