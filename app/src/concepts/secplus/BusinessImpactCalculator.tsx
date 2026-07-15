import { useMemo, useState } from 'react'

const MTD_HOURS = 8 // Maximum Tolerable Downtime for this critical process

interface SliderProps {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  format: (n: number) => string
}

function Slider({ label, value, onChange, min, max, step, format }: SliderProps) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-soft">{label}</span>
        <span className="font-mono text-ink font-medium">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

function ResultCard({ label, value, formula, accent }: { label: string; value: string; formula: string; accent?: boolean }) {
  return (
    <div className={`rounded-crisp border px-4 py-3 ${accent ? 'border-accent-line bg-accent-tint' : 'border-line bg-wash'}`}>
      <p className="text-[11px] uppercase tracking-wider text-faint mb-1">{label}</p>
      <p className="font-mono text-xl font-semibold text-ink">{value}</p>
      <p className="text-[11px] text-faint mt-1">{formula}</p>
    </div>
  )
}

export default function BusinessImpactCalculator() {
  const [hourlyImpact, setHourlyImpact] = useState(8000)
  const [duration, setDuration] = useState(4)
  const [dependents, setDependents] = useState(3)
  const [regMultiplier, setRegMultiplier] = useState(1)

  const baseCost = useMemo(() => hourlyImpact * duration, [hourlyImpact, duration])
  const cascadeMultiplier = useMemo(() => 1 + dependents * 0.08, [dependents])
  const totalImpact = useMemo(() => baseCost * cascadeMultiplier * regMultiplier, [baseCost, cascadeMultiplier, regMultiplier])
  const withinMtd = duration <= MTD_HOURS

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Business Impact Analysis Calculator</h3>
        <p className="text-sm text-soft">
          Domain 5.2 — adjust outage inputs to see estimated impact and whether it exceeds the process's Maximum Tolerable Downtime.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Slider
          label="Hourly revenue/operational impact"
          value={hourlyImpact}
          onChange={setHourlyImpact}
          min={500}
          max={50000}
          step={500}
          format={fmt}
        />
        <Slider
          label="Outage duration (hours)"
          value={duration}
          onChange={setDuration}
          min={1}
          max={24}
          step={1}
          format={(n) => `${n}h`}
        />
        <Slider
          label="Dependent downstream systems"
          value={dependents}
          onChange={setDependents}
          min={0}
          max={10}
          step={1}
          format={(n) => `${n}`}
        />
        <Slider
          label="Regulatory / contractual exposure"
          value={regMultiplier}
          onChange={setRegMultiplier}
          min={1}
          max={3}
          step={0.5}
          format={(n) => `${n.toFixed(1)}×`}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <ResultCard label="Base downtime cost" value={fmt(baseCost)} formula="Hourly impact × duration" />
        <ResultCard label="Cascading multiplier" value={`${cascadeMultiplier.toFixed(2)}×`} formula="1 + (dependents × 0.08)" />
        <ResultCard label="Total estimated impact" value={fmt(totalImpact)} formula="Base × cascade × regulatory" accent />
      </div>

      <div
        className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${withinMtd ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${withinMtd ? 'text-good' : 'text-bad'}`}>
          {withinMtd ? 'Within Maximum Tolerable Downtime' : 'Exceeds Maximum Tolerable Downtime'}
        </p>
        <p className="font-mono text-xs text-soft mt-1">
          {duration}h {withinMtd ? '≤' : '>'} {MTD_HOURS}h MTD
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A BIA quantifies the impact of a single outage — not annual risk like SLE/ALE — and ties it to recovery
        targets. If estimated downtime would blow past the process's MTD, that's the signal to invest in a faster
        recovery strategy (a warmer DR site, redundant dependencies) rather than accepting the exposure.
      </div>
    </div>
  )
}
