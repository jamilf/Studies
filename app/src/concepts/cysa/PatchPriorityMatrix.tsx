import { useMemo, useState } from 'react'

type Severity = 'Critical' | 'High' | 'Medium' | 'Low'
type Exposure = 'Internet-facing' | 'Internal-only'

const MATRIX: Record<Severity, Record<Exposure, { sla: string; style: string }>> = {
  Critical: {
    'Internet-facing': { sla: 'Emergency — patch within 24-48 hours, treat as an emergency change', style: 'border-bad bg-bad-tint text-bad' },
    'Internal-only': { sla: 'Urgent — within 7 days, with compensating controls until patched', style: 'border-warn bg-warn-tint text-warn' },
  },
  High: {
    'Internet-facing': { sla: 'Expedited — within 7 days', style: 'border-warn bg-warn-tint text-warn' },
    'Internal-only': { sla: 'Standard priority — within 14-30 days', style: 'border-warn bg-warn-tint text-warn' },
  },
  Medium: {
    'Internet-facing': { sla: 'Within 30 days, or sooner if a known exploit exists', style: 'border-warn bg-warn-tint text-warn' },
    'Internal-only': { sla: 'Within 30-60 days, normal patch cycle', style: 'border-good bg-good-tint text-good' },
  },
  Low: {
    'Internet-facing': { sla: 'Within 90 days / next maintenance window', style: 'border-good bg-good-tint text-good' },
    'Internal-only': { sla: 'Routine — next scheduled patch cycle (~90 days), may qualify for risk acceptance', style: 'border-good bg-good-tint text-good' },
  },
}

export default function PatchPriorityMatrix() {
  const [severity, setSeverity] = useState<Severity>('Critical')
  const [exposure, setExposure] = useState<Exposure>('Internet-facing')

  const result = useMemo(() => MATRIX[severity][exposure], [severity, exposure])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Patch Priority & SLA Matrix</h3>
        <p className="text-sm text-soft">Domain 2.3 — pick a vulnerability severity and an asset's exposure to get the recommended patch SLA.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Severity</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(MATRIX) as Severity[]).map((s) => (
              <button
                key={s}
                onClick={() => setSeverity(s)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  severity === s ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Exposure</p>
          <div className="flex flex-col gap-1.5">
            {(['Internet-facing', 'Internal-only'] as Exposure[]).map((e) => (
              <button
                key={e}
                onClick={() => setExposure(e)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  exposure === e ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${severity}-${exposure}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${result.style}`}>
        <p className="font-display text-lg font-semibold">{result.sla}</p>
        <p className="text-sm text-ink mt-1">
          Internet-facing assets are reachable by anyone scanning the internet, so exposure compounds severity.
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        SLA should scale with both how bad the vulnerability is and how reachable the asset is — the same CVSS score
        gets a much tighter clock on an internet-facing host than an internal one.
      </div>
    </div>
  )
}
