export default function ContainmentComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Containment Strategy: Segment vs Shut Down</h3>
        <p className="text-sm text-soft">Domain 3.2 — two ways to contain a compromised host, and what each costs you.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4">
          <p className="text-sm font-semibold text-accent mb-2">Segmentation / Isolation</p>
          <p className="text-xs text-soft mb-3">Move the affected host to an isolated/quarantine VLAN, keep it powered on.</p>
          <p className="text-xs font-semibold text-good mb-1">Pros</p>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside mb-3">
            <li>Cuts off lateral spread and C2 while preserving volatile evidence (RAM, active connections, running processes) for live forensics</li>
            <li>Lets the team observe attacker behavior for threat intel</li>
          </ul>
          <p className="text-xs font-semibold text-bad mb-1">Cons</p>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside">
            <li>A capable attacker may detect the isolation and destroy evidence or trigger a logic bomb</li>
            <li>Some exfil paths may persist briefly during transition</li>
          </ul>
        </div>

        <div className="rounded-crisp border border-warn-line bg-warn-tint/50 p-4">
          <p className="text-sm font-semibold text-warn mb-2">Full Isolation / Shutdown</p>
          <p className="text-xs text-soft mb-3">Physically disconnect the NIC or power the machine off immediately.</p>
          <p className="text-xs font-semibold text-good mb-1">Pros</p>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside mb-3">
            <li>Stops spread and any ongoing exfiltration the fastest</li>
          </ul>
          <p className="text-xs font-semibold text-bad mb-1">Cons</p>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside">
            <li>Destroys volatile evidence in RAM (violates order-of-volatility collection)</li>
            <li>Can trigger anti-forensic/wiper behavior some malware runs on shutdown</li>
            <li>Causes full downtime — no partial availability for that asset</li>
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The choice hinges on whether evidence preservation or speed of stopping damage matters more for this
        incident — prefer segmentation when you need to observe attacker TTPs or preserve forensic evidence, prefer
        full shutdown when business-critical damage (like active ransomware encryption) is spreading right now.
      </div>
    </div>
  )
}
