import { useState } from 'react'

type Scenario = 'uefi-large' | 'legacy-small' | 'redundancy'

interface ScenarioInfo {
  label: string
  recommended: 'MBR' | 'GPT'
  reasoning: string
}

const SCENARIOS: Record<Scenario, ScenarioInfo> = {
  'uefi-large': {
    label: 'UEFI machine, 4TB drive',
    recommended: 'GPT',
    reasoning:
      'MBR addresses partitions with 32-bit sector pointers, which tops out at about 2TB per partition. A 4TB drive needs GPT to be fully usable, and UEFI firmware natively boots from GPT without a compatibility layer.',
  },
  'legacy-small': {
    label: 'Legacy BIOS machine, 500GB drive',
    recommended: 'MBR',
    reasoning:
      'Legacy BIOS firmware boots from the Master Boot Record by design. A 500GB drive is well under the 2TB MBR ceiling, so MBR keeps the widest compatibility with older systems and boot utilities.',
  },
  redundancy: {
    label: 'Need more than 4 primary partitions, or table-corruption resilience',
    recommended: 'GPT',
    reasoning:
      'MBR only stores 4 primary partition entries (or 3 primary + 1 extended holding logical drives) in a single 512-byte sector with no backup. GPT supports up to 128 partitions and duplicates its partition table at the start and end of the disk, so a damaged primary copy can be recovered from the backup.',
  },
}

export default function DiskPartitionStyleComparison() {
  const [scenario, setScenario] = useState<Scenario>('uefi-large')
  const info = SCENARIOS[scenario]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">MBR vs GPT Partition Styles</h3>
        <p className="text-sm text-soft">
          Domain 1.3 — pick a scenario to see which partition table style Disk Management should use.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
              scenario === key ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {SCENARIOS[key].label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div
          className={`rounded-crisp border px-4 py-3 transition-colors ${
            info.recommended === 'MBR' ? 'border-accent bg-accent-tint' : 'border-line bg-surface'
          }`}
        >
          <h4 className={`font-display text-base font-semibold mb-2 ${info.recommended === 'MBR' ? 'text-accent' : 'text-ink'}`}>
            MBR (Master Boot Record)
          </h4>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside">
            <li>Max 4 primary partitions (or 3 primary + 1 extended with logical drives)</li>
            <li>Max addressable volume ~2TB (32-bit sector pointers)</li>
            <li>Partition table lives in one 512-byte sector — no backup copy</li>
            <li>Boots on legacy BIOS firmware</li>
          </ul>
        </div>
        <div
          className={`rounded-crisp border px-4 py-3 transition-colors ${
            info.recommended === 'GPT' ? 'border-accent bg-accent-tint' : 'border-line bg-surface'
          }`}
        >
          <h4 className={`font-display text-base font-semibold mb-2 ${info.recommended === 'GPT' ? 'text-accent' : 'text-ink'}`}>
            GPT (GUID Partition Table)
          </h4>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside">
            <li>Up to 128 partitions (Windows default)</li>
            <li>Max addressable volume in the exabytes</li>
            <li>Table is duplicated at the start and end of the disk for redundancy</li>
            <li>Requires UEFI firmware to boot from it</li>
          </ul>
        </div>
      </div>

      <div key={scenario} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-ink">
          Recommended: <span className="font-semibold text-accent">{info.recommended}</span>
        </p>
        <p className="text-sm text-soft leading-relaxed mt-1">{info.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: the exam loves the "why can't I see the rest of my 4TB drive" scenario — that's an MBR
        capacity ceiling. Also remember the firmware/table pairing: legacy BIOS boots MBR, UEFI boots GPT
        (UEFI can read MBR disks for data, but standard boot requires GPT).
      </div>
    </div>
  )
}
