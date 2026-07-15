import { useMemo, useState } from 'react'

type Access = 'source' | 'blackbox'
type Goal = 'early' | 'runtime' | 'logic'

interface Verdict {
  method: string
  tone: 'good' | 'warn' | 'bad'
  reasoning: string
}

const ACCESS_LABEL: Record<Access, string> = { source: 'Source code available', blackbox: 'Black-box (no source)' }
const GOAL_LABEL: Record<Goal, string> = {
  early: 'Find flaws early, at scale',
  runtime: 'Validate live runtime behavior',
  logic: 'Catch business-logic / design flaws',
}

const MATRIX: Record<Access, Record<Goal, Verdict>> = {
  source: {
    early: {
      method: 'Static Analysis (SAST)',
      tone: 'good',
      reasoning: 'Full source access plus a need for early, scalable detection is exactly what static analysis is built for — it parses code without executing it, catching flaws as soon as code is committed.',
    },
    runtime: {
      method: 'Pair with Dynamic or Interactive Analysis (DAST/IAST)',
      tone: 'warn',
      reasoning: 'Source access alone can\'t confirm how the application actually behaves once running. Static analysis should be paired with a running-application technique to see real data flows and injected inputs.',
    },
    logic: {
      method: 'Manual Peer Code Review',
      tone: 'good',
      reasoning: 'Business logic and design flaws are exactly what automated scanners miss. A human reviewer with source access can reason about intent, authorization logic, and edge cases that no scanner checks for.',
    },
  },
  blackbox: {
    early: {
      method: 'Software Composition Analysis (SCA) only',
      tone: 'warn',
      reasoning: 'True static analysis needs source (or at least byte/IL code). Without it, early automated coverage is limited to identifying known-vulnerable third-party components, not scanning your own logic.',
    },
    runtime: {
      method: 'Dynamic Analysis (DAST)',
      tone: 'good',
      reasoning: 'No source code needed — DAST probes the running application from the outside, exactly like a real attacker would, which is a perfect match for a black-box, runtime-focused goal.',
    },
    logic: {
      method: 'Manual review is not feasible here',
      tone: 'bad',
      reasoning: 'Diagnosing a business-logic or design flaw requires seeing the source and design intent, not just observing symptoms from outside. Get source access before attempting a manual logic review.',
    },
  },
}

const TONE_CLASS: Record<Verdict['tone'], string> = {
  good: 'border-good bg-good-tint text-good',
  warn: 'border-warn bg-warn-tint text-warn',
  bad: 'border-bad bg-bad-tint text-bad',
}

export default function CodeReviewMethodMatrix() {
  const [access, setAccess] = useState<Access>('source')
  const [goal, setGoal] = useState<Goal>('early')

  const verdict = useMemo(() => MATRIX[access][goal], [access, goal])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Choosing a Code Review Method</h3>
        <p className="text-sm text-soft">Domain 6.2 — pick your access level and goal to see which review technique fits.</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Code access</p>
          <div className="flex gap-2">
            {(Object.keys(ACCESS_LABEL) as Access[]).map((a) => (
              <button
                key={a}
                onClick={() => setAccess(a)}
                className={`rounded-crisp border px-3 py-1.5 text-sm font-medium transition-colors ${
                  access === a ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {ACCESS_LABEL[a]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Primary goal</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(GOAL_LABEL) as Goal[]).map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`rounded-crisp border px-3 py-1.5 text-sm font-medium transition-colors ${
                  goal === g ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {GOAL_LABEL[g]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${access}-${goal}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-1 ${TONE_CLASS[verdict.tone]}`}>
        <p className="font-display text-lg font-semibold">{verdict.method}</p>
        <p className="text-sm text-ink leading-relaxed">{verdict.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        No single code review method covers every need — static analysis scales but can't see runtime behavior,
        dynamic analysis needs no source but can't see the code itself, and manual review catches logic flaws that
        automation misses entirely. Mature programs combine all three across the pipeline.
      </div>
    </div>
  )
}
