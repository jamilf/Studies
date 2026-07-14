import { useEffect, useState } from 'react'

const PHASES = [
  {
    label: 'Normal traffic flow',
    caption:
      "The victim's ARP table correctly maps the gateway's IP to the gateway's real MAC address. Traffic to the internet flows straight through the gateway, as intended.",
  },
  {
    label: 'Attacker sends forged ARP replies',
    caption:
      'The attacker broadcasts unsolicited ARP replies claiming "I am the gateway" — associating the gateway\'s IP address with the ATTACKER\'s MAC address instead.',
  },
  {
    label: "Victim's ARP table is poisoned",
    caption:
      "The victim's OS trusts the unsolicited reply and updates its ARP cache. Now the victim thinks the attacker's machine IS the gateway.",
  },
  {
    label: 'Traffic silently redirected (on-path)',
    caption:
      'Every packet the victim sends to "the gateway" now goes to the attacker first. The attacker can read, log, or modify it, then forward it on so the victim notices nothing — a full on-path (man-in-the-middle) position.',
  },
]

export default function ArpSpoofing() {
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

  const poisoned = phase >= 2
  const intercepting = phase >= 3

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">ARP Spoofing &amp; the On-Path Attack</h3>
          <p className="text-sm text-soft">Domain 2.4 — see how a poisoned ARP cache redirects traffic.</p>
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

      {/* Network diagram */}
      <div className="relative rounded-crisp border border-line bg-wash p-8 min-h-[220px]">
        <svg viewBox="0 0 600 200" className="w-full h-48" aria-hidden>
          {/* victim */}
          <g transform="translate(40,80)">
            <rect width="90" height="50" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="45" y="30" textAnchor="middle" className="fill-ink text-[13px] font-medium">
              Victim
            </text>
          </g>

          {/* gateway */}
          <g transform="translate(470,20)">
            <rect width="90" height="50" rx="4" className="fill-good-tint stroke-good" strokeWidth="1.5" />
            <text x="45" y="30" textAnchor="middle" className="fill-ink text-[13px] font-medium">
              Gateway
            </text>
          </g>

          {/* attacker */}
          <g transform="translate(470,130)">
            <rect
              width="90"
              height="50"
              rx="4"
              className={`stroke-bad transition-colors duration-700 ${poisoned ? 'fill-bad-tint' : 'fill-surface'}`}
              strokeWidth="1.5"
            />
            <text x="45" y="30" textAnchor="middle" className="fill-bad text-[13px] font-medium">
              Attacker
            </text>
          </g>

          {/* direct path victim -> gateway (phase 0 only) */}
          <line
            x1="130"
            y1="90"
            x2="470"
            y2="45"
            className={`stroke-good transition-opacity duration-700 ${phase === 0 ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2.5"
            markerEnd="url(#arrowGood)"
          />

          {/* forged ARP reply attacker -> victim (phase 1) */}
          <line
            x1="470"
            y1="150"
            x2="130"
            y2="105"
            className={`stroke-bad transition-opacity duration-700 ${phase === 1 ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2"
            strokeDasharray="6 4"
            markerEnd="url(#arrowBad)"
          />

          {/* redirected path victim -> attacker -> gateway (phase 2-3) */}
          <line
            x1="130"
            y1="100"
            x2="470"
            y2="155"
            className={`stroke-bad transition-opacity duration-700 ${poisoned ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2.5"
            markerEnd="url(#arrowBad)"
          />
          <line
            x1="560"
            y1="140"
            x2="560"
            y2="70"
            className={`stroke-bad transition-opacity duration-700 ${intercepting ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <line
            x1="560"
            y1="130"
            x2="500"
            y2="60"
            className={`stroke-good transition-opacity duration-700 ${intercepting ? 'opacity-100' : 'opacity-0'}`}
            strokeWidth="2"
            markerEnd="url(#arrowGood)"
          />

          <defs>
            <marker id="arrowGood" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-good" />
            </marker>
            <marker id="arrowBad" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-bad" />
            </marker>
          </defs>
        </svg>
        {poisoned && (
          <p className="text-center font-mono text-xs text-bad font-medium -mt-2">
            Victim's ARP table: gateway IP → attacker's MAC (poisoned)
          </p>
        )}
      </div>

      {/* Phase timeline */}
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

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm">
        <p className="font-semibold text-ink mb-1">Why it works</p>
        <p className="text-soft">
          ARP has no authentication — any device on the local segment can announce "I own this IP" and hosts will
          believe the most recent reply. Defenses: Dynamic ARP Inspection (validates replies against the DHCP
          snooping database) and static ARP entries for critical hosts.
        </p>
      </div>
    </div>
  )
}
