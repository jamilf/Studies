import { useMemo, useState } from 'react'

type Question = 'who-logged-in' | 'data-exfil' | 'firewall-rule-triggered' | 'dns-lookup'
type LogSource = 'firewall' | 'windows-security-event' | 'dns' | 'netflow'

const QUESTION_LABELS: Record<Question, string> = {
  'who-logged-in': 'Who logged into this server?',
  'data-exfil': 'Was data exfiltrated?',
  'firewall-rule-triggered': 'Did a firewall rule block/allow this traffic?',
  'dns-lookup': 'Did a host query a malicious domain?',
}

const SOURCE_LABELS: Record<LogSource, string> = {
  firewall: 'Firewall logs',
  'windows-security-event': 'Windows Security Event log',
  dns: 'DNS logs',
  netflow: 'NetFlow',
}

type Quality = 'strong' | 'partial' | 'weak'

const MATRIX: Record<Question, Record<LogSource, { quality: Quality; reason: string }>> = {
  'who-logged-in': {
    'windows-security-event': { quality: 'strong', reason: 'Event IDs 4624/4625 record every successful and failed logon directly.' },
    firewall: { quality: 'weak', reason: 'Firewall logs show connections, not OS-level authentication events.' },
    dns: { quality: 'weak', reason: 'DNS logs show name lookups, not who authenticated to a host.' },
    netflow: { quality: 'weak', reason: 'NetFlow shows traffic volume/flows, not identity.' },
  },
  'data-exfil': {
    netflow: { quality: 'strong', reason: 'Flow records reveal unusual data volume or flows to external IPs.' },
    dns: { quality: 'partial', reason: 'Can reveal DNS tunneling as an exfiltration channel, but not confirm volume.' },
    firewall: { quality: 'partial', reason: 'Shows allowed outbound connections, but not necessarily the data volume moved.' },
    'windows-security-event': { quality: 'weak', reason: 'Focused on local system/logon events, not network data movement.' },
  },
  'firewall-rule-triggered': {
    firewall: { quality: 'strong', reason: 'Firewall logs directly record which rule matched a given connection.' },
    netflow: { quality: 'partial', reason: 'Shows that traffic flowed, but not which rule allowed or blocked it.' },
    dns: { quality: 'weak', reason: 'DNS logs don\'t reflect firewall rule evaluation at all.' },
    'windows-security-event': { quality: 'weak', reason: 'Host-level events don\'t reflect network firewall decisions.' },
  },
  'dns-lookup': {
    dns: { quality: 'strong', reason: 'DNS logs directly record every domain name a host queried.' },
    netflow: { quality: 'partial', reason: 'Can show the resulting connection to the resolved IP, but not the query itself.' },
    firewall: { quality: 'partial', reason: 'May show the outbound connection, but not the domain name queried.' },
    'windows-security-event': { quality: 'weak', reason: 'Not focused on network name resolution.' },
  },
}

const QUALITY_STYLE: Record<Quality, string> = {
  strong: 'border-good bg-good-tint text-good',
  partial: 'border-warn bg-warn-tint text-warn',
  weak: 'border-bad bg-bad-tint text-bad',
}

const QUALITY_LABEL: Record<Quality, string> = { strong: 'Strong match', partial: 'Partial match', weak: 'Weak match' }

export default function LogSourceSiemMatrix() {
  const [question, setQuestion] = useState<Question>('who-logged-in')
  const [source, setSource] = useState<LogSource>('windows-security-event')

  const result = useMemo(() => MATRIX[question][source], [question, source])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Log Source Fit for SIEM Questions</h3>
        <p className="text-sm text-soft">Domain 4.9 — pick a security question and a log source to see how well they match.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Question</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(QUESTION_LABELS) as Question[]).map((q) => (
              <button
                key={q}
                onClick={() => setQuestion(q)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  question === q ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {QUESTION_LABELS[q]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Log source</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(SOURCE_LABELS) as LogSource[]).map((s) => (
              <button
                key={s}
                onClick={() => setSource(s)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  source === s ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {SOURCE_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${question}-${source}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${QUALITY_STYLE[result.quality]}`}>
        <p className="font-display text-lg font-semibold">{QUALITY_LABEL[result.quality]}</p>
        <p className="text-sm text-ink mt-1">{result.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A SIEM correlates multiple log sources — no single source answers every question. Picking the right source
        for the right question is a core log-management and analysis skill on the exam.
      </div>
    </div>
  )
}
