import { useState } from 'react'

interface HardeningItem {
  label: string
  before: string
  after: string
}

const ITEMS: HardeningItem[] = [
  { label: 'Credentials', before: 'Default admin/admin login, never changed', after: 'Unique strong password, tied to a named account via RADIUS/TACACS+' },
  { label: 'Management access', before: 'Telnet enabled on all interfaces', after: 'Telnet disabled; SSH only, restricted to a management VLAN' },
  { label: 'SNMP', before: 'SNMPv1 with community string "public"', after: 'SNMPv3 with authentication and encryption' },
  { label: 'Unused ports/services', before: 'Every switchport active, HTTP/FTP services left running', after: 'Unused switchports administratively shut down; unneeded services disabled' },
  { label: 'Firmware', before: 'Running the firmware installed at the factory, years out of date', after: 'Patched on a regular cadence, tracking vendor security advisories' },
  { label: 'Port security', before: 'Any device can plug in and get a link', after: '802.1X / port security limits and authenticates connected MAC addresses' },
]

export default function DeviceHardeningToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Device Hardening Checklist</h3>
        <p className="text-sm text-soft">
          Domain 4.3 — toggle between an out-of-the-box device and one that has gone through standard hardening steps.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Factory default</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Hardened</span>
      </div>

      <div key={after ? 'after' : 'before'} className="space-y-2 animate-fadein">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className={`rounded-crisp border-l-2 px-4 py-2.5 ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
          >
            <p className="text-xs font-semibold text-ink mb-0.5">{item.label}</p>
            <p className={`text-sm ${after ? 'text-good' : 'text-bad'}`}>{after ? item.after : item.before}</p>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Hardening is about shrinking attack surface: turn off what isn't needed, replace weak defaults with strong
        unique ones, and route every management path through an authenticated, encrypted, logged channel.
      </div>
    </div>
  )
}
