import { useEffect, useState } from 'react'

interface Phase {
  caption: string
  idsActive: boolean
  ipsActive: boolean
  packetX: number
  packetOnIdsPath: boolean
  packetOnIpsPath: boolean
  packetBlocked: boolean
  alert: 'none' | 'ids-alert' | 'ips-block'
}

const PHASES: Phase[] = [
  {
    caption: 'A malicious packet heads toward the internal network through the router.',
    idsActive: false,
    ipsActive: false,
    packetX: 70,
    packetOnIdsPath: false,
    packetOnIpsPath: false,
    packetBlocked: false,
    alert: 'none',
  },
  {
    caption: 'IDS (out-of-band): a switch SPAN/mirror port copies the traffic to the sensor. The original packet keeps flowing untouched.',
    idsActive: true,
    ipsActive: false,
    packetX: 260,
    packetOnIdsPath: true,
    packetOnIpsPath: false,
    packetBlocked: false,
    alert: 'none',
  },
  {
    caption: 'The IDS matches the signature and raises an alert — but since it only inspects a copy, the real packet has already reached the LAN.',
    idsActive: true,
    ipsActive: false,
    packetX: 420,
    packetOnIdsPath: true,
    packetOnIpsPath: false,
    packetBlocked: false,
    alert: 'ids-alert',
  },
  {
    caption: 'IPS (inline): traffic is rerouted so every packet must pass directly through the IPS engine before reaching the LAN.',
    idsActive: false,
    ipsActive: true,
    packetX: 260,
    packetOnIdsPath: false,
    packetOnIpsPath: true,
    packetBlocked: false,
    alert: 'none',
  },
  {
    caption: 'The IPS matches the same signature and drops the packet inline — it never reaches the target at all.',
    idsActive: false,
    ipsActive: true,
    packetX: 340,
    packetOnIdsPath: false,
    packetOnIpsPath: true,
    packetBlocked: true,
    alert: 'ips-block',
  },
]

export default function IdsVsIpsDiagram() {
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

  const p = PHASES[phase]
  const packetY = p.packetOnIdsPath ? 40 : p.packetOnIpsPath ? 110 : 75

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">IDS vs IPS</h3>
          <p className="text-sm text-soft">
            Domain 4.4 — watch the same malicious packet take the out-of-band IDS path versus the inline IPS path.
          </p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((pl) => !pl)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors shrink-0"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 460 150" className="w-full h-40" aria-hidden>
          <rect x="10" y="60" width="50" height="30" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
          <text x="35" y="79" textAnchor="middle" className="fill-ink text-[8px] font-medium">Router</text>

          <line x1="60" y1="40" x2="180" y2="40" className={p.idsActive ? 'stroke-warn' : 'stroke-line'} strokeWidth="2" strokeDasharray="4 3" />
          <rect x="180" y="24" width="70" height="32" rx="4" className={p.idsActive ? 'fill-warn-tint stroke-warn' : 'fill-surface stroke-line'} strokeWidth="1.5" />
          <text x="215" y="44" textAnchor="middle" className="fill-ink text-[8px] font-medium">IDS sensor</text>
          <text x="215" y="16" textAnchor="middle" className="fill-faint text-[7px]">out-of-band (SPAN)</text>

          <line x1="60" y1="110" x2="180" y2="110" className={p.ipsActive ? 'stroke-accent' : 'stroke-line'} strokeWidth="2" />
          <rect x="180" y="94" width="70" height="32" rx="4" className={p.ipsActive ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'} strokeWidth="1.5" />
          <text x="215" y="114" textAnchor="middle" className="fill-ink text-[8px] font-medium">IPS engine</text>
          <text x="215" y="140" textAnchor="middle" className="fill-faint text-[7px]">inline (in the path)</text>

          <line x1="250" y1="40" x2="400" y2="75" className={p.idsActive ? 'stroke-warn' : 'stroke-line'} strokeWidth="2" strokeDasharray="4 3" />
          <line x1="250" y1="110" x2="400" y2="75" className={p.ipsActive && !p.packetBlocked ? 'stroke-accent' : 'stroke-line'} strokeWidth="2" />

          <rect x="400" y="60" width="50" height="30" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
          <text x="425" y="79" textAnchor="middle" className="fill-ink text-[8px] font-medium">LAN</text>

          {!p.packetBlocked && (
            <circle
              cx={p.packetX}
              cy={packetY}
              r="7"
              className="fill-none stroke-bad transition-all duration-700 ease-out"
              strokeWidth="2.5"
            />
          )}
          {p.packetBlocked && <circle cx={p.packetX} cy={packetY} r="9" className="fill-bad" />}
          {p.alert === 'ids-alert' && (
            <text x="420" y="30" textAnchor="middle" className="fill-warn text-[8px] font-semibold">ALERT ONLY</text>
          )}
          {p.alert === 'ips-block' && (
            <text x="360" y="130" textAnchor="middle" className="fill-good text-[8px] font-semibold">BLOCKED</text>
          )}
        </svg>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{p.caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Same detection engine, different placement. An IDS is passive and out-of-band — it can only detect and
        alert after the fact. An IPS sits inline in the traffic path, so it can actually drop or block malicious
        packets in real time, at the cost of becoming a potential single point of failure or latency.
      </div>
    </div>
  )
}
