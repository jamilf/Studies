import { useMemo, useState } from 'react'

type ScanLevel = 'Disabled' | 'Basic (scan on push)' | 'Enhanced (continuous)'
type RoleScope = 'Shared broad role' | 'Least-privilege per-service role'

interface Verdict {
  level: 'good' | 'warn' | 'bad'
  title: string
  reason: string
}

const SCAN_LEVELS: ScanLevel[] = ['Disabled', 'Basic (scan on push)', 'Enhanced (continuous)']
const ROLE_SCOPES: RoleScope[] = ['Shared broad role', 'Least-privilege per-service role']

function evaluate(scan: ScanLevel, role: RoleScope): Verdict {
  const leastPriv = role === 'Least-privilege per-service role'

  if (scan === 'Enhanced (continuous)' && leastPriv) {
    return {
      level: 'good',
      title: 'Strong posture',
      reason:
        'Enhanced scanning continuously rescans images as new CVEs are published (not just at push time), and a least-privilege task role means even a successfully exploited container has minimal blast radius.',
    }
  }
  if (scan === 'Enhanced (continuous)' && !leastPriv) {
    return {
      level: 'warn',
      title: 'Good detection, weak containment',
      reason:
        "Enhanced scanning will catch vulnerabilities quickly, but a shared broad task role means a compromised container can pivot far beyond its own service — an attacker who lands a shell inherits everything the shared role can do.",
    }
  }
  if (scan === 'Basic (scan on push)' && leastPriv) {
    return {
      level: 'warn',
      title: 'Decent baseline, blind spot over time',
      reason:
        'Scan-on-push only evaluates the image against known CVEs at the moment it was pushed — a vulnerability disclosed next month in an already-deployed image goes unnoticed. Least-privilege containment is solid, but detection will go stale.',
    }
  }
  if (scan === 'Basic (scan on push)' && !leastPriv) {
    return {
      level: 'bad',
      title: 'Weak on both axes',
      reason:
        'Scan-on-push misses newly disclosed CVEs in already-running images, and a shared broad role means any compromise found late has a wide blast radius. Tighten the role scope first, then upgrade scanning.',
    }
  }
  if (scan === 'Disabled' && leastPriv) {
    return {
      level: 'bad',
      title: 'Flying blind',
      reason:
        'Least-privilege containment limits the damage if something goes wrong, but with scanning disabled you have no visibility into known vulnerabilities in your images at all — you would only find out via an incident.',
    }
  }
  return {
    level: 'bad',
    title: 'Worst-case combination',
    reason:
      'No vulnerability scanning means you have no idea what CVEs are shipping in your images, and a shared broad task role means a compromised container can reach far beyond its own service. Fix both before this goes to production.',
  }
}

const LEVEL_STYLE: Record<Verdict['level'], string> = {
  good: 'border-good bg-good-tint text-good',
  warn: 'border-warn bg-warn-tint text-warn',
  bad: 'border-bad bg-bad-tint text-bad',
}

export default function ContainerWorkloadSecurityMatrix() {
  const [scan, setScan] = useState<ScanLevel>('Basic (scan on push)')
  const [role, setRole] = useState<RoleScope>('Shared broad role')

  const verdict = useMemo(() => evaluate(scan, role), [scan, role])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Container Workload Security: Scanning + Task Role Scope</h3>
        <p className="text-sm text-soft">Domain 3.3 — pick an ECR scanning level and a task role scope to see the resulting posture.</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-soft mb-1">ECR image vulnerability scanning</p>
          <div className="flex flex-col sm:flex-row gap-2">
            {SCAN_LEVELS.map((s) => (
              <button
                key={s}
                onClick={() => setScan(s)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  scan === s ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-soft mb-1">ECS/EKS task IAM role scope</p>
          <div className="flex flex-col sm:flex-row gap-2">
            {ROLE_SCOPES.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  role === r ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${scan}-${role}`} className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${LEVEL_STYLE[verdict.level]}`}>
        <p className="font-display font-semibold mb-1">{verdict.title}</p>
        <p className="text-ink text-sm">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Container security has two independent axes: catching known vulnerabilities in the image (scanning) and
        limiting what a compromised container can do at runtime (task role scope). A strong answer needs both —
        one does not compensate for the other.
      </div>
    </div>
  )
}
