import { useState } from 'react'

interface ErrorType {
  name: string
  severity: number
  heat: string
  meaning: string
  likelyCause: string
}

const ERRORS: ErrorType[] = [
  { name: 'Runts', severity: 1, heat: 'bg-heat-1 text-ink', meaning: 'Frames shorter than the 64-byte minimum', likelyCause: 'Usually a normal byproduct of a collision on a half-duplex segment' },
  { name: 'CRC errors', severity: 2, heat: 'bg-heat-2 text-ink', meaning: "Frame's checksum doesn't match its contents", likelyCause: 'Damaged cable, bad connector, or EMI corrupting bits in transit' },
  { name: 'Giants', severity: 3, heat: 'bg-heat-3 text-ink', meaning: 'Frames larger than the interface MTU', likelyCause: 'Jumbo frames sent to a port not configured to accept them' },
  { name: 'Late collisions', severity: 4, heat: 'bg-heat-4 text-paper', meaning: 'A collision detected after the first 64 bytes were already sent', likelyCause: 'Near-certain sign of a duplex mismatch or a cable run that exceeds spec' },
  { name: 'Duplex mismatch errors', severity: 5, heat: 'bg-heat-5 text-paper', meaning: 'One side runs full duplex, the other half duplex', likelyCause: 'Manually forced duplex on one end while the other stayed on auto-negotiate' },
  { name: 'Interface flapping', severity: 6, heat: 'bg-heat-6 text-paper', meaning: 'The link repeatedly goes up and down', likelyCause: 'Failing NIC/transceiver, a loose connector, or a bad cable — the most urgent of the group' },
]

export default function InterfaceErrorCounters() {
  const [selected, setSelected] = useState<string>(ERRORS[0].name)
  const active = ERRORS.find((e) => e.name === selected) ?? ERRORS[0]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Interface Error Counters, Ranked by Severity</h3>
        <p className="text-sm text-soft">
          Domain 5.5 — click a counter to see what it means and how urgently it should be investigated.
        </p>
      </div>

      <div className="space-y-1.5">
        {ERRORS.map((e) => (
          <button
            key={e.name}
            onClick={() => setSelected(e.name)}
            className={`flex items-center gap-3 w-full text-left transition-all ${selected === e.name ? '' : 'opacity-90 hover:opacity-100'}`}
          >
            <span className="w-40 shrink-0 text-xs text-soft truncate">{e.name}</span>
            <span
              className={`h-6 rounded-crisp flex items-center px-2 text-[11px] font-mono font-semibold transition-all duration-300 ${e.heat} ${
                selected === e.name ? 'ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''
              }`}
              style={{ width: `${(e.severity / ERRORS.length) * 100}%` }}
            >
              {e.severity}/6
            </span>
          </button>
        ))}
      </div>

      <div key={active.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{active.name}</h4>
        <p className="text-sm text-soft leading-relaxed"><span className="text-ink font-medium">What it is: </span>{active.meaning}</p>
        <p className="text-sm text-soft leading-relaxed mt-1"><span className="text-ink font-medium">Likely cause: </span>{active.likelyCause}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A handful of runts or CRC errors on a busy link is normal background noise. Climbing late-collision or
        flapping counters are not — they point to a duplex mismatch or failing hardware and should be chased down
        before users start reporting problems.
      </div>
    </div>
  )
}
