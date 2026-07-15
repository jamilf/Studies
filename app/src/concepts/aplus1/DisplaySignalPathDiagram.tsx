import { useEffect, useState } from 'react'

interface Phase {
  label: string
  x: number
  symptom: string
  detail: string
}

const PHASES: Phase[] = [
  {
    label: 'GPU output',
    x: 40,
    symptom: 'No signal at all, wrong resolution/refresh rate, or garbled artifacts even on the desktop.',
    detail: 'A failing GPU, a bad/outdated driver, or a resolution set beyond what the display supports all originate here — before the signal even reaches a cable.',
  },
  {
    label: 'Cable / connector',
    x: 175,
    symptom: 'Picture flickers, drops out intermittently, or shows "no signal" that comes and goes when the cable is touched.',
    detail: 'HDMI/DisplayPort carry a digital handshake (EDID) as well as the video signal — a loose or damaged connector can break that handshake without fully disconnecting.',
  },
  {
    label: 'Display panel',
    x: 310,
    symptom: 'Dead or stuck pixels, vertical/horizontal lines, or a spiderweb crack pattern visible on an otherwise lit screen.',
    detail: 'These are physical panel defects. Unlike a signal problem, the image is present but locally corrupted or missing — no cable or driver fix will resolve it.',
  },
  {
    label: 'Backlight / inverter',
    x: 440,
    symptom: 'Screen is completely dark, but you can faintly see a "ghost" image with a flashlight.',
    detail: 'The classic backlight/inverter failure: the display is actually rendering the image, but the light source that illuminates it has failed — very different from a dead panel or GPU.',
  },
]

export default function DisplaySignalPathDiagram() {
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

  const current = PHASES[phase]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Display Signal Path</h3>
          <p className="text-sm text-soft">
            Domain 5.4 — step through the video signal chain to see which symptom points to which stage.
          </p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[140px]">
        <svg viewBox="0 0 480 100" className="w-full h-24" aria-hidden>
          <defs>
            <marker id="arrow-display" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className="fill-line-strong" />
            </marker>
          </defs>
          {PHASES.slice(0, -1).map((p, i) => (
            <line
              key={p.label}
              x1={p.x + 30}
              y1={40}
              x2={PHASES[i + 1].x}
              y2={40}
              className="stroke-line-strong"
              strokeWidth="1.5"
              markerEnd="url(#arrow-display)"
            />
          ))}
          {PHASES.map((p, i) => (
            <g key={p.label}>
              <rect
                x={p.x}
                y={20}
                width="60"
                height="40"
                rx="4"
                className={i === phase ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'}
                strokeWidth="1.5"
              />
              <text x={p.x + 30} y={44} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {p.label.split(' ')[0]}
              </text>
              <text x={p.x + 30} y={78} textAnchor="middle" className="fill-faint text-[8px]">
                {p.label.split(' ')[1] ?? ''}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-2">
        <h4 className="font-semibold text-ink">{current.label}</h4>
        <p className="text-sm text-soft leading-relaxed">
          <span className="font-semibold text-ink">Symptom: </span>
          {current.symptom}
        </p>
        <p className="text-sm text-soft leading-relaxed">
          <span className="font-semibold text-ink">Why: </span>
          {current.detail}
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Work the signal path in order: confirm the GPU is even producing a valid signal, then the cable's connection
        and handshake, then the panel itself, then the backlight. A dim-but-visible "ghost" image is the single best
        clue on the exam — it almost always means backlight/inverter, not a dead panel.
      </div>
    </div>
  )
}
