import { useMemo, useState } from 'react'

interface CalculatorResult {
  scannedGb: number
  totalCost: number
}

export default function MacieDiscoveryCostCalculator() {
  const [bucketSizeGb, setBucketSizeGb] = useState<number>(500)
  const [samplingPercent, setSamplingPercent] = useState<number>(100)
  const [identifierCount, setIdentifierCount] = useState<number>(3)

  const results: CalculatorResult = useMemo(() => {
    const scannedGb = bucketSizeGb * (samplingPercent / 100)
    const baseCost = scannedGb * 1.0
    const identifierOverhead = scannedGb * identifierCount * 0.02
    return { scannedGb, totalCost: baseCost + identifierOverhead }
  }, [bucketSizeGb, samplingPercent, identifierCount])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Macie Sensitive Data Discovery: Coverage vs. Cost</h3>
        <p className="text-sm text-soft">
          Domain 1.2 — adjust bucket size, sampling depth, and enabled identifiers to see the coverage/cost
          tradeoff of a classification job.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>S3 bucket size to classify</span>
            <span className="font-mono text-ink">{bucketSizeGb.toLocaleString()} GB</span>
          </div>
          <input
            type="range" aria-label="Macie Sensitive Data Discovery: Coverage vs. Cost"
            min={10}
            max={5000}
            step={10}
            value={bucketSizeGb}
            onChange={(e) => setBucketSizeGb(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Sampling depth (% of objects scanned)</span>
            <span className="font-mono text-ink">{samplingPercent}%</span>
          </div>
          <input
            type="range" aria-label="Macie Sensitive Data Discovery: Coverage vs. Cost"
            min={1}
            max={100}
            step={1}
            value={samplingPercent}
            onChange={(e) => setSamplingPercent(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Managed + custom data identifiers enabled</span>
            <span className="font-mono text-ink">{identifierCount}</span>
          </div>
          <input
            type="range" aria-label="Macie Sensitive Data Discovery: Coverage vs. Cost"
            min={0}
            max={10}
            step={1}
            value={identifierCount}
            onChange={(e) => setIdentifierCount(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-surface px-4 py-3">
          <p className="text-xs text-soft mb-1">Data actually scanned</p>
          <p className="font-mono text-2xl text-ink">{results.scannedGb.toLocaleString(undefined, { maximumFractionDigits: 0 })} GB</p>
          <p className="text-xs text-faint mt-1">of {bucketSizeGb.toLocaleString()} GB in the bucket</p>
        </div>
        <div className="rounded-crisp border border-line bg-surface px-4 py-3">
          <p className="text-xs text-soft mb-1">Illustrative relative cost</p>
          <p className="font-mono text-2xl text-ink">${results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-faint mt-1">scanned GB &times; base rate + identifier overhead</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Macie discovery jobs can sample a percentage of objects instead of scanning every object, trading cost for
        coverage — a 10% sample finds sensitive data fast and cheaply but can miss the one mislabeled object with
        real PII. Figures above are illustrative only, not official Macie pricing; the shape of the tradeoff is
        what the exam actually tests.
      </div>
    </div>
  )
}
