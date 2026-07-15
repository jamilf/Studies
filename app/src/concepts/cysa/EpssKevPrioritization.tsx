import { useMemo, useState } from 'react'

interface Vuln {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const VULNS: Vuln[] = [
  {
    id: 'z',
    label: 'CVE-2024-1001 — CVSS 9.8, EPSS 2%, not in KEV, no known exploitation',
    correctIndex: 2,
    detail: 'Severe if exploited, but nothing suggests anyone is actually trying. High CVSS alone does not put this ahead of vulnerabilities under active attack.',
  },
  {
    id: 'b',
    label: 'CVE-2024-1002 — CVSS 6.5, EPSS 94%, in CISA KEV, actively exploited',
    correctIndex: 0,
    detail: 'Moderate CVSS, but a near-certain exploitation probability and confirmed active exploitation in the wild. This gets patched first regardless of its base score.',
  },
  {
    id: 'w',
    label: 'CVE-2024-1003 — CVSS 5.0, EPSS 1%, not in KEV',
    correctIndex: 3,
    detail: 'Low severity and low likelihood of exploitation. Fine to leave in the routine patch cycle.',
  },
  {
    id: 'c',
    label: 'CVE-2024-1004 — CVSS 8.1, EPSS 55%, in CISA KEV',
    correctIndex: 1,
    detail: 'High severity and a real, elevated exploitation probability confirmed by KEV listing — a close second to the actively-exploited critical.',
  },
]

const SCRAMBLED = ['z', 'c', 'w', 'b']

export default function EpssKevPrioritization() {
  const [order, setOrder] = useState<string[]>(SCRAMBLED)
  const [checked, setChecked] = useState(false)

  const move = (id: string, dir: -1 | 1) => {
    setChecked(false)
    setOrder((cur) => {
      const idx = cur.indexOf(id)
      const swapIdx = idx + dir
      if (swapIdx < 0 || swapIdx >= cur.length) return cur
      const next = [...cur]
      ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
      return next
    })
  }

  const isCorrect = useMemo(
    () => order.every((id, i) => VULNS.find((v) => v.id === id)!.correctIndex === i),
    [order],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Prioritizing Beyond CVSS: EPSS &amp; KEV</h3>
        <p className="text-sm text-soft">Domain 2.3 — use the arrows to rank these findings from highest to lowest real-world remediation priority, then check.</p>
      </div>
      <div className="space-y-1.5">
        {order.map((id, i) => {
          const v = VULNS.find((x) => x.id === id)!
          return (
            <div key={id} className="flex items-center gap-2 rounded-crisp border border-line bg-surface px-3 py-2">
              <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
              <span className="flex-1 text-sm text-ink">{v.label}</span>
              {checked && (
                <span className={`text-xs font-semibold ${v.correctIndex === i ? 'text-good' : 'text-bad'}`}>
                  {v.correctIndex === i ? '✓' : '✗'}
                </span>
              )}
              <div className="flex flex-col gap-0.5">
                <button onClick={() => move(id, -1)} disabled={i === 0} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">
                  ↑
                </button>
                <button
                  onClick={() => move(id, 1)}
                  disabled={i === order.length - 1}
                  className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => setChecked(true)}
        className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
      >
        Check order
      </button>
      {checked && (
        <div className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'}`}>
          {isCorrect ? 'Correct — exploitation evidence beat raw CVSS score.' : 'Not quite — remember that active exploitation (KEV) and a high EPSS probability can outrank a higher CVSS score with no known exploitation.'}
        </div>
      )}
      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        CVSS measures potential severity if exploited; EPSS estimates the probability of exploitation in the next 30
        days; KEV confirms exploitation is already happening. CS0-003 expects you to combine all three — not rank by
        CVSS alone — when prioritizing a vulnerability backlog.
      </div>
    </div>
  )
}
