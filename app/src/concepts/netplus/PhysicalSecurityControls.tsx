import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Access Control Vestibule',
    back: 'A small interlocking two-door chamber (also called a mantrap): the outer door must close and lock before the inner door can open, preventing tailgating and letting only one authenticated person through at a time.',
  },
  {
    front: 'Badge Reader',
    back: 'A proximity, smart-card, or magstripe reader that authenticates a physical credential at a door or rack; ties every entry event to a specific badge ID for an audit trail.',
  },
  {
    front: 'Biometric Lock',
    back: 'Uses a fingerprint, iris, or facial scan to authenticate identity for entry — something you ARE rather than something you HAVE, which is much harder to lend, lose, or clone than a badge.',
  },
  {
    front: 'CCTV / Camera System',
    back: 'Closed-circuit video surveillance that provides visual monitoring and a recorded log of who entered a space and when — a detective control, not a preventive one.',
  },
  {
    front: 'Asset Tags',
    back: 'Barcode, RFID, or serial-number labels affixed to hardware so equipment can be tracked, inventoried, and located — critical for noticing when a device has gone missing.',
  },
  {
    front: 'Locking Rack / Cabinet',
    back: 'A physically lockable enclosure around switches, routers, and patch panels that stops an intruder who has already reached the room from touching or unplugging equipment.',
  },
]

export default function PhysicalSecurityControls() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Physical Security Controls</h3>
        <p className="text-sm text-soft">
          Domain 4.2 — click a card to flip between the control's name and what it actually does.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-display text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Physical controls are the first layer of defense — no amount of firewall or ACL configuration matters if an
        attacker can simply walk up to a switch and plug in. Preventive controls (vestibules, locks, badges) stop
        entry; detective controls (cameras, asset tags) prove it happened.
      </div>
    </div>
  )
}
