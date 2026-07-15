import { useMemo, useState } from 'react'

type Goal = 'analyze' | 'alert' | 'recommend'

const GOAL_LABELS: Record<Goal, string> = {
  analyze: 'Visualize and analyze historical & forecasted spend',
  alert: 'Get notified before spend crosses a threshold you set',
  recommend: 'Get automated, best-practice recommendations to cut cost, boost security, or improve performance',
}

interface ToolInfo {
  service: string
  reason: string
}

const RECOMMENDATION: Record<Goal, ToolInfo> = {
  analyze: {
    service: 'AWS Cost Explorer',
    reason: 'A visual interface for exploring historical cost and usage data over the last 12 months, with basic forecasting for the next 12 months and filtering by service, linked account, tag, and more — the default tool for "where is our money going?"',
  },
  alert: {
    service: 'AWS Budgets',
    reason: 'Lets you set custom cost, usage, Savings Plans, or Reserved Instance utilization budgets and fires an alert (email/SNS) when actual or forecasted spend exceeds a threshold you define — the tool for proactive guardrails, not historical analysis.',
  },
  recommend: {
    service: 'AWS Trusted Advisor',
    reason: 'Scans your account against best-practice checks across five categories — cost optimization, performance, security, fault tolerance, and service limits — and surfaces specific, actionable recommendations like idle load balancers or underutilized EC2 instances.',
  },
}

export default function CostManagementToolComparison() {
  const [goal, setGoal] = useState<Goal>('analyze')
  const rec = useMemo(() => RECOMMENDATION[goal], [goal])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cost Explorer vs Budgets vs Trusted Advisor</h3>
        <p className="text-sm text-soft">Domain 4.4 — pick what you're trying to accomplish to see which AWS cost management tool fits.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
          <button
            key={g}
            onClick={() => setGoal(g)}
            className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
              goal === g ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {GOAL_LABELS[g]}
          </button>
        ))}
      </div>

      <div key={goal} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein">
        <p className="font-display text-lg font-semibold text-accent">{rec.service}</p>
        <p className="text-sm text-ink mt-1">{rec.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        All three are free (Trusted Advisor's full check set requires Business or Enterprise Support): Cost Explorer
        answers "what happened," Budgets answers "tell me before it happens again," and Trusted Advisor answers
        "what should I change." The exam often tests picking the tool that matches the verb in the scenario.
      </div>
    </div>
  )
}
