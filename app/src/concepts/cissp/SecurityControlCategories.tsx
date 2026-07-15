import { useState } from 'react'

interface ControlTier {
  category: string
  timing: string
  heat: string
  example: string
}

const TIERS: ControlTier[] = [
  { category: 'Deterrent', timing: 'Discourages a threat actor before an attempt', heat: 'bg-heat-1 text-ink', example: '"Premises under video surveillance" warning sign.' },
  { category: 'Preventive', timing: 'Stops the incident from occurring at all', heat: 'bg-heat-2 text-ink', example: 'Firewall rule blocking unauthorized ports.' },
  { category: 'Detective', timing: 'Identifies an incident while or after it happens', heat: 'bg-heat-3 text-ink', example: 'IDS alert on anomalous traffic.' },
  { category: 'Compensating', timing: 'Alternate control when the primary one is not feasible', heat: 'bg-heat-4 text-paper', example: 'Extra monitoring in place of patching an EOL system.' },
  { category: 'Corrective', timing: 'Limits the extent of damage after detection', heat: 'bg-heat-5 text-paper', example: 'Isolating and re-imaging an infected host.' },
  { category: 'Recovery', timing: 'Restores systems and data to normal operation', heat: 'bg-heat-6 text-paper', example: 'Restoring from backup after ransomware.' },
]

export default function SecurityControlCategories() {
  const [selected, setSelected] = useState<number>(1)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Security Control Categories by Timing</h3>
        <p className="text-sm text-soft">Domain 1.10 — click a tier to see where it sits in the incident timeline, from deterring an attacker to recovering from one.</p>
      </div>

      <div className="space-y-1.5">
        {TIERS.map((t, i) => (
          <button
            key={t.category}
            onClick={() => setSelected(i)}
            style={{ width: `${60 + i * 8}%` }}
            className={`block text-left rounded-crisp px-3 py-2 text-sm font-medium transition-all ${t.heat} ${
              selected === i ? 'ring-2 ring-offset-2 ring-offset-surface ring-accent' : 'opacity-90 hover:opacity-100'
            }`}
          >
            {i + 1}. {t.category}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{TIERS[selected].category} control</h4>
        <p className="text-sm text-soft leading-relaxed mb-1">{TIERS[selected].timing}</p>
        <p className="text-sm text-soft"><span className="font-semibold text-ink">Example:</span> {TIERS[selected].example}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        These categories describe *when in the timeline* a control acts, independent of *what kind* of control it
        is (administrative, technical, or physical) — a single physical control, like a locked server room, can be
        preventive, while a security camera watching that same door is detective.
      </div>
    </div>
  )
}
