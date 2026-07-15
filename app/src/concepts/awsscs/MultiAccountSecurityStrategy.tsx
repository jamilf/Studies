import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  {
    id: 'org',
    label: 'Create the organization and enable Service Control Policies',
    correctIndex: 0,
    detail: 'AWS Organizations is the foundation everything else attaches to — no OU or SCP can exist before this.',
  },
  {
    id: 'security-accounts',
    label: 'Create dedicated Log Archive and Security Tooling (Audit) accounts',
    correctIndex: 1,
    detail: 'A place for immutable logs and a delegated home for GuardDuty/Security Hub/Config must exist before you generate anything worth logging.',
  },
  {
    id: 'delegate',
    label: 'Delegate administration of security services to the Security Tooling account',
    correctIndex: 2,
    detail: 'Delegated administrator gives the security team an org-wide view from one account instead of needing standing access into every workload account.',
  },
  {
    id: 'ous',
    label: 'Organize workload accounts into OUs by environment (prod / non-prod / sandbox)',
    correctIndex: 3,
    detail: 'Grouping accounts by environment lets guardrails and SCPs apply consistently — e.g. only the prod OU forbids disabling encryption.',
  },
  {
    id: 'guardrails',
    label: 'Apply Control Tower guardrails and SCPs per OU',
    correctIndex: 4,
    detail: 'Once the OU structure exists, preventive and detective guardrails are attached at the OU level so every account within it inherits them automatically.',
  },
  {
    id: 'provision',
    label: 'Provision individual workload accounts via Account Factory as teams need them',
    correctIndex: 5,
    detail: 'New accounts are the last step, not the first — each one is born already inside the right OU with the right guardrails and baseline applied.',
  },
]

const SCRAMBLED_IDS = ['delegate', 'provision', 'org', 'guardrails', 'security-accounts', 'ous']

export default function MultiAccountSecurityStrategy() {
  const [order, setOrder] = useState<string[]>(SCRAMBLED_IDS)
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

  const isCorrect = useMemo(() => order.every((id, i) => ITEMS.find((it) => it.id === id)!.correctIndex === i), [order])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Building a Multi-Account Security Strategy</h3>
        <p className="text-sm text-soft">Domain 6.1 — use the arrows to put these landing-zone steps in order, then check.</p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const it = ITEMS.find((x) => x.id === id)!
          return (
            <div key={id} className="flex items-center gap-2 rounded-crisp border border-line bg-surface px-3 py-2">
              <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
              <span className="flex-1 text-sm text-ink">{it.label}</span>
              {checked && (
                <span className={`text-xs font-semibold ${it.correctIndex === i ? 'text-good' : 'text-bad'}`}>
                  {it.correctIndex === i ? '✓' : '✗'}
                </span>
              )}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => move(id, -1)}
                  disabled={i === 0}
                  className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30"
                >
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
        <div
          className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${
            isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'
          }`}
        >
          {isCorrect
            ? 'Correct order! Governance and delegation come before any workload account is provisioned.'
            : 'Not quite — remember the organization and security accounts have to exist before OUs, guardrails, or new workload accounts can attach to anything.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A sound multi-account strategy is built top-down: governance (Organizations/SCPs) and centralized security
        tooling come first, structure (OUs and guardrails) second, and individual workload accounts last — each
        new account should inherit a secure baseline automatically rather than being hardened after the fact.
      </div>
    </div>
  )
}
