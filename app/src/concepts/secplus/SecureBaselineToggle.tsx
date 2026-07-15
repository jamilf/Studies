import { useState } from 'react'

interface ConfigItem {
  label: string
  before: string
  after: string
}

const ITEMS: ConfigItem[] = [
  {
    label: 'Default accounts',
    before: 'Default admin/admin credentials left active on every device out of the box.',
    after: 'Default accounts disabled or renamed; unique strong credentials issued per device.',
  },
  {
    label: 'Running services',
    before: 'Every out-of-box service and port stays enabled — Telnet, sample apps, unused shares.',
    after: 'Unnecessary services, ports, and protocols disabled — only what the role requires stays on.',
  },
  {
    label: 'Patch level',
    before: 'Ships with whatever firmware/OS build happened to be current at manufacture.',
    after: 'Brought fully current and enrolled in a recurring patch management cadence.',
  },
  {
    label: 'Host protections',
    before: 'No host-based firewall, EDR agent, or centralized logging configured.',
    after: 'Host-based firewall, EDR/antivirus, and log forwarding enabled and verified.',
  },
  {
    label: 'Configuration drift',
    before: 'Configured once at setup and never re-checked against a standard.',
    after: 'Enforced and continuously monitored against a secure baseline (GPO, SCAP, config management).',
  },
]

export default function SecureBaselineToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Secure Baseline Hardening</h3>
        <p className="text-sm text-soft">
          Domain 4.1 — toggle between a default configuration and a hardened secure baseline.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Default config</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`}
          />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Hardened baseline</span>
      </div>

      <div key={after ? 'after' : 'before'} className="space-y-2 animate-fadein">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className={`rounded-crisp border-l-2 px-4 py-2.5 ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
          >
            <p className="text-[11px] uppercase tracking-wider text-faint mb-0.5">{item.label}</p>
            <p className={`text-sm ${after ? 'text-ink' : 'text-ink'}`}>{after ? item.after : item.before}</p>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A secure baseline is a documented, reproducible starting configuration — hardening isn't a one-time cleanup,
        it's turning "whatever the vendor shipped" into a standard you can enforce and re-verify across every device
        of that type.
      </div>
    </div>
  )
}
