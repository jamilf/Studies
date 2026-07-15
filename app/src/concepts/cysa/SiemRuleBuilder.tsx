import { useMemo, useState } from 'react'

interface Condition {
  id: string
  text: string
  verdict: 'trigger' | 'logOnly'
  reasoning: string
}

const CONDITIONS: Condition[] = [
  {
    id: 'brute-force',
    text: '5+ failed logins on one account within 1 minute',
    verdict: 'trigger',
    reasoning: 'Tight repetition in a short window is the signature of automated brute-forcing — low false-positive rate, high detection value.',
  },
  {
    id: 'single-fail',
    text: 'A single failed login attempt',
    verdict: 'logOnly',
    reasoning: 'Users mistype passwords constantly; alerting on every miss buries the SOC in noise for near-zero detection value — the classic alert-fatigue trap.',
  },
  {
    id: 'powershell-office',
    text: 'powershell.exe spawned as a child process of winword.exe',
    verdict: 'trigger',
    reasoning: 'Office apps spawning script interpreters is a well-known macro-malware / living-off-the-land pattern — rare in legitimate use, so it\'s a high-value, low-noise signal.',
  },
  {
    id: 'normal-login',
    text: 'Successful login from a known corporate IP during business hours',
    verdict: 'logOnly',
    reasoning: 'Matches expected baseline behavior; alerting on it is pure noise.',
  },
  {
    id: 'rdp-scheduled-task',
    text: 'New scheduled task created by SYSTEM immediately after an RDP logon from an unfamiliar external IP',
    verdict: 'trigger',
    reasoning: 'Chains an anomalous access vector with a persistence technique — exactly the kind of correlated, multi-signal condition correlation rules exist for.',
  },
]

export default function SiemRuleBuilder() {
  const [id, setId] = useState(CONDITIONS[0].id)
  const condition = useMemo(() => CONDITIONS.find((c) => c.id === id)!, [id])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">SIEM Correlation Rule Builder</h3>
        <p className="text-sm text-soft">
          Domain 1.2 — pick a logged condition and see whether it clears the bar for a correlation rule/alert.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        {CONDITIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setId(c.id)}
            className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
              id === c.id ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {c.text}
          </button>
        ))}
      </div>

      <div
        key={id}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${
          condition.verdict === 'trigger' ? 'border-good bg-good-tint' : 'border-warn bg-warn-tint'
        }`}
      >
        <p className={`font-display text-lg font-semibold ${condition.verdict === 'trigger' ? 'text-good' : 'text-warn'}`}>
          {condition.verdict === 'trigger' ? 'Trigger Alert' : 'Log Only — No Alert'}
        </p>
        <p className="text-sm text-ink mt-1">{condition.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Correlation rules should fire on conditions that are both rare in legitimate traffic and strongly indicative
        of malicious intent — the two axes that separate a useful rule from a noisy one.
      </div>
    </div>
  )
}
