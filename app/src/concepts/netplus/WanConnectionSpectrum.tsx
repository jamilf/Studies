import { useState } from 'react'

interface WanTier {
  name: string
  cost: number
  speed: number
  latency: number
  desc: string
}

const TIERS: WanTier[] = [
  {
    name: 'DSL',
    cost: 1,
    speed: 1,
    latency: 2,
    desc: "Consumer broadband over the copper phone loop. Cheap and widely available, but speed drops off with distance from the provider's central office, and it's usually asymmetric (slower upload than download).",
  },
  {
    name: 'Cable',
    cost: 2,
    speed: 3,
    latency: 2,
    desc: 'Broadband over shared DOCSIS coax. Faster than DSL, but bandwidth is shared with other subscribers on the same node, so peak-time congestion can add latency.',
  },
  {
    name: 'Leased Line',
    cost: 4,
    speed: 2,
    latency: 1,
    desc: 'A dedicated point-to-point circuit (e.g. a T1). Symmetric, guaranteed bandwidth with a contractual SLA and very low, consistent latency — but expensive per Mbps.',
  },
  {
    name: 'MPLS',
    cost: 5,
    speed: 4,
    latency: 1,
    desc: 'A carrier-managed, label-switched private WAN connecting many sites with per-class QoS guarantees. Excellent for voice/video, but the most expensive option and slower to provision new sites.',
  },
  {
    name: 'Satellite',
    cost: 3,
    speed: 2,
    latency: 5,
    desc: 'Available almost anywhere with a clear view of the sky, but round-trip time to a geostationary satellite (~35,786 km up) adds several hundred milliseconds of latency — poor for real-time traffic.',
  },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function WanConnectionSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">WAN Connection Types</h3>
        <p className="text-sm text-soft">Domain 1.6 — slide across WAN link types to compare cost, speed, and latency trade-offs.</p>
      </div>

      <input
        type="range"
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
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Cost</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.cost ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Speed</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.speed ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Latency</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.latency ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Dedicated circuits (leased line, MPLS) trade cost for predictability and low latency; shared consumer
        broadband (DSL, cable) trades predictability for price; satellite trades everything for reach — it is the
        only option where no terrestrial link exists.
      </div>
    </div>
  )
}
