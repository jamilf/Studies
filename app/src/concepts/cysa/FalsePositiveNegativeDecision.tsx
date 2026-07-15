import { useMemo, useState } from 'react'

type YesNo = 'Yes' | 'No'

interface Outcome {
  label: string
  style: string
  reason: string
}

function evaluate(flagged: YesNo, confirmed: YesNo): Outcome {
  if (flagged === 'Yes' && confirmed === 'Yes') {
    return {
      label: 'True Positive',
      style: 'border-bad bg-bad-tint text-bad',
      reason: 'The scanner was right. Route this into the remediation workflow with an SLA based on severity and asset criticality.',
    }
  }
  if (flagged === 'Yes' && confirmed === 'No') {
    return {
      label: 'False Positive',
      style: 'border-warn bg-warn-tint text-warn',
      reason: 'The scanner over-reported. Document the exception with evidence, and consider tuning the plugin or scan credentials to reduce future noise.',
    }
  }
  if (flagged === 'No' && confirmed === 'Yes') {
    return {
      label: 'False Negative',
      style: 'border-bad bg-bad-tint text-bad',
      reason: 'The most dangerous outcome — a real vulnerability the scanner missed. Investigate scan scope, credentials, and plugin coverage, and consider a compensating manual test.',
    }
  }
  return {
    label: 'True Negative',
    style: 'border-good bg-good-tint text-good',
    reason: 'Scanner and manual validation agree — nothing is here. No action needed beyond normal periodic re-scanning.',
  }
}

export default function FalsePositiveNegativeDecision() {
  const [flagged, setFlagged] = useState<YesNo>('Yes')
  const [confirmed, setConfirmed] = useState<YesNo>('Yes')

  const outcome = useMemo(() => evaluate(flagged, confirmed), [flagged, confirmed])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">True/False Positive & Negative Finder</h3>
        <p className="text-sm text-soft">Domain 2.2 — pick a scanner result and a manual validation result to see which outcome you are dealing with.</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Did the scanner flag it?</p>
        <div className="flex gap-2">
          {(['Yes', 'No'] as YesNo[]).map((v) => (
            <button
              key={v}
              onClick={() => setFlagged(v)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                flagged === v ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Does manual validation confirm it is really present?</p>
        <div className="flex gap-2">
          {(['Yes', 'No'] as YesNo[]).map((v) => (
            <button
              key={v}
              onClick={() => setConfirmed(v)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                confirmed === v ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div key={`${flagged}-${confirmed}`} className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${outcome.style}`}>
        <p className="font-display text-2xl font-semibold">{outcome.label}</p>
        <p className="text-sm text-ink mt-2">{outcome.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        False positives waste analyst time; false negatives leave real vulnerabilities unmanaged. CS0-003 tests both
        directions — do not assume every scanner alert is real, and do not assume a clean scan means a clean asset.
      </div>
    </div>
  )
}
