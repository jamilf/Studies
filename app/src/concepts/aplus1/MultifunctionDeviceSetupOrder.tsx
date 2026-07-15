import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'scan', label: 'Configure scan-to-email / scan-to-folder destinations', correctIndex: 4, detail: 'Scan destinations need a working network connection and, often, authenticated access to a mail server or share — done after connectivity and drivers are in place.' },
  { id: 'unbox', label: 'Unbox and remove shipping locks/tape from the print carriage', correctIndex: 0, detail: 'Most inkjet/laser MFDs ship with foam or tape holding the print head or toner cartridge stationary for transit — leaving it in place can damage the mechanism on first power-up.' },
  { id: 'test', label: 'Print a test page and run a test scan', correctIndex: 5, detail: 'The final verification step — confirms print quality, network scanning, and that every prior configuration step actually took effect.' },
  { id: 'network', label: 'Connect power and establish a network connection (Ethernet or Wi-Fi)', correctIndex: 1, detail: 'Done early because most later steps — driver discovery, scan destinations, firmware checks — depend on the device already being reachable on the network.' },
  { id: 'drivers', label: 'Install printer/scanner drivers on client machines or the print server', correctIndex: 2, detail: 'Drivers need the device to already be discoverable on the network (or its IP known) so the install wizard can find and bind to it.' },
  { id: 'consumables', label: 'Load paper and install ink/toner, then calibrate the print head', correctIndex: 3, detail: 'Calibration/alignment routines print physical test patterns, so paper and consumables have to be loaded first — and this is typically run right after the device is fully connected.' },
]

export default function MultifunctionDeviceSetupOrder() {
  const [order, setOrder] = useState(ITEMS.map((it) => it.id))
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
        <h3 className="font-display text-lg text-ink">Multifunction Device Setup Order</h3>
        <p className="text-sm text-soft">
          Domain 3.6 — use the arrows to put these deployment steps in order, then check your work.
        </p>
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
          {isCorrect ? 'Correct order!' : 'Not quite — check the arrows and try again.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Network and driver setup have to happen before scan destinations can be configured, and consumables/paper
        have to be loaded before any calibration routine can print its test pattern — the test page/scan is always
        last, confirming everything before it actually worked.
      </div>
    </div>
  )
}
