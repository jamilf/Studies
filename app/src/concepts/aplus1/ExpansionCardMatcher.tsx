import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Video/Graphics Card',
    back: 'A dedicated GPU installed in the primary PCIe x16 slot, handling rendering independently of (or far faster than) the CPU\'s integrated graphics — essential for gaming, 3D rendering, and GPU-accelerated workloads.',
  },
  {
    front: 'Sound Card',
    back: 'Adds dedicated audio processing separate from the motherboard\'s onboard audio chip, typically for lower noise floor, higher-fidelity output, or additional input/output jacks that onboard audio doesn\'t provide.',
  },
  {
    front: 'Capture Card',
    back: 'Ingests an external video signal (HDMI/SDI from a camera, console, or another PC) into the system so it can be recorded or streamed live — the card doesn\'t generate video, it captures it.',
  },
  {
    front: 'NIC (Network Interface Card)',
    back: 'Adds or upgrades network connectivity — a wired Gigabit/10-Gigabit Ethernet card, or a Wi-Fi/Bluetooth card, on a system whose onboard networking is missing, damaged, or not fast enough.',
  },
  {
    front: 'RAID Controller Card',
    back: 'Offloads RAID calculations (especially parity math for RAID 5/6) from the CPU to dedicated hardware, and lets more physical drives be connected than the motherboard\'s onboard SATA/SAS ports support.',
  },
  {
    front: 'TV Tuner Card',
    back: 'Receives broadcast or cable television signals and converts them into a stream the PC can display or record — used to turn a PC into a DVR.',
  },
]

export default function ExpansionCardMatcher() {
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
        <h3 className="font-display text-lg text-ink">Expansion / Add-On Card Types</h3>
        <p className="text-sm text-soft">
          Domain 3.4 — click a card to flip between the add-on card and the job it does.
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
        All of these seat in a PCIe expansion slot — the exam wants you to match the symptom to the card: no
        camera/console feed appearing means check the capture card, choppy or silent audio points at the sound card
        or its drivers, and a degraded RAID array points at the RAID controller before the drives themselves.
      </div>
    </div>
  )
}
