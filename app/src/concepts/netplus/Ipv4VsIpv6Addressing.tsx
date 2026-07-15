interface AddressFact {
  label: string
  value: string
}

const IPV4_FACTS: AddressFact[] = [
  { label: 'Length', value: '32 bits, written as 4 decimal octets (e.g. 192.168.1.10)' },
  { label: 'Address space', value: '~4.3 billion addresses — effectively exhausted for public allocation' },
  { label: 'Broadcast', value: 'Has a broadcast address (e.g. 192.168.1.255) that reaches every host on the segment' },
  { label: 'Address resolution', value: 'ARP maps an IP address to a MAC address' },
  { label: 'Private space', value: 'Relies on NAT/PAT to share scarce public addresses across many private hosts' },
  { label: 'Configuration', value: 'Static assignment or DHCP (Discover/Offer/Request/Acknowledge)' },
]

const IPV6_FACTS: AddressFact[] = [
  { label: 'Length', value: '128 bits, written in 8 hex groups (e.g. 2001:db8::1); :: compresses zero runs' },
  { label: 'Address space', value: '~340 undecillion addresses — enough for every device to hold a public one' },
  { label: 'Broadcast', value: 'No broadcast at all — multicast (ff00::/8) and anycast cover those use cases' },
  { label: 'Address resolution', value: 'NDP (Neighbor Discovery Protocol) replaces ARP, running over ICMPv6' },
  { label: 'Private space', value: 'No NAT needed for address conservation — every device can be globally routable' },
  { label: 'Configuration', value: 'SLAAC (stateless autoconfiguration) from router advertisements, or DHCPv6' },
]

export default function Ipv4VsIpv6Addressing() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">IPv4 vs IPv6 Addressing</h3>
        <p className="text-sm text-soft">
          Domain 1.3 — compare how the two addressing schemes represent, resolve, and conserve addresses.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-ink">IPv4</p>
            <span className="text-[10px] font-mono text-faint">32-bit</span>
          </div>
          <div className="h-2.5 rounded-crisp bg-line-strong/40 mb-4 overflow-hidden">
            <div className="h-full bg-heat-2" style={{ width: '25%' }} />
          </div>
          <dl className="space-y-2.5">
            {IPV4_FACTS.map((f) => (
              <div key={f.label}>
                <dt className="text-[11px] uppercase tracking-wider text-faint">{f.label}</dt>
                <dd className="text-sm text-soft leading-relaxed">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-ink">IPv6</p>
            <span className="text-[10px] font-mono text-faint">128-bit</span>
          </div>
          <div className="h-2.5 rounded-crisp bg-line-strong/40 mb-4 overflow-hidden">
            <div className="h-full bg-heat-5" style={{ width: '100%' }} />
          </div>
          <dl className="space-y-2.5">
            {IPV6_FACTS.map((f) => (
              <div key={f.label}>
                <dt className="text-[11px] uppercase tracking-wider text-faint">{f.label}</dt>
                <dd className="text-sm text-soft leading-relaxed">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The bars above are proportional to address length, not address count — IPv6's 128 bits give a space so much
        larger than IPv4's 32 bits that NAT becomes unnecessary and address resolution had to be redesigned (NDP)
        around multicast instead of broadcast.
      </div>
    </div>
  )
}
