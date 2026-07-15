interface Row {
  label: string
  accessLogs: string
  dataEvents: string
}

const ROWS: Row[] = [
  { label: 'Delivery target', accessLogs: 'Log objects written to a destination S3 bucket you choose', dataEvents: 'CloudTrail — can route to S3, CloudWatch Logs, and EventBridge' },
  { label: 'Delivery model', accessLogs: 'Best-effort and batched; no delivery SLA, and logs can be delayed hours or dropped under very high request volume', dataEvents: 'Reliable, near real-time delivery as part of the CloudTrail pipeline' },
  { label: 'Format', accessLogs: 'Space-delimited log lines, one line per request', dataEvents: 'Structured JSON CloudTrail events with full request context (caller identity, source IP, request parameters)' },
  { label: 'Cost', accessLogs: 'Free — you only pay standard S3 storage for the log objects themselves', dataEvents: 'Charged per million data events recorded, billed separately from management events' },
  { label: 'Can trigger automation?', accessLogs: 'No — logs are just objects landing in a bucket', dataEvents: 'Yes — an EventBridge rule can react to a data event in near real time (e.g. auto-remediate)' },
  { label: 'Best exam use case', accessLogs: 'Bulk, after-the-fact analysis of who is accessing which objects and access patterns over time', dataEvents: 'Real-time security monitoring and alerting on specific object-level API activity (GetObject, PutObject, DeleteObject)' },
]

export default function S3AccessLogsVsDataEvents() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">S3 Server Access Logging vs. CloudTrail Data Events</h3>
        <p className="text-sm text-soft">
          Domain 2.4 — two different ways to log S3 object activity, each with different reliability, cost, and
          automation implications.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-surface px-4 py-4">
          <h4 className="font-display font-semibold text-ink mb-2">S3 Server Access Logging</h4>
          <ul className="space-y-2">
            {ROWS.map((r) => (
              <li key={r.label} className="text-sm text-soft">
                <span className="font-semibold text-ink">{r.label}: </span>
                {r.accessLogs}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-crisp border border-accent-line bg-accent-tint px-4 py-4">
          <h4 className="font-display font-semibold text-ink mb-2">CloudTrail Data Events (S3)</h4>
          <ul className="space-y-2">
            {ROWS.map((r) => (
              <li key={r.label} className="text-sm text-soft">
                <span className="font-semibold text-ink">{r.label}: </span>
                {r.dataEvents}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        When a question asks for "reliable, near-real-time, alertable" logging of S3 object access, the answer is
        CloudTrail data events, not server access logs — access logs are useful and cheap for bulk usage analysis,
        but AWS explicitly does not guarantee their delivery.
      </div>
    </div>
  )
}
