import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Preventive guardrail',
    back:
      "Implemented as a Service Control Policy, applied at the OU level. It makes a disallowed action impossible regardless of IAM permissions — e.g. \"Disallow deletion of CloudTrail logs\" — so there's no compliance status to check because it can never be violated.",
  },
  {
    front: 'Detective guardrail',
    back:
      'Implemented as an AWS Config managed rule that continuously evaluates existing resources and flags noncompliant ones — e.g. "Detect S3 buckets with public read access." It does not block the action, it only reports after the fact.',
  },
  {
    front: 'Mandatory guardrail',
    back:
      'Always enforced by Control Tower in every landing zone and cannot be disabled — for example, guardrails that prevent disabling AWS CloudTrail or the Config recorder in a member account.',
  },
  {
    front: 'Strongly recommended guardrail',
    back:
      'A best-practice guardrail Control Tower suggests enabling, such as requiring MFA for the root user, but which an administrator can choose to turn off if it doesn\'t fit the environment.',
  },
  {
    front: 'Elective guardrail',
    back:
      'An optional guardrail for specific use cases, like restricting which AWS Regions can be used, that teams enable selectively rather than by default.',
  },
  {
    front: 'Account Factory',
    back:
      'The Control Tower component that provisions new accounts from a standardized, pre-approved template — network config, guardrails, and baseline already applied — so every account starts from the same secure baseline.',
  },
]

export default function ControlTowerGuardrails() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Control Tower Guardrail Types</h3>
        <p className="text-sm text-soft">Domain 6.1 — click a card to reveal what each guardrail category actually does.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-display text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Control Tower layers two independent axes: HOW a guardrail acts (preventive via SCP vs detective via
        Config) and WHETHER it can be turned off (mandatory vs strongly recommended vs elective). A question that
        says "blocks the action outright" points to preventive; one that says "flags noncompliant resources"
        points to detective.
      </div>
    </div>
  )
}
