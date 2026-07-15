import { useMemo, useState } from 'react'

interface PortEntry {
  port: string
  protocol: string
  service: string
  transport: 'TCP' | 'UDP' | 'TCP/UDP'
}

const PORTS: PortEntry[] = [
  { port: '20/21', protocol: 'FTP', service: 'File Transfer Protocol (control/data)', transport: 'TCP' },
  { port: '22', protocol: 'SSH', service: 'Secure Shell — encrypted remote login', transport: 'TCP' },
  { port: '23', protocol: 'Telnet', service: 'Unencrypted remote login (legacy)', transport: 'TCP' },
  { port: '25', protocol: 'SMTP', service: 'Simple Mail Transfer Protocol — sending email', transport: 'TCP' },
  { port: '53', protocol: 'DNS', service: 'Domain Name System — name resolution', transport: 'TCP/UDP' },
  { port: '67/68', protocol: 'DHCP', service: 'Dynamic Host Configuration Protocol — IP leasing', transport: 'UDP' },
  { port: '80', protocol: 'HTTP', service: 'Hypertext Transfer Protocol — unencrypted web', transport: 'TCP' },
  { port: '110', protocol: 'POP3', service: 'Post Office Protocol v3 — download-and-delete email', transport: 'TCP' },
  { port: '143', protocol: 'IMAP', service: 'Internet Message Access Protocol — synced email', transport: 'TCP' },
  { port: '161/162', protocol: 'SNMP', service: 'Simple Network Management Protocol — device monitoring', transport: 'UDP' },
  { port: '389', protocol: 'LDAP', service: 'Lightweight Directory Access Protocol — directory lookups', transport: 'TCP' },
  { port: '443', protocol: 'HTTPS', service: 'HTTP over TLS — encrypted web', transport: 'TCP' },
  { port: '445', protocol: 'SMB', service: 'Server Message Block — Windows file/printer sharing', transport: 'TCP' },
  { port: '3389', protocol: 'RDP', service: 'Remote Desktop Protocol', transport: 'TCP' },
]

export default function PortsProtocolsMatcher() {
  const [portIdx, setPortIdx] = useState(0)
  const [guessProtocol, setGuessProtocol] = useState<string | null>(null)

  const correct = PORTS[portIdx]
  const isCorrect = guessProtocol === correct.protocol

  const guessOptions = useMemo(() => {
    const otherProtocols = PORTS.map((p) => p.protocol).filter((proto) => proto !== correct.protocol)
    // Deterministically pick 3 distractors by rotating through the list based on the chosen port,
    // so the wrong-answer set varies per port without re-shuffling on every render.
    const distractors = [0, 1, 2].map((offset) => otherProtocols[(portIdx * 3 + offset * 5) % otherProtocols.length])
    const uniqueDistractors = Array.from(new Set(distractors)).slice(0, 3)
    const options = [...uniqueDistractors, correct.protocol]
    // Rotate the array based on portIdx so the correct answer isn't always last.
    const rotateBy = portIdx % options.length
    return [...options.slice(rotateBy), ...options.slice(0, rotateBy)]
  }, [portIdx, correct.protocol])

  function pickPort(i: number) {
    setPortIdx(i)
    setGuessProtocol(null)
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Common Ports & Protocols Matcher</h3>
        <p className="text-sm text-soft">
          Domain 2.6 — pick a port number, then pick the protocol you think it maps to.
        </p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">1. Choose a port</p>
        <div className="flex flex-wrap gap-1.5">
          {PORTS.map((p, i) => (
            <button
              key={p.port}
              onClick={() => pickPort(i)}
              className={`rounded-crisp border px-2.5 py-1 text-xs font-mono transition-colors ${
                portIdx === i ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {p.port}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">2. Which protocol/service is this?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {guessOptions.map((proto) => (
            <button
              key={proto}
              onClick={() => setGuessProtocol(proto)}
              className={`rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                guessProtocol === proto ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {proto}
            </button>
          ))}
        </div>
      </div>

      {guessProtocol && (
        <div
          key={`${portIdx}-${guessProtocol}`}
          className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${
            isCorrect ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
          }`}
        >
          <p className={`font-display text-xl font-semibold mb-1 ${isCorrect ? 'text-good' : 'text-bad'}`}>
            {isCorrect ? 'Correct' : 'Not quite'}
          </p>
          <p className="text-sm text-ink">
            Port <span className="font-mono">{correct.port}</span> ({correct.transport}) is{' '}
            <span className="font-semibold">{correct.protocol}</span> — {correct.service}.
          </p>
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Watch the transport column on the exam: DNS and SNMP lean UDP for speed (small, connectionless queries), while
        anything that needs a guaranteed, ordered stream — FTP, SSH, HTTP(S), SMB, RDP — uses TCP. DHCP is UDP because
        a client doesn't have an IP (and therefore can't hold a TCP session) yet when it broadcasts for one.
      </div>
    </div>
  )
}
