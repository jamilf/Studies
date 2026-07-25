import { useMemo, useState } from 'react'

interface Band {
  min: number
  label: string
  tone: 'good' | 'warn' | 'bad'
  detail: string
}

const BANDS: Band[] = [
  {
    min: 80,
    label: 'Governed',
    tone: 'good',
    detail:
      'Tagging is complete enough to drive real controls: SCPs that require an Owner/DataClassification tag on creation, cost-anomaly alerts scoped by CostCenter, and IAM conditions keyed on tag values are all reliable at this coverage level.',
  },
  {
    min: 50,
    label: 'Partial visibility',
    tone: 'warn',
    detail:
      'Enough resources are tagged to spot trends, but automated tag-based controls (SCP conditions, budget alerts per team, attribute-based access control) will misfire on the untagged remainder — treat any tag-based policy here as advisory, not enforced.',
  },
  {
    min: 0,
    label: 'Ungoverned',
    tone: 'bad',
    detail:
      'Most resources carry no reliable ownership or classification metadata. Cost allocation reports and security dashboards built on tags will be materially wrong — start with an SCP or Config rule that denies resource creation without required tags.',
  },
]

const TONE_CLASSES: Record<Band['tone'], string> = {
  good: 'border-good bg-good-tint text-good',
  warn: 'border-warn bg-warn-tint text-warn',
  bad: 'border-bad bg-bad-tint text-bad',
}

function bandFor(score: number): Band {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1]
}

export default function CostAllocationTagsForGovernance() {
  const [classification, setClassification] = useState<number>(70)
  const [owner, setOwner] = useState<number>(60)
  const [environment, setEnvironment] = useState<number>(85)

  const score = useMemo(
    () => Math.round(classification * 0.4 + owner * 0.3 + environment * 0.3),
    [classification, owner, environment],
  )
  const band = useMemo(() => bandFor(score), [score])

  const sliders: { label: string; value: number; setValue: (v: number) => void; weight: string }[] = [
    { label: '% resources tagged with DataClassification', value: classification, setValue: setClassification, weight: '40%' },
    { label: '% resources tagged with Owner / CostCenter', value: owner, setValue: setOwner, weight: '30%' },
    { label: '% resources tagged with Environment', value: environment, setValue: setEnvironment, weight: '30%' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cost Allocation Tags as a Governance Signal</h3>
        <p className="text-sm text-soft">Domain 6.2 — adjust tag coverage to see how it drives a governance visibility score.</p>
      </div>

      <div className="space-y-4">
        {sliders.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between text-xs text-soft mb-1">
              <span>{s.label}</span>
              <span className="font-mono text-ink">
                {s.value}% <span className="text-faint">(weight {s.weight})</span>
              </span>
            </div>
            <input
              type="range" aria-label="Cost Allocation Tags as a Governance Signal"
              min={0}
              max={100}
              step={5}
              value={s.value}
              onChange={(e) => s.setValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line-strong bg-wash p-4">
          <p className="text-xs text-soft mb-1">Formula</p>
          <p className="font-mono text-sm text-ink">score = 0.4·classification + 0.3·owner + 0.3·environment</p>
          <p className="font-mono text-2xl text-ink mt-2">{score}</p>
        </div>
        <div className={`rounded-crisp border-l-2 px-4 py-3 ${TONE_CLASSES[band.tone]}`}>
          <p className="font-display text-lg font-semibold">{band.label}</p>
          <p className="text-sm text-ink mt-1 leading-relaxed">{band.detail}</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Tags aren't just for the cost & usage report — they're a governance primitive. Consistent DataClassification,
        Owner, and Environment tags let you enforce access with IAM's{' '}
        <code className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">aws:ResourceTag</code> condition
        keys, scope budgets and anomaly alerts per team, and target Config rules or SCPs at exactly the resources
        that need them — none of which works reliably below high, consistent tag coverage.
      </div>
    </div>
  )
}
