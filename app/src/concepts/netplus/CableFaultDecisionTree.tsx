import { useMemo, useState } from 'react'

type Symptom = 'intermittent' | 'no-link' | 'slow'
type CableType = 'copper' | 'fiber'

const SYMPTOM_LABELS: Record<Symptom, string> = {
  intermittent: 'Intermittent connection',
  'no-link': 'No link light',
  slow: 'Slow throughput',
}

const CABLE_LABELS: Record<CableType, string> = {
  copper: 'Copper (UTP)',
  fiber: 'Fiber',
}

interface Diagnosis {
  verdict: string
  severity: 'warn' | 'bad'
  reasoning: string
}

function diagnose(symptom: Symptom, cableType: CableType): Diagnosis {
  const table: Record<CableType, Record<Symptom, Diagnosis>> = {
    copper: {
      'no-link': {
        verdict: 'Bad connector / miswired pinout',
        severity: 'bad',
        reasoning: 'Check for a bad crimp, a wrong pinout (TIA/EIA-568A vs 568B mismatch), or a damaged/incorrectly seated RJ45 connector.',
      },
      slow: {
        verdict: 'Wrong cat rating or EMI/crosstalk',
        severity: 'warn',
        reasoning: 'The cable may not meet the category rating needed for the link speed (e.g., Cat5 running Gigabit), or it\'s near a noise source (EMI/crosstalk), forcing auto-negotiation to a lower speed or a duplex mismatch.',
      },
      intermittent: {
        verdict: 'Marginal or damaged cable / loose termination',
        severity: 'warn',
        reasoning: 'A partially broken conductor, a loose punch-down, or an exceeded bend radius can cause an unstable link that drops under vibration or temperature change.',
      },
    },
    fiber: {
      'no-link': {
        verdict: 'Dirty/damaged connector or exceeded bend radius',
        severity: 'bad',
        reasoning: 'A contaminated or scratched connector end-face, wrong connector polarity/type (LC/SC mismatch), or exceeding the fiber\'s minimum bend radius (causing macrobend loss or a break).',
      },
      slow: {
        verdict: 'Excessive attenuation from splices/connectors, or wrong fiber type',
        severity: 'warn',
        reasoning: 'Too many splices or connectors adding dB loss, or a single-mode/multimode mismatch causing modal issues.',
      },
      intermittent: {
        verdict: 'Dirty connector or marginal splice',
        severity: 'warn',
        reasoning: 'Contamination on the ferrule end-face is the classic intermittent-fiber culprit — clean with a proper fiber-optic cleaning tool and inspect with a fiber scope before re-seating.',
      },
    },
  }
  return table[cableType][symptom]
}

export default function CableFaultDecisionTree() {
  const [symptom, setSymptom] = useState<Symptom>('no-link')
  const [cableType, setCableType] = useState<CableType>('copper')

  const result = useMemo(() => diagnose(symptom, cableType), [symptom, cableType])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cable Fault Decision Tree</h3>
        <p className="text-sm text-soft">Domain 5.2 — pick a symptom and a cable type to see the most likely root cause.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Symptom</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(SYMPTOM_LABELS) as Symptom[]).map((s) => (
              <button
                key={s}
                onClick={() => setSymptom(s)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  symptom === s ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {SYMPTOM_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Cable type</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(CABLE_LABELS) as CableType[]).map((c) => (
              <button
                key={c}
                onClick={() => setCableType(c)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  cableType === c ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {CABLE_LABELS[c]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        key={`${symptom}-${cableType}`}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${
          result.severity === 'bad' ? 'border-bad bg-bad-tint' : 'border-warn bg-warn-tint'
        }`}
      >
        <p className={`font-display text-lg font-semibold ${result.severity === 'bad' ? 'text-bad' : 'text-warn'}`}>
          {result.verdict}
        </p>
        <p className="text-sm text-ink mt-1">{result.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Always inspect and clean fiber connectors before assuming a hardware failure — dirty connectors are the
        single most common fiber fault. For copper, a cable certifier or tester checking wiremap, length, and
        attenuation quickly narrows most of these causes.
      </div>
    </div>
  )
}
