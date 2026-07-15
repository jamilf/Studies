import { useState } from 'react'

interface Tier {
  name: string
  score: number
  color: string
  text: string
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Vulnerability Assessment',
    score: 35,
    color: 'bg-heat-2',
    text: 'text-ink',
    desc: 'A broad, largely automated scan that identifies and catalogs known weaknesses (missing patches, misconfigurations) without attempting to exploit them. Cheapest and most frequent — often run continuously or monthly.',
  },
  {
    name: 'Penetration Test',
    score: 68,
    color: 'bg-heat-4',
    text: 'text-paper',
    desc: 'A time-boxed, authorized engagement with a defined scope and rules of engagement that actively exploits vulnerabilities to prove real-world impact and chain weaknesses together. Requires a signed authorization letter ("get out of jail free card") before it starts.',
  },
  {
    name: 'Red Team Exercise',
    score: 100,
    color: 'bg-heat-6',
    text: 'text-paper',
    desc: 'A goal-based adversary emulation with minimal scope disclosure — often the blue team (defenders) doesn\'t know it\'s happening. Tests detection and response capability, not just preventive controls, using the full range of tactics a real attacker would use (including social engineering and physical access).',
  },
]

export default function AssessmentIntensityStack() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Vulnerability Assessment vs. Penetration Test vs. Red Team</h3>
        <p className="text-sm text-soft">Domain 6.1 — click a tier to see how scope, stealth, and realism escalate.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${45 + (tier.score / 100) * 50}%` }}
            className={`text-left rounded-crisp py-2.5 px-4 transition-all duration-300 ${tier.color} ${tier.text} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.01]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <span className="font-semibold text-sm">{tier.name}</span>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        These three assessment types form an escalating ladder of realism, cost, and disclosure: vulnerability
        assessments find and list weaknesses, penetration tests prove they're exploitable within a known scope, and
        red team exercises validate the entire organization's ability to detect and respond to a covert adversary.
      </div>
    </div>
  )
}
