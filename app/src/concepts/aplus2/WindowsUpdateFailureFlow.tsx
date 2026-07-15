import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  {
    x: 30,
    y: 110,
    label: 'Update fails with an error code',
    detail: 'Windows Update reports a failure (e.g., 0x80070020 or similar) instead of completing — note the exact code before doing anything else.',
  },
  {
    x: 130,
    y: 40,
    label: 'Check the Windows Update service',
    detail: 'Open services.msc and confirm the Windows Update service is running and set to the correct startup type — a stopped or disabled service is a common, easy-to-miss cause.',
  },
  {
    x: 240,
    y: 110,
    label: 'Run the Windows Update Troubleshooter',
    detail: 'The built-in troubleshooter automatically detects and repairs many common update-component problems without manual intervention.',
  },
  {
    x: 340,
    y: 40,
    label: 'Clear the SoftwareDistribution cache',
    detail: 'Stop the Windows Update service, rename or delete the contents of C:\\Windows\\SoftwareDistribution, then restart the service to force a fresh download of update files.',
  },
  {
    x: 440,
    y: 110,
    label: 'Manually install the update from the Microsoft Update Catalog',
    detail: 'If automatic delivery still fails, download the matching KB package directly and install it manually as the last resort before an in-place repair.',
  },
]

export default function WindowsUpdateFailureFlow() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1600)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-ink">Windows Update Failure Resolution Path</h3>
          <p className="text-sm text-soft">Domain 3.1 — watch the token move through the escalating fix path for a failed Windows Update.</p>
        </div>
        <button
          onClick={() => {
            if (step >= WAYPOINTS.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="shrink-0 rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : step >= WAYPOINTS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[160px]">
        <svg viewBox="0 0 470 160" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {i + 1}
              </text>
            </g>
          ))}
          <circle
            cx={w.x}
            cy={w.y}
            r="9"
            className="fill-none stroke-accent transition-all duration-700 ease-out"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: the fix path escalates from checking a service, to a guided troubleshooter, to clearing cached
        update files, to a manual install — try the least destructive option first rather than jumping straight to
        reinstalling the OS.
      </div>
    </div>
  )
}
