import { useMemo, useState } from 'react'

type Goal = 'Two VPCs only' | 'Many VPCs / accounts (hub-and-spoke)' | 'One-way access to a specific service'

interface Verdict {
  level: 'good' | 'warn' | 'bad'
  title: string
  reason: string
}

const GOALS: Goal[] = ['Two VPCs only', 'Many VPCs / accounts (hub-and-spoke)', 'One-way access to a specific service']

function evaluate(goal: Goal, needFullRouting: boolean): Verdict {
  if (goal === 'Two VPCs only') {
    return {
      level: 'good',
      title: 'Use VPC Peering',
      reason:
        'For a simple 1:1 connection between two VPCs, peering is the lowest-cost, lowest-complexity option — a direct route between the two VPC CIDR ranges with no extra hop and no per-GB Transit Gateway processing charge.',
    }
  }
  if (goal === 'Many VPCs / accounts (hub-and-spoke)') {
    return {
      level: 'good',
      title: 'Use Transit Gateway',
      reason:
        "VPC Peering has no transitive routing — connecting N VPCs would require a full mesh of N(N-1)/2 peering connections. Transit Gateway is a regional hub router that every VPC/VPN/Direct Connect attaches to once, giving transitive routing that peering fundamentally cannot.",
    }
  }
  if (needFullRouting) {
    return {
      level: 'warn',
      title: 'PrivateLink may not be enough',
      reason:
        "PrivateLink (interface VPC endpoints) only exposes the specific service through an ENI on a defined port — it does NOT provide general IP routing (no ICMP, no arbitrary protocols/ports). If you truly need broad network reachability, use VPC Peering or Transit Gateway instead.",
    }
  }
  return {
    level: 'good',
    title: 'Use PrivateLink',
    reason:
      "PrivateLink is the right fit for exposing or consuming a single specific service privately without exchanging routes or CIDR ranges at all — no risk of IP overlap, and the consumer VPC never gets broader network access than that one service.",
  }
}

const LEVEL_STYLE: Record<Verdict['level'], string> = {
  good: 'border-good bg-good-tint text-good',
  warn: 'border-warn bg-warn-tint text-warn',
  bad: 'border-bad bg-bad-tint text-bad',
}

export default function ConnectivityChoiceMatrix() {
  const [goal, setGoal] = useState<Goal>('Two VPCs only')
  const [needFullRouting, setNeedFullRouting] = useState<boolean>(false)

  const verdict = useMemo(() => evaluate(goal, needFullRouting), [goal, needFullRouting])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">VPC Peering vs. Transit Gateway vs. PrivateLink</h3>
        <p className="text-sm text-soft">Domain 3.2 — pick your connectivity goal to see which private connectivity option fits.</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-soft mb-1">What are you trying to connect?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            {GOALS.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  goal === g ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {goal === 'One-way access to a specific service' && (
          <div>
            <p className="text-xs text-soft mb-1">Do you need full IP-level routing (e.g. ICMP, non-HTTP protocols), not just the service?</p>
            <div className="flex gap-2">
              {[false, true].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => setNeedFullRouting(v)}
                  className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                    needFullRouting === v ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                  }`}
                >
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div key={`${goal}-${needFullRouting}`} className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${LEVEL_STYLE[verdict.level]}`}>
        <p className="font-display font-semibold mb-1">{verdict.title}</p>
        <p className="text-ink text-sm">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam shorthand: Peering for a simple pair, Transit Gateway when routing needs to be transitive across
        many VPCs/accounts, and PrivateLink when you only need one specific service exposed privately without
        touching route tables or CIDR ranges at all.
      </div>
    </div>
  )
}
