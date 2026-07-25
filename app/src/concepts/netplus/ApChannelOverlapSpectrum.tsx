import { useState } from 'react'

interface Tier {
  name: string
  interference: number
  throughput: number
  nonOverlapping: boolean
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Channel 1 only',
    interference: 1,
    throughput: 4,
    nonOverlapping: true,
    desc: 'A single AP on one non-overlapping channel — no co-channel neighbors, so interference is essentially zero, but only one channel\'s worth of capacity is in use.',
  },
  {
    name: 'Channels 1 + 6 + 11',
    interference: 1,
    throughput: 5,
    nonOverlapping: true,
    desc: 'The classic 2.4 GHz reuse plan. Each 20 MHz-wide channel is spaced far enough apart (5 channels, 25 MHz) that their signals don\'t overlap — the standard recommended layout for multi-AP deployments.',
  },
  {
    name: 'Channels 1 + 4 + 8',
    interference: 3,
    throughput: 3,
    nonOverlapping: false,
    desc: 'Partial overlap: adjacent-channel interference starts degrading throughput because the channels are closer together than the 22 MHz signal width requires for clean separation.',
  },
  {
    name: 'Channels 1 + 2 + 3',
    interference: 6,
    throughput: 1,
    nonOverlapping: false,
    desc: 'Fully overlapping channels. Co-channel and adjacent-channel interference is severe — collisions and retransmissions rise sharply, and effective throughput collapses well below what a single clean channel would deliver.',
  },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']

export default function ApChannelOverlapSpectrum() {
  const [selected, setSelected] = useState(1)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">2.4 GHz Channel Overlap</h3>
        <p className="text-sm text-soft">
          Domain 2.4 — slide across channel plans to see how spacing affects interference and throughput.
        </p>
      </div>

      <input
        type="range" aria-label="2.4 GHz Channel Overlap"
        min={0}
        max={TIERS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Interference level</p>
          <div className="flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.interference ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Effective throughput</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.throughput ? 'bg-good' : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3 flex flex-col justify-center items-center">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Non-overlapping?</p>
          <span className={`font-display text-sm font-semibold ${t.nonOverlapping ? 'text-good' : 'text-bad'}`}>
            {t.nonOverlapping ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        2.4 GHz channels are 22 MHz wide but spaced only 5 MHz apart, so in the US only channels 1, 6, and 11 don't
        overlap. 5 GHz and 6 GHz avoid this problem entirely with far more non-overlapping channels, which is why
        enterprise deployments prefer them whenever client devices support it.
      </div>
    </div>
  )
}
