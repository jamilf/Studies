import { useState } from 'react'

interface Layer {
  name: string
}

const LAYERS: Layer[] = [
  { name: 'Application' },
  { name: 'Data' },
  { name: 'Runtime' },
  { name: 'Middleware' },
  { name: 'O/S' },
  { name: 'Virtualization' },
  { name: 'Servers' },
  { name: 'Storage' },
  { name: 'Networking' },
]

interface Tier {
  name: string
  youManageCount: number // number of layers (from the top of LAYERS) the customer manages
  example: string
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'IaaS',
    youManageCount: 5, // Application, Data, Runtime, Middleware, O/S
    example: 'AWS EC2, Azure VMs, Google Compute Engine',
    desc: "You get raw virtual machines and networking. You're responsible for patching the guest OS, installing/configuring the runtime and middleware, and everything above it — the provider only guarantees the physical infrastructure underneath.",
  },
  {
    name: 'PaaS',
    youManageCount: 2, // Application, Data
    example: 'Azure App Service, Google App Engine, Heroku',
    desc: "You just push code and manage your data. The provider patches the O/S, maintains the runtime and middleware, and handles the infrastructure — you never touch a server directly.",
  },
  {
    name: 'SaaS',
    youManageCount: 0,
    example: 'Microsoft 365, Google Workspace, Salesforce',
    desc: "You configure settings and enter data through a finished application. The provider manages literally everything else, including the application code itself.",
  },
]

export default function CloudServiceResponsibilitySpectrum() {
  const [selected, setSelected] = useState(1)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">IaaS / PaaS / SaaS Responsibility Spectrum</h3>
        <p className="text-sm text-soft">
          Domain 4.2 — drag across the service models to see the line move between what you manage and what the
          provider manages.
        </p>
      </div>

      <input
        type="range"
        min={0}
        max={TIERS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Real-world example</p>
          <p className="font-mono text-sm font-semibold text-ink">{t.example}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">You manage</p>
          <p className="font-mono text-sm font-semibold text-ink">
            {t.youManageCount} of {LAYERS.length} layers
          </p>
        </div>
      </div>

      <div className="space-y-1">
        {LAYERS.map((layer, i) => {
          const youManage = i < t.youManageCount
          return (
            <div
              key={layer.name}
              className={`flex items-center justify-between rounded-crisp border px-3 py-1.5 text-xs transition-colors ${
                youManage ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft'
              }`}
            >
              <span className="font-medium">{layer.name}</span>
              <span className="text-[10px] font-mono">{youManage ? 'You manage' : 'Provider manages'}</span>
            </div>
          )
        })}
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-2">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>
    </div>
  )
}
