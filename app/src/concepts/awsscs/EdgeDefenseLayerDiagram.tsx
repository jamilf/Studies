import { useEffect, useState } from 'react'

interface Phase {
  id: string
  label: string
  sub: string
  caption: string
}

const PHASES: Phase[] = [
  {
    id: 'networkfirewall',
    label: 'Network Firewall',
    sub: 'VPC-level stateful inspection',
    caption:
      'AWS Network Firewall sits at the VPC boundary (deployed in a dedicated firewall subnet) and performs stateful L3–L7 inspection across all traffic entering or leaving the VPC — domain filtering and intrusion detection/prevention (Suricata-compatible rules) before traffic even reaches a load balancer.',
  },
  {
    id: 'waf',
    label: 'WAF Web ACL',
    sub: 'Layer 7 HTTP inspection',
    caption:
      'AWS WAF, attached to the ALB, CloudFront, or API Gateway, inspects HTTP(S) requests specifically — blocking SQL injection, XSS, bad bots, and enforcing rate-based rules using managed or custom rule groups.',
  },
  {
    id: 'securitygroup',
    label: 'Security Group',
    sub: 'Instance-level stateful allow-list',
    caption:
      "The security group on the instance's ENI is the last network control point — a default-deny, stateful allow-list scoped to exactly this resource (e.g. allow port 443 only from the ALB's own security group).",
  },
  {
    id: 'workload',
    label: 'Workload',
    sub: "Application handles what's left",
    caption:
      'Only traffic that survives all three layers reaches the application. Each layer catches a different class of threat, so removing any one — e.g. relying on WAF alone with wide-open security groups — leaves a gap the exam will test.',
  },
]

const BOX_X: number[] = [20, 180, 340, 500]
const BOX_W = 130
const BOX_Y = 45
const BOX_H = 50

export default function EdgeDefenseLayerDiagram() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Network Firewall, WAF, and Security Groups: Layered Defense</h3>
          <p className="text-sm text-soft">Domain 3.1 — step through the order in which each layer inspects inbound traffic.</p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 650 140" className="w-full h-36" aria-hidden>
          <defs>
            <marker id="arrow-edld" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className="fill-line-strong" />
            </marker>
          </defs>
          {BOX_X.slice(0, -1).map((x, i) => (
            <line
              key={i}
              x1={x + BOX_W}
              y1={BOX_Y + BOX_H / 2}
              x2={BOX_X[i + 1]}
              y2={BOX_Y + BOX_H / 2}
              className="stroke-line-strong"
              strokeWidth="1.5"
              markerEnd="url(#arrow-edld)"
            />
          ))}
          {PHASES.map((ph, i) => (
            <g
              key={ph.id}
              onClick={() => {
                setPlaying(false)
                setPhase(i)
              }}
              className="cursor-pointer"
            >
              <rect
                x={BOX_X[i]}
                y={BOX_Y}
                width={BOX_W}
                height={BOX_H}
                rx={4}
                className={`transition-colors duration-500 ${i <= phase ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'}`}
                strokeWidth={i === phase ? 2 : 1}
              />
              <text x={BOX_X[i] + BOX_W / 2} y={BOX_Y + BOX_H / 2 - 4} textAnchor="middle" className="fill-ink text-[11px] font-semibold">
                {ph.label}
              </text>
              <text x={BOX_X[i] + BOX_W / 2} y={BOX_Y + BOX_H / 2 + 12} textAnchor="middle" className="fill-soft text-[8px]">
                {ph.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{PHASES[phase].label}</h4>
        <p className="text-sm text-soft leading-relaxed">{PHASES[phase].caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Network Firewall protects the VPC boundary at L3–L7 for ALL traffic; WAF protects HTTP(S) applications
        specifically; security groups protect the individual resource. A defense-in-depth design typically uses
        all three together rather than any single layer alone.
      </div>
    </div>
  )
}
