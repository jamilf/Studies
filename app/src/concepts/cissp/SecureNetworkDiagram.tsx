import { useEffect, useState } from 'react'

const PHASES = [
  { label: 'Flat, untrusted network', caption: 'Every host is on one segment with unrestricted traffic — compromise of any single host endangers all of them.' },
  { label: 'Add a perimeter firewall', caption: 'Internet-to-internal traffic is now filtered at a single choke point, with a default-deny inbound rule that only opens the specific ports the business needs.' },
  { label: 'Add a DMZ', caption: 'The public-facing web server is isolated in its own segment; only necessary ports are opened between the DMZ and the internal network.' },
  { label: 'Segment internally (VLANs)', caption: 'Workstations and database servers are separated into their own VLANs with controlled inter-VLAN routing.' },
  { label: 'Add VPN for remote access', caption: 'Remote users reach internal resources only through an encrypted tunnel, never through direct exposure.' },
]

export default function SecureNetworkDiagram() {
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
          <h3 className="font-display text-lg text-ink">Building a Segmented Network, Layer by Layer</h3>
          <p className="text-sm text-soft">Domain 4.2 — step through defense-in-depth network design.</p>
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
        <svg viewBox="0 0 600 220" className="w-full h-52" aria-hidden>
          <g transform="translate(20,90)">
            <rect width="70" height="40" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="35" y="25" textAnchor="middle" className="fill-ink text-[10px] font-medium">Internet</text>
          </g>

          <g className={`transition-opacity duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="120" y="95" width="40" height="30" rx="3" className="fill-warn-tint stroke-warn" strokeWidth="1.5" />
            <text x="140" y="115" textAnchor="middle" className="fill-ink text-[9px] font-medium">FW</text>
          </g>

          <g className={`transition-opacity duration-700 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="200" y="20" width="90" height="50" rx="4" strokeDasharray="4 3" className="fill-none stroke-accent-line" strokeWidth="1.5" />
            <text x="205" y="15" className="fill-accent text-[8px] font-semibold">DMZ</text>
            <rect x="215" y="35" width="60" height="24" rx="3" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="245" y="51" textAnchor="middle" className="fill-ink text-[8px] font-medium">Web Server</text>
          </g>

          <g className={`transition-opacity duration-700 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="330" y="20" width="90" height="50" rx="4" strokeDasharray="4 3" className="fill-none stroke-good-line" strokeWidth="1.5" />
            <text x="335" y="15" className="fill-good text-[8px] font-semibold">VLAN 10</text>
            <rect x="345" y="35" width="60" height="24" rx="3" className="fill-good-tint stroke-good" strokeWidth="1.5" />
            <text x="375" y="51" textAnchor="middle" className="fill-ink text-[8px] font-medium">Workstations</text>

            <rect x="330" y="150" width="90" height="50" rx="4" strokeDasharray="4 3" className="fill-none stroke-good-line" strokeWidth="1.5" />
            <text x="335" y="145" className="fill-good text-[8px] font-semibold">VLAN 20</text>
            <rect x="345" y="165" width="60" height="24" rx="3" className="fill-good-tint stroke-good" strokeWidth="1.5" />
            <text x="375" y="181" textAnchor="middle" className="fill-ink text-[8px] font-medium">DB Server</text>
          </g>

          <g className={`transition-opacity duration-700 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="470" y="150" width="70" height="40" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="505" y="173" textAnchor="middle" className="fill-ink text-[9px] font-medium">Remote User</text>
            <line x1="470" y1="165" x2="140" y2="120" className="stroke-accent" strokeWidth="1.5" strokeDasharray="5 3" />
          </g>

          <line x1="90" y1="110" x2="120" y2="110" className={`stroke-line-strong transition-opacity duration-700 ${phase >= 1 ? 'opacity-0' : 'opacity-100'}`} strokeWidth="2" />
          <line x1="90" y1="105" x2="600" y2="105" className={`stroke-good transition-opacity duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} strokeWidth="1.5" strokeDasharray="3 3" />
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
        Defense in depth: each layer added here means a single failure doesn't expose everything at once.
      </div>
    </div>
  )
}
