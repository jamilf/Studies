import { useMemo, useState } from 'react'

type CauseCount = 'Single likely cause' | 'Multiple contributing causes'
type SystemType = 'Process/human error' | 'Complex technical system'

interface Recommendation {
  technique: string
  reasoning: string
}

function recommend(causeCount: CauseCount, systemType: SystemType): Recommendation {
  if (causeCount === 'Single likely cause') {
    return {
      technique: '5 Whys',
      reasoning: 'A quick, linear chain of "why" questions is enough when there is one dominant thread to pull — it is fast and needs no diagramming.',
    }
  }
  if (systemType === 'Complex technical system') {
    return {
      technique: 'Fault Tree Analysis',
      reasoning: 'Multiple interacting technical failures (a missed patch AND a misconfigured firewall AND a stale detection rule) call for a top-down logic tree that shows how combinations of failures led to the incident.',
    }
  }
  return {
    technique: 'Fishbone (Ishikawa) Diagram',
    reasoning: 'When people, process, and technology all contributed, a fishbone diagram groups causes into categories (people, process, tools, environment) so nothing gets missed.',
  }
}

export default function RootCauseAnalysisSelector() {
  const [causeCount, setCauseCount] = useState<CauseCount>('Single likely cause')
  const [systemType, setSystemType] = useState<SystemType>('Process/human error')

  const rec = useMemo(() => recommend(causeCount, systemType), [causeCount, systemType])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Root Cause Analysis Technique Selector</h3>
        <p className="text-sm text-soft">Domain 3.3 — describe the incident and get the RCA technique best suited to it.</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-soft mb-1">How many contributing causes does this look like?</p>
          <div className="flex gap-2">
            {(['Single likely cause', 'Multiple contributing causes'] as CauseCount[]).map((c) => (
              <button
                key={c}
                onClick={() => setCauseCount(c)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  causeCount === c ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className={causeCount === 'Single likely cause' ? 'opacity-40 pointer-events-none' : ''}>
          <p className="text-xs text-soft mb-1">What kind of system/failure is involved?</p>
          <div className="flex gap-2">
            {(['Process/human error', 'Complex technical system'] as SystemType[]).map((s) => (
              <button
                key={s}
                onClick={() => setSystemType(s)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  systemType === s ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${causeCount}-${systemType}`} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 text-center animate-fadein">
        <p className="font-display text-xl font-semibold text-accent">{rec.technique}</p>
        <p className="text-sm text-ink mt-2 leading-relaxed">{rec.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        All three techniques answer "why did this really happen," not just "what happened" — the exam distinguishes
        them by structure: 5 Whys is a chain, Fishbone is a categorized brainstorm, and Fault Tree is a formal
        logic diagram for systems where failures combine.
      </div>
    </div>
  )
}
