import { useEffect, useState } from 'react'

type Kind = 'ingress' | 'evaluate' | 'match' | 'action' | 'default' | 'forward'

interface Step {
  title: string
  kind: Kind
  detail: string
}

const STEPS: Step[] = [
  { title: 'Request arrives', kind: 'ingress', detail: 'A request hits a CloudFront distribution or an Application Load Balancer that has a Web ACL associated with it.' },
  { title: 'Evaluate Web ACL rules', kind: 'evaluate', detail: "WAF walks the Web ACL's rules in priority order (lowest number first) — one rule at a time, top to bottom." },
  {
    title: 'A rule condition matches',
    kind: 'match',
    detail:
      "A rule's statement matches the request: a SQL injection pattern, a rate-based rule exceeding its threshold, a geo-restriction on the source country, or the source IP appearing in an IP set.",
  },
  {
    title: 'Action taken',
    kind: 'action',
    detail:
      'The FIRST rule with a definitive match (Block or Allow) decides the outcome immediately — evaluation stops there. A rule set to Count only logs the match and lets evaluation continue.',
  },
  {
    title: 'Default action applies',
    kind: 'default',
    detail: "If no rule produced a definitive Block/Allow, the Web ACL's default action (Allow or Block) is applied to the request.",
  },
  {
    title: 'Allowed requests proceed',
    kind: 'forward',
    detail: "Anything not blocked is forwarded on to the origin — the CloudFront distribution's origin, or the ALB's target group.",
  },
]

const KIND_COLOR: Record<Kind, string> = {
  ingress: 'bg-accent text-paper',
  evaluate: 'bg-accent text-paper',
  match: 'bg-warn text-paper',
  action: 'bg-bad text-paper',
  default: 'bg-warn text-paper',
  forward: 'bg-good text-paper',
}

export default function WafRuleFlow() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">How a WAF Web ACL Evaluates a Request</h3>
          <p className="text-sm text-soft">Domain 3.3 — walk a request through Web ACL rule evaluation, in priority order.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? KIND_COLOR[s.kind] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-ink' : ''}`}
              >
                {i + 1}
              </span>
              <span
                className={`text-[10px] text-center leading-tight transition-colors ${
                  i === active ? 'text-ink' : 'text-faint group-hover:text-soft'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-2">{STEPS[active].title}</h4>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tell: rule priority (evaluation order), not rule creation order, decides the outcome — and the first
        rule producing a definitive Block or Allow wins, short-circuiting the rest. A Count action never
        short-circuits; it only logs and lets evaluation keep going.
      </div>
    </div>
  )
}
