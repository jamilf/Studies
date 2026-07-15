import { useMemo, useState } from 'react'

type Performer = 'internal' | 'external'
type Driver = 'routine' | 'regulatory'
type Verdict = 'self-assessment' | 'compliance-audit' | 'attestation' | 'examination'

interface Result {
  verdict: Verdict
  label: string
  reasoning: string
}

function decide(performer: Performer, driver: Driver): Result {
  if (performer === 'internal' && driver === 'routine') {
    return {
      verdict: 'self-assessment',
      label: 'Internal self-assessment',
      reasoning:
        'A team reviews its own controls against a checklist or framework on a recurring basis. Lowest stakes and lowest cost, but carries inherent bias — the reviewers have a stake in the outcome.',
    }
  }
  if (performer === 'internal' && driver === 'regulatory') {
    return {
      verdict: 'compliance-audit',
      label: 'Internal compliance audit',
      reasoning:
        "An internal audit function (reporting to an audit committee, not the team being audited) formally checks controls against a regulatory requirement. More rigorous than a self-assessment because of that reporting separation.",
    }
  }
  if (performer === 'external' && driver === 'routine') {
    return {
      verdict: 'attestation',
      label: 'Independent third-party audit / attestation',
      reasoning:
        'An outside firm with no stake in the outcome evaluates controls and issues a report (e.g., a SOC 2 attestation) that customers and partners can trust — used proactively to build confidence, not because a regulator demanded it.',
    }
  }
  return {
    verdict: 'examination',
    label: 'Regulatory examination',
    reasoning:
      'A government or industry regulator (or their appointed examiner) audits the organization directly to verify compliance with a legal or contractual mandate. Highest stakes — findings can carry fines or legal consequences.',
  }
}

const VERDICT_STYLE: Record<Verdict, string> = {
  'self-assessment': 'border-good bg-good-tint text-good',
  'compliance-audit': 'border-warn bg-warn-tint text-warn',
  attestation: 'border-accent bg-accent-tint text-accent',
  examination: 'border-bad bg-bad-tint text-bad',
}

export default function AuditTypeDecision() {
  const [performer, setPerformer] = useState<Performer>('internal')
  const [driver, setDriver] = useState<Driver>('routine')

  const result = useMemo(() => decide(performer, driver), [performer, driver])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Audit & Assessment Type Picker</h3>
        <p className="text-sm text-soft">
          Domain 5.5 — pick who performs the review and why, to see which audit type it is.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Performed by</p>
          <div className="flex gap-2">
            {(['internal', 'external'] as Performer[]).map((p) => (
              <button
                key={p}
                onClick={() => setPerformer(p)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  performer === p
                    ? 'border-accent bg-accent-tint text-accent'
                    : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {p === 'internal' ? 'Internal team' : 'Independent third party'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Driven by</p>
          <div className="flex gap-2">
            {(['routine', 'regulatory'] as Driver[]).map((d) => (
              <button
                key={d}
                onClick={() => setDriver(d)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  driver === d
                    ? 'border-accent bg-accent-tint text-accent'
                    : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {d === 'routine' ? 'Routine / voluntary' : 'Regulatory mandate'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        key={result.verdict}
        className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${VERDICT_STYLE[result.verdict]}`}
      >
        <p className="font-display text-2xl font-semibold">{result.label}</p>
        <p className="text-sm text-ink mt-2">{result.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Two independent questions decide the audit type: who is doing the looking (internal vs. independent
        third party) and what is forcing the look (routine choice vs. regulatory requirement). Confusing "internal"
        with "informal" is a common exam trap — an internal compliance audit can still be rigorous and formal.
      </div>
    </div>
  )
}
