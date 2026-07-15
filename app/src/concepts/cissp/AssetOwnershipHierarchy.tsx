import { useState } from 'react'

interface Role {
  name: string
  heat: string
  width: number
  accountability: string
  detail: string
}

const ROLES: Role[] = [
  { name: 'Business / Data Owner', heat: 'bg-heat-6 text-paper', width: 95, accountability: 'Ultimate accountability', detail: 'A senior executive or manager who is formally accountable for the asset — assigns its classification, approves who may access it, and answers for its protection if something goes wrong. Accountability cannot be delegated away.' },
  { name: 'Asset / System Owner', heat: 'bg-heat-5 text-paper', width: 80, accountability: 'System-level accountability', detail: 'Owns a specific system or application that stores or processes the data, and budgets for the controls that protect it — often distinct from the data owner when one system holds many owners\' data.' },
  { name: 'Data Custodian', heat: 'bg-heat-4 text-paper', width: 65, accountability: 'Technical implementation', detail: 'IT or security staff who implement the technical controls the owner requires — backups, access provisioning, encryption, patching — under the owner\'s direction, without owning the risk decision.' },
  { name: 'Data Steward', heat: 'bg-heat-3 text-ink', width: 50, accountability: 'Day-to-day quality & compliance', detail: 'Manages the data\'s quality, tagging, and lifecycle handling on a daily basis, making sure the classification and handling rules the owner set are actually followed in practice.' },
  { name: 'Data User', heat: 'bg-heat-1 text-ink', width: 35, accountability: 'Responsible use only', detail: 'Anyone who accesses the data to do their job. Must follow the acceptable use policy and handling rules, but holds no authority to grant others access or change classification.' },
]

export default function AssetOwnershipHierarchy() {
  const [selected, setSelected] = useState<number>(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Asset & Data Ownership Roles</h3>
        <p className="text-sm text-soft">Domain 2.1 — click a role to see where it sits in the chain of accountability, from executive owner down to end user.</p>
      </div>

      <div className="space-y-1.5">
        {ROLES.map((r, i) => (
          <button
            key={r.name}
            onClick={() => setSelected(i)}
            style={{ width: `${r.width}%` }}
            className={`block text-left rounded-crisp px-3 py-2 text-sm font-medium transition-all ${r.heat} ${
              selected === i ? 'ring-2 ring-offset-2 ring-offset-surface ring-accent' : 'opacity-90 hover:opacity-100'
            }`}
          >
            {i + 1}. {r.name}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{ROLES[selected].name}</h4>
        <p className="text-sm text-soft leading-relaxed mb-1">{ROLES[selected].detail}</p>
        <p className="text-sm text-soft"><span className="font-semibold text-ink">Scope:</span> {ROLES[selected].accountability}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A classic exam trap: custodians implement controls, but only the owner is accountable for the risk decision —
        outsourcing the technical work to a custodian (or a cloud provider) never transfers that accountability.
      </div>
    </div>
  )
}
