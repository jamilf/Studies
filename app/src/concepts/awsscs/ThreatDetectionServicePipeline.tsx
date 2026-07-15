import { useEffect, useState } from 'react'

interface Phase {
  id: string
  label: string
  sub: string
  caption: string
}

const PHASES: Phase[] = [
  {
    id: 'guardduty',
    label: 'GuardDuty',
    sub: 'Flow logs, CloudTrail, DNS logs',
    caption:
      'GuardDuty continuously analyzes VPC Flow Logs, CloudTrail management/data events, and DNS query logs (plus optional EKS audit logs and runtime monitoring data) to generate individual findings — no agents to deploy and no logs to collect or store yourself.',
  },
  {
    id: 'securityhub',
    label: 'Security Hub',
    sub: 'Aggregates + normalizes findings',
    caption:
      'Security Hub ingests findings from GuardDuty, plus Macie, Inspector, IAM Access Analyzer, Config, and partner tools, normalizing them all into the AWS Security Finding Format (ASFF). It also runs its own security standards checks (CIS, AWS FSBP) so you get one dashboard and one set of automation rules for everything.',
  },
  {
    id: 'detective',
    label: 'Detective',
    sub: 'Behavior graph for investigation',
    caption:
      'From a high-priority Security Hub or GuardDuty finding, an analyst pivots into Detective, which has already been building a graph of API activity, network traffic, and resource relationships from up to a year of CloudTrail, VPC Flow Logs, and GuardDuty data.',
  },
  {
    id: 'analyst',
    label: 'Analyst decision',
    sub: 'Root cause + response handoff',
    caption:
      "Detective visualizes the actor's activity timeline — who did what, when, from where — so the analyst can scope the blast radius and root cause fast, then hand off to the incident response and remediation workflow.",
  },
]

const BOX_X: number[] = [20, 180, 340, 500]
const BOX_W = 130
const BOX_Y = 45
const BOX_H = 50

export default function ThreatDetectionServicePipeline() {
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
          <h3 className="font-display text-lg text-ink">GuardDuty to Security Hub to Detective Pipeline</h3>
          <p className="text-sm text-soft">
            Domain 1.2 — step through how a raw signal becomes an investigated finding across the three detection
            services.
          </p>
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
            <marker id="arrow-tdsp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
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
              markerEnd="url(#arrow-tdsp)"
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
        These three services layer rather than compete: GuardDuty finds the signal, Security Hub aggregates and
        prioritizes it alongside everything else in the account, and Detective supplies the investigation depth
        neither of the other two is built for.
      </div>
    </div>
  )
}
