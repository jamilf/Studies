import { useState } from 'react'

interface Layer {
  name: string
  lifespan: string
  detail: string
  color: string
}

const LAYERS: Layer[] = [
  {
    name: 'CPU registers & cache',
    lifespan: 'Nanoseconds',
    detail: 'Gone the instant power changes state or the next instruction executes. Almost never practically collected, but it sits at the top of the theoretical order.',
    color: 'bg-red-600',
  },
  {
    name: 'RAM (running processes, network connections, keys)',
    lifespan: 'Lost at power-off',
    detail: 'Holds fileless malware, decrypted encryption keys in use, active network sockets, and running process state. This is usually the first thing a responder actually captures.',
    color: 'bg-orange-500',
  },
  {
    name: 'Swap / temporary files',
    lifespan: 'Minutes–hours typical survival',
    detail: 'The OS may have paged sensitive memory contents to disk temporarily — still fairly volatile, but survives a reboot unlike RAM itself.',
    color: 'bg-amber-500',
  },
  {
    name: 'Disk (files, logs on the host)',
    lifespan: 'Persists until overwritten',
    detail: 'Survives reboot and power loss. Still volatile relative to backups — active use can overwrite deleted data over time.',
    color: 'bg-yellow-500',
  },
  {
    name: 'Remote logs (SIEM, syslog server)',
    lifespan: 'Persists per retention policy',
    detail: "Centrally stored logs outlive the host they came from — useful evidence even if the original machine is wiped, as long as they were shipped off in time.",
    color: 'bg-lime-500',
  },
  {
    name: 'Backups & archival media',
    lifespan: 'Persists longest',
    detail: 'The least volatile tier — often offline or immutable, surviving both host compromise and live-system tampering. Least urgent to collect first, but often the last resort.',
    color: 'bg-emerald-500',
  },
]

export default function OrderOfVolatility() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">Order of Volatility</h3>
        <p className="text-sm text-slate-400">
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
                className={`flex-shrink-0 h-7 w-7 rounded-full ${layer.color} text-white text-xs font-bold flex items-center justify-center`}
              >
                {i + 1}
              </span>
              <div
                className={`flex-1 rounded-lg border px-3 py-2 transition-colors ${
                  selected === i
                    ? 'border-emerald-600 bg-emerald-950/30'
                    : 'border-slate-800 bg-slate-900 group-hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-100">{layer.name}</span>
                  <span className="text-[11px] text-slate-500">{layer.lifespan}</span>
                </div>
              </div>
            </div>
            {selected === i && (
              <div className="ml-10 mt-1.5 mb-2 rounded-lg border border-emerald-800/40 bg-emerald-950/20 p-3 text-sm text-slate-300 animate-[fadein_0.25s_ease-out]">
                {layer.detail}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-amber-800/50 bg-amber-950/30 p-4 text-sm text-amber-200">
        <p className="font-semibold mb-1">Why the order matters</p>
        <p className="text-amber-200/80">
          Power down a compromised host before imaging RAM, and you permanently lose the most volatile — often most
          revealing — evidence: fileless malware, active connections, and encryption keys in use. Always collect
          top-to-bottom.
        </p>
      </div>
    </div>
  )
}
