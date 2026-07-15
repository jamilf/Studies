import { useState } from 'react'

type Model = 'dac' | 'mac' | 'rbac' | 'abac'

const MODELS: Record<Model, { label: string; setBy: string; basis: string; example: string; tradeoff: string; style: string }> = {
  dac: {
    label: 'DAC',
    setBy: 'The data owner',
    basis: 'ACL-based, at the owner\'s discretion',
    example: 'Sharing a personal file, NTFS permissions',
    tradeoff: 'Flexible, but hard to govern consistently at scale',
    style: 'border-accent-line bg-accent-tint text-accent',
  },
  mac: {
    label: 'MAC',
    setBy: 'A central authority or the system itself',
    basis: 'Security labels and clearances, fixed policy',
    example: 'Military classified systems — Secret can\'t read Top Secret',
    tradeoff: 'Rigid, but strong and consistent enforcement',
    style: 'border-warn-line bg-warn-tint text-warn',
  },
  rbac: {
    label: 'RBAC',
    setBy: 'An administrator, via role assignment',
    basis: 'Job function drives access',
    example: 'Enterprise IAM — the "Help Desk" role gets password-reset rights',
    tradeoff: 'Scales well, but risks role explosion over time',
    style: 'border-good-line bg-good-tint text-good',
  },
  abac: {
    label: 'ABAC',
    setBy: 'A centralized policy engine, at request time',
    basis: 'Attributes of subject, object, action, and environment',
    example: 'Zero Trust cloud policy — device compliance AND business hours',
    tradeoff: 'Most granular, but policies can get complex to manage',
    style: 'border-ink bg-wash text-ink',
  },
}

export default function AccessControlModelMatrix() {
  const [model, setModel] = useState<Model>('dac')
  const m = MODELS[model]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Access Control Models</h3>
        <p className="text-sm text-soft">Domain 5.4 — pick a model to see who sets permissions and how it's used.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(MODELS) as Model[]).map((k) => (
          <button
            key={k}
            onClick={() => setModel(k)}
            className={`rounded-crisp border px-3 py-2 text-sm font-semibold transition-colors ${
              model === k ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {MODELS[k].label}
          </button>
        ))}
      </div>

      <div key={model} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-1.5 ${m.style}`}>
        <p className="font-display text-lg font-semibold">{m.label}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Set by:</span> {m.setBy}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Basis:</span> {m.basis}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Example:</span> {m.example}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Trade-off:</span> {m.tradeoff}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Authorization mechanisms trade off administrative flexibility against centralized, consistent control — DAC
        is most flexible, MAC most rigid, with RBAC and ABAC occupying the practical middle ground at different
        scales of granularity.
      </div>
    </div>
  )
}
