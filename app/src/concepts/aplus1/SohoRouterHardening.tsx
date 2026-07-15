import { useState } from 'react'

interface ConfigItem {
  label: string
  before: string
  after: string
}

const ITEMS: ConfigItem[] = [
  { label: 'Admin credentials', before: 'Default username/password from the label', after: 'Unique, strong admin password set on first login' },
  { label: 'Wi-Fi encryption', before: 'WEP or WPA2 with a weak shared passphrase', after: 'WPA3 (or WPA2-AES minimum) with a strong passphrase' },
  { label: 'WPS', before: 'Enabled — PIN method vulnerable to brute force', after: 'Disabled' },
  { label: 'Firmware', before: 'Whatever shipped in the box, never updated', after: 'Updated to the latest vendor firmware' },
  { label: 'Remote administration', before: 'Enabled and reachable from the WAN side', after: 'Disabled, or restricted to VPN/LAN only' },
  { label: 'SSID', before: 'Default name that reveals make/model', after: 'Renamed to something that doesn\'t identify the hardware' },
  { label: 'Guest network', before: 'None — every device shares the main LAN', after: 'Separate, isolated guest SSID for visitors and IoT' },
]

export default function SohoRouterHardening() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">SOHO Router Hardening</h3>
        <p className="text-sm text-soft">
          Domain 2.5 — toggle between an out-of-the-box configuration and a hardened one.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Default (insecure)</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Hardened</span>
      </div>

      <div key={after ? 'after' : 'before'} className="space-y-1.5 animate-fadein">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between gap-3 rounded-crisp border-l-2 px-4 py-2.5 ${
              after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
            }`}
          >
            <span className="text-xs font-medium text-ink w-40 flex-shrink-0">{item.label}</span>
            <span className={`text-xs flex-1 ${after ? 'text-good' : 'text-bad'}`}>{after ? item.after : item.before}</span>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Nearly every SOHO router compromise story on the exam starts with one of the "before" items left alone —
        default credentials and WPS are the two most commonly tested attack vectors, because both let an attacker
        bypass the Wi-Fi password entirely.
      </div>
    </div>
  )
}
