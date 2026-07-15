import { useState } from 'react'

interface Layer {
  num: number
  name: string
  pdu: string
  protocols: string
  detail: string
}

const LAYERS: Layer[] = [
  {
    num: 7,
    name: 'Application',
    pdu: 'Data',
    protocols: 'HTTP/HTTPS (80/443), FTP (20/21), SMTP (25), DNS (53), DHCP (67/68), SSH (22)',
    detail:
      'The layer users and programs actually touch — a browser requesting a page, a mail client sending a message. It defines the protocols that give network access to applications, not the applications themselves.',
  },
  {
    num: 6,
    name: 'Presentation',
    pdu: 'Data',
    protocols: 'TLS/SSL, JPEG, ASCII/Unicode, MPEG',
    detail:
      'Translates data between the application format and the format sent on the wire: character encoding, compression, and encryption/decryption (TLS is frequently taught here, though many texts fold it into the application layer in practice).',
  },
  {
    num: 5,
    name: 'Session',
    pdu: 'Data',
    protocols: 'NetBIOS, RPC, PPTP, SIP (call setup)',
    detail:
      'Opens, manages, and tears down the dialog between two hosts — think of it as keeping track of whose turn it is to talk. Handles session checkpointing and re-establishment if a connection is briefly interrupted.',
  },
  {
    num: 4,
    name: 'Transport',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    protocols: 'TCP, UDP — port numbers 0–65535',
    detail:
      'End-to-end delivery between processes, identified by port number. TCP adds the 3-way handshake, sequencing, acknowledgments, and flow/congestion control for reliability. UDP skips all of that for speed and low overhead.',
  },
  {
    num: 3,
    name: 'Network',
    pdu: 'Packet',
    protocols: 'IP (IPv4/IPv6), ICMP, OSPF, BGP',
    detail:
      'Logical addressing and routing between different networks. Routers live here — they read the destination IP address, consult a routing table, and forward the packet toward the next hop, decrementing TTL each hop.',
  },
  {
    num: 2,
    name: 'Data Link',
    pdu: 'Frame',
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), ARP, MAC addressing',
    detail:
      'Handles node-to-node delivery on the same physical segment using MAC addresses, and frames data with error detection (FCS/CRC). Switches operate here, learning MAC addresses off the source field and building a CAM table.',
  },
  {
    num: 1,
    name: 'Physical',
    pdu: 'Bits',
    protocols: 'Cabling (UTP/STP, fiber), connectors (RJ45, LC/SC), hubs, NICs',
    detail:
      'The literal electrical signals, light pulses, or radio waves that carry raw bits across a medium. No addressing or meaning here — just voltages, light, and frequencies on wire, fiber, or air.',
  },
]

const HEAT_CLASS: Record<number, string> = {
  1: 'bg-heat-1',
  2: 'bg-heat-2',
  3: 'bg-heat-3',
  4: 'bg-heat-4',
  5: 'bg-heat-4',
  6: 'bg-heat-5',
  7: 'bg-heat-6',
}
const TEXT_CLASS: Record<number, string> = {
  1: 'text-ink',
  2: 'text-ink',
  3: 'text-ink',
  4: 'text-paper',
  5: 'text-paper',
  6: 'text-paper',
  7: 'text-paper',
}

export default function OsiStack() {
  const [selected, setSelected] = useState(4)
  const active = LAYERS.find((l) => l.num === selected)!

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">The OSI 7-Layer Model</h3>
        <p className="text-sm text-soft">Domain 1.1 — click any layer to see its PDU, protocols, and role in getting data across a network.</p>
      </div>

      <div className="flex flex-col gap-1">
        {LAYERS.map((l) => (
          <button
            key={l.num}
            onClick={() => setSelected(l.num)}
            className={`w-full text-left rounded-crisp px-4 py-2.5 transition-all duration-200 ${HEAT_CLASS[l.num]} ${TEXT_CLASS[l.num]} ${
              selected === l.num ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.01]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold opacity-80">L{l.num}</span>
                <span className="font-semibold text-sm">{l.name}</span>
              </span>
              <span className="font-mono text-[11px] opacity-80">{l.pdu}</span>
            </div>
          </button>
        ))}
      </div>

      <div key={active.num} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${HEAT_CLASS[active.num]} ${TEXT_CLASS[active.num]}`}>
            Layer {active.num}
          </span>
          <h4 className="font-semibold text-ink">{active.name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed mb-2">{active.detail}</p>
        <p className="text-xs text-faint font-mono">{active.protocols}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Mnemonic for top-down (7→1): "All People Seem To Need Data Processing." Data is encapsulated with a new
        header at each layer going down the stack on the sender, and de-encapsulated one header at a time going up
        the stack on the receiver — exam questions often ask which header/PDU name applies at a given layer.
      </div>
    </div>
  )
}
