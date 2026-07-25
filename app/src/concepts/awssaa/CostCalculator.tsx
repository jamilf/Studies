import { useMemo, useState } from 'react'

export default function CostCalculator() {
  const [hourlyRate, setHourlyRate] = useState(0.5)
  const [hoursPerMonth, setHoursPerMonth] = useState(730)
  const [discountPct, setDiscountPct] = useState(40)

  const onDemandMonthly = useMemo(() => hourlyRate * hoursPerMonth, [hourlyRate, hoursPerMonth])
  const committedMonthly = useMemo(() => onDemandMonthly * (1 - discountPct / 100), [onDemandMonthly, discountPct])
  const savings = onDemandMonthly - committedMonthly

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">On-Demand vs Committed Cost Calculator</h3>
        <p className="text-sm text-soft">Domain 4.1 — adjust usage and discount to compare On-Demand cost against a Savings Plan / Reserved Instance commitment.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Slider label="On-Demand hourly rate" value={hourlyRate} onChange={setHourlyRate} min={0.01} max={5} step={0.01} format={(n) => `$${n.toFixed(2)}/hr`} />
        <Slider label="Hours per month" value={hoursPerMonth} onChange={setHoursPerMonth} min={1} max={730} step={1} format={(n) => `${n} hrs`} />
        <Slider label="Committed discount" value={discountPct} onChange={setDiscountPct} min={0} max={72} step={1} format={(n) => `${n}%`} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <ResultCard label="On-Demand monthly cost" value={fmt(onDemandMonthly)} formula="rate × hours" />
        <ResultCard label="Committed monthly cost" value={fmt(committedMonthly)} formula="On-Demand × (1 − discount)" accent />
        <ResultCard label="Monthly savings" value={fmt(savings)} formula="On-Demand − committed" />
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A commitment only pays off if the instance actually runs close to full-time — for spiky or short-lived
        workloads, On-Demand (or Spot) can end up cheaper than a Savings Plan you can't fully utilize.
      </div>
    </div>
  )
}

function Slider({ label, value, onChange, min, max, step, format }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; format: (n: number) => string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1"><span className="text-soft">{label}</span><span className="font-mono text-ink font-medium">{format(value)}</span></div>
      <input type="range" aria-label="On-Demand vs Committed Cost Calculator" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
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
