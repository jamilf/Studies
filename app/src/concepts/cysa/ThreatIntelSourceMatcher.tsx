import { useState } from 'react'

interface SourceCard {
  front: string
  back: string
}

const SOURCES: SourceCard[] = [
  {
    front: 'OSINT',
    back: 'Open-source intelligence pulled from public data — social media, news, blogs, paste sites, DNS/WHOIS records, and published research. Free and broad, but confidence varies and every indicator needs validation before it drives a response.',
  },
  {
    front: 'Closed-Source / Commercial Feeds',
    back: 'Paid threat-intel platforms that aggregate curated, often exclusive indicators and analyst write-ups. Faster and higher-confidence than open sources, at the cost of licensing fees and vendor lock-in.',
  },
  {
    front: 'ISACs / ISAOs',
    back: 'Information Sharing and Analysis Centers/Organizations — sector-specific trust communities (FS-ISAC, H-ISAC, MS-ISAC) that share sanitized indicators and warnings among peer organizations in the same industry.',
  },
  {
    front: 'Internal Telemetry',
    back: 'Intelligence generated from your own environment — SIEM alerts, EDR detections, honeypot captures, and prior incident data. Highly relevant to your specific attack surface, but limited to threats you have already encountered.',
  },
  {
    front: 'Dark Web Monitoring',
    back: 'Tracking underground marketplaces, breach forums, and closed chat channels for leaked credentials, exploit chatter, and attack planning. Can provide early warning of a targeted campaign, but access and source verification are difficult.',
  },
  {
    front: 'Government / Public-Sector Feeds',
    back: 'Advisories and indicator bulletins published by agencies such as CISA. Authoritative and free, and often tied to known-exploited vulnerabilities, though sometimes slower to publish than commercial feeds.',
  },
]

export default function ThreatIntelSourceMatcher() {
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
        <h3 className="font-display text-lg text-ink">Threat Intelligence Source Matcher</h3>
        <p className="text-sm text-soft">Domain 1.4 — click a card to reveal what each threat-intel source is best (and worst) for.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {SOURCES.map((c, i) => (
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
        No single source is sufficient. Mature SOCs blend fast, broad OSINT with high-confidence commercial feeds,
        sector context from an ISAC, and their own internal telemetry — then correlate all of it before treating an
        indicator as actionable.
      </div>
    </div>
  )
}
