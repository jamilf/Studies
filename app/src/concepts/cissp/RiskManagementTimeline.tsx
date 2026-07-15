import { useEffect, useState } from 'react'

interface Step {
  title: string
  category: 'Analysis' | 'Response' | 'Ongoing'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Identify', category: 'Analysis', detail: 'Catalog assets, threats, and vulnerabilities — you can\'t manage risk you haven\'t identified.' },
  { title: 'Assess', category: 'Analysis', detail: 'Estimate likelihood × impact for each threat/vulnerability pair.' },
  { title: 'Analyze', category: 'Analysis', detail: 'Quantitative: ALE = SLE × ARO. Qualitative: High/Medium/Low ranking when hard numbers aren\'t available.' },
  { title: 'Treat', category: 'Response', detail: 'Choose a treatment: Accept, Mitigate, Transfer, or Avoid.' },
  { title: 'Implement', category: 'Response', detail: 'Roll out technical, administrative, and physical controls; document the residual risk that remains.' },
  { title: 'Monitor', category: 'Ongoing', detail: 'Continuously reassess as the environment changes — this feeds back into Identify.' },
]

const CATEGORY_COLOR: Record<Step['category'], string> = {
  Analysis: 'bg-accent text-paper',
  Response: 'bg-warn text-paper',
  Ongoing: 'bg-good text-paper',
}

export default function RiskManagementTimeline() {
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
          <h3 className="font-display text-lg text-ink">The Risk Management Lifecycle</h3>
          <p className="text-sm text-soft">Domain 1.9 — step through identifying, treating, and monitoring risk.</p>
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
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${i <= active ? CATEGORY_COLOR[s.category] : 'bg-wash text-faint'} ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}>
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${CATEGORY_COLOR[STEPS[active].category]}`}>{STEPS[active].category}</span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Risk management is a loop, not a checklist — residual risk never reaches zero, so Monitor always feeds back
        into Identify as the environment changes.
      </div>
    </div>
  )
}
