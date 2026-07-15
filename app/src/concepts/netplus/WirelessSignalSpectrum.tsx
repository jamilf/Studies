import { useMemo, useState } from 'react'

interface Tier {
  label: string
  rssi: string
  experience: string
  action: string
  heat: string
}

const TIERS: Tier[] = [
  { label: 'Excellent', rssi: '-30 to -50 dBm', experience: 'Full bars, max data rates, no retries', action: 'No action needed', heat: 'bg-heat-1 text-ink' },
  { label: 'Good', rssi: '-50 to -60 dBm', experience: 'Reliable throughput for streaming and calls', action: 'No action needed', heat: 'bg-heat-2 text-ink' },
  { label: 'Fair', rssi: '-60 to -67 dBm', experience: 'Usable but rate-shifts under load; occasional lag', action: 'Acceptable minimum for VoIP/video', heat: 'bg-heat-3 text-ink' },
  { label: 'Weak', rssi: '-67 to -70 dBm', experience: 'Noticeable slowdowns, retries climb, video may stutter', action: 'Consider AP placement or power adjustment', heat: 'bg-heat-4 text-paper' },
  { label: 'Poor', rssi: '-70 to -80 dBm', experience: 'Frequent drops, high latency, low data rates', action: 'Add an AP or repeater, check for interference/overlap', heat: 'bg-heat-5 text-paper' },
  { label: 'Unusable', rssi: 'below -80 dBm', experience: 'Association fails or drops constantly', action: 'Client is effectively out of range', heat: 'bg-heat-6 text-paper' },
]

export default function WirelessSignalSpectrum() {
  const [idx, setIdx] = useState(1)
  const tier = useMemo(() => TIERS[idx], [idx])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Wireless Signal Strength Troubleshooting</h3>
        <p className="text-sm text-soft">
          Domain 5.4 — drag the slider across RSSI tiers to see what a client actually experiences at each signal level.
        </p>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={TIERS.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          className="w-full accent-accent"
        />
        <div className="flex justify-between mt-1">
          {TIERS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setIdx(i)}
              className={`text-[11px] font-medium transition-colors ${i === idx ? 'text-accent' : 'text-faint hover:text-soft'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-surface p-3">
          <p className="text-xs text-soft mb-1">Signal (RSSI)</p>
          <p className="font-mono text-sm text-ink">{tier.rssi}</p>
          <div className="mt-2 h-2 rounded-crisp bg-wash overflow-hidden">
            <div className={`h-full ${tier.heat} transition-all duration-500`} style={{ width: `${((idx + 1) / TIERS.length) * 100}%` }} />
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-surface p-3 sm:col-span-2">
          <p className="text-xs text-soft mb-1">What the user sees</p>
          <p className="text-sm text-ink">{tier.experience}</p>
        </div>
      </div>

      <div key={idx} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm font-semibold text-ink mb-1">{tier.label} — recommended action</p>
        <p className="text-sm text-soft leading-relaxed">{tier.action}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        RSSI is logarithmic and negative — closer to zero is stronger. Weak signal isn't always a distance problem:
        co-channel interference, overlapping APs on the same channel, and physical obstructions (metal, concrete,
        elevator shafts) all degrade effective RSSI even at short range.
      </div>
    </div>
  )
}
