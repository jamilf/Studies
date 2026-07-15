import { useMemo, useState } from 'react'

interface Item {
  id: string
  label: string
  correctIndex: number
  detail: string
}

const ITEMS: Item[] = [
  { id: 'connect', label: 'Endpoint connects to a switch port; port allows only EAPOL traffic (unauthorized state)', correctIndex: 0, detail: 'Until authentication succeeds, the switch port is held in an unauthorized state — no regular network traffic is forwarded.' },
  { id: 'reqid', label: 'Authenticator (switch/AP) sends EAP-Request Identity', correctIndex: 1, detail: 'The authenticator prompts the connecting device to identify itself before anything else happens.' },
  { id: 'respid', label: 'Supplicant replies with EAP-Response Identity', correctIndex: 2, detail: 'The endpoint (supplicant) sends its identity — typically a certificate or username tied to 802.1X.' },
  { id: 'radius', label: 'Authenticator forwards the identity to the RADIUS server via EAP over RADIUS', correctIndex: 3, detail: 'The switch itself never validates credentials — it relays the exchange to a backend Authentication Server (RADIUS).' },
  { id: 'accept', label: 'RADIUS validates credentials and returns Access-Accept (or Access-Reject)', correctIndex: 4, detail: 'The authentication server makes the actual access decision, optionally including attributes like which VLAN to assign.' },
  { id: 'authorize', label: 'Authenticator transitions the port to authorized state, granting network access', correctIndex: 5, detail: 'Only after a positive decision does the switch open the port for normal traffic — often onto a VLAN specified by RADIUS.' },
]

const SCRAMBLED: string[] = ['radius', 'connect', 'accept', 'respid', 'authorize', 'reqid']

export default function NetworkAccessControl8021X() {
  const [order, setOrder] = useState<string[]>(SCRAMBLED)
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

  const isCorrect = useMemo(() => order.every((id, i) => ITEMS.find((it) => it.id === id)!.correctIndex === i), [order])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">802.1X Port-Based NAC Sequence</h3>
        <p className="text-sm text-soft">Domain 4.2 — use the arrows to put the 802.1X authentication handshake in order, then check.</p>
      </div>

      <div className="space-y-1.5">
        {order.map((id, i) => {
          const it = ITEMS.find((x) => x.id === id)!
          return (
            <div key={id} className="flex items-center gap-2 rounded-crisp border border-line bg-surface px-3 py-2">
              <span className="font-mono text-xs text-faint w-5">{i + 1}.</span>
              <span className="flex-1 text-sm text-ink">{it.label}</span>
              {checked && <span className={`text-xs font-semibold ${it.correctIndex === i ? 'text-good' : 'text-bad'}`}>{it.correctIndex === i ? '✓' : '✗'}</span>}
              <div className="flex flex-col gap-0.5">
                <button onClick={() => move(id, -1)} disabled={i === 0} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↑</button>
                <button onClick={() => move(id, 1)} disabled={i === order.length - 1} className="rounded-crisp border border-line px-1.5 text-xs text-soft hover:text-ink disabled:opacity-30">↓</button>
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={() => setChecked(true)} className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors">
        Check order
      </button>

      {checked && (
        <div className={`rounded-crisp border-l-2 px-4 py-3 animate-fadein ${isCorrect ? 'border-good bg-good-tint text-good' : 'border-warn bg-warn-tint text-warn'}`}>
          {isCorrect ? 'Correct — that is the full 802.1X handshake.' : 'Not quite — the switch never validates credentials itself, and the port stays closed until RADIUS responds.'}
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        802.1X defines three roles: the supplicant (endpoint), the authenticator (switch or wireless AP, which never
        makes the access decision itself), and the authentication server (RADIUS). This is the mechanism most
        enterprise NAC deployments use to keep unauthenticated devices off the production network entirely, rather
        than admitting them and detecting problems afterward.
      </div>
    </div>
  )
}
