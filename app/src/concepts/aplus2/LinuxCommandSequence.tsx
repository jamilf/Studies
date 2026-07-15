import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'ls', label: 'ls -la (list the contents of the suspect directory in detail)', correctIndex: 2, detail: 'Once du points at a directory, ls -la lists file sizes, permissions, and dates so you can spot the specific offending file.' },
  { id: 'rm', label: 'rm (or truncate) the identified file once it is confirmed safe to remove', correctIndex: 3, detail: 'Only after confirming the file is safe to delete — e.g. a rotated log or old core dump — do you actually remove or truncate it.' },
  { id: 'df', label: 'df -h (check overall disk usage per mounted filesystem)', correctIndex: 0, detail: 'df -h shows which mounted filesystem is actually full, in human-readable sizes — the first thing to check before digging into any one directory.' },
  { id: 'du', label: 'du -sh * (see which subdirectory is consuming the most space)', correctIndex: 1, detail: 'Run from the full filesystem you identified (often /var), du -sh * summarizes the size of each subdirectory so you know where to look next.' },
]

export default function LinuxCommandSequence() {
  const [order, setOrder] = useState<string[]>(['ls', 'rm', 'df', 'du'])
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
    () => order.every((id, i) => ITEMS.find((it) => it.id === id)!.correctIndex === i),
    [order],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Linux Disk-Full Troubleshooting Sequence</h3>
        <p className="text-sm text-soft">
          Domain 1.7 — a Linux workstation is nearly out of disk space. Use the arrows to put these commands in
          the order you'd actually run them, then check.
        </p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const it = ITEMS.find((x) => x.id === id)!
          return (
            <div key={id} className="flex items-center gap-2 rounded-crisp border border-line bg-surface px-3 py-2">
              <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
              <span className="flex-1 text-sm text-ink font-mono">{it.label}</span>
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
                  {'↑'}
                </button>
                <button
                  onClick={() => move(id, 1)}
                  disabled={i === order.length - 1}
                  className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30"
                >
                  {'↓'}
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
          {isCorrect ? 'Correct order!' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      {checked && (
        <div className="space-y-2">
          {order.map((id) => {
            const it = ITEMS.find((x) => x.id === id)!
            return (
              <p key={id} className="text-xs text-soft leading-relaxed">
                <span className="font-mono text-ink">{it.label.split(' (')[0]}</span> — {it.detail}
              </p>
            )
          })}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: the Linux objectives test recognition of common commands (ls, pwd, mv, cp, rm, chmod, chown,
        df, du, grep, ps, top/kill) more than memorized flags — focus on what each command is for and in what
        order a rational technician would reach for it.
      </div>
    </div>
  )
}
