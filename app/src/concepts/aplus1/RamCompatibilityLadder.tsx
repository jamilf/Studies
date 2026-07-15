import { useState } from 'react'

interface Gen {
  name: string
  pins: string
  voltage: string
  speedRange: string
  keyNotch: string
  detail: string
  color: string
}

// Heat ramp used as a generational ladder: oldest/slowest (pale) to newest/fastest (deep).
const GENERATIONS: Gen[] = [
  {
    name: 'DDR3',
    pins: '240-pin DIMM (204-pin SO-DIMM)',
    voltage: '1.5 V (1.35 V for DDR3L)',
    speedRange: '800 – 2133 MT/s',
    keyNotch: 'Notch sits left-of-center',
    detail:
      "DDR3's notch position, pin count, and voltage are all different from DDR4/DDR5 by design — it physically will not seat in a DDR4 slot even if you tried to force it, and the higher voltage would risk damage if it somehow did.",
    color: 'bg-heat-2 text-ink',
  },
  {
    name: 'DDR4',
    pins: '288-pin DIMM (260-pin SO-DIMM)',
    voltage: '1.2 V',
    speedRange: '1600 – 3200 MT/s',
    keyNotch: 'Notch shifted further from center vs DDR3',
    detail:
      'Same 288-pin count as DDR5 on desktop DIMMs, but a different notch position and lower voltage — a DDR4 stick cannot electrically or physically interface with a DDR5 slot. DDR4 sits in the middle of the compatibility ladder: incompatible with both its neighbors.',
    color: 'bg-heat-4 text-ink',
  },
  {
    name: 'DDR5',
    pins: '288-pin DIMM (262-pin SO-DIMM)',
    voltage: '1.1 V',
    speedRange: '4800 – 8400+ MT/s',
    keyNotch: 'Notch moved again; on-module PMIC regulates voltage',
    detail:
      'Splits each module into two independent 32-bit subchannels (instead of one 64-bit channel) for better parallelism, and moves voltage regulation onto the module itself (PMIC) rather than the motherboard. Different notch position again means zero cross-compatibility with DDR4.',
    color: 'bg-heat-6 text-paper',
  },
]

export default function RamCompatibilityLadder() {
  const [selected, setSelected] = useState<number | null>(1)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">RAM Generation Compatibility Ladder</h3>
        <p className="text-sm text-soft">
          Domain 3.4 — click each generation to see exactly why it's physically and electrically incompatible with
          its neighbors.
        </p>
      </div>

      <div className="space-y-1.5">
        {GENERATIONS.map((gen, i) => (
          <button key={gen.name} onClick={() => setSelected(selected === i ? null : i)} className="w-full text-left group">
            <div className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 h-7 w-7 rounded-full ${gen.color} text-xs font-bold flex items-center justify-center font-mono`}
              >
                {i + 1}
              </span>
              <div
                className={`flex-1 rounded-crisp border px-3 py-2 transition-colors ${
                  selected === i ? 'border-accent bg-accent-tint' : 'border-line bg-wash group-hover:border-line-strong'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">{gen.name}</span>
                  <span className="text-[11px] font-mono text-faint">{gen.speedRange}</span>
                </div>
              </div>
            </div>
            {selected === i && (
              <div className="ml-10 mt-1.5 mb-2 rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-2">
                <div className="grid sm:grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <p className="text-faint uppercase tracking-wider">Pins</p>
                    <p className="font-mono text-ink">{gen.pins}</p>
                  </div>
                  <div>
                    <p className="text-faint uppercase tracking-wider">Voltage</p>
                    <p className="font-mono text-ink">{gen.voltage}</p>
                  </div>
                  <div>
                    <p className="text-faint uppercase tracking-wider">Key notch</p>
                    <p className="font-mono text-ink">{gen.keyNotch}</p>
                  </div>
                </div>
                <p className="text-sm text-soft leading-relaxed">{gen.detail}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Why this matters</p>
        <p className="text-ink">
          The notch (key) position is deliberately moved with every generation specifically to prevent a stick from
          being forced into the wrong slot — mismatched voltage could otherwise damage the module or the board. A
          motherboard's chipset supports exactly one DDR generation; there is no such thing as a DDR3/DDR4 "mixed"
          build.
        </p>
      </div>
    </div>
  )
}
