import { useMemo, useState } from 'react'

type Workload = 'shared-file' | 'block' | 'object' | 'high-iops-db'

const WORKLOAD_LABELS: Record<Workload, string> = {
  'shared-file': 'Shared file access across many EC2 instances',
  block: 'Block storage for a single EC2 instance',
  object: 'Object storage for static assets & backups',
  'high-iops-db': 'High-IOPS database storage',
}

const RECOMMENDATION: Record<Workload, { service: string; reason: string }> = {
  'shared-file': { service: 'Amazon EFS', reason: 'A managed NFS file system that can be mounted concurrently by many EC2 instances, growing and shrinking automatically.' },
  block: { service: 'Amazon EBS', reason: 'A network-attached block volume tied to a single EC2 instance (unless using Multi-Attach) — the default choice for boot volumes and general-purpose storage.' },
  object: { service: 'Amazon S3', reason: 'Durable, virtually unlimited object storage ideal for static assets, backups, and data lakes — accessed over HTTP(S), not mounted as a filesystem.' },
  'high-iops-db': { service: 'EBS io2 (or Instance Store)', reason: 'io2 volumes deliver high, consistent IOPS with durability for demanding database workloads; Instance Store trades durability for the highest raw IOPS on ephemeral data.' },
}

export default function StorageServiceSelector() {
  const [workload, setWorkload] = useState<Workload>('shared-file')
  const rec = useMemo(() => RECOMMENDATION[workload], [workload])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">AWS Storage Service Selector</h3>
        <p className="text-sm text-soft">Domain 3.1 — pick a workload to get the recommended storage service.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {(Object.keys(WORKLOAD_LABELS) as Workload[]).map((w) => (
          <button key={w} onClick={() => setWorkload(w)} className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${workload === w ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'}`}>
            {WORKLOAD_LABELS[w]}
          </button>
        ))}
      </div>

      <div key={workload} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein">
        <p className="font-display text-lg font-semibold text-accent">{rec.service}</p>
        <p className="text-sm text-ink mt-1">{rec.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The key distinction the exam tests: EBS is block storage for one instance, EFS is a shared file system for
        many, and S3 is object storage accessed over an API, not mounted as a filesystem at all.
      </div>
    </div>
  )
}
