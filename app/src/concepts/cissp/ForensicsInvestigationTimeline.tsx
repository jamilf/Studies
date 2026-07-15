import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'First Responder' | 'Forensic Examiner' | 'Legal / Management'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Identification', who: 'First Responder', detail: 'Recognize that an incident may involve evidence worth preserving, and identify which systems, media, and logs are potentially relevant before anything is touched.' },
  { title: 'Preservation', who: 'First Responder', detail: 'Protect the evidence from alteration — isolate affected systems, avoid rebooting or running software on them, and begin the chain-of-custody documentation immediately.' },
  { title: 'Collection', who: 'Forensic Examiner', detail: 'Acquire the evidence following the order of volatility (RAM and network state first, disk images later), using write blockers and generating cryptographic hashes to prove the copy matches the original.' },
  { title: 'Examination', who: 'Forensic Examiner', detail: 'Work only from the hashed, verified forensic copy — never the original — to extract and process relevant data such as timestamps, deleted files, and artifacts.' },
  { title: 'Analysis', who: 'Forensic Examiner', detail: 'Interpret the extracted data to reconstruct what happened: build a timeline, identify the root cause, and determine the scope of the compromise.' },
  { title: 'Presentation', who: 'Legal / Management', detail: 'Document findings in a clear, factual report and, if needed, present them to leadership, regulators, or a court — chain of custody must be intact and unbroken from collection through this step for the evidence to be admissible.' },
]

const WHO_COLOR: Record<Step['who'], string> = {
  'First Responder': 'bg-accent text-paper',
  'Forensic Examiner': 'bg-warn text-paper',
  'Legal / Management': 'bg-good text-paper',
}

export default function ForensicsInvestigationTimeline() {
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
          <h3 className="font-display text-lg text-ink">The Digital Forensics Investigation Process</h3>
          <p className="text-sm text-soft">Domain 7.1 — step through evidence handling from first response to presentation.</p>
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
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
          <span className={`rounded-crisp px-2 py-0.5 text-[10px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>{STEPS[active].who}</span>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A broken chain of custody at any step — undocumented handling, an unhashed copy, a gap in who held the
        evidence — can make otherwise solid findings inadmissible. The order of volatility (collect the most
        fragile evidence, like RAM, first) is one of the most frequently tested forensics concepts on the exam.
      </div>
    </div>
  )
}
