import { useState } from 'react'

interface Connection {
  name: string
  downSpeed: string
  latency: string
  typicalUse: string
  detail: string
  relativeSpeed: number // 1-100, used for bar width
  color: string
}

// Ranked slowest/highest-latency to fastest/lowest-latency for typical real-world residential service.
const CONNECTIONS: Connection[] = [
  {
    name: 'Satellite',
    downSpeed: '~25-100 Mbps',
    latency: '~600+ ms (geostationary)',
    typicalUse: 'Rural areas with no wired option',
    detail:
      'Signal has to travel roughly 44,600 km up to a geostationary satellite and back, so even with decent download speed the round-trip latency makes it poor for real-time traffic like video calls or gaming — often the last option, not the first.',
    relativeSpeed: 20,
    color: 'bg-heat-2 text-ink',
  },
  {
    name: 'Cellular / WWAN',
    downSpeed: 'LTE: ~10-50 Mbps · 5G: 100s of Mbps',
    latency: '~30-70 ms',
    typicalUse: 'Mobile devices, fixed-wireless backup links',
    detail:
      'Uses a cellular carrier\'s WWAN radio instead of a fixed line — very flexible and mobile, but speed and latency both vary with signal strength, tower congestion, and data-plan throttling.',
    relativeSpeed: 40,
    color: 'bg-heat-3 text-ink',
  },
  {
    name: 'DSL',
    downSpeed: 'Typically ~10-100 Mbps, asymmetric',
    latency: '~20-40 ms',
    typicalUse: 'Areas served by phone-line infrastructure',
    detail:
      'Rides the existing copper telephone line but on frequencies above voice, so speed drops off sharply the farther the premises is from the provider\'s central office — a classic reason for a slow-DSL trouble ticket.',
    relativeSpeed: 55,
    color: 'bg-heat-4 text-ink',
  },
  {
    name: 'Cable (DOCSIS)',
    downSpeed: 'Typically ~100 Mbps-1 Gbps down',
    latency: '~15-30 ms',
    typicalUse: 'Most residential broadband',
    detail:
      'Delivered over the same coax plant as cable TV. Bandwidth on a given node is shared across neighborhood subscribers, so speeds can dip during peak local usage even though the advertised rate looks fixed.',
    relativeSpeed: 80,
    color: 'bg-heat-5 text-ink',
  },
  {
    name: 'Fiber',
    downSpeed: 'Typically symmetric, up to several Gbps',
    latency: '<10 ms',
    typicalUse: 'New builds, business connections, future-proofing',
    detail:
      'Light over glass instead of electrical signal over copper — immune to EMI, minimal attenuation over long runs, and typically symmetric (upload matches download), unlike DSL and cable.',
    relativeSpeed: 100,
    color: 'bg-heat-6 text-paper',
  },
]

export default function InternetConnectionTypesRanking() {
  const [selected, setSelected] = useState<number | null>(4)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Internet Connection Types, Ranked</h3>
        <p className="text-sm text-soft">
          Domain 2.7 — click a connection type to compare typical speed, latency, and use case.
        </p>
      </div>

      <div className="space-y-1.5">
        {CONNECTIONS.map((c, i) => (
          <button key={c.name} onClick={() => setSelected(selected === i ? null : i)} className="w-full text-left group">
            <div className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 h-7 w-7 rounded-full ${c.color} text-xs font-bold flex items-center justify-center font-mono`}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div
                  className={`h-7 rounded-crisp border flex items-center px-3 transition-colors ${
                    selected === i ? 'border-accent bg-accent-tint' : 'border-line bg-wash group-hover:border-line-strong'
                  }`}
                  style={{ width: `${c.relativeSpeed}%`, minWidth: '40%' }}
                >
                  <span className="text-sm font-medium text-ink">{c.name}</span>
                </div>
              </div>
            </div>
            {selected === i && (
              <div className="ml-10 mt-1.5 mb-2 rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-2">
                <div className="grid sm:grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <p className="text-faint uppercase tracking-wider">Down speed</p>
                    <p className="font-mono text-ink">{c.downSpeed}</p>
                  </div>
                  <div>
                    <p className="text-faint uppercase tracking-wider">Latency</p>
                    <p className="font-mono text-ink">{c.latency}</p>
                  </div>
                  <div>
                    <p className="text-faint uppercase tracking-wider">Typical use</p>
                    <p className="font-mono text-ink">{c.typicalUse}</p>
                  </div>
                </div>
                <p className="text-sm text-soft leading-relaxed">{c.detail}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A scenario mentioning a rural site with no wired option points to satellite despite its latency penalty; one
        mentioning symmetric upload/download or long-term future-proofing points to fiber; and "shares bandwidth with
        the neighborhood" is the cable giveaway.
      </div>
    </div>
  )
}
