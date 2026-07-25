import { useMemo, useState } from 'react'

export default function PsuWattageCalculator() {
  const [cpuTdp, setCpuTdp] = useState(105)
  const [gpuTdp, setGpuTdp] = useState(220)
  const [driveCount, setDriveCount] = useState(3)
  const [psuRating, setPsuRating] = useState(550)

  const baseline = 60 // motherboard, RAM, fans, USB devices, etc.
  const drivePower = 8 // watts per HDD/SSD, average

  const totalDraw = useMemo(
    () => cpuTdp + gpuTdp + baseline + driveCount * drivePower,
    [cpuTdp, gpuTdp, driveCount],
  )

  // A PSU should be sized so the system's peak draw sits around 50-80% of rated capacity —
  // that's both the efficiency sweet spot (80 PLUS curves peak near 50%) and the safety headroom
  // for transient spikes. So the recommended minimum PSU rating is draw / 0.8.
  const recommendedMinimum = useMemo(() => Math.ceil(totalDraw / 0.8), [totalDraw])
  const loadPercent = useMemo(() => Math.round((totalDraw / psuRating) * 100), [totalDraw, psuRating])
  const sufficient = psuRating >= recommendedMinimum

  const fmt = (n: number) => `${n} W`

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">PSU Wattage Calculator</h3>
        <p className="text-sm text-soft">
          Domain 3.5 — sum component draw against the PSU's rating to see if there's enough headroom.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Slider label="CPU TDP" value={cpuTdp} onChange={setCpuTdp} min={35} max={250} step={5} format={fmt} />
        <Slider label="GPU TDP" value={gpuTdp} onChange={setGpuTdp} min={0} max={450} step={10} format={fmt} />
        <Slider label="Drives (HDD/SSD)" value={driveCount} onChange={setDriveCount} min={0} max={8} step={1} format={(n) => `${n} drive${n === 1 ? '' : 's'}`} />
        <Slider label="PSU rating" value={psuRating} onChange={setPsuRating} min={300} max={1000} step={50} format={fmt} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Total system draw</p>
          <p className="font-mono text-xl font-semibold text-ink">{totalDraw} W</p>
          <p className="text-[11px] text-faint mt-1 font-mono">
            {cpuTdp} + {gpuTdp} + {baseline} + {driveCount}×{drivePower}
          </p>
        </div>
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Recommended min. PSU</p>
          <p className="font-mono text-xl font-semibold text-ink">{recommendedMinimum} W</p>
          <p className="text-[11px] text-faint mt-1">Draw ÷ 0.8 (80% load headroom)</p>
        </div>
        <div className={`rounded-crisp border-l-2 px-4 py-3 ${sufficient ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Verdict at {loadPercent}% load</p>
          <p className={`font-display text-lg font-semibold ${sufficient ? 'text-good' : 'text-bad'}`}>
            {sufficient ? 'Sufficient' : 'Insufficient'}
          </p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Don't just cover the sum of TDPs — TDP is a sustained-thermal figure, not peak instantaneous draw, and
        transient spikes (especially from GPUs under load) can briefly exceed it. Sizing the PSU so normal load sits
        around 50–80% of its rating gives spike headroom and keeps the unit running in its most efficient (and
        coolest, quietest, longest-lived) operating range.
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  format: (n: number) => string
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-soft">{label}</span>
        <span className="font-mono text-ink font-medium">{format(value)}</span>
      </div>
      <input type="range" aria-label="PSU Wattage Calculator" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  )
}
