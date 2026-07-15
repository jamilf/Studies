import { useState } from 'react'

interface Tier {
  rank: string
  name: string
  detail: string
}

const TIERS: Tier[] = [
  { rank: 'A01', name: 'Broken Access Control', detail: 'Restrictions on what authenticated users are allowed to do aren\'t enforced — e.g., URL parameter tampering to view another user\'s data.' },
  { rank: 'A02', name: 'Cryptographic Failures', detail: 'Cleartext transmission, weak or outdated algorithms, and hard-coded keys — formerly called "Sensitive Data Exposure."' },
  { rank: 'A03', name: 'Injection', detail: 'Untrusted data sent to an interpreter — SQL injection, OS command injection, LDAP injection.' },
  { rank: 'A04', name: 'Insecure Design', detail: 'Missing or ineffective security controls baked into the architecture itself — not fixable by better coding alone.' },
  { rank: 'A05', name: 'Security Misconfiguration', detail: 'Insecure defaults, open cloud storage, verbose errors, and unnecessary features left enabled.' },
  { rank: 'A06', name: 'Vulnerable and Outdated Components', detail: 'Using libraries or frameworks with known vulnerabilities, or that are no longer supported.' },
]

const COLOR = ['bg-heat-6', 'bg-heat-5', 'bg-heat-4', 'bg-heat-3', 'bg-heat-2', 'bg-heat-1']
const TEXT = ['text-paper', 'text-paper', 'text-paper', 'text-ink', 'text-ink', 'text-ink']

export default function Owasp10Ladder() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">OWASP Top 10 (2021) — Leading Categories</h3>
        <p className="text-sm text-soft">Domain 8.5 — click a category to see how it manifests in real applications.</p>
      </div>

      <div className="flex flex-col gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.rank}
            onClick={() => setSelected(i)}
            className={`w-full text-left rounded-crisp px-4 py-2 transition-all duration-200 ${COLOR[i]} ${TEXT[i]} ${
              selected === i ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.01]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold opacity-80">{tier.rank}</span>
              <span className="font-semibold text-sm">{tier.name}</span>
            </div>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This is the real, official 2021 OWASP Top 10 ranking (top 6 of 10 shown), tying directly into Domain 8.5's
        secure coding standards.
      </div>
    </div>
  )
}
