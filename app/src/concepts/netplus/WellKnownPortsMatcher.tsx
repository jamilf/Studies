import { useState } from 'react'

interface PortCard {
  port: string
  service: string
  detail: string
}

const CARDS: PortCard[] = [
  { port: '20 / 21', service: 'FTP', detail: 'File Transfer Protocol — 21 is the control channel, 20 is the active-mode data channel. Unencrypted.' },
  { port: '22', service: 'SSH', detail: 'Secure Shell — encrypted remote CLI access; also carries SFTP and SCP file transfers.' },
  { port: '23', service: 'Telnet', detail: 'Remote CLI access with no encryption — credentials and commands travel in cleartext.' },
  { port: '25', service: 'SMTP', detail: 'Simple Mail Transfer Protocol — sends and relays outbound email between mail servers.' },
  { port: '53', service: 'DNS', detail: 'Domain Name System — UDP for standard queries, TCP for zone transfers and large responses.' },
  { port: '67 / 68', service: 'DHCP', detail: 'Dynamic Host Configuration Protocol — 67 is the server, 68 is the client.' },
  { port: '80', service: 'HTTP', detail: 'Hypertext Transfer Protocol — unencrypted web traffic.' },
  { port: '443', service: 'HTTPS', detail: 'HTTP wrapped in TLS — encrypted web traffic.' },
]

export default function WellKnownPortsMatcher() {
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
        <h3 className="font-display text-lg text-ink">Well-Known Port Numbers</h3>
        <p className="text-sm text-soft">Domain 1.4 — click a card to flip between the port number and the service it belongs to.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.port}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-3 py-4 min-h-[100px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <div className="animate-fadein">
                <p className="text-sm font-semibold text-ink mb-1">{c.service}</p>
                <p className="text-xs text-ink leading-relaxed">{c.detail}</p>
              </div>
            ) : (
              <p className="font-mono text-xl font-semibold text-ink animate-fadein">{c.port}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Memorizing port-to-service pairs (and which ones are encrypted vs cleartext) is one of the highest-yield
        drills for the exam — ports like 22/23, 80/443, and 67/68 are frequently tested in pairs.
      </div>
    </div>
  )
}
