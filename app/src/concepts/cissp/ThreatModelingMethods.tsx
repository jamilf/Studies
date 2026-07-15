import { useMemo, useState } from 'react'

type Focus = 'software' | 'attacker' | 'privacy'
type Method = 'STRIDE' | 'PASTA' | 'LINDDUN'

interface MethodInfo {
  name: Method
  bestFor: Focus
  origin: string
  summary: string
  reasoning: string
}

const METHODS: MethodInfo[] = [
  {
    name: 'STRIDE',
    bestFor: 'software',
    origin: 'Microsoft',
    summary: 'Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.',
    reasoning: 'STRIDE decomposes a system diagram (DFD) into components and asks which of the six threat categories apply to each — fast, developer-friendly, and ideal during design reviews.',
  },
  {
    name: 'PASTA',
    bestFor: 'attacker',
    origin: 'OWASP-aligned, risk-centric',
    summary: 'Process for Attack Simulation and Threat Analysis — a 7-stage, risk-centric methodology.',
    reasoning: 'PASTA starts from business objectives, builds attacker-centric attack trees, and simulates real attack scenarios — it aligns threats to business impact, making it the choice when risk quantification matters.',
  },
  {
    name: 'LINDDUN',
    bestFor: 'privacy',
    origin: 'KU Leuven, privacy-centric',
    summary: 'Linkability, Identifiability, Non-repudiation, Detectability, Disclosure of information, Unawareness, Non-compliance.',
    reasoning: 'LINDDUN mirrors STRIDE\'s structure but targets privacy harms instead of security harms — the right tool when the system processes personal data and GDPR-style exposure is the concern.',
  },
]

function pickMethod(focus: Focus): MethodInfo {
  return METHODS.find((m) => m.bestFor === focus) ?? METHODS[0]
}

const FOCUS_LABEL: Record<Focus, string> = {
  software: 'A new microservice is being designed',
  attacker: 'Leadership wants attack scenarios tied to business risk',
  privacy: 'The system processes customer PII and profiles behavior',
}

export default function ThreatModelingMethods() {
  const [focus, setFocus] = useState<Focus>('software')
  const method = useMemo(() => pickMethod(focus), [focus])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Choosing a Threat Modeling Methodology</h3>
        <p className="text-sm text-soft">Domain 1.11 — pick the scenario driving your threat model and see which methodology fits.</p>
      </div>

      <div className="grid gap-2">
        {(Object.keys(FOCUS_LABEL) as Focus[]).map((f) => (
          <button
            key={f}
            onClick={() => setFocus(f)}
            className={`rounded-crisp border px-3 py-2 text-left text-sm font-medium transition-colors ${
              focus === f ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {FOCUS_LABEL[f]}
          </button>
        ))}
      </div>

      <div key={method.name} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein space-y-2">
        <p className="font-display text-xl font-semibold text-accent">{method.name}</p>
        <p className="text-xs font-mono text-soft">{method.origin}</p>
        <p className="text-sm text-ink">{method.summary}</p>
        <p className="text-sm text-soft leading-relaxed">{method.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        All three are structured, repeatable threat-modeling approaches, not mutually exclusive — a mature program
        often layers STRIDE for component-level design reviews with PASTA for business-risk-driven assessments,
        and adds LINDDUN whenever personal data is in scope.
      </div>
    </div>
  )
}
