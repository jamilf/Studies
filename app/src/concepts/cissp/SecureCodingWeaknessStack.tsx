import { useState } from 'react'

interface Tier {
  name: string
  score: number
  color: string
  text: string
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Out-of-Bounds Write / Memory Corruption',
    score: 100,
    color: 'bg-heat-6',
    text: 'text-paper',
    desc: 'Writing past the boundary of an allocated buffer — the classic root cause behind many remote code execution vulnerabilities in memory-unsafe languages like C and C++.',
  },
  {
    name: 'Injection (SQL, OS Command, LDAP)',
    score: 88,
    color: 'bg-heat-5',
    text: 'text-paper',
    desc: 'Untrusted input is concatenated into a command or query interpreter without proper parameterization, letting an attacker change the interpreter\'s intended logic entirely.',
  },
  {
    name: 'Improper Access Control',
    score: 76,
    color: 'bg-heat-4',
    text: 'text-paper',
    desc: 'The application fails to correctly enforce who can do what to which object — e.g., an authenticated user reaching another user\'s data by changing an ID in a request (insecure direct object reference).',
  },
  {
    name: 'Cross-Site Scripting (XSS)',
    score: 60,
    color: 'bg-heat-3',
    text: 'text-ink',
    desc: 'Untrusted input is rendered into a web page without proper output encoding, letting an attacker run arbitrary script in another user\'s browser session.',
  },
  {
    name: 'Improper Input Validation',
    score: 45,
    color: 'bg-heat-2',
    text: 'text-ink',
    desc: 'The application accepts data that doesn\'t match the expected type, length, format, or range — a root-cause weakness that enables many of the more specific flaws above.',
  },
  {
    name: 'Use of Hard-Coded Credentials',
    score: 30,
    color: 'bg-heat-1',
    text: 'text-ink',
    desc: 'A password, API key, or cryptographic key is embedded directly in source code or a config file, where it can be recovered from a repository, binary, or decompiled app.',
  },
]

export default function SecureCodingWeaknessStack() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Common Software Weakness Categories (CWE-style)</h3>
        <p className="text-sm text-soft">Domain 8.5 — click a category to see how it shows up at the source-code level.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${40 + (tier.score / 100) * 55}%` }}
            className={`text-left rounded-crisp py-2.5 px-4 transition-all duration-300 ${tier.color} ${tier.text} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.01]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <span className="font-semibold text-sm">{tier.name}</span>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This is a CWE-style view of source-code-level weaknesses — the root causes a static analysis tool or code
        review is hunting for — which is a different lens than the OWASP Top 10's web-application-risk categories:
        CWE catalogs the specific coding mistake, while OWASP ranks the resulting application-level risk.
      </div>
    </div>
  )
}
