import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Docking Station',
    back: 'Sits under or beside the laptop and replicates a full desktop I/O set — multiple video outputs, Ethernet, USB, and often laptop charging — through one cable or connector. Many also add extra processing (USB-attached GPU/audio) beyond simple pass-through.',
  },
  {
    front: 'Port Replicator',
    back: 'A simpler, cheaper cousin of the docking station: extends the laptop\'s existing ports (USB, video, Ethernet) through one connection, but doesn\'t add new capability the laptop didn\'t already have.',
  },
  {
    front: 'External Trackpad',
    back: 'A standalone pointing surface (USB or Bluetooth) used in place of, or alongside, a laptop\'s built-in trackpad — common when a laptop is docked and used closed ("clamshell mode") with an external monitor and keyboard.',
  },
  {
    front: 'Stylus / Digitizer Pen',
    back: 'Works with a digitizer layer built into the screen to sense pressure and tilt for precise input — used for note-taking, sketching, and signature capture on 2-in-1s and drawing tablets. Active styluses have their own electronics/battery; passive ones don\'t.',
  },
  {
    front: 'Rugged Case',
    back: 'A reinforced, often MIL-SPEC-rated enclosure that adds shock, drop, dust, and moisture protection for mobile devices used in field service, warehouse, or industrial environments.',
  },
  {
    front: 'Mobile Card Reader / Barcode Scanner Sled',
    back: 'Clips onto or plugs into a smartphone or tablet to add point-of-sale hardware — a magstripe/chip card reader or a laser/camera barcode scanner — turning a consumer device into a mobile checkout or inventory terminal.',
  },
]

export default function MobileAccessoriesMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Mobile Device Accessories</h3>
        <p className="text-sm text-soft">
          Domain 1.3 — click a card to flip between the accessory and what it's actually for.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[120px] transition-colors ${
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
        The exam-writer distinction to remember: a docking station can add capability the laptop's own ports don't
        have (extra video outputs, USB-attached graphics), while a port replicator only extends the ports that were
        already there.
      </div>
    </div>
  )
}
