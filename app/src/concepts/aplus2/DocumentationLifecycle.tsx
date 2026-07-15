import { useState } from 'react'

interface DocType {
  name: string
  purpose: string
  detail: string
  color: string
}

const DOC_TYPES: DocType[] = [
  {
    name: 'Network topology diagram',
    purpose: 'Shows physical/logical layout',
    detail:
      'Maps every device, connection, and subnet on the network. Kept current so a technician can trace a cable or a broadcast domain without guessing — stale diagrams are worse than none because they mislead.',
    color: 'bg-heat-2 text-ink',
  },
  {
    name: 'Knowledge base / articles',
    purpose: 'Captures known fixes',
    detail:
      'Searchable record of past issues and their resolutions, so the next technician (or the same one, six months later) doesn\'t re-diagnose a solved problem from scratch.',
    color: 'bg-heat-3 text-ink',
  },
  {
    name: 'Incident/ticket documentation',
    purpose: 'Records what happened, step by step',
    detail:
      'Every ticket should capture the reported symptom, the diagnostic steps taken, the root cause, and the resolution — this is the raw material the knowledge base is built from.',
    color: 'bg-heat-4 text-paper',
  },
  {
    name: 'Standard Operating Procedures (SOPs)',
    purpose: 'Defines the approved way to do a task',
    detail:
      'Step-by-step instructions for routine, repeatable tasks (onboarding a new user, imaging a workstation) that ensure consistency regardless of which technician performs the work.',
    color: 'bg-heat-5 text-paper',
  },
  {
    name: 'Acceptable Use Policy (AUP)',
    purpose: 'Defines allowed use of company IT resources',
    detail:
      'A signed policy document defining what employees may and may not do with company systems — the reference point when a usage violation needs to be enforced or disputed.',
    color: 'bg-heat-6 text-paper',
  },
]

export default function DocumentationLifecycle() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">IT Documentation Types</h3>
        <p className="text-sm text-soft">
          Domain 4.2 — click each document type to see what it captures and why it's maintained.
        </p>
      </div>

      <div className="space-y-1.5">
        {DOC_TYPES.map((d, i) => (
          <button key={d.name} onClick={() => setSelected(selected === i ? null : i)} className="w-full text-left group">
            <div className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 h-7 w-7 rounded-full ${d.color} text-xs font-bold flex items-center justify-center font-mono`}
              >
                {i + 1}
              </span>
              <div
                className={`flex-1 rounded-crisp border px-3 py-2 transition-colors ${
                  selected === i ? 'border-accent bg-accent-tint' : 'border-line bg-wash group-hover:border-line-strong'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">{d.name}</span>
                  <span className="text-[11px] text-faint">{d.purpose}</span>
                </div>
              </div>
            </div>
            {selected === i && (
              <div className="ml-10 mt-1.5 mb-2 rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm text-soft animate-fadein">
                {d.detail}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Documentation isn't overhead — it's what lets an org survive staff turnover. The exam tests whether you know
        which document type answers a given question: "how is the network laid out" (topology diagram) vs. "how do I
        onboard a user" (SOP) vs. "what happened last time this broke" (ticket/knowledge base).
      </div>
    </div>
  )
}
