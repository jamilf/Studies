import { useMemo, useState } from 'react'

const AV = [
  { label: 'Physical', value: 0.2 },
  { label: 'Local', value: 0.55 },
  { label: 'Adjacent', value: 0.62 },
  { label: 'Network', value: 0.85 },
]
const AC = [
  { label: 'High', value: 0.44 },
  { label: 'Low', value: 0.77 },
]
const PR = [
  { label: 'High', value: 0.27 },
  { label: 'Low', value: 0.62 },
  { label: 'None', value: 0.85 },
]
const UI = [
  { label: 'Required', value: 0.62 },
  { label: 'None', value: 0.85 },
]

const MAX_SUM = 0.85 + 0.77 + 0.85 + 0.85

function severity(score: number): { label: string; className: string } {
  if (score >= 9) return { label: 'Critical', className: 'border-bad bg-bad-tint text-bad' }
  if (score >= 7) return { label: 'High', className: 'border-heat-5 bg-heat-5/20 text-ink' }
  if (score >= 4) return { label: 'Medium', className: 'border-warn bg-warn-tint text-warn' }
  return { label: 'Low', className: 'border-good bg-good-tint text-good' }
}

export default function CvssCalculator() {
  const [av, setAv] = useState(3)
  const [ac, setAc] = useState(1)
  const [pr, setPr] = useState(2)
  const [ui, setUi] = useState(1)

  const score = useMemo(() => {
    const sum = AV[av].value + AC[ac].value + PR[pr].value + UI[ui].value
    return Math.min(10, Math.round((sum / MAX_SUM) * 100) / 10)
  }, [av, ac, pr, ui])

  const sev = severity(score)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">CVSS v3 Base Score Estimator</h3>
        <p className="text-sm text-soft">
          Domain 2.2 — adjust the four exploitability metrics to see how they drive an illustrative CVSS base score.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TierSlider label="Attack Vector (AV)" tiers={AV} value={av} onChange={setAv} />
        <TierSlider label="Attack Complexity (AC)" tiers={AC} value={ac} onChange={setAc} />
        <TierSlider label="Privileges Required (PR)" tiers={PR} value={pr} onChange={setPr} />
        <TierSlider label="User Interaction (UI)" tiers={UI} value={ui} onChange={setUi} />
      </div>

      <div className={`rounded-crisp border-l-2 px-5 py-4 text-center ${sev.className}`}>
        <p className="font-mono text-3xl font-semibold">{score.toFixed(1)}</p>
        <p className="font-display text-lg font-semibold mt-1">{sev.label}</p>
        <p className="text-[11px] font-mono mt-1 opacity-70">(AV + AC + PR + UI) / {MAX_SUM.toFixed(2)} × 10</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This is a simplified, illustrative model — the real CVSS v3.1 equation also folds in the Impact sub-score
        (Confidentiality/Integrity/Availability) and Scope. But the direction each metric moves severity matches the
        real spec: Network vector, Low complexity, No privileges, and No user interaction is always the worst case —
        which is exactly what CS0-003 tests conceptually.
      </div>
    </div>
  )
}

function TierSlider({
  label,
  tiers,
  value,
  onChange,
}: {
  label: string
  tiers: { label: string; value: number }[]
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-soft">{label}</span>
        <span className="font-mono text-ink font-medium">{tiers[value].label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={tiers.length - 1}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
