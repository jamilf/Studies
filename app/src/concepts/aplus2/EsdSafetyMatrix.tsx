import { useMemo, useState } from 'react'

const COMPONENTS = ['RAM module', 'CPU', 'Expansion card', 'Motherboard', 'Power supply (PSU)'] as const
const PRECAUTIONS = ['Anti-static wrist strap', 'ESD mat', 'No precaution taken'] as const

type Verdict = 'good' | 'bad' | 'warn'

function evaluate(component: (typeof COMPONENTS)[number], precaution: (typeof PRECAUTIONS)[number]): { verdict: Verdict; reason: string } {
  if (component === 'Power supply (PSU)') {
    return {
      verdict: 'bad',
      reason:
        'A PSU stores dangerous voltage in its capacitors even after unplugging. Never open a PSU casing regardless of ESD precautions — this is a shock-hazard issue, not just a static one. Send it out for service instead.',
    }
  }
  if (precaution === 'No precaution taken') {
    return {
      verdict: 'bad',
      reason:
        `Handling a ${component.toLowerCase()} with no ESD precaution risks a static discharge that can silently damage sensitive circuitry — the component may fail immediately or degrade and fail later, making the cause hard to trace.`,
    }
  }
  if (precaution === 'ESD mat') {
    return {
      verdict: 'good',
      reason: `An ESD mat grounds the work surface itself, safely bleeding off static as you place and handle the ${component.toLowerCase()} on it.`,
    }
  }
  return {
    verdict: 'good',
    reason: `A properly grounded anti-static wrist strap keeps your body at the same electrical potential as the ${component.toLowerCase()}, preventing a discharge when you touch it.`,
  }
}

export default function EsdSafetyMatrix() {
  const [component, setComponent] = useState<(typeof COMPONENTS)[number]>('RAM module')
  const [precaution, setPrecaution] = useState<(typeof PRECAUTIONS)[number]>('Anti-static wrist strap')

  const result = useMemo(() => evaluate(component, precaution), [component, precaution])

  const styles: Record<Verdict, string> = {
    good: 'border-good bg-good-tint text-good',
    bad: 'border-bad bg-bad-tint text-bad',
    warn: 'border-warn bg-warn-tint text-warn',
  }
  const labels: Record<Verdict, string> = { good: 'Safe', bad: 'Unsafe', warn: 'Caution' }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">ESD &amp; Component Safety</h3>
        <p className="text-sm text-soft">
          Domain 4.3 — pick a component and a precaution to see whether the handling is safe.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-soft mb-1 block">Component</label>
          <div className="flex flex-col gap-1.5">
            {COMPONENTS.map((c) => (
              <button
                key={c}
                onClick={() => setComponent(c)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  component === c ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-soft mb-1 block">Precaution</label>
          <div className="flex flex-col gap-1.5">
            {PRECAUTIONS.map((p) => (
              <button
                key={p}
                onClick={() => setPrecaution(p)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  precaution === p ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-crisp border-l-2 px-4 py-3 ${styles[result.verdict]}`}>
        <p className="font-display text-lg font-semibold mb-1">{labels[result.verdict]}</p>
        <p className="text-sm text-ink">{result.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        ESD precautions protect components from static damage; they do NOT make it safe to open a power supply or
        CRT monitor, which store lethal voltage independent of static electricity. The exam tests this distinction
        directly.
      </div>
    </div>
  )
}
