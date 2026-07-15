import { useMemo, useState } from 'react'

function tier(score: number): { label: string; className: string } {
  if (score >= 8) return { label: 'Critical', className: 'border-bad bg-bad-tint text-bad' }
  if (score >= 6) return { label: 'High', className: 'border-heat-5 bg-heat-5/20 text-ink' }
  if (score >= 4) return { label: 'Medium', className: 'border-warn bg-warn-tint text-warn' }
  return { label: 'Low', className: 'border-good bg-good-tint text-good' }
}

export default function DreadRiskCalculator() {
  const [damage, setDamage] = useState(6)
  const [reproducibility, setReproducibility] = useState(6)
  const [exploitability, setExploitability] = useState(5)
  const [affectedUsers, setAffectedUsers] = useState(5)
  const [discoverability, setDiscoverability] = useState(5)

  const score = useMemo(() => {
    const sum = damage + reproducibility + exploitability + affectedUsers + discoverability
    return Math.round((sum / 5) * 10) / 10
  }, [damage, reproducibility, exploitability, affectedUsers, discoverability])

  const t = tier(score)

  const sliders: { label: string; value: number; onChange: (v: number) => void }[] = [
    { label: 'Damage potential', value: damage, onChange: setDamage },
    { label: 'Reproducibility', value: reproducibility, onChange: setReproducibility },
    { label: 'Exploitability', value: exploitability, onChange: setExploitability },
    { label: 'Affected users', value: affectedUsers, onChange: setAffectedUsers },
    { label: 'Discoverability', value: discoverability, onChange: setDiscoverability },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">DREAD Risk Score Calculator</h3>
        <p className="text-sm text-soft">Domain 2.3 — rate each DREAD factor 0-10 to see how a threat model converts qualitative judgment into a comparable score.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {sliders.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-soft">{s.label}</span>
              <span className="font-mono text-ink font-medium">{s.value}</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={s.value}
              onChange={(e) => s.onChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className={`rounded-crisp border-l-2 px-5 py-4 text-center ${t.className}`}>
        <p className="font-mono text-3xl font-semibold">{score.toFixed(1)}</p>
        <p className="font-display text-lg font-semibold mt-1">{t.label}</p>
        <p className="text-[11px] font-mono mt-1 opacity-70">(D + R + E + A + D) / 5</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        DREAD (Damage, Reproducibility, Exploitability, Affected users, Discoverability) is one way threat modeling
        turns "how bad is this?" into a repeatable number — useful for ranking a backlog of findings, even though it
        is more subjective than CVSS.
      </div>
    </div>
  )
}
