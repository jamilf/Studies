import { useMemo, useState } from 'react'

export default function DefenseInDepthCalculator() {
  const [layers, setLayers] = useState<number>(3)
  const [detectRate, setDetectRate] = useState<number>(40)

  const { detectedProb, breachProb } = useMemo(() => {
    const p = detectRate / 100
    const allFail = Math.pow(1 - p, layers)
    return { detectedProb: (1 - allFail) * 100, breachProb: allFail * 100 }
  }, [layers, detectRate])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Defense in Depth: Layered Detection</h3>
        <p className="text-sm text-soft">Domain 3.1 — adjust the number of independent layers and each layer's detection rate to see why redundant, independent controls compound.</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-soft mb-1">
            <span>Independent security layers</span>
            <span className="font-mono text-ink">{layers}</span>
          </div>
          <input type="range" aria-label="Defense in Depth: Layered Detection" min={1} max={6} step={1} value={layers} onChange={(e) => setLayers(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-sm text-soft mb-1">
            <span>Detection rate per layer</span>
            <span className="font-mono text-ink">{detectRate}%</span>
          </div>
          <input type="range" aria-label="Defense in Depth: Layered Detection" min={10} max={90} step={5} value={detectRate} onChange={(e) => setDetectRate(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-good-line bg-good-tint p-4">
          <p className="text-[11px] uppercase tracking-wider text-good mb-1">Caught by at least one layer</p>
          <p className="font-mono text-2xl font-semibold text-good">{detectedProb.toFixed(1)}%</p>
        </div>
        <div className="rounded-crisp border border-bad-line bg-bad-tint p-4">
          <p className="text-[11px] uppercase tracking-wider text-bad mb-1">Slips past every layer</p>
          <p className="font-mono text-2xl font-semibold text-bad">{breachProb.toFixed(1)}%</p>
        </div>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-3">
        <p className="text-xs font-mono text-soft">P(undetected) = (1 − p)<sup>n</sup> = (1 − {(detectRate / 100).toFixed(2)})<sup>{layers}</sup> = {(breachProb / 100).toFixed(3)}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This is why defense in depth beats a single strong control: even mediocre layers compound quickly if they are
        genuinely independent. It also motivates two related design principles — fail-safe defaults (a layer that
        fails should fail closed, denying access, not open) and least common mechanism (layers should not share a
        component whose single flaw would defeat all of them at once).
      </div>
    </div>
  )
}
