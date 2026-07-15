import { useState } from 'react'

interface Step {
  rank: number
  title: string
  detail: string
}

const STEPS: Step[] = [
  {
    rank: 1,
    title: 'Reseat the RAM modules',
    detail: 'Free and takes seconds. Loose or oxidized memory contacts are the single most common cause of no-POST/random-reboot symptoms — always eliminate this first.',
  },
  {
    rank: 2,
    title: 'Reseat power connectors',
    detail: 'Firmly reconnect the 24-pin motherboard connector and the 4/8-pin CPU power connector. A connector that walked loose during shipping or a case move causes intermittent power-related instability.',
  },
  {
    rank: 3,
    title: 'Test one known-good RAM stick at a time',
    detail: 'If reseating didn\'t fix it, isolate a bad stick or slot by booting with a single module, then rotating through slots and modules.',
  },
  {
    rank: 4,
    title: 'Check CPU cooler seating and thermal paste',
    detail: 'A cooler that lost contact (or paste that dried out) causes thermal shutdown under load — reboots that happen only after the system warms up point here.',
  },
  {
    rank: 5,
    title: 'Swap in a known-good PSU',
    detail: 'A failing power supply can pass a basic power-on test but still sag or cut out under load. Swapping the whole unit is the only reliable way to rule it out.',
  },
  {
    rank: 6,
    title: 'Replace the motherboard',
    detail: 'The most expensive and time-consuming step, reserved for when every cheaper, faster test above has already ruled out RAM, power, cooling, and the PSU.',
  },
]

const HEAT_CLASS = ['bg-heat-6', 'bg-heat-5', 'bg-heat-4', 'bg-heat-3', 'bg-heat-2', 'bg-heat-1']
const TEXT_CLASS = ['text-paper', 'text-paper', 'text-paper', 'text-ink', 'text-ink', 'text-ink']

export default function ComponentSwapTestOrder() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Component Swap-Test Order</h3>
        <p className="text-sm text-soft">
          Domain 5.2 — for an unstable, no-POST, or randomly rebooting system, work from cheapest/fastest test down
          to most invasive.
        </p>
      </div>

      <div className="space-y-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s.rank}
            onClick={() => setActive(i)}
            className="flex items-center gap-3 w-full text-left"
            style={{ paddingRight: `${i * 8}%` }}
          >
            <span className="font-mono text-xs text-faint w-4">{s.rank}</span>
            <span
              className={`flex-1 rounded-crisp px-3 py-2 text-sm font-medium transition-all ${HEAT_CLASS[i]} ${TEXT_CLASS[i]} ${
                i === active ? 'ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''
              }`}
            >
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">
          {step.rank}. {step.title}
        </h4>
        <p className="text-sm text-soft leading-relaxed">{step.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This ordering follows the troubleshooting-methodology principle of testing the most probable, least
        destructive cause first. It's tempting to jump straight to "replace the motherboard," but the exam rewards
        ruling out RAM, power, and cooling — all quick and free — before touching anything that costs money or time.
      </div>
    </div>
  )
}
