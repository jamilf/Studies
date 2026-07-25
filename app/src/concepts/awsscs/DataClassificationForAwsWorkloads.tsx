import { useMemo, useState } from 'react'

interface Tier {
  name: string
  description: string
  controls: string
  encryption: number
  access: number
  audit: number
}

const TIERS: Tier[] = [
  {
    name: 'Public',
    description: 'Data meant for open distribution, e.g. marketing pages or public documentation hosted from a static S3 website.',
    controls: 'Standard S3 default encryption is enough; access logging is optional; broad read access is expected and safe.',
    encryption: 1,
    access: 1,
    audit: 1,
  },
  {
    name: 'Internal',
    description: 'Non-sensitive operational data used within the company, e.g. internal wikis, build artifacts, or dashboards.',
    controls: 'SSE-S3/SSE-KMS enabled, bucket policies restrict access to the corporate VPC or IAM roles, basic CloudTrail data events on.',
    encryption: 2,
    access: 3,
    audit: 3,
  },
  {
    name: 'Confidential',
    description: 'Sensitive business data such as financial reports, contracts, or customer records not classified as regulated PII.',
    controls: 'SSE-KMS with a customer managed key and a tight key policy, least-privilege IAM, S3 access logging, and Macie scanning for sensitive data.',
    encryption: 4,
    access: 5,
    audit: 5,
  },
  {
    name: 'Restricted',
    description: 'Highly regulated data — PCI cardholder data, PHI, or government-regulated PII — with the strictest legal exposure.',
    controls:
      'Dedicated CMK with a narrow key policy and mandatory rotation, VPC-endpoint-only access, full CloudTrail + Config + Macie coverage, and often a dedicated account boundary.',
    encryption: 6,
    access: 6,
    audit: 6,
  },
]

const HEAT_CLASS = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']

function meterClass(level: number): string {
  return HEAT_CLASS[Math.max(0, Math.min(5, level - 1))]
}

export default function DataClassificationForAwsWorkloads() {
  const [index, setIndex] = useState(0)
  const tier = useMemo(() => TIERS[index], [index])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Data Classification Tiers for AWS Workloads</h3>
        <p className="text-sm text-soft">Domain 5.3 — slide across the classification levels to see the controls each one demands.</p>
      </div>

      <div>
        <input
          type="range" aria-label="Data Classification Tiers for AWS Workloads"
          min={0}
          max={TIERS.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between mt-1">
          {TIERS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              className={`text-xs font-medium transition-colors ${i === index ? 'text-accent' : 'text-faint hover:text-soft'}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {(
          [
            { label: 'Encryption strength', value: tier.encryption },
            { label: 'Access restriction', value: tier.access },
            { label: 'Audit granularity', value: tier.audit },
          ] as { label: string; value: number }[]
        ).map((stat) => (
          <div key={stat.label} className="rounded-crisp border border-line bg-surface p-3 space-y-2">
            <p className="text-xs text-soft">{stat.label}</p>
            <div className="h-2 rounded-crisp bg-wash overflow-hidden">
              <div className={`h-full rounded-crisp transition-all duration-500 ${meterClass(stat.value)}`} style={{ width: `${(stat.value / 6) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div key={index} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-1.5">
        <h4 className="font-semibold text-ink">{tier.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{tier.description}</p>
        <p className="text-sm text-ink leading-relaxed">
          <span className="text-soft">Typical controls: </span>
          {tier.controls}
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Classification should drive controls, not the other way around: tag and label data by sensitivity first
        (often with resource tags or a Macie discovery job), then let that classification determine which key,
        which network path, and which logging level a workload is required to use.
      </div>
    </div>
  )
}
