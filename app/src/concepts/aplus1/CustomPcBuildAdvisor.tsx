import { useState } from 'react'

interface Spec {
  category: string
  gaming: string
  workstation: string
}

const SPECS: Spec[] = [
  { category: 'GPU', gaming: 'High-end consumer GPU (highest single priority) for maximum frame rate', workstation: 'Workstation-certified GPU (e.g. professional driver branch) prioritizing rendering accuracy and certified-app stability over frame rate' },
  { category: 'CPU', gaming: 'High single-core clock speed matters most for game engine performance', workstation: 'High core/thread count (many-core CPU) to accelerate CAD rendering, simulation, and multi-threaded exports' },
  { category: 'RAM', gaming: 'Typically 16-32 GB, tuned for speed', workstation: '32-64 GB or more, ECC memory often preferred to catch/correct data-corrupting bit errors during long renders' },
  { category: 'Storage', gaming: 'Fast NVMe SSD for quick game load times', workstation: 'Fast NVMe SSD plus redundant storage (RAID) so large project files survive a single drive failure' },
  { category: 'Display', gaming: 'High refresh rate prioritized over color accuracy', workstation: 'Color-accurate, factory-calibrated panel prioritized over refresh rate' },
]

export default function CustomPcBuildAdvisor() {
  const [highlighted, setHighlighted] = useState<string | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Custom PC Build: Gaming vs. CAD/Workstation</h3>
        <p className="text-sm text-soft">
          Domain 3.4 — click a spec category to see how a custom build's priorities shift between the two scenarios.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SPECS.map((s) => (
          <button
            key={s.category}
            onClick={() => setHighlighted(highlighted === s.category ? null : s.category)}
            className={`rounded-crisp border px-2.5 py-1 text-xs font-medium transition-colors ${
              highlighted === s.category ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {s.category}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/40 p-4 space-y-2">
          <p className="text-sm font-semibold text-accent">Gaming Rig</p>
          {SPECS.map((s) => (
            <div
              key={s.category}
              className={`rounded-crisp border px-3 py-2 transition-colors ${
                highlighted === s.category ? 'border-accent bg-surface' : 'border-line bg-wash'
              }`}
            >
              <p className="text-[11px] font-semibold text-ink">{s.category}</p>
              <p className="text-[11px] text-soft leading-snug">{s.gaming}</p>
            </div>
          ))}
        </div>

        <div className="rounded-crisp border border-good-line bg-good-tint/40 p-4 space-y-2">
          <p className="text-sm font-semibold text-good">CAD / Workstation Build</p>
          {SPECS.map((s) => (
            <div
              key={s.category}
              className={`rounded-crisp border px-3 py-2 transition-colors ${
                highlighted === s.category ? 'border-good bg-surface' : 'border-line bg-wash'
              }`}
            >
              <p className="text-[11px] font-semibold text-ink">{s.category}</p>
              <p className="text-[11px] text-soft leading-snug">{s.workstation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Both builds want "fast," but the exam wants you to match the bottleneck to the scenario: a gaming scenario
        keys on single-core speed and raw GPU frame rate, while a CAD/engineering or video-rendering scenario keys on
        core count, RAM capacity, and data integrity (ECC, RAID) over pure speed.
      </div>
    </div>
  )
}
