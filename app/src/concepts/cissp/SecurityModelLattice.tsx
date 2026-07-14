import { useMemo, useState } from 'react'

type Model = 'bell-lapadula' | 'biba'
type Action = 'read' | 'write'

const LEVELS = ['Unclassified', 'Confidential', 'Secret', 'Top Secret']

function evaluate(model: Model, subjectLevel: number, objectLevel: number, action: Action): boolean {
  if (model === 'bell-lapadula') {
    if (action === 'read') return subjectLevel >= objectLevel
    return subjectLevel <= objectLevel
  }
  if (action === 'read') return subjectLevel <= objectLevel
  return subjectLevel >= objectLevel
}

const RULE_TEXT: Record<Model, { focus: string; readRule: string; writeRule: string }> = {
  'bell-lapadula': {
    focus: 'Confidentiality',
    readRule: 'Simple Security Property: "no read up" — a subject may only read at or below its own level',
    writeRule: 'Star Property: "no write down" — a subject may only write at or above its own level',
  },
  biba: {
    focus: 'Integrity',
    readRule: 'Simple Integrity Axiom: "no read down" — a subject may only read at or above its own level',
    writeRule: 'Star Integrity Axiom: "no write up" — a subject may only write at or below its own level',
  },
}

export default function SecurityModelLattice() {
  const [model, setModel] = useState<Model>('bell-lapadula')
  const [subjectLevel, setSubjectLevel] = useState(2)
  const [objectLevel, setObjectLevel] = useState(2)
  const [action, setAction] = useState<Action>('read')

  const allowed = useMemo(() => evaluate(model, subjectLevel, objectLevel, action), [model, subjectLevel, objectLevel, action])
  const rules = RULE_TEXT[model]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Bell-LaPadula vs. Biba Access Rules</h3>
        <p className="text-sm text-soft">
          Domain 3.1 — pick a model, a subject's clearance, an object's classification, and an action to see whether
          it's allowed.
        </p>
      </div>

      <div className="flex gap-2">
        {(['bell-lapadula', 'biba'] as Model[]).map((m) => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
              model === m
                ? 'border-accent bg-accent-tint text-accent'
                : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {m === 'bell-lapadula' ? 'Bell-LaPadula' : 'Biba'} ({RULE_TEXT[m].focus})
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Subject's level</p>
          <div className="flex flex-col gap-1">
            {LEVELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setSubjectLevel(i)}
                className={`rounded-crisp border px-2 py-1.5 text-xs text-left transition-colors ${
                  subjectLevel === i
                    ? 'border-accent bg-accent-tint text-accent'
                    : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-soft mb-1">Object's level</p>
          <div className="flex flex-col gap-1">
            {LEVELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setObjectLevel(i)}
                className={`rounded-crisp border px-2 py-1.5 text-xs text-left transition-colors ${
                  objectLevel === i
                    ? 'border-warn bg-warn-tint text-warn'
                    : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-soft mb-1">Action</p>
          <div className="flex flex-col gap-1">
            {(['read', 'write'] as Action[]).map((a) => (
              <button
                key={a}
                onClick={() => setAction(a)}
                className={`rounded-crisp border px-2 py-1.5 text-xs text-left capitalize transition-colors ${
                  action === a
                    ? 'border-ink bg-wash text-ink font-medium'
                    : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        key={`${model}-${subjectLevel}-${objectLevel}-${action}`}
        className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${
          allowed ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
        }`}
      >
        <p className={`font-display text-2xl font-semibold ${allowed ? 'text-good' : 'text-bad'}`}>
          {allowed ? 'Allowed' : 'Denied'}
        </p>
        <p className="text-sm text-ink mt-1">
          Subject at <span className="font-medium">{LEVELS[subjectLevel]}</span> attempting to{' '}
          <span className="font-medium">{action}</span> an object at{' '}
          <span className="font-medium">{LEVELS[objectLevel]}</span>
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft space-y-1">
        <p>
          <span className="font-semibold text-ink">Read rule:</span> {rules.readRule}
        </p>
        <p>
          <span className="font-semibold text-ink">Write rule:</span> {rules.writeRule}
        </p>
        <p className="pt-1">
          <span className="font-semibold text-ink">Exam tip:</span> Bell-LaPadula protects{' '}
          <span className="text-accent">confidentiality</span> (keep secrets from leaking down). Biba protects{' '}
          <span className="text-warn">integrity</span> (keep low-quality data from corrupting up) — their rules are
          mirror images of each other.
        </p>
      </div>
    </div>
  )
}
