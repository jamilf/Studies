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
        <h3 className="text-lg font-semibold text-slate-100">Bell-LaPadula vs. Biba Access Rules</h3>
        <p className="text-sm text-slate-400">
          Domain 3.1 — pick a model, a subject's clearance, an object's classification, and an action to see whether
          it's allowed.
        </p>
      </div>

      <div className="flex gap-2">
        {(['bell-lapadula', 'biba'] as Model[]).map((m) => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
              model === m
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
            }`}
          >
            {m === 'bell-lapadula' ? 'Bell-LaPadula' : 'Biba'} ({RULE_TEXT[m].focus})
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">Subject's level</p>
          <div className="flex flex-col gap-1">
            {LEVELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setSubjectLevel(i)}
                className={`rounded-md border px-2 py-1.5 text-xs text-left transition-colors ${
                  subjectLevel === i
                    ? 'border-sky-500 bg-sky-950/40 text-sky-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Object's level</p>
          <div className="flex flex-col gap-1">
            {LEVELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setObjectLevel(i)}
                className={`rounded-md border px-2 py-1.5 text-xs text-left transition-colors ${
                  objectLevel === i
                    ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Action</p>
          <div className="flex flex-col gap-1">
            {(['read', 'write'] as Action[]).map((a) => (
              <button
                key={a}
                onClick={() => setAction(a)}
                className={`rounded-md border px-2 py-1.5 text-xs text-left capitalize transition-colors ${
                  action === a
                    ? 'border-violet-500 bg-violet-950/40 text-violet-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
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
        className={`rounded-xl border p-5 text-center animate-[fadein_0.3s_ease-out] ${
          allowed ? 'border-emerald-700/50 bg-emerald-950/30' : 'border-red-800/50 bg-red-950/30'
        }`}
      >
        <p className={`text-2xl font-bold ${allowed ? 'text-emerald-300' : 'text-red-300'}`}>
          {allowed ? 'ALLOWED' : 'DENIED'}
        </p>
        <p className="text-sm text-slate-300 mt-1">
          Subject at <span className="font-medium">{LEVELS[subjectLevel]}</span> attempting to{' '}
          <span className="font-medium">{action}</span> an object at{' '}
          <span className="font-medium">{LEVELS[objectLevel]}</span>
        </p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400 space-y-1">
        <p>
          <span className="font-semibold text-slate-300">Read rule:</span> {rules.readRule}
        </p>
        <p>
          <span className="font-semibold text-slate-300">Write rule:</span> {rules.writeRule}
        </p>
        <p className="pt-1">
          <span className="font-semibold text-slate-300">Exam tip:</span> Bell-LaPadula protects{' '}
          <span className="text-sky-300">confidentiality</span> (keep secrets from leaking down). Biba protects{' '}
          <span className="text-amber-300">integrity</span> (keep low-quality data from corrupting up) — their rules
          are mirror images of each other.
        </p>
      </div>
    </div>
  )
}
