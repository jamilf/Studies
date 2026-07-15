import { useState } from 'react'

interface RoutingSource {
  name: string
  type: string
  ad: number
  detail: string
}

const SOURCES: RoutingSource[] = [
  {
    name: 'Directly Connected',
    type: 'Local interface',
    ad: 0,
    detail: 'A network the router has an interface physically or logically on. Always the most trusted source — there is nothing more authoritative than being directly attached.',
  },
  {
    name: 'Static Route',
    type: 'Manually configured',
    ad: 1,
    detail: 'An administrator typed this route in by hand. Trusted just below a directly connected network, and it overrides any dynamic protocol unless the AD is changed.',
  },
  {
    name: 'eBGP',
    type: 'Path-vector (external)',
    ad: 20,
    detail: 'Border Gateway Protocol peering with a different autonomous system, e.g. an ISP. Trusted enough to be preferred over interior dynamic protocols, since it usually represents deliberate, policy-based peering.',
  },
  {
    name: 'EIGRP',
    type: 'Advanced distance-vector',
    ad: 90,
    detail: 'A protocol that converges fast using the DUAL algorithm. Trusted over OSPF and RIP for internal routes on networks that run it.',
  },
  {
    name: 'OSPF',
    type: 'Link-state',
    ad: 110,
    detail: 'The dominant open-standard interior gateway protocol. Every router builds a full map of the area from link-state advertisements and runs Dijkstra to compute the shortest path.',
  },
  {
    name: 'RIP',
    type: 'Distance-vector',
    ad: 120,
    detail: 'The oldest and simplest interior protocol, counting hops with a maximum of 15. Slow to converge and rarely used in modern networks, so it is trusted least among common IGPs.',
  },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']

export default function RoutingProtocolStack() {
  const [selected, setSelected] = useState<number>(0)
  const s = SOURCES[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Routing Protocols by Administrative Distance</h3>
        <p className="text-sm text-soft">
          Domain 2.1 — click a source to see why a router trusts it more or less than the others when routes conflict.
        </p>
      </div>

      <div className="space-y-2">
        {SOURCES.map((source, i) => (
          <button
            key={source.name}
            onClick={() => setSelected(i)}
            className={`flex items-center gap-3 w-full text-left transition-opacity ${selected === i ? '' : 'opacity-60 hover:opacity-100'}`}
          >
            <span className="w-36 shrink-0 text-sm font-medium text-ink">{source.name}</span>
            <span
              className={`h-6 rounded-crisp ${BAR_COLOR[i]} ${selected === i ? 'ring-2 ring-offset-1 ring-offset-surface ring-accent' : ''}`}
              style={{ width: `${((i + 1) / SOURCES.length) * 100}%` }}
            />
            <span className="text-[11px] font-mono text-faint shrink-0">AD {source.ad}</span>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-ink">{s.name}</h4>
          <span className="text-[11px] text-faint">{s.type}</span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{s.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Administrative distance only matters when two different sources offer a route to the same destination — the
        router installs the route from whichever source has the lowest AD, regardless of metric.
      </div>
    </div>
  )
}
