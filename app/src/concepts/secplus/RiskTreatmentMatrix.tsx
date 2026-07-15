import { useMemo, useState } from 'react'

type Level = 'low' | 'high'
type Treatment = 'accept' | 'mitigate' | 'avoid-transfer'

function treat(likelihood: Level, impact: Level): { treatment: Treatment; reasoning: string } {
  if (likelihood === 'low' && impact === 'low') {
    return { treatment: 'accept', reasoning: 'The risk is small enough that the cost of any control would exceed the potential loss — formally acknowledge it and monitor.' }
  }
  if (likelihood === 'high' && impact === 'high') {
    return { treatment: 'avoid-transfer', reasoning: 'Avoid: stop doing the risky activity entirely. Transfer: shift the financial burden via cyber insurance or contractual risk-sharing, since mitigation alone may not be sufficient or cost-effective.' }
  }
  return { treatment: 'mitigate', reasoning: 'Apply controls to reduce likelihood and/or impact to an acceptable residual level — the most common treatment for an uneven likelihood/impact pairing.' }
}

const TREATMENT_STYLE: Record<Treatment, string> = {
  accept: 'border-good bg-good-tint text-good',
  mitigate: 'border-warn bg-warn-tint text-warn',
  'avoid-transfer': 'border-bad bg-bad-tint text-bad',
}

const TREATMENT_LABEL: Record<Treatment, string> = { accept: 'Accept', mitigate: 'Mitigate', 'avoid-transfer': 'Avoid or Transfer' }

export default function RiskTreatmentMatrix() {
  const [likelihood, setLikelihood] = useState<Level>('low')
  const [impact, setImpact] = useState<Level>('low')

  const result = useMemo(() => treat(likelihood, impact), [likelihood, impact])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Risk Treatment Matrix</h3>
        <p className="text-sm text-soft">Domain 5.2 — pick likelihood and impact to get the recommended risk treatment.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Likelihood</p>
          <div className="flex gap-2">
            {(['low', 'high'] as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setLikelihood(l)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  likelihood === l ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Impact</p>
          <div className="flex gap-2">
            {(['low', 'high'] as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setImpact(l)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  impact === l ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        key={`${likelihood}-${impact}`}
        className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${TREATMENT_STYLE[result.treatment]}`}
      >
        <p className="font-display text-2xl font-semibold">{TREATMENT_LABEL[result.treatment]}</p>
        <p className="text-sm text-ink mt-2">{result.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        SY0-701 tests four risk treatments: accept, mitigate, avoid, and transfer. Avoid and transfer both fit the
        high/high case — avoid if the risky activity itself is optional, transfer if it's necessary but insurable.
      </div>
    </div>
  )
}
