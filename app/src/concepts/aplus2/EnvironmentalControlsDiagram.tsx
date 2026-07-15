import { useEffect, useState } from 'react'

interface Phase {
  id: string
  label: string
  detail: string
  cx: number
  cy: number
}

const PHASES: Phase[] = [
  {
    id: 'hvac',
    label: 'Temperature & humidity control',
    detail: 'Keep server/equipment rooms in the recommended range (roughly 64-75°F, 40-60% relative humidity) — too hot risks thermal shutdown, too dry raises static/ESD risk, too humid risks condensation and corrosion.',
    cx: 80,
    cy: 40,
  },
  {
    id: 'ups',
    label: 'UPS & surge protection',
    detail: 'A UPS provides clean power and ride-through time during an outage; a surge protector alone does not prevent data loss from a sudden power cut, only from a voltage spike.',
    cx: 260,
    cy: 40,
  },
  {
    id: 'fire',
    label: 'Fire suppression system',
    detail: 'Server rooms use clean-agent (gaseous) suppression rather than water sprinklers to protect electronics — know that this is a deliberate design choice, not an oversight.',
    cx: 440,
    cy: 40,
  },
  {
    id: 'esd',
    label: 'ESD mats & grounding points',
    detail: 'Grounded work mats and wrist-strap connection points at each bench let technicians safely bleed off static before handling components.',
    cx: 80,
    cy: 140,
  },
  {
    id: 'sds',
    label: 'Safety Data Sheets & disposal',
    detail: 'SDS (formerly MSDS) documents list handling and first-aid info for hazardous materials like toner and batteries; local regulations govern proper e-waste and battery/toner disposal or recycling.',
    cx: 440,
    cy: 140,
  },
]

export default function EnvironmentalControlsDiagram() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1800)
    return () => clearTimeout(t)
  }, [playing, phase])

  const active = PHASES[phase]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-ink">Server Room Environmental Controls</h3>
          <p className="text-sm text-soft">Domain 4.5 — step through the environmental controls that protect an equipment room.</p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="shrink-0 rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 520 180" className="w-full h-44" aria-hidden>
          <rect x="20" y="10" width="480" height="160" rx="4" className="fill-none stroke-line-strong" strokeWidth="1" strokeDasharray="3 3" />
          {PHASES.map((p) => (
            <g key={p.id}>
              <rect
                x={p.cx - 55}
                y={p.cy - 20}
                width="110"
                height="40"
                rx="3"
                className={`transition-colors duration-500 ${p.id === active.id ? 'fill-accent stroke-accent-deep' : 'fill-surface stroke-line'}`}
                strokeWidth="1.5"
              />
              <text
                x={p.cx}
                y={p.cy + 4}
                textAnchor="middle"
                className={`text-[9px] font-medium transition-colors duration-500 ${p.id === active.id ? 'fill-paper' : 'fill-ink'}`}
              >
                {p.label.length > 24 ? p.label.slice(0, 22) + '…' : p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex justify-center gap-1.5">
        {PHASES.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setPlaying(false)
              setPhase(i)
            }}
            className={`h-2 w-2 rounded-full transition-all ${i === phase ? 'bg-accent w-6' : 'bg-line hover:bg-line-strong'}`}
            aria-label={p.label}
          />
        ))}
      </div>

      <div key={active.id} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{active.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{active.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: environmental controls are as much a security topic as a comfort topic — an overheated,
        static-prone, or improperly suppressed room causes hardware failures that look like mysterious intermittent
        problems if you don't think to check the room itself.
      </div>
    </div>
  )
}
