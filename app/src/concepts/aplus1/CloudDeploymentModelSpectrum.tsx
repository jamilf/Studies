import { useState } from 'react'

interface Model {
  name: string
  control: number // 1-6 heat-ramp meter, 6 = organization owns/controls everything
  costPredictability: number // 1-6 heat-ramp meter
  example: string
  desc: string
}

const MODELS: Model[] = [
  {
    name: 'Private',
    control: 6,
    costPredictability: 5,
    example: "A bank's customer-data platform running on hardware it owns or leases exclusively.",
    desc: 'Infrastructure dedicated to a single organization, whether on-premises or hosted by a provider on its behalf. Maximum control and customization, but the organization carries the full capital/operating cost.',
  },
  {
    name: 'Community',
    control: 4,
    costPredictability: 4,
    example: 'Several government agencies sharing one compliance-focused cloud built to a common regulatory standard.',
    desc: 'Shared by several organizations with common concerns (compliance, security requirements, mission). Costs and management are split across the community, trading some control for lower per-org expense.',
  },
  {
    name: 'Hybrid',
    control: 3,
    costPredictability: 2,
    example: 'A retailer keeping core inventory data private but bursting web traffic into a public cloud during peak sales.',
    desc: 'A deliberate mix of two or more deployment models kept separate but connected, commonly used for "cloud bursting" — overflow capacity on demand while sensitive workloads stay private.',
  },
  {
    name: 'Public',
    control: 1,
    costPredictability: 3,
    example: 'A startup running its whole product on shared, multi-tenant AWS/Azure/Google Cloud infrastructure.',
    desc: 'Owned and operated by a third-party provider and shared across many tenants over the internet. Lowest upfront cost and fastest to provision, but the least control over the underlying infrastructure.',
  },
]

export default function CloudDeploymentModelSpectrum() {
  const [selected, setSelected] = useState(0)
  const m = MODELS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cloud Deployment Model Spectrum</h3>
        <p className="text-sm text-soft">
          Domain 4.1 — slide from private to public to see how ownership, control, and cost predictability trade off.
        </p>
      </div>

      <input
        type="range" aria-label="Cloud Deployment Model Spectrum"
        min={0}
        max={MODELS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[11px] text-faint px-0.5 -mt-3">
        {MODELS.map((model, i) => (
          <button
            key={model.name}
            onClick={() => setSelected(i)}
            className={`text-center font-medium transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / MODELS.length}%` }}
          >
            {model.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Meter label="Org's control over infrastructure" value={m.control} />
        <Meter label="Cost predictability" value={m.costPredictability} />
      </div>

      <div key={m.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-2">
        <h4 className="font-semibold text-ink">{m.name} cloud</h4>
        <p className="text-sm text-soft leading-relaxed">{m.desc}</p>
        <p className="text-sm text-ink">
          <span className="font-semibold">Example: </span>
          {m.example}
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam tests whether you can match a scenario to a model: "shared infrastructure, pay-as-you-go" is public;
        "dedicated to us alone" is private; "a defined group of similar organizations sharing one environment" is
        community; and "we keep sensitive data in-house but overflow to a provider" is hybrid.
      </div>
    </div>
  )
}

function Meter({ label, value }: { label: string; value: number }) {
  const heatClass = [
    'bg-heat-1',
    'bg-heat-2',
    'bg-heat-3',
    'bg-heat-4',
    'bg-heat-5',
    'bg-heat-6',
  ]
  return (
    <div className="rounded-crisp border border-line bg-wash p-3">
      <p className="text-[11px] uppercase tracking-wider text-faint mb-2">{label}</p>
      <div className="flex gap-1">
        {heatClass.map((cls, i) => (
          <div key={i} className={`h-3 flex-1 rounded-crisp ${i < value ? cls : 'bg-line'}`} />
        ))}
      </div>
    </div>
  )
}
