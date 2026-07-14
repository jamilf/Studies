import { useState } from 'react'

interface Layer {
  name: string
  lifespan: string
  detail: string
  color: string
}

// Heat ramp: most volatile (collect first, most urgent) is deepest brick,
// least volatile (backups) is pale sand.
const LAYERS: Layer[] = [
  {
    name: 'CPU registers & cache',
    lifespan: 'Nanoseconds',
    detail: 'Gone the instant power changes state or the next instruction executes. Almost never practically collected, but it sits at the top of the theoretical order.',
    color: 'bg-heat-6 text-paper',
  },
  {
    name: 'RAM (running processes, network connections, keys)',
    lifespan: 'Lost at power-off',
    detail: 'Holds fileless malware, decrypted encryption keys in use, active network sockets, and running process state. This is usually the first thing a responder actually captures.',
    color: 'bg-heat-5 text-paper',
  },
  {
    name: 'Swap / temporary files',
    lifespan: 'Minutes–hours typical survival',
    detail: 'The OS may have paged sensitive memory contents to disk temporarily — still fairly volatile, but survives a reboot unlike RAM itself.',
    color: 'bg-heat-4 text-paper',
  },
  {
    name: 'Disk (files, logs on the host)',
    lifespan: 'Persists until overwritten',
    detail: 'Survives reboot and power loss. Still volatile relative to backups — active use can overwrite deleted data over time.',
    color: 'bg-heat-3 text-ink',
  },
  {
    name: 'Remote logs (SIEM, syslog server)',
    lifespan: 'Persists per retention policy',
    detail: "Centrally stored logs outlive the host they came from — useful evidence even if the original machine is wiped, as long as they were shipped off in time.",
    color: 'bg-heat-2 text-ink',
  },
  {
    name: 'Backups & archival media',
    lifespan: 'Persists longest',
    detail: 'The least volatile tier — often offline or immutable, surviving both host compromise and live-system tampering. Least urgent to collect first, but often the last resort.',
    color: 'bg-heat-1 text-ink',
  },
]

export default function OrderOfVolatility() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Order of Volatility</h3>
        <p className="text-sm text-soft">
          Domain 4.8 — click each tier to see why responders collect top-to-bottom during a live investigation.
        </p>
      </div>

      <div className="space-y-1.5">
        {LAYERS.map((layer, i) => (
          <button
            key={layer.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className="w-full text-left group"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 h-7 w-7 rounded-full ${layer.color} text-xs font-bold flex items-center justify-center font-mono`}
              >
                {i + 1}
              </span>
              <div
                className={`flex-1 rounded-crisp border px-3 py-2 transition-colors ${
                  selected === i
                    ? 'border-accent bg-accent-tint'
                    : 'border-line bg-wash group-hover:border-line-strong'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">{layer.name}</span>
                  <span className="text-[11px] text-faint">{layer.lifespan}</span>
                </div>
              </div>
            </div>
            {selected === i && (
              <div className="ml-10 mt-1.5 mb-2 rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm text-soft animate-fadein">
                {layer.detail}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Why the order matters</p>
        <p className="text-ink">
          Power down a compromised host before imaging RAM, and you permanently lose the most volatile — often most
          revealing — evidence: fileless malware, active connections, and encryption keys in use. Always collect
          top-to-bottom.
        </p>
      </div>
    </div>
  )
}
