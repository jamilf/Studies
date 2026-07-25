import { useMemo, useState } from 'react'

export default function RiskCalculator() {
  const [assetValue, setAssetValue] = useState(500000)
  const [exposureFactor, setExposureFactor] = useState(30)
  const [aroPerYear, setAroPerYear] = useState(0.2)
  const [controlCost, setControlCost] = useState(15000)

  const sle = useMemo(() => assetValue * (exposureFactor / 100), [assetValue, exposureFactor])
  const ale = useMemo(() => sle * aroPerYear, [sle, aroPerYear])
  const worthIt = controlCost < ale

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Quantitative Risk Calculator</h3>
        <p className="text-sm text-soft">
          Domain 5.2 — adjust the inputs to see how SLE and ALE justify (or reject) a control's cost.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Slider
          label="Asset value"
          value={assetValue}
          onChange={setAssetValue}
          min={10000}
          max={2000000}
          step={10000}
          format={fmt}
        />
        <Slider
          label="Exposure factor (% of asset lost per event)"
          value={exposureFactor}
          onChange={setExposureFactor}
          min={1}
          max={100}
          step={1}
          format={(n) => `${n}%`}
        />
        <Slider
          label="Annualized rate of occurrence (events/year)"
          value={aroPerYear}
          onChange={setAroPerYear}
          min={0.01}
          max={2}
          step={0.01}
          format={(n) => n.toFixed(2)}
        />
        <Slider
          label="Proposed control cost (per year)"
          value={controlCost}
          onChange={setControlCost}
          min={0}
          max={200000}
          step={1000}
          format={fmt}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <ResultCard label="SLE (Single Loss Expectancy)" value={fmt(sle)} formula="Asset Value × Exposure Factor" />
        <ResultCard label="ALE (Annualized Loss Expectancy)" value={fmt(ale)} formula="SLE × ARO" accent />
        <div
          className={`rounded-crisp border-l-2 px-4 py-3 ${worthIt ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
        >
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Control cost vs ALE</p>
          <p className={`font-display text-lg font-semibold ${worthIt ? 'text-good' : 'text-bad'}`}>
            {worthIt ? 'Justified' : 'Not justified'}
          </p>
          <p className="font-mono text-xs text-soft mt-1">
            {fmt(controlCost)} {worthIt ? '<' : '≥'} {fmt(ale)}
          </p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The rational ceiling for annual security spend on a given risk is its ALE — spending more than the expected
        annual loss to prevent it costs more than simply accepting the risk would. This is the core logic exam
        questions test: compute SLE, then ALE, then compare to the proposed control's cost.
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
      <input
        type="range" aria-label="Quantitative Risk Calculator"
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

function ResultCard({
  label,
  value,
  formula,
  accent,
}: {
  label: string
  value: string
  formula: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-crisp border px-4 py-3 ${accent ? 'border-accent-line bg-accent-tint' : 'border-line bg-wash'}`}
    >
      <p className="text-[11px] uppercase tracking-wider text-faint mb-1">{label}</p>
      <p className="font-mono text-xl font-semibold text-ink">{value}</p>
      <p className="text-[11px] text-faint mt-1">{formula}</p>
    </div>
  )
}
