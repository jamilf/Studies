import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'A', back: 'Maps a hostname to an IPv4 address. The most common record type.' },
  { front: 'AAAA', back: 'Maps a hostname to an IPv6 address.' },
  { front: 'CNAME', back: 'An alias pointing one hostname to another canonical hostname, which is then resolved in turn.' },
  { front: 'MX', back: 'Lists the mail servers responsible for a domain, each with a priority — lower numbers are tried first.' },
  { front: 'TXT', back: 'Holds arbitrary text data, commonly used for domain verification and email security (SPF, DKIM, DMARC records).' },
  { front: 'NS', back: 'Identifies the authoritative name servers for a zone.' },
  { front: 'PTR', back: 'Maps an IP address back to a hostname — a reverse lookup, stored in the in-addr.arpa (IPv4) or ip6.arpa (IPv6) zone.' },
  { front: 'SRV', back: 'Points to a specific service at a hostname, port, and priority/weight — e.g. locating an SIP or LDAP server.' },
]

export default function DnsRecordMatcher() {
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
        <h3 className="font-display text-lg text-ink">DNS Record Types</h3>
        <p className="text-sm text-soft">Domain 2.2 — click a card to flip between the record type and what it resolves.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-3 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-xs text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-mono text-xl font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A and AAAA answer "what is the address," CNAME answers "what other name should I look up instead," and
        MX/SRV/PTR/NS/TXT each answer a more specific operational question the exam expects you to recognize on sight.
      </div>
    </div>
  )
}
