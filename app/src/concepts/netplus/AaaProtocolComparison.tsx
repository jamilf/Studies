export default function AaaProtocolComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">RADIUS vs TACACS+</h3>
        <p className="text-sm text-soft">
          Domain 4.1 — compare the two dominant AAA (authentication, authorization, accounting) protocols used to
          centralize network logins.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-1">RADIUS</p>
          <p className="text-xs text-soft mb-3">Remote Authentication Dial-In User Service</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="rounded-crisp bg-accent-tint px-2 py-0.5 text-[11px] font-mono text-accent">UDP 1812/1813</span>
            <span className="rounded-crisp bg-surface border border-line px-2 py-0.5 text-[11px] font-mono text-soft">Open standard</span>
          </div>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Combines authentication and authorization into a single response</li>
            <li>Encrypts only the password in the Access-Request packet — the rest of the payload is sent in clear text</li>
            <li>Best suited for network access: 802.1X, VPN, wireless client authentication</li>
            <li>Accounting is a separate, best-effort message (Accounting-Request/Response)</li>
          </ul>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4">
          <p className="text-sm font-semibold text-ink mb-1">TACACS+</p>
          <p className="text-xs text-soft mb-3">Terminal Access Controller Access-Control System Plus</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="rounded-crisp bg-accent-tint px-2 py-0.5 text-[11px] font-mono text-accent">TCP 49</span>
            <span className="rounded-crisp bg-surface border border-line px-2 py-0.5 text-[11px] font-mono text-soft">Cisco-developed</span>
          </div>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            <li>Separates authentication, authorization, and accounting into distinct, independently configurable steps</li>
            <li>Encrypts the entire packet body, not just the password</li>
            <li>Best suited for device administration: controlling and logging exactly which CLI commands an admin can run</li>
            <li>Runs over reliable TCP instead of UDP</li>
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A quick way to remember the split: RADIUS authenticates users onto the network (Wi-Fi, VPN, 802.1X ports),
        while TACACS+ authenticates administrators into the network devices themselves and gives granular, per-command
        authorization — which is why it's the AAA protocol of choice for router and switch management access.
      </div>
    </div>
  )
}
