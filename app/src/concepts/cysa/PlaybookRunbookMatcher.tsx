import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'Incident Response Plan', back: 'The top-level policy document: defines what counts as an incident, the IR team\'s authority, roles, and the overall phases the organization follows.' },
  { front: 'Playbook', back: 'A scenario-specific decision guide (e.g., "Ransomware Playbook") that lays out the high-level workflow, decision points, and escalation criteria for one type of incident.' },
  { front: 'Runbook', back: 'The step-by-step technical procedure an analyst executes for one specific task (e.g., "isolate a host in the EDR console") — the how, not just the what.' },
  { front: 'Communication Plan', back: 'Defines who must be notified, through what channel, on what timeline, for each incident severity — keeps stakeholders informed without derailing the response.' },
  { front: 'Business Continuity Plan (BCP)', back: 'Describes how the business keeps critical functions running during a disruption — alternate processes, sites, and staffing, not just IT recovery.' },
  { front: 'Disaster Recovery Plan (DRP)', back: 'The technical plan for restoring IT systems and data after a disruption — backups, failover sites, and recovery time/point objectives (RTO/RPO).' },
]

export default function PlaybookRunbookMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number): void =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Playbook, Runbook & Friends</h3>
        <p className="text-sm text-soft">Domain 3.3 — click a card to flip between the term and what it actually means in an IR program.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-display text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Think of it as a hierarchy: the IR Plan sets policy, a playbook picks a strategy for a scenario, and a runbook
        gives the exact clicks — CS0-003 loves to test whether you can tell "what to do" (playbook) apart from
        "how to do it" (runbook).
      </div>
    </div>
  )
}
