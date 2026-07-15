import { useState } from 'react'

interface Row {
  a: string
  b: string
}

const SWITCH_TABLE: Row[] = [
  { a: 'AA:11:22:33:44:01', b: 'Gi0/1' },
  { a: 'AA:11:22:33:44:02', b: 'Gi0/2' },
  { a: 'AA:11:22:33:44:03', b: 'Gi0/3' },
]

const ROUTER_TABLE: Row[] = [
  { a: '10.0.1.0/24', b: 'Gi0/0' },
  { a: '10.0.2.0/24', b: 'Gi0/1' },
  { a: '0.0.0.0/0 (default)', b: 'Gi0/2 (WAN)' },
]

export default function SwitchingVsRouting() {
  const [showTables, setShowTables] = useState(true)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Switching vs Routing</h3>
        <p className="text-sm text-soft">
          Domain 2.1 — compare how a Layer 2 switch and a Layer 3 router each decide where to forward traffic.
        </p>
      </div>

      <button
        onClick={() => setShowTables((s) => !s)}
        className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
      >
        {showTables ? 'Hide' : 'Show'} forwarding tables
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <p className="text-sm font-semibold text-ink">Switch (Layer 2)</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Builds a MAC address table (CAM table) by learning source MACs on incoming frames</li>
            <li>Forwards based on destination MAC address</li>
            <li>One broadcast domain per switch, unless split by VLANs</li>
            <li>Floods unknown-unicast and broadcast frames out every port except the source</li>
          </ul>
          {showTables && (
            <div className="rounded-crisp border border-line bg-surface overflow-hidden animate-fadein">
              <div className="grid grid-cols-2 text-[11px] uppercase tracking-wider text-faint px-3 py-1.5 border-b border-line">
                <span>MAC</span>
                <span>Port</span>
              </div>
              {SWITCH_TABLE.map((r) => (
                <div key={r.a} className="grid grid-cols-2 text-xs font-mono text-ink px-3 py-1.5 border-b border-line last:border-b-0">
                  <span>{r.a}</span>
                  <span>{r.b}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <p className="text-sm font-semibold text-ink">Router (Layer 3)</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Builds a routing table from static routes and dynamic protocols (OSPF, BGP)</li>
            <li>Forwards based on destination IP using longest-prefix match</li>
            <li>Each interface is its own broadcast domain / subnet</li>
            <li>Decrements TTL each hop; can apply NAT and ACLs</li>
          </ul>
          {showTables && (
            <div className="rounded-crisp border border-line bg-surface overflow-hidden animate-fadein">
              <div className="grid grid-cols-2 text-[11px] uppercase tracking-wider text-faint px-3 py-1.5 border-b border-line">
                <span>Network</span>
                <span>Interface</span>
              </div>
              {ROUTER_TABLE.map((r) => (
                <div key={r.a} className="grid grid-cols-2 text-xs font-mono text-ink px-3 py-1.5 border-b border-line last:border-b-0">
                  <span>{r.a}</span>
                  <span>{r.b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Switches don't segment traffic between networks — they just learn where MAC addresses live within one
        broadcast domain. Moving traffic between subnets or VLANs always requires a router (or a Layer 3 switch
        acting as one), which is why inter-VLAN routing needs an L3 device even on switched hardware.
      </div>
    </div>
  )
}
