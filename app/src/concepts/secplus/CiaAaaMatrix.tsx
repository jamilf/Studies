import { useMemo, useState } from 'react'

type Cia = 'confidentiality' | 'integrity' | 'availability'
type Aaa = 'authentication' | 'authorization' | 'accounting'

const CIA_INFO: Record<Cia, { label: string; goal: string; example: string }> = {
  confidentiality: {
    label: 'Confidentiality',
    goal: 'Preventing unauthorized disclosure of data (encryption, ACLs, need-to-know).',
    example: 'Full-disk / at-rest encryption',
  },
  integrity: {
    label: 'Integrity',
    goal: 'Preventing unauthorized or undetected modification of data (hashing, digital signatures, checksums).',
    example: 'File integrity monitoring / checksums',
  },
  availability: {
    label: 'Availability',
    goal: 'Ensuring authorized access when needed (redundancy, backups, DDoS mitigation).',
    example: 'RAID, backups, load balancing',
  },
}

const AAA_INFO: Record<Aaa, { label: string; role: string }> = {
  authentication: { label: 'Authentication', role: 'Proving identity — passwords, MFA, biometrics, certificates.' },
  authorization: { label: 'Authorization', role: 'What an authenticated identity is permitted to do — RBAC, ACLs, least privilege.' },
  accounting: { label: 'Accounting', role: 'Logging what was done, by whom, and when — audit logs, SIEM, non-repudiation.' },
}

export default function CiaAaaMatrix() {
  const [cia, setCia] = useState<Cia>('confidentiality')
  const [aaa, setAaa] = useState<Aaa>('authentication')

  const relation = useMemo(
    () => `CIA defines *what* you're protecting (${CIA_INFO[cia].label.toLowerCase()}); AAA defines *how* you control and track access to it (${AAA_INFO[aaa].label.toLowerCase()}).`,
    [cia, aaa],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">CIA Triad × AAA Framework</h3>
        <p className="text-sm text-soft">Domain 1.2 — pick a CIA element and an AAA element to see how the two frameworks relate.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">CIA element</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(CIA_INFO) as Cia[]).map((c) => (
              <button
                key={c}
                onClick={() => setCia(c)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  cia === c ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {CIA_INFO[c].label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">AAA element</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(AAA_INFO) as Aaa[]).map((a) => (
              <button
                key={a}
                onClick={() => setAaa(a)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  aaa === a ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {AAA_INFO[a].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${cia}-${aaa}`} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein space-y-2">
        <p className="text-sm text-ink"><span className="font-semibold">{CIA_INFO[cia].label}:</span> {CIA_INFO[cia].goal}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Example control:</span> {CIA_INFO[cia].example}</p>
        <p className="text-sm text-ink"><span className="font-semibold">{AAA_INFO[aaa].label}:</span> {AAA_INFO[aaa].role}</p>
        <p className="text-sm text-ink pt-1">{relation}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        CIA and AAA are independent axes, not a one-to-one mapping — MFA (an AAA authentication control) supports
        both confidentiality and integrity, not just one CIA goal.
      </div>
    </div>
  )
}
