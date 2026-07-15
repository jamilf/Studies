import { useMemo, useState } from 'react'

const FREE_REQUESTS = 1_000_000
const FREE_GB_SECONDS = 400_000
const PRICE_PER_REQUEST = 0.0000002
const PRICE_PER_GB_SECOND = 0.0000166667

export default function LambdaCostModelCalculator() {
  const [invocationsMillions, setInvocationsMillions] = useState(5)
  const [durationMs, setDurationMs] = useState(300)
  const [memoryMb, setMemoryMb] = useState(512)

  const invocations = invocationsMillions * 1_000_000

  const gbSeconds = useMemo(() => (memoryMb / 1024) * (durationMs / 1000) * invocations, [memoryMb, durationMs, invocations])

  const requestCost = useMemo(() => Math.max(0, invocations - FREE_REQUESTS) * PRICE_PER_REQUEST, [invocations])
  const durationCost = useMemo(() => Math.max(0, gbSeconds - FREE_GB_SECONDS) * PRICE_PER_GB_SECOND, [gbSeconds])
  const totalCost = requestCost + durationCost

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Lambda Cost Model Calculator</h3>
        <p className="text-sm text-soft">Domain 4.1 — adjust monthly invocations, duration, and memory to see how Lambda's two-part pricing (requests + GB-seconds) plays out.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Slider label="Invocations / month" value={invocationsMillions} onChange={setInvocationsMillions} min={0.1} max={50} step={0.1} format={(n) => `${n.toFixed(1)}M`} />
        <Slider label="Avg duration" value={durationMs} onChange={setDurationMs} min={10} max={3000} step={10} format={(n) => `${n} ms`} />
        <Slider label="Memory allocated" value={memoryMb} onChange={setMemoryMb} min={128} max={3008} step={64} format={(n) => `${n} MB`} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <ResultCard label="Total GB-seconds" value={gbSeconds.toLocaleString('en-US', { maximumFractionDigits: 0 })} formula="(MB/1024) × (ms/1000) × invocations" />
        <ResultCard label="Request charge" value={fmt(requestCost)} formula="max(0, invocations − 1M) × $0.0000002" />
        <ResultCard label="Duration charge" value={fmt(durationCost)} formula="max(0, GB-s − 400,000) × $0.0000166667" />
      </div>

      <div key={totalCost.toFixed(2)} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Estimated monthly cost</p>
        <p className="font-mono text-2xl font-semibold text-ink">{fmt(totalCost)}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Lambda bills for requests and for compute duration rounded to the nearest millisecond, priced per GB-second —
        there is no charge at all while a function is idle. The always-free tier (1M requests and 400,000 GB-seconds
        per month) means light, infrequent workloads can run at effectively zero cost.
      </div>
    </div>
  )
}

function Slider({ label, value, onChange, min, max, step, format }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; format: (n: number) => string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1"><span className="text-soft">{label}</span><span className="font-mono text-ink font-medium">{format(value)}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  )
}

function ResultCard({ label, value, formula }: { label: string; value: string; formula: string }) {
  return (
    <div className="rounded-crisp border border-line bg-wash px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-faint mb-1">{label}</p>
      <p className="font-mono text-xl font-semibold text-ink">{value}</p>
      <p className="text-[11px] text-faint mt-1">{formula}</p>
    </div>
  )
}
