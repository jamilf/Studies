import { useMemo, useState } from 'react'

interface FieldItem {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const FIELDS: FieldItem[] = [
  { id: 'protocol', label: 'protocol', correctIndex: 5, detail: 'The IANA protocol number of the traffic (6 = TCP, 17 = UDP).' },
  { id: 'srcaddr', label: 'srcaddr', correctIndex: 3, detail: 'The source IPv4 or IPv6 address of the traffic.' },
  { id: 'action', label: 'action', correctIndex: 6, detail: 'Whether the traffic was ACCEPTED or REJECTED by the security group or network ACL.' },
  { id: 'version', label: 'version', correctIndex: 0, detail: 'The VPC Flow Logs format version (2 by default, higher if custom fields were added).' },
  { id: 'dstport', label: 'dstport', correctIndex: 4, detail: 'The destination port of the traffic, e.g. 443 for HTTPS.' },
  { id: 'interface-id', label: 'interface-id', correctIndex: 2, detail: 'The ID of the elastic network interface the traffic passed through.' },
  { id: 'account-id', label: 'account-id', correctIndex: 1, detail: 'The AWS account ID that owns the source network interface.' },
]

const INITIAL_ORDER: string[] = ['protocol', 'srcaddr', 'action', 'version', 'dstport', 'interface-id', 'account-id']

export default function VpcFlowLogFieldOrder() {
  const [order, setOrder] = useState<string[]>(INITIAL_ORDER)
  const [checked, setChecked] = useState<boolean>(false)

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
    () => order.every((id, i) => FIELDS.find((f) => f.id === id)!.correctIndex === i),
    [order],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">VPC Flow Log Record: Field Order</h3>
        <p className="text-sm text-soft">
          Domain 2.3 — a representative subset of the default flow log record's fields, scrambled. Use the arrows
          to put them back in their real left-to-right order, then check.
        </p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const f = FIELDS.find((x) => x.id === id)!
          return (
            <div key={id} className="flex items-center gap-2 rounded-crisp border border-line bg-surface px-3 py-2">
              <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
              <span className="flex-1">
                <span className="font-mono text-sm text-ink">{f.label}</span>
                <span className="text-xs text-soft"> — {f.detail}</span>
              </span>
              {checked && (
                <span className={`text-xs font-semibold ${f.correctIndex === i ? 'text-good' : 'text-bad'}`}>
                  {f.correctIndex === i ? '✓' : '✗'}
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
          {isCorrect ? 'Correct — that matches the real default field order.' : 'Not quite the real order — try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The full default record has 14 fields (version, account-id, interface-id, srcaddr, dstaddr, srcport,
        dstport, protocol, packets, bytes, start, end, action, log-status); this exercise uses a representative
        subset. Knowing the shape of a flow log record — not memorizing every field — is what lets you read one
        under exam time pressure.
      </div>
    </div>
  )
}
