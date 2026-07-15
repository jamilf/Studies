import { useEffect, useState } from 'react'

interface Phase {
  label: string
  caption: string
}

const PHASES: Phase[] = [
  {
    label: 'Sync identities',
    caption:
      'The corporate identity provider (Okta, Azure AD, etc.) is connected to IAM Identity Center via SAML 2.0, and SCIM automatically syncs users and groups in — no IAM users are created in AWS accounts.',
  },
  {
    label: 'User signs in',
    caption:
      'The user authenticates once at the IAM Identity Center access portal (or via SP-initiated SSO), and Identity Center redirects the sign-in to the external IdP, which returns a signed SAML assertion.',
  },
  {
    label: 'Map to permission set',
    caption:
      "Identity Center matches the authenticated user/group to a permission set assignment for a target AWS account — a permission set is a template that provisions an IAM role in that account with a defined policy.",
  },
  {
    label: 'Issue temporary credentials',
    caption:
      'Behind the scenes, Identity Center calls AWS STS to assume the account-local role created from the permission set, producing short-lived AccessKeyId / SecretAccessKey / SessionToken values.',
  },
  {
    label: 'Access the account',
    caption:
      'The user lands in the target AWS account (console, CLI, or SDK) scoped exactly to that permission set — no long-lived IAM user or access key ever existed for this person.',
  },
]

const NODE_X = [40, 150, 260, 370, 430]
const NODE_LABELS = ['External IdP', 'Identity Center', 'Permission Set', 'STS', 'AWS Account']

export default function FederatedAccessWithIdentityCenter() {
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

  const activeNode = Math.min(phase, NODE_X.length - 1)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Federated Access via IAM Identity Center</h3>
          <p className="text-sm text-soft">Domain 4.1 — trace a workforce sign-in from the external IdP to a live AWS session.</p>
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
        <svg viewBox="0 0 470 90" className="w-full h-24" aria-hidden>
          <defs>
            <marker id="fai-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-line-strong" />
            </marker>
          </defs>
          {NODE_X.slice(0, -1).map((x, i) => (
            <line
              key={i}
              x1={x + 22}
              y1={40}
              x2={NODE_X[i + 1] - 22}
              y2={40}
              className={i < activeNode ? 'stroke-accent' : 'stroke-line-strong'}
              strokeWidth="1.5"
              markerEnd="url(#fai-arrow)"
            />
          ))}
          {NODE_X.map((x, i) => (
            <g key={i}>
              <rect
                x={x - 22}
                y={22}
                width="44"
                height="36"
                rx="4"
                className={i === activeNode ? 'fill-accent' : i < activeNode ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'}
                strokeWidth="1"
              />
              <text x={x} y={75} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {NODE_LABELS[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(phase / (PHASES.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {PHASES.map((p, i) => (
            <button
              key={p.label}
              onClick={() => {
                setPlaying(false)
                setPhase(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / PHASES.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= phase ? 'bg-accent text-paper' : 'bg-wash text-faint'
                } ${i === phase ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{PHASES[phase].label}</h4>
        <p className="text-sm text-soft leading-relaxed">{PHASES[phase].caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        IAM Identity Center is the recommended way to give workforce users AWS access at scale: identities live in
        one external IdP, permission sets are the single place access is defined, and every session credential
        AWS ever issues is short-lived and comes from STS — there is nothing long-lived to leak per user.
      </div>
    </div>
  )
}
