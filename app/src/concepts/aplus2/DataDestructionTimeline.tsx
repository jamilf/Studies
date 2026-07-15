import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Classify' | 'Sanitize' | 'Destroy' | 'Document'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Classify the drive\'s fate',
    who: 'Classify',
    detail: 'Decide whether the drive will be reused inside the organization, donated/resold outside it, or is unrecoverable and must be scrapped. This decision drives every step that follows — it is not one-size-fits-all.',
  },
  {
    title: 'Reused internally: standard or low-level format',
    who: 'Sanitize',
    detail: 'A standard format only clears the file table, leaving data recoverable with the right tools. A low-level format (or a software wipe using multiple overwrite passes) actually rewrites the sectors, appropriate when the drive stays inside a trusted environment.',
  },
  {
    title: 'Leaving the org, still reusable: full sanitize or degaussing',
    who: 'Sanitize',
    detail: 'A multi-pass overwrite (sanitizing) meets many compliance standards for magnetic and flash media leaving the building. Degaussing exposes a drive to a powerful magnetic field to scramble the platters — but it only works on magnetic (HDD/tape) media, never on SSDs, which have no magnetic storage to disrupt.',
  },
  {
    title: 'Irrecoverable requirement: physical destruction',
    who: 'Destroy',
    detail: 'Shredding, drilling through the platters, or incineration physically destroys the media so no recovery is possible by any means. This is the required step whenever policy or regulation demands data can never be reconstructed.',
  },
  {
    title: 'Certificate of destruction',
    who: 'Document',
    detail: 'A signed certificate of destruction — from an in-house process or a third-party destruction vendor — documents what was destroyed, how, and when, providing an audit trail for compliance and chain of custody.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Classify: 'bg-accent text-paper',
  Sanitize: 'bg-warn text-paper',
  Destroy: 'bg-bad text-paper',
  Document: 'bg-good text-paper',
}

export default function DataDestructionTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Data Destruction & Disposal Workflow</h3>
          <p className="text-sm text-soft">Domain 2.8 — walk through choosing and documenting the right disposal method for a drive.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>
            {STEPS[active].who}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: remember degaussing does not work on SSDs — a question describing a solid-state drive that
        needs sanitizing is testing whether you know to reach for a software overwrite/erase utility or
        physical shredding instead.
      </div>
    </div>
  )
}
