import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'SIEM',
    back: 'Security Information and Event Management — aggregates and correlates logs from across the enterprise in near real time and raises alerts. The central place analysts look for correlated evidence of an incident.',
  },
  {
    front: 'SOAR',
    back: 'Security Orchestration, Automation, and Response — takes alerts (often from a SIEM) and runs automated playbooks, like auto-isolating a host or opening a ticket, to speed up and standardize response.',
  },
  {
    front: 'EDR',
    back: 'Endpoint Detection and Response — an agent on each endpoint that watches process, file, and network behavior, detects malicious activity, and lets responders isolate or remediate that one host.',
  },
  {
    front: 'XDR',
    back: 'Extended Detection and Response — extends EDR-style endpoint telemetry with network, email, and cloud data into one correlated detection and response platform.',
  },
  {
    front: 'DLP',
    back: 'Data Loss Prevention — inspects data in use, in motion, and at rest for sensitive patterns (PII, PCI data) and blocks or flags unauthorized transfer out of the organization.',
  },
  {
    front: 'NAC',
    back: "Network Access Control — evaluates a device's identity and posture (patched, has AV, domain-joined) before allowing it onto the network, and can quarantine devices that fail the check.",
  },
]

export default function MonitoringToolMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Alerting & Monitoring Tool Matcher</h3>
        <p className="text-sm text-soft">
          Domain 4.4 — click a card to flip between the acronym and what the tool actually does.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[120px] transition-colors ${
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
        These tools stack, they don't compete: EDR/XDR and DLP generate telemetry, a SIEM correlates it into alerts,
        and SOAR automates the response — while NAC decides who gets on the network in the first place.
      </div>
    </div>
  )
}
