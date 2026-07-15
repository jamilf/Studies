import { useState } from 'react'

export default function VlanSegmentation() {
  const [broadcasting, setBroadcasting] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">VLAN Segmentation</h3>
        <p className="text-sm text-soft">
          Domain 2.1 — see how 802.1Q tagging splits one physical switch into isolated broadcast domains.
        </p>
      </div>

      <button
        onClick={() => setBroadcasting((b) => !b)}
        className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
      >
        {broadcasting ? 'Reset' : 'Host A sends a broadcast'}
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-3">Flat network (no VLANs)</p>
          <svg viewBox="0 0 260 160" className="w-full h-40">
            <rect x="20" y="20" width="220" height="120" rx="6" strokeDasharray="4 3" className="fill-none stroke-line-strong" strokeWidth="1.5" />
            <rect x="105" y="70" width="50" height="24" rx="3" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="130" y="86" textAnchor="middle" className="fill-ink text-[9px] font-medium">Switch</text>
            {[
              { x: 35, y: 30, label: 'A' },
              { x: 195, y: 30, label: 'B' },
              { x: 35, y: 115, label: 'C' },
              { x: 195, y: 115, label: 'D' },
            ].map((h) => (
              <g key={h.label}>
                <circle cx={h.x} cy={h.y} r="12" className={`transition-colors duration-500 ${broadcasting ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line-strong'}`} strokeWidth="1.5" />
                <text x={h.x} y={h.y + 3} textAnchor="middle" className="fill-ink text-[9px] font-medium">{h.label}</text>
              </g>
            ))}
          </svg>
          <p className="text-[11px] text-faint text-center">
            {broadcasting ? 'All 4 hosts receive the broadcast' : 'One broadcast domain — every host hears everything'}
          </p>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-3">VLAN-segmented (802.1Q)</p>
          <svg viewBox="0 0 260 160" className="w-full h-40">
            <rect x="10" y="10" width="110" height="60" rx="6" strokeDasharray="4 3" className="fill-none stroke-accent-line" strokeWidth="1.5" />
            <text x="15" y="22" className="fill-accent text-[8px] font-semibold">VLAN 10</text>
            <rect x="10" y="90" width="110" height="60" rx="6" strokeDasharray="4 3" className="fill-none stroke-warn-line" strokeWidth="1.5" />
            <text x="15" y="102" className="fill-warn text-[8px] font-semibold">VLAN 20</text>
            <rect x="180" y="65" width="60" height="30" rx="3" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="210" y="83" textAnchor="middle" className="fill-ink text-[8px] font-medium">Router</text>
            <line x1="120" y1="40" x2="180" y2="70" className="stroke-line-strong" strokeWidth="1.5" />
            <line x1="120" y1="120" x2="180" y2="90" className="stroke-line-strong" strokeWidth="1.5" />
            {[
              { x: 40, y: 40, label: 'A', vlan: 10 },
              { x: 90, y: 40, label: 'B', vlan: 10 },
              { x: 40, y: 120, label: 'C', vlan: 20 },
              { x: 90, y: 120, label: 'D', vlan: 20 },
            ].map((h) => (
              <g key={h.label}>
                <circle
                  cx={h.x}
                  cy={h.y}
                  r="12"
                  className={`transition-colors duration-500 ${broadcasting && h.vlan === 10 ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line-strong'}`}
                  strokeWidth="1.5"
                />
                <text x={h.x} y={h.y + 3} textAnchor="middle" className="fill-ink text-[9px] font-medium">{h.label}</text>
              </g>
            ))}
          </svg>
          <p className="text-[11px] text-faint text-center">
            {broadcasting ? 'Only VLAN 10 (A, B) hears it — VLAN 20 is isolated' : 'Two broadcast domains on one physical switch'}
          </p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        802.1Q inserts a 4-byte tag (a 12-bit VLAN ID field, 1–4094 usable) into the frame. Trunk ports carry multiple
        tagged VLANs between switches, but traffic must still pass through a router or Layer 3 switch (an SVI) to
        cross from one VLAN to another — even though it's the same physical hardware.
      </div>
    </div>
  )
}
