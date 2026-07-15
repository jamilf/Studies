import { useState } from 'react'

interface Layer {
  name: string
  motivation: string
  detail: string
  color: string
}

// Heat ramp: highest resources/sophistication is deepest brick,
// lowest is pale sand.
const LAYERS: Layer[] = [
  {
    name: 'Nation-state',
    motivation: 'Espionage, sabotage, geopolitical advantage',
    detail: 'The most resourced and patient threat actor. Often runs Advanced Persistent Threats (APTs) — campaigns that can quietly pursue a target for months or years, funded and directed by a government.',
    color: 'bg-heat-6 text-paper',
  },
  {
    name: 'Organized crime',
    motivation: 'Financial gain',
    detail: 'Well-funded and highly capable — ransomware gangs, carding rings, and fraud operations run like businesses — but motivated purely by profit rather than ideology or politics.',
    color: 'bg-heat-5 text-paper',
  },
  {
    name: 'Hacktivist',
    motivation: 'Political or social cause',
    detail: 'Capability varies widely, from simple website defacement to coordinated DDoS campaigns. Publicity for the cause is usually the goal, not financial gain.',
    color: 'bg-heat-4 text-paper',
  },
  {
    name: 'Insider threat',
    motivation: 'Grievance, financial gain, or simple carelessness',
    detail: 'Does not need much technical sophistication because they already hold legitimate access. Can be malicious (a disgruntled employee) or entirely unintentional (a careless mistake) — the existing trust is what makes them hard to detect.',
    color: 'bg-heat-3 text-ink',
  },
  {
    name: 'Shadow IT',
    motivation: 'Convenience, not malice',
    detail: 'Employees adopting unsanctioned SaaS apps or devices to get work done faster. Not an attacker at all, but it creates unmanaged, unmonitored risk that sits entirely outside the security team\'s visibility.',
    color: 'bg-heat-2 text-ink',
  },
  {
    name: 'Script kiddie',
    motivation: 'Curiosity, bragging rights, thrill-seeking',
    detail: 'The lowest sophistication and resources of any threat actor. Runs pre-built tools and scripts written by someone else, usually without deep understanding of how the exploit actually works.',
    color: 'bg-heat-1 text-ink',
  },
]

export default function ThreatActorSophisticationStack() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Threat Actor Sophistication Tiers</h3>
        <p className="text-sm text-soft">
          Domain 2.1 — click each tier to compare threat actors by resources, sophistication, and motivation.
        </p>
      </div>

      <div className="space-y-1.5">
        {LAYERS.map((layer, i) => (
          <button key={layer.name} onClick={() => setSelected(selected === i ? null : i)} className="w-full text-left group">
            <div className="flex items-center gap-3">
              <span className={`flex-shrink-0 h-7 w-7 rounded-full ${layer.color} text-xs font-bold flex items-center justify-center font-mono`}>
                {i + 1}
              </span>
              <div
                className={`flex-1 rounded-crisp border px-3 py-2 transition-colors ${
                  selected === i ? 'border-accent bg-accent-tint' : 'border-line bg-wash group-hover:border-line-strong'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">{layer.name}</span>
                  <span className="text-[11px] text-faint">{layer.motivation}</span>
                </div>
              </div>
            </div>
            {selected === i && (
              <div className="ml-10 mt-1.5 mb-2 rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm text-soft animate-fadein">
                {layer.detail}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Higher resources and sophistication do not always mean higher urgency for a given organization — a small
        business is far more likely to face organized crime or an insider than a nation-state. Match your controls
        to the threat actors realistically motivated to target you.
      </div>
    </div>
  )
}
