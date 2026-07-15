import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Switch',
    back: 'A Layer 2 device that connects hosts within a single LAN. It builds a MAC address table by watching traffic and forwards each frame only out the port the destination lives on — giving every port its own collision domain instead of sharing one, like a hub did.',
  },
  {
    front: 'Router',
    back: "A Layer 3 device that forwards packets between separate networks based on IP address. In a SOHO setup it's usually the device performing NAT, translating many private LAN addresses to one public WAN address, and acting as the default gateway.",
  },
  {
    front: 'Access Point',
    back: 'Bridges wireless clients into the wired LAN, broadcasting one or more SSIDs and handling the 802.11 association/authentication process. A wireless router bundles an AP, a switch, and a router into one box — an AP alone is just the wireless-to-wired bridge.',
  },
  {
    front: 'Patch Panel',
    back: 'A passive termination point for structured cabling — each wall jack\'s home-run cable lands on the back, and short patch cables cross-connect the front to switch ports. It does no switching or addressing itself; it just organizes the physical cable plant.',
  },
  {
    front: 'Hub',
    back: 'A legacy Layer 1 device that electrically repeats every incoming signal out every other port. All connected devices share a single collision domain, so only one can transmit at a time — functionally obsolete, replaced by switches.',
  },
  {
    front: 'Range Extender / Repeater',
    back: 'Rebroadcasts an existing Wi-Fi signal to reach farther into a space, but since it must receive and re-transmit each frame on the same radio, it roughly halves usable throughput for anything routed through it versus a wired backhaul (mesh) alternative.',
  },
]

export default function NetworkHardwareMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Common Networking Hardware</h3>
        <p className="text-sm text-soft">
          Domain 2.2 — click a card to flip between the device and what it actually does on the network.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[120px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-display text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Layer matters on the exam: hubs and repeaters work at Layer 1 (electrical signal only), switches and bridges
        at Layer 2 (MAC addresses), and routers at Layer 3 (IP addresses). An access point is a Layer 2 wireless
        bridge — it doesn't route between networks by itself.
      </div>
    </div>
  )
}
