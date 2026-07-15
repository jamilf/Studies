import { useMemo, useState } from 'react'

type ServiceModel = 'IaaS' | 'PaaS' | 'SaaS'
type Layer = 'Physical & Hardware' | 'OS & Runtime Patching' | 'Application Code' | 'Data & Access Config'
type Responsibility = 'Provider' | 'Customer' | 'Shared'

interface Verdict {
  who: Responsibility
  reason: string
}

const MATRIX: Record<ServiceModel, Record<Layer, Verdict>> = {
  IaaS: {
    'Physical & Hardware': { who: 'Provider', reason: 'The provider owns the data center, host hardware, and hypervisor.' },
    'OS & Runtime Patching': { who: 'Customer', reason: 'You provision the VM, so you own OS patching, runtime, and middleware.' },
    'Application Code': { who: 'Customer', reason: 'You built or installed the application — its code and configuration are yours to secure.' },
    'Data & Access Config': { who: 'Customer', reason: 'Classification, encryption, and IAM policy on your data are entirely your responsibility.' },
  },
  PaaS: {
    'Physical & Hardware': { who: 'Provider', reason: 'The provider still owns all underlying infrastructure.' },
    'OS & Runtime Patching': { who: 'Provider', reason: 'The platform manages the OS and language runtime patch cycle for you.' },
    'Application Code': { who: 'Customer', reason: 'You still write and deploy the application code that runs on the platform.' },
    'Data & Access Config': { who: 'Customer', reason: 'You still choose how your data is classified, encrypted, and who can access it.' },
  },
  SaaS: {
    'Physical & Hardware': { who: 'Provider', reason: 'Fully abstracted away — you never touch infrastructure.' },
    'OS & Runtime Patching': { who: 'Provider', reason: 'The vendor patches the OS, runtime, and the application itself.' },
    'Application Code': { who: 'Provider', reason: 'The vendor owns and maintains the application codebase entirely.' },
    'Data & Access Config': { who: 'Shared', reason: 'The vendor secures the platform, but you still configure sharing settings, user roles, and what data goes in.' },
  },
}

const RESP_STYLE: Record<Responsibility, string> = {
  Provider: 'border-good bg-good-tint text-good',
  Customer: 'border-accent bg-accent-tint text-accent',
  Shared: 'border-warn bg-warn-tint text-warn',
}

export default function CloudSecOpsDecision() {
  const [model, setModel] = useState<ServiceModel>('IaaS')
  const [layer, setLayer] = useState<Layer>('OS & Runtime Patching')

  const verdict = useMemo(() => MATRIX[model][layer], [model, layer])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cloud Shared Responsibility Finder</h3>
        <p className="text-sm text-soft">Domain 1.1 — pick a service model and a layer to see who is on the hook for securing it.</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Service model</p>
        <div className="flex gap-2">
          {(Object.keys(MATRIX) as ServiceModel[]).map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                model === m ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Layer in question</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(MATRIX.IaaS) as Layer[]).map((l) => (
            <button
              key={l}
              onClick={() => setLayer(l)}
              className={`rounded-crisp border px-3 py-2 text-xs font-medium transition-colors ${
                layer === l ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div key={`${model}-${layer}`} className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${RESP_STYLE[verdict.who]}`}>
        <p className="font-display text-2xl font-semibold">{verdict.who} owns this</p>
        <p className="text-sm text-ink mt-2">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The shared responsibility model shifts as you move from IaaS to SaaS: the provider absorbs more infrastructure
        and platform duties, but data classification and access configuration stay the customer's job at every tier.
      </div>
    </div>
  )
}
