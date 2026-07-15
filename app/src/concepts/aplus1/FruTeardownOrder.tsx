import { useEffect, useState } from 'react'

interface Step {
  title: string
  tool: string
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Power down & remove battery',
    tool: 'Fingers / T5-T8 screwdriver',
    detail:
      'Shut down, unplug the AC adapter, and remove (or disconnect) the battery first — every other step is live-electrical-risk until the battery is out of the circuit. On sealed units, disconnect the internal battery connector from the board instead.',
  },
  {
    title: 'Remove the access panel',
    tool: 'Phillips #0 screwdriver',
    detail:
      'The bottom cover is usually held by a mix of visible screws and a few hidden under rubber feet or the battery bay. Keep screws grouped by location — laptop screws are rarely all the same length.',
  },
  {
    title: 'Remove the keyboard',
    tool: 'Plastic spudger',
    detail:
      'Keyboards are typically held by a few screws underneath plus retaining clips, and connect to the board via a fragile ZIF ribbon cable. Flip the ZIF latch before pulling the ribbon — never yank it.',
  },
  {
    title: 'Remove RAM (SO-DIMM)',
    tool: 'Fingers',
    detail:
      "Spread the two retaining clips outward simultaneously; the module pops up at an angle, then slides straight out. This is usually the single easiest, most common laptop upgrade — it's why it's an early, exposed layer.",
  },
  {
    title: 'Remove storage (SSD/HDD)',
    tool: 'Phillips #0 screwdriver',
    detail:
      'A 2.5" SATA drive lifts out of a caddy; an M.2 NVMe drive is held flat by a single small screw at the far end. Wipe/encrypt-aware techs treat this step as the point of no return for data on the old drive.',
  },
  {
    title: 'Remove Wi-Fi/WWAN card',
    tool: 'Phillips #0 screwdriver, tweezers',
    detail:
      'An M.2 card seated in a slot near the hinge, secured by one screw with two thin coax antenna leads (black/white, main/aux) clipped onto it. Note the antenna positions before pulling — they are easy to mix up on reassembly.',
  },
  {
    title: 'Remove display assembly',
    tool: 'Phillips #0 screwdriver',
    detail:
      'Disconnect the eDP/LVDS video cable and Wi-Fi antenna leads routed through the hinge, then remove the hinge screws to free the whole lid as one FRU — the panel itself is rarely serviced separately.',
  },
  {
    title: 'Remove the motherboard',
    tool: 'Phillips #0 screwdriver, spudger',
    detail:
      'Last because everything else routes through or sits on top of it: fan/heatsink, speakers, touchpad cable, power button board, and I/O daughterboards all have to be disconnected first before the board lifts free.',
  },
]

export default function FruTeardownOrder() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1800)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Laptop FRU Teardown Order</h3>
          <p className="text-sm text-soft">Domain 1.1 — the field-replaceable-unit layers, outermost to innermost.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? 'bg-accent text-paper' : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
              <span
                className={`text-[10px] text-center leading-tight transition-colors hidden sm:block ${
                  i === active ? 'text-ink' : 'text-faint group-hover:text-soft'
                }`}
              >
                {s.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-crisp px-2 py-0.5 text-[11px] font-semibold bg-accent text-paper font-mono">
            Step {active + 1} of {STEPS.length}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-[11px] text-faint mb-2 font-mono">Tool: {STEPS[active].tool}</p>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The general rule: whatever is closest to the outside and cheapest/most-often-upgraded (battery, RAM, storage)
        comes off first, and whatever everything else depends on electrically (the motherboard) comes off last. Exact
        order varies by model, but the "onion layers" logic is consistent and is what the exam expects you to reason
        through.
      </div>
    </div>
  )
}
