import { useEffect, useState } from 'react'

interface Phase {
  label: string
  caption: string
}

const PHASES: Phase[] = [
  {
    label: 'API calls happen',
    caption:
      'Every API call made against the account — by a user, role, or AWS service — is a candidate event. CloudTrail is watching all of them.',
  },
  {
    label: 'CloudTrail delivers logs',
    caption:
      'CloudTrail captures the calls and delivers log files to an S3 bucket for durable storage (and optionally streams them to CloudWatch Logs for near-real-time access).',
  },
  {
    label: 'S3 bucket is hardened',
    caption:
      'A restrictive bucket policy, versioning, and S3 Object Lock protect the log archive itself — so an attacker who compromises the account cannot quietly delete or tamper with the evidence.',
  },
  {
    label: 'Suspicious pattern triggers a rule',
    caption:
      'A CloudWatch Logs subscription filter or an EventBridge rule watches for a suspicious pattern (e.g. a root login, a specific API call) and fires when it matches.',
  },
  {
    label: 'Alert reaches the security team',
    caption:
      'The match is routed to an SNS topic (email/Slack/ticket) or into Security Hub, so a human on the security team sees the alert and can respond.',
  },
]

export default function LogPipelineDiagram() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 2200)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Anatomy of a Log &amp; Alert Pipeline</h3>
          <p className="text-sm text-soft">Domain 2.2 — from an API call to a security team alert.</p>
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

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[240px]">
        <svg viewBox="0 0 650 220" className="w-full h-56" aria-hidden>
          <g transform="translate(10,85)">
            <rect width="100" height="50" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="50" y="22" textAnchor="middle" className="fill-ink text-[11px] font-medium">AWS Account</text>
            <text x="50" y="36" textAnchor="middle" className="fill-soft text-[10px]">API calls</text>
          </g>

          <g transform="translate(150,85)">
            <rect width="100" height="50" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="50" y="30" textAnchor="middle" className="fill-ink text-[12px] font-medium">CloudTrail</text>
          </g>

          <g transform="translate(300,20)">
            <rect
              width="110"
              height="50"
              rx="4"
              className={`transition-colors duration-700 ${phase >= 2 ? 'fill-good-tint stroke-good' : 'fill-surface stroke-line-strong'}`}
              strokeWidth="1.5"
            />
            <text x="55" y="22" textAnchor="middle" className="fill-ink text-[11px] font-medium">S3 Log Archive</text>
            <text x="55" y="36" textAnchor="middle" className="fill-soft text-[9px]">versioning + Object Lock</text>
            {phase >= 2 && (
              <text x="100" y="14" textAnchor="middle" className="text-[13px]">
                🔒
              </text>
            )}
          </g>

          <g transform="translate(300,150)">
            <rect width="110" height="50" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="55" y="22" textAnchor="middle" className="fill-ink text-[11px] font-medium">CloudWatch</text>
            <text x="55" y="36" textAnchor="middle" className="fill-soft text-[9px]">Logs (optional stream)</text>
          </g>

          <g transform="translate(460,150)">
            <rect
              width="100"
              height="50"
              rx="4"
              className={`transition-colors duration-700 ${phase >= 3 ? 'fill-warn-tint stroke-warn' : 'fill-surface stroke-line-strong'}`}
              strokeWidth="1.5"
            />
            <text x="50" y="22" textAnchor="middle" className="fill-ink text-[10px] font-medium">EventBridge Rule /</text>
            <text x="50" y="34" textAnchor="middle" className="fill-ink text-[10px] font-medium">Subscription Filter</text>
          </g>

          <g transform="translate(460,15)">
            <rect
              width="100"
              height="45"
              rx="4"
              className={`transition-colors duration-700 ${phase >= 4 ? 'fill-bad-tint stroke-bad' : 'fill-surface stroke-line-strong'}`}
              strokeWidth="1.5"
            />
            <text x="50" y="19" textAnchor="middle" className="fill-ink text-[10px] font-medium">SNS Topic /</text>
            <text x="50" y="32" textAnchor="middle" className="fill-ink text-[10px] font-medium">Security Hub</text>
          </g>

          <line x1="110" y1="110" x2="150" y2="110" className="stroke-accent" strokeWidth="2.5" markerEnd="url(#arrowAccent)" />

          <line
            x1="250"
            y1="95"
            x2="300"
            y2="55"
            className={`transition-opacity duration-700 stroke-good ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2.5"
            markerEnd="url(#arrowGood)"
          />
          <line
            x1="250"
            y1="120"
            x2="300"
            y2="165"
            className={`transition-opacity duration-700 stroke-soft ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2"
            strokeDasharray="5 4"
            markerEnd="url(#arrowSoft)"
          />
          <line
            x1="410"
            y1="175"
            x2="460"
            y2="175"
            className={`transition-opacity duration-700 stroke-warn ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2.5"
            markerEnd="url(#arrowWarn)"
          />
          <path
            d="M 560 165 C 610 165, 610 60, 560 45"
            fill="none"
            className={`transition-opacity duration-700 stroke-bad ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2.5"
            markerEnd="url(#arrowBad)"
          />

          <defs>
            <marker id="arrowAccent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
            </marker>
            <marker id="arrowGood" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-good" />
            </marker>
            <marker id="arrowSoft" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-soft" />
            </marker>
            <marker id="arrowWarn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-warn" />
            </marker>
            <marker id="arrowBad" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-bad" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="flex gap-2">
        {PHASES.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setPlaying(false)
              setPhase(i)
            }}
            className={`flex-1 rounded-crisp px-2 py-1.5 text-[11px] font-medium transition-colors border ${
              i === phase
                ? 'bg-accent-tint border-accent text-accent'
                : i < phase
                  ? 'bg-wash border-line text-soft'
                  : 'bg-surface border-line text-faint hover:text-ink'
            }`}
          >
            {i + 1}. {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm text-ink leading-relaxed">
        {PHASES[phase].caption}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: log integrity is graded separately from log delivery. Enabling CloudTrail is step one; a
        bucket policy that denies deletes, versioning, and Object Lock are what keep an attacker from covering
        their tracks after the fact.
      </div>
    </div>
  )
}
