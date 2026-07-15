import { useEffect, useState } from 'react'

interface Step {
  title: string
  focus: 'Create/Store' | 'Use/Share' | 'Archive/Destroy'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Create / Collect', focus: 'Create/Store', detail: 'Assign a classification label at birth — everything downstream depends on it.' },
  { title: 'Store', focus: 'Create/Store', detail: 'Encrypt at rest and apply access controls matching the classification.' },
  { title: 'Use', focus: 'Use/Share', detail: 'Enforce least privilege / need-to-know, and monitor and audit usage.' },
  { title: 'Share', focus: 'Use/Share', detail: 'Use DLP tooling, encryption in transit, and rights management to prevent leakage.' },
  { title: 'Archive', focus: 'Archive/Destroy', detail: 'Retain per a documented retention schedule — still protected at its original classification.' },
  { title: 'Destroy', focus: 'Archive/Destroy', detail: 'Cryptographic erasure, degaussing, or physical destruction so data can\'t be recovered.' },
]

const FOCUS_COLOR: Record<Step['focus'], string> = {
  'Create/Store': 'bg-accent text-paper',
  'Use/Share': 'bg-warn text-paper',
  'Archive/Destroy': 'bg-good text-paper',
}

export default function DataLifecycleTimeline() {
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
          <h3 className="font-display text-lg text-ink">The Data Lifecycle</h3>
          <p className="text-sm text-soft">Domain 2.4 — step through the controls that matter most at each stage.</p>
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
        <div className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out" style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }} />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button key={s.title} onClick={() => { setPlaying(false); setActive(i) }} className="flex flex-col items-center gap-2 group" style={{ width: `${100 / STEPS.length}%` }}>
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${i <= active ? FOCUS_COLOR[s.focus] : 'bg-wash text-faint'} ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}>
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${FOCUS_COLOR[STEPS[active].focus]}`}>{STEPS[active].focus}</span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Each lifecycle stage has a dominant control category — classification at birth, encryption in storage,
        least privilege in use, DLP in sharing, retention in archive, and sanitization at destruction.
      </div>
    </div>
  )
}
