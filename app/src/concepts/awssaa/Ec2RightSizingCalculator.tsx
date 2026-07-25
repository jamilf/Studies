import { useMemo, useState } from 'react'

interface InstanceSize {
  name: string
  vcpu: number
  hourlyRate: number
}

const SIZES: InstanceSize[] = [
  { name: 'm5.large', vcpu: 2, hourlyRate: 0.096 },
  { name: 'm5.xlarge', vcpu: 4, hourlyRate: 0.192 },
  { name: 'm5.2xlarge', vcpu: 8, hourlyRate: 0.384 },
  { name: 'm5.4xlarge', vcpu: 16, hourlyRate: 0.768 },
]

const HOURS_PER_MONTH = 730

function clampIndex(i: number): number {
  return Math.min(SIZES.length - 1, Math.max(0, i))
}

export default function Ec2RightSizingCalculator() {
  const [currentIndex, setCurrentIndex] = useState(2)
  const [avgCpu, setAvgCpu] = useState(12)

  const recommendedIndex = useMemo(() => {
    if (avgCpu < 15) return clampIndex(currentIndex - 2)
    if (avgCpu < 40) return clampIndex(currentIndex - 1)
    if (avgCpu <= 75) return currentIndex
    return clampIndex(currentIndex + 1)
  }, [currentIndex, avgCpu])

  const current = SIZES[currentIndex]
  const recommended = SIZES[recommendedIndex]
  const currentMonthly = current.hourlyRate * HOURS_PER_MONTH
  const recommendedMonthly = recommended.hourlyRate * HOURS_PER_MONTH
  const delta = currentMonthly - recommendedMonthly

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  const verdict =
    recommendedIndex < currentIndex
      ? 'Over-provisioned — downsizing keeps headroom while cutting cost.'
      : recommendedIndex > currentIndex
        ? 'Under-provisioned — utilization this high risks throttling or saturation; consider sizing up.'
        : 'Already right-sized for this utilization level.'

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">EC2 Right-Sizing Calculator</h3>
        <p className="text-sm text-soft">Domain 4.1 — set a running instance size and its average CPU utilization to see the right-sizing recommendation.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-soft mb-0.5">Current running instance</p>
        <div className="flex gap-1.5">
          {SIZES.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setCurrentIndex(i)}
              className={`flex-1 rounded-crisp border px-2 py-1.5 text-xs font-mono transition-colors ${
                currentIndex === i ? 'border-accent bg-accent-tint text-ink font-semibold' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1"><span className="text-soft">Average CPU utilization (CloudWatch, last 14 days)</span><span className="font-mono text-ink font-medium">{avgCpu}%</span></div>
        <input type="range" aria-label="Average CPU utilization (CloudWatch, last 14 days)" min={1} max={95} step={1} value={avgCpu} onChange={(e) => setAvgCpu(Number(e.target.value))} className="w-full" />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Current monthly cost</p>
          <p className="font-mono text-xl font-semibold text-ink">{fmt(currentMonthly)}</p>
          <p className="text-[11px] text-faint mt-1">{current.name} · {current.vcpu} vCPU</p>
        </div>
        <div className="rounded-crisp border border-accent-line bg-accent-tint px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Recommended size</p>
          <p className="font-mono text-xl font-semibold text-ink">{recommended.name}</p>
          <p className="text-[11px] text-faint mt-1">{fmt(recommendedMonthly)}/mo · {recommended.vcpu} vCPU</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Monthly {delta >= 0 ? 'savings' : 'added cost'}</p>
          <p className={`font-mono text-xl font-semibold ${delta >= 0 ? 'text-good' : 'text-warn'}`}>{fmt(Math.abs(delta))}</p>
          <p className="text-[11px] text-faint mt-1">current − recommended</p>
        </div>
      </div>

      <div key={`${currentIndex}-${avgCpu < 15 ? 'a' : avgCpu < 40 ? 'b' : avgCpu <= 75 ? 'c' : 'd'}`} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{verdict}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Right-sizing isn't only about shrinking instances — it means matching capacity to observed CloudWatch
        utilization in either direction. AWS Compute Optimizer automates exactly this recommendation using
        historical CPU, memory, network, and disk metrics.
      </div>
    </div>
  )
}
