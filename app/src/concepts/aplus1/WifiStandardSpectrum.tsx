import { useState } from 'react'

interface Standard {
  name: string
  wifiGen: string
  year: string
  frequency: string
  maxSpeed: string
  range: string
  desc: string
}

const STANDARDS: Standard[] = [
  {
    name: '802.11b',
    wifiGen: '—',
    year: '1999',
    frequency: '2.4 GHz only',
    maxSpeed: '11 Mbps',
    range: 'Best range of the group',
    desc: 'The slowest and oldest standard still occasionally seen. 2.4 GHz penetrates walls well, so range is its only strength.',
  },
  {
    name: '802.11g',
    wifiGen: '—',
    year: '2003',
    frequency: '2.4 GHz only',
    maxSpeed: '54 Mbps',
    range: 'Same range profile as b',
    desc: 'Backward compatible with 802.11b on the same 2.4 GHz band, at 5x the speed using OFDM instead of DSSS.',
  },
  {
    name: '802.11n',
    wifiGen: 'Wi-Fi 4',
    year: '2009',
    frequency: '2.4 GHz and/or 5 GHz',
    maxSpeed: '600 Mbps (with MIMO)',
    range: 'Good — dual-band flexibility',
    desc: 'Introduced MIMO (multiple antennas, multiple spatial streams) and channel bonding, first standard to touch 5 GHz.',
  },
  {
    name: '802.11ac',
    wifiGen: 'Wi-Fi 5',
    year: '2013',
    frequency: '5 GHz only',
    maxSpeed: '~3.5 Gbps (MU-MIMO, wide channels)',
    range: 'Shorter — 5 GHz attenuates faster through walls',
    desc: 'Moved entirely to the less-congested 5 GHz band with wider channels (up to 160 MHz) and multi-user MIMO.',
  },
  {
    name: '802.11ax',
    wifiGen: 'Wi-Fi 6 / 6E',
    year: '2019',
    frequency: '2.4, 5, and (6E) 6 GHz',
    maxSpeed: '9.6 Gbps theoretical',
    range: 'Comparable to ac, but far more efficient per-device',
    desc: 'Adds OFDMA (splits channels between multiple clients per transmission) — built for dense, congested environments like stadiums and offices, not just raw speed.',
  },
]

export default function WifiStandardSpectrum() {
  const [selected, setSelected] = useState(4)
  const s = STANDARDS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">802.11 Wi-Fi Standard Spectrum</h3>
        <p className="text-sm text-soft">
          Domain 2.4 — slide across the standards to see how speed, frequency, and range trade off as Wi-Fi evolved.
        </p>
      </div>

      <input
        type="range" aria-label="802.11 Wi-Fi Standard Spectrum"
        min={0}
        max={STANDARDS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {STANDARDS.map((std, i) => (
          <button
            key={std.name}
            onClick={() => setSelected(i)}
            className={`text-center font-mono transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / STANDARDS.length}%` }}
          >
            {std.name.replace('802.11', '')}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Frequency band</p>
          <p className="font-mono text-sm font-semibold text-ink">{s.frequency}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Max theoretical speed</p>
          <p className="font-mono text-sm font-semibold text-ink">{s.maxSpeed}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Range</p>
          <p className="font-mono text-sm font-semibold text-ink">{s.range}</p>
        </div>
      </div>

      <div key={s.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold text-ink">
            {s.name} {s.wifiGen !== '—' && <span className="text-soft font-normal">({s.wifiGen})</span>}
          </h4>
          <span className="font-mono text-[11px] text-faint">{s.year}</span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{s.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Rule of thumb tested repeatedly: 2.4 GHz travels farther and penetrates walls better but is more congested
        (fewer non-overlapping channels, shared with Bluetooth/microwaves); 5 GHz and 6 GHz are faster and cleaner but
        shorter range. 802.11ax's real advantage over ac isn't raw speed — it's efficiency in crowded airspace via
        OFDMA and target wake time.
      </div>
    </div>
  )
}
