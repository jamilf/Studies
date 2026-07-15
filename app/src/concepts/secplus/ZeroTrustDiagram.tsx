import { useEffect, useState } from 'react'

const PHASES = [
  {
    label: 'Traditional perimeter model',
    caption: 'Inside the network boundary (behind the firewall) is implicitly trusted — a user or device on the LAN gets broad access with minimal re-verification.',
  },
  {
    label: 'Attacker breaches the perimeter',
    caption: 'Once an attacker gets past the perimeter (phishing, VPN compromise), they can move laterally almost freely because internal trust was assumed.',
  },
  {
    label: 'Zero Trust: never trust, always verify',
    caption: 'Every request — regardless of network location — is authenticated and authorized individually via a Policy Enforcement Point (PEP) that consults a Policy Decision Point (PDP) / policy engine before granting access.',
  },
  {
    label: 'Lateral movement is blocked',
    caption: 'The same compromised credential now fails at the next resource request because trust was never tied to being "inside the network" — each access attempt is evaluated on its own, using least privilege.',
  },
]

export default function ZeroTrustDiagram() {
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

  const enforced = phase >= 2
  const blocked = phase >= 3

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Zero Trust Architecture</h3>
          <p className="text-sm text-soft">Domain 3.2 — step through the shift from perimeter trust to per-request verification.</p>
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

      <div className="relative rounded-crisp border border-line bg-wash p-8 min-h-[220px]">
        <svg viewBox="0 0 600 200" className="w-full h-48" aria-hidden>
          {!enforced && (
            <rect x="20" y="20" width="560" height="160" rx="6" strokeDasharray="5 4" className="fill-none stroke-line-strong" strokeWidth="1.5" />
          )}
          <g transform="translate(30,80)">
            <rect width="90" height="50" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="45" y="30" textAnchor="middle" className="fill-ink text-[12px] font-medium">User/Device</text>
          </g>
          {enforced && (
            <g transform="translate(250,20)">
              <rect width="100" height="40" rx="4" className="fill-warn-tint stroke-warn" strokeWidth="1.5" />
              <text x="50" y="25" textAnchor="middle" className="fill-ink text-[10px] font-medium">PEP</text>
              <rect y="60" width="100" height="40" rx="4" className="fill-warn-tint stroke-warn" strokeWidth="1.5" />
              <text x="50" y="85" textAnchor="middle" className="fill-ink text-[10px] font-medium">PDP / Policy Engine</text>
            </g>
          )}
          <g transform="translate(470,20)">
            <rect width="90" height="50" rx="4" className="fill-good-tint stroke-good" strokeWidth="1.5" />
            <text x="45" y="30" textAnchor="middle" className="fill-ink text-[12px] font-medium">Resource A</text>
          </g>
          <g transform="translate(470,130)">
            <rect width="90" height="50" rx="4" className="fill-good-tint stroke-good" strokeWidth="1.5" />
            <text x="45" y="30" textAnchor="middle" className="fill-ink text-[12px] font-medium">Resource B</text>
          </g>

          <line x1="120" y1="90" x2="470" y2="45" className={`transition-opacity duration-700 ${phase === 0 ? 'opacity-100 stroke-good' : 'opacity-0'}`} strokeWidth="2.5" markerEnd="url(#arrowGood2)" />
          <line x1="120" y1="100" x2="470" y2="45" className={`transition-opacity duration-700 ${phase === 1 ? 'opacity-100 stroke-bad' : 'opacity-0'}`} strokeWidth="2.5" markerEnd="url(#arrowBad2)" />
          <line x1="120" y1="105" x2="470" y2="150" className={`transition-opacity duration-700 ${phase === 1 ? 'opacity-100 stroke-bad' : 'opacity-0'}`} strokeWidth="2.5" markerEnd="url(#arrowBad2)" />

          {enforced && (
            <>
              <line x1="120" y1="95" x2="250" y2="40" className="stroke-accent opacity-100 transition-opacity duration-700" strokeWidth="2" markerEnd="url(#arrowGood2)" />
              <line x1="350" y1="40" x2="470" y2="45" className="stroke-good opacity-100 transition-opacity duration-700" strokeWidth="2" markerEnd="url(#arrowGood2)" />
              <line
                x1="120"
                y1="105"
                x2="250"
                y2="80"
                className={`transition-opacity duration-700 ${blocked ? 'opacity-100 stroke-bad' : 'opacity-0'}`}
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              {blocked && <text x="180" y="95" className="fill-bad text-[9px] font-semibold">denied</text>}
            </>
          )}

          <defs>
            <marker id="arrowGood2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-good" />
            </marker>
            <marker id="arrowBad2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
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
              i === phase ? 'bg-accent-tint border-accent text-accent' : i < phase ? 'bg-wash border-line text-soft' : 'bg-surface border-line text-faint hover:text-ink'
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
        Zero Trust means "never trust, always verify": a control plane (the PDP/policy engine adjudicates) and a
        data plane (the PEP enforces) continuously verify identity, device, and context — rather than granting
        one-time trust based on network location.
      </div>
    </div>
  )
}
