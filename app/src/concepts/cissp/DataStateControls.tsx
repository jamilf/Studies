import { useEffect, useState } from 'react'

interface StatePhase {
  label: string
  node: 'rest' | 'transit' | 'use'
  caption: string
}

const PHASES: StatePhase[] = [
  {
    label: 'Data at rest',
    node: 'rest',
    caption: 'Sitting on a disk, in a database, or in a backup. Protected with full-disk or file/column-level encryption (AES-256), transparent data encryption (TDE), and access controls on the storage volume itself.',
  },
  {
    label: 'Data in transit',
    node: 'transit',
    caption: 'Moving across a network between the storage tier and the endpoint. Protected with TLS 1.2+/1.3, IPsec tunnels, or SSH — anything that stops a network-position attacker from reading or altering it in flight.',
  },
  {
    label: 'Data in use',
    node: 'use',
    caption: 'Loaded into memory and actively being processed by an application. Protected with memory encryption, secure enclaves (e.g., Intel SGX), strict RBAC on the process, and endpoint DLP watching for exfiltration.',
  },
]

export default function DataStateControls() {
  const [phase, setPhase] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, phase])

  const active = PHASES[phase].node

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">The Three States of Data</h3>
          <p className="text-sm text-soft">Domain 2.6 — step through at rest, in transit, and in use to see which control applies where.</p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[160px]">
        <svg viewBox="0 0 460 140" className="w-full h-36" aria-hidden>
          <g>
            <rect x="20" y="45" width="90" height="50" rx="4" className={`transition-colors duration-500 ${active === 'rest' ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line-strong'}`} strokeWidth="1.5" />
            <text x="65" y="65" textAnchor="middle" className="fill-ink text-[9px] font-semibold">Database /</text>
            <text x="65" y="78" textAnchor="middle" className="fill-ink text-[9px] font-semibold">Disk</text>
          </g>

          <line x1="110" y1="70" x2="185" y2="70" className={`transition-colors duration-500 ${active === 'transit' ? 'stroke-accent' : 'stroke-line-strong'}`} strokeWidth="1.5" strokeDasharray="4 3" />

          <g>
            <rect x="185" y="45" width="90" height="50" rx="4" className={`transition-colors duration-500 ${active === 'transit' ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line-strong'}`} strokeWidth="1.5" />
            <text x="230" y="65" textAnchor="middle" className="fill-ink text-[9px] font-semibold">Network</text>
            <text x="230" y="78" textAnchor="middle" className="fill-ink text-[9px] font-semibold">(TLS/IPsec)</text>
          </g>

          <line x1="275" y1="70" x2="350" y2="70" className={`transition-colors duration-500 ${active === 'use' ? 'stroke-accent' : 'stroke-line-strong'}`} strokeWidth="1.5" strokeDasharray="4 3" />

          <g>
            <rect x="350" y="45" width="90" height="50" rx="4" className={`transition-colors duration-500 ${active === 'use' ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line-strong'}`} strokeWidth="1.5" />
            <text x="395" y="65" textAnchor="middle" className="fill-ink text-[9px] font-semibold">Endpoint</text>
            <text x="395" y="78" textAnchor="middle" className="fill-ink text-[9px] font-semibold">Memory</text>
          </g>
        </svg>
      </div>

      <div className="flex gap-2">
        {PHASES.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setPlaying(false)
              setPhase(i)
            }}
            className={`flex-1 rounded-crisp px-2 py-1.5 text-[11px] font-medium transition-colors border ${
              i === phase ? 'bg-accent-tint border-accent text-accent' : i < phase ? 'bg-wash border-line text-soft' : 'bg-surface border-line text-faint hover:text-ink'
            }`}
          >
            {i + 1}. {p.label}
          </button>
        ))}
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{PHASES[phase].label}</h4>
        <p className="text-sm text-soft leading-relaxed">{PHASES[phase].caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam expects you to name the right control for the right state — encrypting a database file at rest does
        nothing to protect the same record once it is unencrypted in application memory, which is why "data in use"
        needs its own distinct controls.
      </div>
    </div>
  )
}
