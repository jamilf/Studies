import { useEffect, useState } from 'react'

interface Phase {
  label: string
  caption: string
}

const PHASES: Phase[] = [
  {
    label: 'Internet traffic arrives',
    caption: 'An external user or attacker on the internet initiates a connection toward one of the organization\'s public-facing services.',
  },
  {
    label: 'External firewall filters into the screened subnet',
    caption: 'The external (edge) firewall only allows traffic destined for specific public services — web, mail, DNS — into the screened subnet (DMZ), never straight into the internal network.',
  },
  {
    label: 'Public servers live in the screened subnet',
    caption: 'Web, mail, and DNS servers sit in this isolated middle zone. If one is compromised, the attacker is still boxed in — not automatically inside the trusted internal network.',
  },
  {
    label: 'Internal firewall blocks direct access',
    caption: 'A second, internal firewall separates the screened subnet from the internal LAN, permitting only narrow, specific traffic (e.g., the web server querying an internal database on one port) rather than open access.',
  },
  {
    label: 'Internal network & data stay isolated',
    caption: 'Sensitive internal systems and data are never directly reachable from the internet — every path requires passing through two independently configured firewalls and a screened intermediate zone.',
  },
]

export default function ScreenedSubnetDiagram() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 2100)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Screened Subnet (DMZ) Segmentation</h3>
          <p className="text-sm text-soft">Domain 3.2 — step through how a screened subnet keeps public services separate from the internal network.</p>
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

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[200px]">
        <svg viewBox="0 0 620 180" className="w-full h-44" aria-hidden>
          <g transform="translate(10,65)">
            <rect width="80" height="50" rx="4" className={`transition-colors duration-700 ${phase >= 0 ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'}`} strokeWidth="1.5" />
            <text x="40" y="30" textAnchor="middle" className="fill-ink text-[11px] font-medium">Internet</text>
          </g>

          <g transform="translate(150,65)">
            <rect width="16" height="50" className={`transition-colors duration-700 ${phase >= 1 ? 'fill-warn' : 'fill-line'}`} />
          </g>
          <text x="158" y="55" textAnchor="middle" className="fill-soft text-[9px]">FW1</text>

          <g transform="translate(220,30)">
            <rect
              width="180"
              height="120"
              rx="4"
              strokeDasharray="5 4"
              className={`transition-colors duration-700 ${phase >= 2 ? 'fill-none stroke-warn' : 'fill-none stroke-line'}`}
              strokeWidth="1.5"
            />
            <text x="90" y="-8" textAnchor="middle" className="fill-soft text-[9px] font-medium">Screened subnet (DMZ)</text>
            <rect x="15" y="15" width="60" height="30" rx="3" className={`transition-colors duration-700 ${phase >= 2 ? 'fill-warn-tint stroke-warn' : 'fill-surface stroke-line'}`} strokeWidth="1.2" />
            <text x="45" y="34" textAnchor="middle" className="fill-ink text-[9px]">Web</text>
            <rect x="15" y="55" width="60" height="30" rx="3" className={`transition-colors duration-700 ${phase >= 2 ? 'fill-warn-tint stroke-warn' : 'fill-surface stroke-line'}`} strokeWidth="1.2" />
            <text x="45" y="74" textAnchor="middle" className="fill-ink text-[9px]">Mail</text>
            <rect x="105" y="35" width="60" height="30" rx="3" className={`transition-colors duration-700 ${phase >= 2 ? 'fill-warn-tint stroke-warn' : 'fill-surface stroke-line'}`} strokeWidth="1.2" />
            <text x="135" y="54" textAnchor="middle" className="fill-ink text-[9px]">DNS</text>
          </g>

          <g transform="translate(430,65)">
            <rect width="16" height="50" className={`transition-colors duration-700 ${phase >= 3 ? 'fill-bad' : 'fill-line'}`} />
          </g>
          <text x="438" y="55" textAnchor="middle" className="fill-soft text-[9px]">FW2</text>

          <g transform="translate(500,55)">
            <rect width="100" height="70" rx="4" className={`transition-colors duration-700 ${phase >= 4 ? 'fill-good-tint stroke-good' : 'fill-surface stroke-line'}`} strokeWidth="1.5" />
            <text x="50" y="30" textAnchor="middle" className="fill-ink text-[10px] font-medium">Internal</text>
            <text x="50" y="45" textAnchor="middle" className="fill-ink text-[10px] font-medium">network</text>
          </g>

          <line x1="90" y1="90" x2="150" y2="90" className={`transition-opacity duration-700 ${phase >= 1 ? 'opacity-100 stroke-soft' : 'opacity-0'}`} strokeWidth="2" markerEnd="url(#arrowSub)" />
          <line x1="166" y1="90" x2="220" y2="90" className={`transition-opacity duration-700 ${phase >= 2 ? 'opacity-100 stroke-soft' : 'opacity-0'}`} strokeWidth="2" markerEnd="url(#arrowSub)" />
          <line x1="400" y1="90" x2="430" y2="90" className={`transition-opacity duration-700 ${phase >= 3 ? 'opacity-100 stroke-soft' : 'opacity-0'}`} strokeWidth="2" markerEnd="url(#arrowSub)" />
          <line x1="446" y1="90" x2="500" y2="90" className={`transition-opacity duration-700 ${phase >= 4 ? 'opacity-100 stroke-good' : 'opacity-0'}`} strokeWidth="2" markerEnd="url(#arrowSubGood)" />

          <defs>
            <marker id="arrowSub" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-soft" />
            </marker>
            <marker id="arrowSubGood" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-good" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="flex gap-2 flex-wrap">
        {PHASES.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setPlaying(false)
              setPhase(i)
            }}
            className={`flex-1 min-w-[100px] rounded-crisp px-2 py-1.5 text-[11px] font-medium transition-colors border ${
              i === phase ? 'bg-accent-tint border-accent text-accent' : i < phase ? 'bg-wash border-line text-soft' : 'bg-surface border-line text-faint hover:text-ink'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm text-ink leading-relaxed animate-fadein">
        {PHASES[phase].caption}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A screened subnet is the classic two-firewall DMZ design. Microsegmentation takes the same "never trust the
        next zone by default" idea further, applying it not just at the network perimeter but between individual
        workloads inside the internal network itself.
      </div>
    </div>
  )
}
