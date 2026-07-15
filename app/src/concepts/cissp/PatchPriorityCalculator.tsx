import { useMemo, useState } from 'react'

const EXPLOIT_LABELS: string[] = ['None / theoretical', 'Proof-of-concept published', 'Functional exploit available', 'Active exploitation in the wild']
const EXPOSURE_LABELS: string[] = ['Internal only', 'Restricted / partner-reachable', 'Internet-facing']

interface Sla {
  name: string
  window: string
  tone: 'bad' | 'warn' | 'good'
}

function slaFor(score: number): Sla {
  if (score >= 20) return { name: 'Emergency', window: 'Patch within 24 hours', tone: 'bad' }
  if (score >= 14) return { name: 'Critical', window: 'Patch within 72 hours', tone: 'bad' }
  if (score >= 9) return { name: 'High', window: 'Patch within 7 days', tone: 'warn' }
  if (score >= 5) return { name: 'Medium', window: 'Patch within 30 days', tone: 'warn' }
  return { name: 'Low', window: 'Next scheduled maintenance window', tone: 'good' }
}

const TONE_CLASS: Record<Sla['tone'], string> = {
  bad: 'border-bad bg-bad-tint text-bad',
  warn: 'border-warn bg-warn-tint text-warn',
  good: 'border-good bg-good-tint text-good',
}

export default function PatchPriorityCalculator() {
  const [cvss, setCvss] = useState<number>(7)
  const [exploitMaturity, setExploitMaturity] = useState<number>(1)
  const [assetCriticality, setAssetCriticality] = useState<number>(3)
  const [exposure, setExposure] = useState<number>(1)

  const score = useMemo(
    () => cvss * 1.0 + exploitMaturity * 2 + assetCriticality * 1.5 + exposure * 2,
    [cvss, exploitMaturity, assetCriticality, exposure],
  )
  const sla = useMemo(() => slaFor(score), [score])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Risk-Based Patch Priority Calculator</h3>
        <p className="text-sm text-soft">Domain 7.8 — adjust the inputs to see how a patch's priority and SLA are derived.</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink font-medium">CVSS base score</span>
            <span className="font-mono text-soft">{cvss.toFixed(1)}</span>
          </div>
          <input type="range" min={0} max={10} step={0.1} value={cvss} onChange={(e) => setCvss(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink font-medium">Exploit maturity</span>
            <span className="font-mono text-soft">{EXPLOIT_LABELS[exploitMaturity]}</span>
          </div>
          <input type="range" min={0} max={3} step={1} value={exploitMaturity} onChange={(e) => setExploitMaturity(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink font-medium">Asset criticality (1-5)</span>
            <span className="font-mono text-soft">{assetCriticality}</span>
          </div>
          <input type="range" min={1} max={5} step={1} value={assetCriticality} onChange={(e) => setAssetCriticality(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink font-medium">Exposure</span>
            <span className="font-mono text-soft">{EXPOSURE_LABELS[exposure]}</span>
          </div>
          <input type="range" min={0} max={2} step={1} value={exposure} onChange={(e) => setExposure(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Formula</p>
          <p className="text-xs font-mono text-soft leading-relaxed">
            score = cvss + (exploit × 2) + (criticality × 1.5) + (exposure × 2)
          </p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Computed risk score</p>
          <p className="text-xl font-mono font-semibold text-ink">{score.toFixed(1)}</p>
        </div>
      </div>

      <div key={sla.name} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${TONE_CLASS[sla.tone]}`}>
        <p className="font-display text-lg font-semibold">{sla.name} priority</p>
        <p className="text-sm text-ink mt-1">{sla.window}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Patch management shouldn't be driven by CVSS score alone — a critical CVSS score on an isolated internal
        test box is a lower real-world priority than a moderate score on an internet-facing system with a public
        exploit. Risk-based prioritization blends severity, exploit availability, asset value, and exposure into a
        single SLA decision.
      </div>
    </div>
  )
}
