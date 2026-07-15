export default function DocumentationTypeComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Physical vs Logical Network Diagrams</h3>
        <p className="text-sm text-soft">Domain 3.1 — compare what each documentation type shows and when you would reach for it.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-3">Physical diagram</p>
          <svg viewBox="0 0 260 110" className="w-full h-28">
            <rect x="20" y="20" width="220" height="70" rx="3" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x={30 + i * 36} y="60" width="26" height="18" className="fill-accent-tint stroke-accent" strokeWidth="1" />
            ))}
            <text x="130" y="40" textAnchor="middle" className="fill-ink text-[8px] font-medium">
              Patch panel — rack 2, IDF-B
            </text>
            {Array.from({ length: 6 }).map((_, i) => (
              <text key={i} x={43 + i * 36} y="72" textAnchor="middle" className="fill-ink text-[7px]">
                {i + 1}
              </text>
            ))}
          </svg>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside mt-2">
            <li>Cable runs, port numbers, patch panel and rack layout</li>
            <li>Device locations, IDF/MDF placement, cable types and lengths</li>
            <li>Used for hands-on work — tracing a bad cable or finding a port</li>
          </ul>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-3">Logical diagram</p>
          <svg viewBox="0 0 260 110" className="w-full h-28">
            <rect x="15" y="15" width="90" height="35" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="60" y="36" textAnchor="middle" className="fill-ink text-[7px] font-medium">
              VLAN 10 — 10.0.10.0/24
            </text>
            <rect x="155" y="15" width="90" height="35" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="200" y="36" textAnchor="middle" className="fill-ink text-[7px] font-medium">
              VLAN 20 — 10.0.20.0/24
            </text>
            <line x1="105" y1="32" x2="155" y2="32" className="stroke-good" strokeWidth="2" />
            <text x="130" y="24" textAnchor="middle" className="fill-good text-[7px] font-semibold">
              routed
            </text>
            <rect x="85" y="70" width="90" height="30" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="130" y="89" textAnchor="middle" className="fill-ink text-[8px] font-medium">
              Core L3 switch
            </text>
          </svg>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside mt-2">
            <li>IP addressing scheme, VLANs, subnets, and routing paths</li>
            <li>Abstracts away physical location — shows how data actually flows</li>
            <li>Used for design work — planning an addressing scheme or a VLAN change</li>
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Both should exist and stay current for the same network — a technician tracing a cable needs the physical
        diagram, while someone planning a subnet or troubleshooting routing needs the logical one.
      </div>
    </div>
  )
}
