import { useState } from 'react'

interface Storage {
  name: string
  interfaceUsed: string
  seqSpeed: string
  typicalUse: string
  detail: string
  relativeSpeed: number // 1-100, used for bar width
  color: string
}

const TIERS: Storage[] = [
  {
    name: 'HDD (7200 RPM)',
    interfaceUsed: 'SATA III',
    seqSpeed: '~150-200 MB/s',
    typicalUse: 'Bulk/archive storage, backups',
    detail:
      'Spinning platters and a moving read/write head mean speed is limited by mechanical seek time as well as raw transfer rate — cheapest cost per gigabyte, but by far the slowest and most fragile of the group.',
    relativeSpeed: 12,
    color: 'bg-heat-1 text-ink',
  },
  {
    name: 'SATA SSD',
    interfaceUsed: 'SATA III',
    seqSpeed: '~550 MB/s',
    typicalUse: 'Budget/upgrade drive in an older system',
    detail:
      'No moving parts, so seek time is effectively zero, but throughput is capped by the SATA III interface itself (6 Gbps) regardless of how fast the flash inside could go — the interface, not the NAND, is the bottleneck here.',
    relativeSpeed: 35,
    color: 'bg-heat-3 text-ink',
  },
  {
    name: 'NVMe SSD (PCIe 3.0, M.2)',
    interfaceUsed: 'PCIe 3.0 ×4 (via M.2 slot)',
    seqSpeed: '~3,500 MB/s',
    typicalUse: 'Primary OS/boot drive in most current builds',
    detail:
      'Bypasses the SATA controller entirely and talks to the CPU over PCIe lanes using the NVMe protocol, which was designed around flash memory\'s parallelism instead of decades-old spinning-disk assumptions.',
    relativeSpeed: 65,
    color: 'bg-heat-5 text-ink',
  },
  {
    name: 'NVMe SSD (PCIe 4.0/5.0, M.2)',
    interfaceUsed: 'PCIe 4.0/5.0 ×4 (via M.2 slot)',
    seqSpeed: '~7,000-12,000+ MB/s',
    typicalUse: 'High-end workstation/gaming builds, large asset workflows',
    detail:
      'Same M.2 physical connector as PCIe 3.0 NVMe drives, but doubles (or quadruples) throughput per PCIe generation — and runs hot enough that many boards specify a heatsink to avoid thermal throttling under sustained load.',
    relativeSpeed: 100,
    color: 'bg-heat-6 text-paper',
  },
]

export default function StorageDeviceSpeedTiers() {
  const [selected, setSelected] = useState<number | null>(2)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Storage Device Speed Tiers</h3>
        <p className="text-sm text-soft">
          Domain 3.3 — click a drive type to compare interface, sequential speed, and typical use case.
        </p>
      </div>

      <div className="space-y-1.5">
        {TIERS.map((t, i) => (
          <button key={t.name} onClick={() => setSelected(selected === i ? null : i)} className="w-full text-left group">
            <div className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 h-7 w-7 rounded-full ${t.color} text-xs font-bold flex items-center justify-center font-mono`}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div
                  className={`h-7 rounded-crisp border flex items-center px-3 transition-colors ${
                    selected === i ? 'border-accent bg-accent-tint' : 'border-line bg-wash group-hover:border-line-strong'
                  }`}
                  style={{ width: `${t.relativeSpeed}%`, minWidth: '30%' }}
                >
                  <span className="text-sm font-medium text-ink">{t.name}</span>
                </div>
              </div>
            </div>
            {selected === i && (
              <div className="ml-10 mt-1.5 mb-2 rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-2">
                <div className="grid sm:grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <p className="text-faint uppercase tracking-wider">Interface</p>
                    <p className="font-mono text-ink">{t.interfaceUsed}</p>
                  </div>
                  <div>
                    <p className="text-faint uppercase tracking-wider">Sequential speed</p>
                    <p className="font-mono text-ink">{t.seqSpeed}</p>
                  </div>
                  <div>
                    <p className="text-faint uppercase tracking-wider">Typical use</p>
                    <p className="font-mono text-ink">{t.typicalUse}</p>
                  </div>
                </div>
                <p className="text-sm text-soft leading-relaxed">{t.detail}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam tell for choosing between SATA and NVMe SSDs isn't the flash itself — it's the interface. Two SSDs
        with identical NAND can differ 6x in throughput purely because one is capped by the SATA III bus and the
        other talks directly over PCIe.
      </div>
    </div>
  )
}
