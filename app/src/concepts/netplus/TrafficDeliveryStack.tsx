import { useState } from 'react'

interface TrafficType {
  name: string
  scope: string
  detail: string
}

const TYPES: TrafficType[] = [
  {
    name: 'Unicast',
    scope: 'One sender, one receiver',
    detail:
      'The default for almost all traffic — a single source address talks to a single destination address. Ordinary web browsing, file transfers, and SSH sessions are all unicast.',
  },
  {
    name: 'Anycast',
    scope: 'One sender, nearest of many',
    detail:
      'Multiple servers share the same destination address; routing delivers the packet to whichever one is topologically closest. Used by root DNS servers and CDN edge nodes so clients automatically reach a nearby instance.',
  },
  {
    name: 'Multicast',
    scope: 'One sender, a subscribed group',
    detail:
      'Delivered to every host that has joined a specific group address (224.0.0.0/4 in IPv4). Used for video streaming and for routing protocol updates, e.g. OSPF hellos sent to 224.0.0.5.',
  },
  {
    name: 'Broadcast',
    scope: 'One sender, every host on the segment',
    detail:
      'Delivered to all hosts on the local subnet (destination 255.255.255.255 or the subnet broadcast address). Used by ARP requests and DHCP discovery. IPv6 has no broadcast at all — it uses multicast instead.',
  },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-3', 'bg-heat-5', 'bg-heat-6']
const BAR_WIDTH = ['w-1/4', 'w-1/2', 'w-3/4', 'w-full']

export default function TrafficDeliveryStack() {
  const [selected, setSelected] = useState<number>(0)
  const t = TYPES[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Traffic Delivery Types</h3>
        <p className="text-sm text-soft">Domain 1.4 — click a traffic type to see how many hosts actually receive each packet.</p>
      </div>

      <div className="space-y-2">
        {TYPES.map((type, i) => (
          <button
            key={type.name}
            onClick={() => setSelected(i)}
            className={`flex items-center gap-3 w-full text-left transition-opacity ${selected === i ? '' : 'opacity-60 hover:opacity-100'}`}
          >
            <span className="w-20 shrink-0 text-sm font-medium text-ink">{type.name}</span>
            <span
              className={`h-6 rounded-crisp ${BAR_COLOR[i]} ${BAR_WIDTH[i]} ${
                selected === i ? 'ring-2 ring-offset-1 ring-offset-surface ring-accent' : ''
              }`}
            />
            <span className="text-[11px] text-faint shrink-0 hidden sm:inline">{type.scope}</span>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        As scope widens from unicast to broadcast, each packet reaches more hosts but at the cost of network
        efficiency — that is exactly why broadcast traffic is contained to a single subnet, and why IPv6 dropped it
        in favor of scoped multicast.
      </div>
    </div>
  )
}
