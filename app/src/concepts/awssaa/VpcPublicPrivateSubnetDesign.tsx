import { useEffect, useState } from 'react'

interface Phase {
  label: string
  caption: string
}

const PHASES: Phase[] = [
  { label: 'Internet Gateway attached', caption: 'An Internet Gateway (IGW) is attached to the VPC — it is the only door between the VPC and the public internet.' },
  { label: 'Public subnet route', caption: 'The public subnet\'s route table sends 0.0.0.0/0 traffic to the IGW, and its instances have public IPs — so it can reach, and be reached from, the internet.' },
  { label: 'NAT Gateway deployed', caption: 'A NAT Gateway is deployed inside the public subnet with its own Elastic IP, giving private-subnet instances a path outbound.' },
  { label: 'Private subnet route', caption: 'The private subnet\'s route table sends 0.0.0.0/0 to the NAT Gateway — outbound-only, so nothing on the internet can initiate a connection in.' },
  { label: 'App traffic flows', caption: 'A request from the internet reaches a load balancer in the public subnet, which forwards it to app servers in the private subnet — the database tier stays private with no route out at all.' },
]

export default function VpcPublicPrivateSubnetDesign() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) { setPlaying(false); return }
    const t = setTimeout(() => setPhase((p) => p + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Public/Private Subnet Design</h3>
          <p className="text-sm text-soft">Domain 1.2 — step through how a VPC routes traffic between tiers.</p>
        </div>
        <button
          onClick={() => { if (phase >= PHASES.length - 1) setPhase(0); setPlaying((p) => !p) }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 460 240" className="w-full h-56" aria-hidden>
          {/* Internet */}
          <text x="20" y="20" className="fill-faint text-[10px] font-medium">Internet</text>
          {/* IGW */}
          <rect x="10" y="30" width="80" height="30" rx="3" className={`transition-colors duration-500 ${phase >= 0 ? 'fill-accent-tint stroke-accent' : 'fill-wash stroke-line'}`} strokeWidth="1.5" />
          <text x="50" y="49" textAnchor="middle" className="fill-ink text-[9px] font-medium">IGW</text>

          {/* VPC boundary */}
          <rect x="10" y="75" width="440" height="155" rx="4" className="fill-none stroke-line-strong" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="20" y="90" className="fill-faint text-[9px]">VPC 10.0.0.0/16</text>

          {/* Public subnet */}
          <rect x="25" y="100" width="190" height="115" rx="3" className={`transition-colors duration-500 ${phase >= 1 ? 'fill-good-tint stroke-good-line' : 'fill-wash stroke-line'}`} strokeWidth="1.5" />
          <text x="35" y="115" className="fill-ink text-[9px] font-semibold">Public subnet</text>
          <rect x="40" y="125" width="70" height="24" rx="3" className={`transition-colors duration-500 ${phase >= 1 ? 'fill-good stroke-good-line' : 'fill-wash stroke-line'}`} strokeWidth="1" />
          <text x="75" y="141" textAnchor="middle" className={`text-[8px] font-medium ${phase >= 1 ? 'fill-paper' : 'fill-faint'}`}>ALB</text>
          <rect x="120" y="125" width="80" height="24" rx="3" className={`transition-colors duration-500 ${phase >= 2 ? 'fill-warn-tint stroke-warn' : 'fill-wash stroke-line'}`} strokeWidth="1" />
          <text x="160" y="141" textAnchor="middle" className="fill-ink text-[8px] font-medium">NAT GW</text>

          {/* Private subnet */}
          <rect x="245" y="100" width="190" height="115" rx="3" className={`transition-colors duration-500 ${phase >= 3 ? 'fill-bad-tint stroke-bad-line' : 'fill-wash stroke-line'}`} strokeWidth="1.5" />
          <text x="255" y="115" className="fill-ink text-[9px] font-semibold">Private subnet</text>
          <rect x="260" y="125" width="80" height="24" rx="3" className={`transition-colors duration-500 ${phase >= 4 ? 'fill-bad stroke-bad-line' : 'fill-wash stroke-line'}`} strokeWidth="1" />
          <text x="300" y="141" textAnchor="middle" className={`text-[8px] font-medium ${phase >= 4 ? 'fill-paper' : 'fill-faint'}`}>App server</text>
          <rect x="350" y="125" width="70" height="24" rx="3" className="fill-wash stroke-line" strokeWidth="1" />
          <text x="385" y="141" textAnchor="middle" className="fill-faint text-[8px] font-medium">DB</text>

          {/* arrows */}
          {phase >= 0 && <line x1="50" y1="30" x2="50" y2="15" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#vpcArrow)" />}
          {phase >= 2 && <line x1="160" y1="149" x2="160" y2="215" className="stroke-warn" strokeWidth="1.5" />}
          {phase >= 3 && <line x1="160" y1="215" x2="300" y2="215" className="stroke-warn" strokeWidth="1.5" markerEnd="url(#vpcArrow)" />}
          {phase >= 4 && <line x1="110" y1="137" x2="260" y2="137" className="stroke-good" strokeWidth="1.5" markerEnd="url(#vpcArrow)" />}
          <defs>
            <marker id="vpcArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" className="fill-line-strong" />
            </marker>
          </defs>
        </svg>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{PHASES[phase].label}</h4>
        <p className="text-sm text-soft leading-relaxed">{PHASES[phase].caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The core exam distinction: a public subnet has a route to an Internet Gateway, a private subnet does not.
        NAT Gateway gives private resources outbound internet access without ever exposing them to inbound
        connections from the internet.
      </div>
    </div>
  )
}
