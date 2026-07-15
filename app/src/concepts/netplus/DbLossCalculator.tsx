import { useMemo, useState } from 'react'

export default function DbLossCalculator() {
  const [lengthMeters, setLengthMeters] = useState(2000)
  const [connectorCount, setConnectorCount] = useState(2)
  const [spliceCount, setSpliceCount] = useState(2)
  const [budgetDb, setBudgetDb] = useState(28)

  const fiberLossDb = useMemo(() => (lengthMeters / 100) * 0.5, [lengthMeters])
  const connectorLossDb = useMemo(() => connectorCount * 0.5, [connectorCount])
  const spliceLossDb = useMemo(() => spliceCount * 0.3, [spliceCount])
  const totalLossDb = fiberLossDb + connectorLossDb + spliceLossDb
  const marginDb = budgetDb - totalLossDb
  const pass = marginDb >= 0

  const fmt = (n: number) => `${n.toFixed(2)} dB`

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Fiber Link Loss Calculator</h3>
        <p className="text-sm text-soft">
          Domain 5.2 — adjust fiber run length and connector/splice counts to estimate total loss against a link budget.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Slider label="Fiber length (m)" value={lengthMeters} onChange={setLengthMeters} min={0} max={20000} step={100} format={(n) => `${n} m`} />
        <Slider label="Link budget (receiver sensitivity margin)" value={budgetDb} onChange={setBudgetDb} min={20} max={30} step={1} format={fmt} />
        <Slider label="Connector pairs" value={connectorCount} onChange={setConnectorCount} min={0} max={10} step={1} format={(n) => `${n}`} />
        <Slider label="Splices" value={spliceCount} onChange={setSpliceCount} min={0} max={10} step={1} format={(n) => `${n}`} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <ResultCard label="Fiber attenuation" value={fmt(fiberLossDb)} formula="(length / 100m) × 0.5 dB — illustrative" />
        <ResultCard label="Connector loss" value={fmt(connectorLossDb)} formula="connectors × 0.5 dB each" />
        <ResultCard label="Splice loss" value={fmt(spliceLossDb)} formula="splices × 0.3 dB each" />
        <ResultCard label="Total loss" value={fmt(totalLossDb)} formula="fiber + connectors + splices" accent />
      </div>

      <div className={`rounded-crisp border-l-2 px-4 py-3 ${pass ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold ${pass ? 'text-good' : 'text-bad'}`}>
          {pass ? 'Within budget' : 'Exceeds budget'}
        </p>
        <p className="font-mono text-xs text-soft mt-1">
          Margin: {fmt(marginDb)} ({fmt(budgetDb)} budget {pass ? '≥' : '<'} {fmt(totalLossDb)} total loss)
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Real single-mode fiber at 1310 nm attenuates only about 0.35 dB per km, so length rarely dominates in
        practice — connectors (~0.5 dB each) and splices (~0.1–0.3 dB each) are often the bigger real-world
        contributors on short runs. The per-100m constant used here is a simplified teaching figure, not a vendor
        spec. A link fails when total loss exceeds the receiver's sensitivity margin — the "link budget" — which is
        why techs use an OTDR or power meter to verify actual loss rather than just trusting cable length.
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
