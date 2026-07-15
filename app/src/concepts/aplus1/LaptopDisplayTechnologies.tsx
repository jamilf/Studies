import { useState } from 'react'

interface Panel {
  name: string
  fullName: string
  viewingAngle: number // 1-6 rating, higher is wider/better
  colorAccuracy: number // 1-6 rating, higher is more accurate
  blackLevel: number // 1-6 rating, higher is deeper/truer black
  responseTime: string
  typicalUse: string
  detail: string
}

const PANELS: Panel[] = [
  {
    name: 'TN',
    fullName: 'Twisted Nematic',
    viewingAngle: 1,
    colorAccuracy: 1,
    blackLevel: 2,
    responseTime: '~1 ms',
    typicalUse: 'Budget laptops, high-refresh gaming laptops',
    detail:
      'Cheapest and fastest-switching panel technology, which is why it still shows up in budget models and high-refresh-rate gaming laptops. Colors shift noticeably off-axis and viewing angles are narrow — look at a TN screen from the side and contrast collapses.',
  },
  {
    name: 'VA',
    fullName: 'Vertical Alignment',
    viewingAngle: 3,
    colorAccuracy: 3,
    blackLevel: 4,
    responseTime: '~4-8 ms',
    typicalUse: 'Mid-range laptops, some curved displays',
    detail:
      'Splits the difference between TN and IPS: noticeably deeper blacks and higher contrast than either, with better color and viewing angles than TN, but slower pixel response than both — fast motion can show trailing ("smearing").',
  },
  {
    name: 'IPS',
    fullName: 'In-Plane Switching',
    viewingAngle: 6,
    colorAccuracy: 5,
    blackLevel: 3,
    responseTime: '~4-5 ms',
    typicalUse: 'Business ultrabooks, creative/design laptops',
    detail:
      'Liquid crystals rotate in the same plane as the glass instead of twisting toward the viewer, so color and contrast stay consistent from almost any angle. The go-to choice when a technician is asked to spec a laptop for photo/video editing or multi-person screen sharing.',
  },
  {
    name: 'OLED',
    fullName: 'Organic Light-Emitting Diode',
    viewingAngle: 6,
    colorAccuracy: 6,
    blackLevel: 6,
    responseTime: '<1 ms',
    typicalUse: 'Premium/creator laptops, flagship phones',
    detail:
      'Every pixel emits its own light and can switch off completely, producing true per-pixel black and the highest contrast ratio of the group with no separate backlight. Trade-offs a technician should know: static images left on-screen for long periods risk permanent burn-in, and panels cost more to replace.',
  },
]

const HEAT_CLASS: Record<number, string> = {
  1: 'bg-heat-1',
  2: 'bg-heat-2',
  3: 'bg-heat-3',
  4: 'bg-heat-4',
  5: 'bg-heat-5',
  6: 'bg-heat-6',
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-faint uppercase tracking-wider">{label}</span>
        <span className="font-mono text-ink">{value}/6</span>
      </div>
      <div className="h-2 rounded-crisp bg-wash overflow-hidden">
        <div
          className={`h-full ${HEAT_CLASS[value]} transition-all duration-500 ease-out`}
          style={{ width: `${(value / 6) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default function LaptopDisplayTechnologies() {
  const [selected, setSelected] = useState(2)
  const p = PANELS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Laptop Display Panel Technologies</h3>
        <p className="text-sm text-soft">
          Domain 1.2 — slide across panel types to see how viewing angle, color accuracy, and black level trade off.
        </p>
      </div>

      <input
        type="range"
        min={0}
        max={PANELS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[11px] text-faint px-0.5 -mt-3">
        {PANELS.map((panel, i) => (
          <button
            key={panel.name}
            onClick={() => setSelected(i)}
            className={`text-center font-mono transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / PANELS.length}%` }}
          >
            {panel.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Meter label="Viewing angle" value={p.viewingAngle} />
        <Meter label="Color accuracy" value={p.colorAccuracy} />
        <Meter label="Black level" value={p.blackLevel} />
      </div>

      <div key={p.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-ink">
            {p.name} <span className="text-soft font-normal">({p.fullName})</span>
          </h4>
          <span className="font-mono text-[11px] text-faint">{p.responseTime}</span>
        </div>
        <p className="text-[11px] text-faint uppercase tracking-wider mb-1">{p.typicalUse}</p>
        <p className="text-sm text-soft leading-relaxed">{p.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam framing: if the scenario mentions color-critical work (photo/video editing) or wide-angle group viewing,
        the answer is IPS. If it mentions the deepest possible blacks/contrast on a premium creator laptop, it's
        OLED — but flag the burn-in risk if the scenario also mentions a static taskbar or logo left on-screen for
        hours at a time.
      </div>
    </div>
  )
}
