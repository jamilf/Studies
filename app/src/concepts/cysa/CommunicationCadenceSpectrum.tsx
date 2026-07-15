import { useState } from 'react'

interface Tier {
  name: string
  cadence: string
  channel: string
  audienceReach: number
  updateFrequency: number
}

const TIERS: Tier[] = [
  { name: 'Low', cadence: 'Daily digest email', channel: 'Ticket/email summary at end of day', audienceReach: 1, updateFrequency: 1 },
  { name: 'Medium', cadence: 'Every 4 hours', channel: 'Status email to IT management', audienceReach: 2, updateFrequency: 2 },
  { name: 'High', cadence: 'Hourly', channel: 'Bridge call with IT and business owners', audienceReach: 4, updateFrequency: 4 },
  { name: 'Critical', cadence: 'Continuous / real-time', channel: 'Standing war-room bridge, exec and legal on the line', audienceReach: 6, updateFrequency: 6 },
]

const HEAT: Record<number, string> = { 1: 'bg-heat-1', 2: 'bg-heat-2', 3: 'bg-heat-3', 4: 'bg-heat-4', 5: 'bg-heat-5', 6: 'bg-heat-6' }
const HEAT_TEXT: Record<number, string> = { 1: 'text-ink', 2: 'text-ink', 3: 'text-ink', 4: 'text-paper', 5: 'text-paper', 6: 'text-paper' }

export default function CommunicationCadenceSpectrum() {
  const [idx, setIdx] = useState<number>(0)
  const tier = TIERS[idx]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Incident Communication Cadence</h3>
        <p className="text-sm text-soft">Domain 4.2 — slide across severity to see how often, and to whom, updates should go out.</p>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={TIERS.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-soft mt-1">
          {TIERS.map((t, i) => (
            <span key={t.name} className={i === idx ? 'text-ink font-semibold' : ''}>{t.name}</span>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-surface p-3">
          <p className="text-xs text-soft mb-1.5">Update frequency</p>
          <div className="h-2.5 rounded-crisp bg-wash overflow-hidden">
            <div className={`h-full ${HEAT[tier.updateFrequency]} transition-all duration-500`} style={{ width: `${(tier.updateFrequency / 6) * 100}%` }} />
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-surface p-3">
          <p className="text-xs text-soft mb-1.5">Audience reach</p>
          <div className="h-2.5 rounded-crisp bg-wash overflow-hidden">
            <div className={`h-full ${HEAT[tier.audienceReach]} transition-all duration-500`} style={{ width: `${(tier.audienceReach / 6) * 100}%` }} />
          </div>
        </div>
      </div>

      <div key={idx} className={`rounded-crisp px-4 py-3 animate-fadein ${HEAT[tier.updateFrequency]} ${HEAT_TEXT[tier.updateFrequency]}`}>
        <p className="font-display text-base font-semibold">{tier.cadence}</p>
        <p className="text-sm mt-1 opacity-90">{tier.channel}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Cadence should scale with severity, not with how much is actually known — a Critical incident still gets an
        hourly (or continuous) update even when the message is "still investigating," because silence itself reads
        as a loss of control to stakeholders.
      </div>
    </div>
  )
}
