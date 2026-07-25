import { useState } from 'react'

interface Tier {
  name: string
  backupTime: number
  restoreTime: number
  storage: number
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Full',
    backupTime: 5,
    restoreTime: 1,
    storage: 5,
    desc: 'Backs up all data every time. Backup time is the longest of the three, but restore is the fastest — a single restore set with nothing else to apply.',
  },
  {
    name: 'Differential',
    backupTime: 3,
    restoreTime: 2,
    storage: 3,
    desc: 'Captures all changes since the last FULL backup. Backup time grows each day until the next full runs. Restore needs only the full plus the latest differential — two sets.',
  },
  {
    name: 'Incremental',
    backupTime: 1,
    restoreTime: 5,
    storage: 1,
    desc: 'Captures only changes since the last backup of ANY type. Fastest to back up and smallest in storage, but restore requires the full plus every incremental since, applied in order — a missing link breaks the whole chain.',
  },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function BackupTypeSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Backup Type Spectrum</h3>
        <p className="text-sm text-soft">
          Domain 3.2 — slide across backup types to see how each trades backup time, restore time, and storage.
        </p>
      </div>

      <input
        type="range" aria-label="Backup Type Spectrum"
        min={0}
        max={TIERS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Backup time</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.backupTime ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Restore time</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.restoreTime ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Storage used</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.storage ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A differential restore only ever needs the full plus the most recent differential. An incremental restore
        needs the full plus every incremental since, applied in sequence — which is why incremental is fastest to
        back up but the slowest and most fragile to restore.
      </div>
    </div>
  )
}
