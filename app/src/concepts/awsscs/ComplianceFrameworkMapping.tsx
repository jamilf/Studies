import { useState } from 'react'

type ToolId = 'artifact' | 'kms-hsm' | 'audit-manager' | 'security-hub'

interface Requirement {
  id: string
  label: string
  tool: ToolId
}

interface ToolInfo {
  name: string
  reason: string
}

const REQUIREMENTS: Requirement[] = [
  { id: 'proof', label: "Need proof of AWS's own PCI-DSS / ISO / SOC compliance for an auditor", tool: 'artifact' },
  { id: 'encrypt', label: 'Need to encrypt cardholder or health data at rest with tightly controlled keys', tool: 'kms-hsm' },
  { id: 'evidence', label: 'Need to continuously collect evidence for an internal/external audit', tool: 'audit-manager' },
  { id: 'dashboard', label: 'Need a single dashboard showing compliance posture against a standard (e.g. CIS, PCI)', tool: 'security-hub' },
]

const TOOLS: Record<ToolId, ToolInfo> = {
  artifact: {
    name: 'AWS Artifact',
    reason:
      "AWS Artifact is the self-service portal for downloading AWS's own compliance reports and agreements (PCI DSS AOC, SOC 1/2/3, ISO certifications). It proves what AWS the infrastructure provider has already had audited — not your workload.",
  },
  'kms-hsm': {
    name: 'AWS KMS / CloudHSM',
    reason:
      'KMS provides managed, auditable encryption keys for data at rest (the usual answer). CloudHSM is the escalation when a regulator requires a single-tenant, FIPS 140-2 Level 3 validated hardware module under your exclusive control.',
  },
  'audit-manager': {
    name: 'AWS Audit Manager',
    reason:
      'Audit Manager continuously and automatically collects evidence (configuration snapshots, compliance check results) mapped to a chosen framework, building an audit-ready evidence folder over time instead of a manual scramble.',
  },
  'security-hub': {
    name: 'AWS Security Hub',
    reason:
      'Security Hub aggregates findings from GuardDuty, Config, Inspector, and more into one dashboard, and scores your accounts against standards like CIS AWS Foundations or PCI DSS — a live compliance posture view.',
  },
}

export default function ComplianceFrameworkMapping() {
  const [selected, setSelected] = useState<Requirement>(REQUIREMENTS[0])
  const tool = TOOLS[selected.tool]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Which Compliance Tool Do I Reach For?</h3>
        <p className="text-sm text-soft">Domain 6.2 — pick the requirement to find the AWS service built for it.</p>
      </div>

      <div className="flex flex-col gap-2">
        {REQUIREMENTS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelected(r)}
            className={`rounded-crisp border px-3 py-2 text-left text-sm transition-colors ${
              selected.id === r.id ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div key={selected.id} className="rounded-crisp border-l-2 border-good bg-good-tint px-4 py-3 text-sm animate-fadein">
        <p className="font-display font-semibold text-good mb-1">{tool.name}</p>
        <p className="text-ink">{tool.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        These tools solve different problems: Artifact proves AWS's compliance to you, KMS/CloudHSM protect your
        data, Audit Manager builds your evidence trail, and Security Hub scores your live posture. A real audit
        usually touches all four.
      </div>
    </div>
  )
}
