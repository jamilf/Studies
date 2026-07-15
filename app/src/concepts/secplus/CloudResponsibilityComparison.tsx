import { useState } from 'react'

type Model = 'iaas' | 'paas' | 'saas'

interface Split {
  provider: string[]
  customer: string[]
}

const SPLITS: Record<Model, Split> = {
  iaas: {
    provider: ['Physical data centers & hardware', 'Network infrastructure', 'Virtualization / hypervisor layer'],
    customer: ['Operating system patching', 'Middleware & runtime', 'Application code', 'Data classification & access control', 'Guest OS & network firewall configuration'],
  },
  paas: {
    provider: ['Physical data centers & hardware', 'Network infrastructure', 'Virtualization layer', 'Operating system & runtime patching'],
    customer: ['Application code', 'Data classification & access control', 'Application-level identity and access management'],
  },
  saas: {
    provider: ['Physical data centers & hardware', 'Network infrastructure', 'Virtualization layer', 'Operating system & runtime', 'The application itself'],
    customer: ['Data the customer puts into the application', 'User access management (who on the customer side can log in)', 'Endpoint security for devices accessing the service'],
  },
}

const MODEL_LABEL: Record<Model, string> = { iaas: 'IaaS', paas: 'PaaS', saas: 'SaaS' }

export default function CloudResponsibilityComparison() {
  const [model, setModel] = useState<Model>('iaas')
  const split = SPLITS[model]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cloud Shared Responsibility Model</h3>
        <p className="text-sm text-soft">
          Domain 3.1 — pick a service model to see how security responsibility shifts between provider and customer.
        </p>
      </div>

      <div className="flex gap-2">
        {(Object.keys(MODEL_LABEL) as Model[]).map((m) => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
              model === m ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {MODEL_LABEL[m]}
          </button>
        ))}
      </div>

      <div key={model} className="grid sm:grid-cols-2 gap-3 animate-fadein">
        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-xs uppercase tracking-wider text-faint mb-2">Cloud provider secures</p>
          <ul className="space-y-1.5">
            {split.provider.map((item) => (
              <li key={item} className="text-sm text-ink flex gap-2">
                <span className="text-accent">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-xs uppercase tracking-wider text-faint mb-2">Customer secures</p>
          <ul className="space-y-1.5">
            {split.customer.map((item) => (
              <li key={item} className="text-sm text-ink flex gap-2">
                <span className="text-warn">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        As you move from IaaS to SaaS, the provider takes on more of the stack — but data classification and who
        can access it never fully transfer away from the customer. "It's in the cloud" is never a complete answer
        to "who is responsible for securing this?"
      </div>
    </div>
  )
}
