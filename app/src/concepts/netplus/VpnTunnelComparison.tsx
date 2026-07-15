import { useState } from 'react'

export default function VpnTunnelComparison() {
  const [connected, setConnected] = useState(true)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">VPN Tunnel Comparison</h3>
        <p className="text-sm text-soft">
          Domain 4.1 — contrast an always-on site-to-site tunnel with an on-demand client-to-site connection.
        </p>
      </div>

      <button
        onClick={() => setConnected((c) => !c)}
        className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
      >
        Toggle client connection state ({connected ? 'connected' : 'disconnected'})
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-3">Site-to-site VPN</p>
          <svg viewBox="0 0 260 120" className="w-full h-28">
            <rect x="10" y="40" width="50" height="34" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="35" y="60" textAnchor="middle" className="fill-ink text-[8px] font-medium">Branch GW</text>
            <rect x="200" y="40" width="50" height="34" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="225" y="60" textAnchor="middle" className="fill-ink text-[8px] font-medium">HQ GW</text>
            <line x1="60" y1="57" x2="200" y2="57" className="stroke-good" strokeWidth="2.5" />
            <text x="130" y="48" textAnchor="middle" className="fill-good text-[8px] font-semibold">always-on tunnel</text>
          </svg>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside mt-2">
            <li>Gateway-to-gateway, persistent</li>
            <li>Transparent to end users — no client software on hosts</li>
            <li>Typically IPsec (IKEv2, ESP)</li>
            <li>Connects a branch office to HQ or to a cloud VPC</li>
          </ul>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-3">Client-to-site (remote-access) VPN</p>
          <svg viewBox="0 0 260 120" className="w-full h-28">
            <rect x="10" y="40" width="50" height="34" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="35" y="60" textAnchor="middle" className="fill-ink text-[8px] font-medium">Remote user</text>
            <rect x="200" y="40" width="50" height="34" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="225" y="60" textAnchor="middle" className="fill-ink text-[8px] font-medium">Concentrator</text>
            <line
              x1="60"
              y1="57"
              x2="200"
              y2="57"
              className={`transition-all duration-500 ${connected ? 'stroke-good' : 'stroke-line'}`}
              strokeWidth="2.5"
              strokeDasharray={connected ? undefined : '5 4'}
            />
            <text x="130" y="48" textAnchor="middle" className={`text-[8px] font-semibold ${connected ? 'fill-good' : 'fill-faint'}`}>
              {connected ? 'client connected' : 'client disconnected'}
            </text>
          </svg>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside mt-2">
            <li>User initiates via client software, on-demand</li>
            <li>Authenticates the individual user, not just the gateway</li>
            <li>Common protocols: IPsec, SSL/TLS VPN (e.g. OpenVPN)</li>
            <li>Used by remote or traveling employees</li>
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Both encrypt traffic in a tunnel, but site-to-site protects a whole network segment permanently while
        client-to-site protects only one user's device, and only while their client is connected.
      </div>
    </div>
  )
}
