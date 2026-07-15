export default function MultiAzVsMultiRegion() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Multi-AZ vs Multi-Region</h3>
        <p className="text-sm text-soft">Domain 2.1 — compare what each resilience pattern actually protects against.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4">
          <p className="text-sm font-semibold text-accent mb-2">Multi-AZ</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Same region, different physically-separate data centers</li>
            <li>Low-latency, typically synchronous replication (e.g. RDS Multi-AZ)</li>
            <li>Protects against an Availability Zone failure</li>
            <li>Automatic failover, simpler to operate</li>
          </ul>
        </div>
        <div className="rounded-crisp border border-warn-line bg-warn-tint/50 p-4">
          <p className="text-sm font-semibold text-warn mb-2">Multi-Region</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Separate AWS regions entirely</li>
            <li>Higher latency, typically asynchronous replication</li>
            <li>Protects against a full region outage</li>
            <li>Needed for the lowest global latency or strict DR requirements; more complex and costly</li>
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Multi-AZ is the default resilience pattern for most workloads — reach for multi-region only when the
        business requires surviving a whole-region outage or serving users with low latency across continents.
      </div>
    </div>
  )
}
