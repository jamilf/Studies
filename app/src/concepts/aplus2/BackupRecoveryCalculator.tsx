import { useMemo, useState } from 'react'

export default function BackupRecoveryCalculator() {
  const [dataSize, setDataSize] = useState<number>(500)
  const [changeRate, setChangeRate] = useState<number>(8)
  const [retention, setRetention] = useState<number>(7)

  const result = useMemo(() => {
    const dailyChangeGb = dataSize * (changeRate / 100)
    const fullOnlyStorageGb = dataSize * retention
    const incrementalStorageGb = dataSize + dailyChangeGb * (retention - 1)
    const differentialStorageGb = dataSize + dailyChangeGb * ((retention - 1) * retention) / 2
    const incrementalRestoreSteps = retention
    const differentialRestoreSteps = 2
    return {
      dailyChangeGb,
      fullOnlyStorageGb,
      incrementalStorageGb,
      differentialStorageGb,
      incrementalRestoreSteps,
      differentialRestoreSteps,
    }
  }, [dataSize, changeRate, retention])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Backup Strategy Storage Calculator</h3>
        <p className="text-sm text-soft">
          Domain 4.3 — adjust data size, daily change rate, and retention to compare full, incremental, and differential backup storage.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Total data size</span>
            <span className="font-mono text-ink">{dataSize} GB</span>
          </div>
          <input type="range" aria-label="Backup Strategy Storage Calculator" min={50} max={2000} step={50} value={dataSize} onChange={(e) => setDataSize(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Daily change rate</span>
            <span className="font-mono text-ink">{changeRate}%</span>
          </div>
          <input type="range" aria-label="Backup Strategy Storage Calculator" min={1} max={40} step={1} value={changeRate} onChange={(e) => setChangeRate(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Retention period</span>
            <span className="font-mono text-ink">{retention} days</span>
          </div>
          <input type="range" aria-label="Backup Strategy Storage Calculator" min={2} max={30} step={1} value={retention} onChange={(e) => setRetention(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-surface p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Full backups only</p>
          <p className="font-mono text-xl text-ink">{result.fullOnlyStorageGb.toFixed(0)} GB</p>
          <p className="text-xs text-soft mt-1">1 restore step, but storage = data size × retention.</p>
        </div>
        <div className="rounded-crisp border border-accent-line bg-accent-tint p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Full + incremental</p>
          <p className="font-mono text-xl text-accent">{result.incrementalStorageGb.toFixed(0)} GB</p>
          <p className="text-xs text-soft mt-1">Smallest storage footprint, but restore replays {result.incrementalRestoreSteps} backups in order.</p>
        </div>
        <div className="rounded-crisp border border-line bg-surface p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Full + differential</p>
          <p className="font-mono text-xl text-ink">{result.differentialStorageGb.toFixed(0)} GB</p>
          <p className="text-xs text-soft mt-1">Grows each day since the full, but restore only needs {result.differentialRestoreSteps} backups.</p>
        </div>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-3">
        <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Formulas used</p>
        <p className="text-xs font-mono text-soft leading-relaxed">
          incremental storage = full + (daily change × (days − 1)) · differential storage = full + (daily change ×
          days × (days − 1) / 2) · daily change = data size × change rate
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: incremental backups are fastest to create and smallest to store, but slowest to restore because
        every increment since the last full must be applied in order; differential backups trade some storage
        growth for a simpler two-step restore (last full + last differential).
      </div>
    </div>
  )
}
