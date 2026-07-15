import { useEffect, useState } from 'react'

interface Phase {
  label: string
  x: number
  y: number
  caption: string
  logEntry: string
}

const PHASES: Phase[] = [
  { label: 'Collect', x: 40, y: 90, caption: 'Evidence is seized at the scene (a drive image, a seized laptop, a memory capture) and immediately tagged with an evidence label.', logEntry: 'Who collected it, what it is, exact date/time, and where it was found.' },
  { label: 'Hash & Document', x: 160, y: 40, caption: 'A cryptographic hash (SHA-256) is generated and recorded so any future change to the evidence is provably detectable.', logEntry: 'Hash value, collection method, and the tool used to acquire the image.' },
  { label: 'Secure Storage', x: 280, y: 90, caption: 'The original is sealed in a tamper-evident bag and locked in an evidence room or safe with restricted access.', logEntry: 'Storage location, container/seal number, access log for the evidence room.' },
  { label: 'Analysis (on a copy)', x: 400, y: 40, caption: 'Examiners work only from a verified forensic copy, never the original, re-hashing before and after analysis.', logEntry: 'Every person who accessed the evidence, why, and confirmation the hash still matches.' },
  { label: 'Presentation', x: 520, y: 90, caption: 'The evidence and its unbroken custody log are presented to legal, HR, or a court, proving nothing was altered.', logEntry: 'Final transfer record — signed hand-off to legal counsel or law enforcement.' },
]

export default function ChainOfCustodyFlow() {
  const [phase, setPhase] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, phase])

  const current = PHASES[phase]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Chain of Custody Flow</h3>
          <p className="text-sm text-soft">Domain 3.2 — step through how evidence moves, and what gets logged, at each handoff.</p>
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

      <div className="relative rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 560 130" className="w-full h-36" aria-hidden>
          <defs>
            <marker id="coc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-line-strong" />
            </marker>
          </defs>
          {PHASES.slice(0, -1).map((p, i) => {
            const next = PHASES[i + 1]
            return (
              <line
                key={p.label}
                x1={p.x + 14}
                y1={p.y}
                x2={next.x - 14}
                y2={next.y}
                className={i < phase ? 'stroke-accent' : 'stroke-line-strong'}
                strokeWidth="2"
                markerEnd="url(#coc-arrow)"
              />
            )
          })}
          {PHASES.map((p, i) => (
            <g key={p.label}>
              <rect
                x={p.x - 34}
                y={p.y - 16}
                width="68"
                height="32"
                rx="4"
                className={i <= phase ? (i === phase ? 'fill-accent' : 'fill-accent-tint stroke-accent-line') : 'fill-surface stroke-line'}
                strokeWidth="1"
              />
              <text x={p.x} y={p.y + 4} textAnchor="middle" className={`text-[9px] font-medium ${i === phase ? 'fill-paper' : 'fill-ink'}`}>
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{current.label}</h4>
        <p className="text-sm text-soft leading-relaxed mb-2">{current.caption}</p>
        <p className="text-xs text-faint">
          <span className="font-semibold text-soft">Custody log records: </span>
          {current.logEntry}
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Chain of custody exists to prove, at every step, exactly who had the evidence, when, and what they did with
        it — a single unexplained gap or an unsealed container can get otherwise solid evidence thrown out.
      </div>
    </div>
  )
}
