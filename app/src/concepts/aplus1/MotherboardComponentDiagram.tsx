import { useEffect, useState } from 'react'

interface Zone {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
  caption: string
}

const ZONES: Zone[] = [
  { id: 'cpu', x: 170, y: 20, w: 70, h: 70, label: 'CPU socket', caption: 'Where the processor seats — secured by a ZIF (zero insertion force) lever. Alignment notches make it physically impossible to insert the CPU rotated the wrong way. Thermal paste and a cooler mount go directly on top.' },
  { id: 'ram', x: 260, y: 20, w: 90, h: 70, label: 'RAM (DIMM) slots', caption: 'Slots are usually color-paired to mark matching dual-channel banks — populating one slot from each color pair (not two adjacent slots) is what actually enables dual-channel mode.' },
  { id: 'pcie', x: 20, y: 110, w: 130, h: 50, label: 'PCIe expansion slots', caption: 'The long x16 slot nearest the CPU is for the primary GPU; shorter x1/x4 slots handle NICs, capture cards, and other add-on cards. Lane count, not slot length alone, determines a card\'s maximum bandwidth.' },
  { id: 'power', x: 360, y: 20, w: 40, h: 140, label: 'ATX power connectors', caption: 'The 24-pin main connector feeds the board itself; a separate 4/8-pin connector near the CPU socket feeds the processor specifically — both must be seated or the system won\'t POST.' },
  { id: 'storage', x: 170, y: 110, w: 90, h: 50, label: 'M.2 / SATA connectors', caption: 'M.2 slots accept compact NVMe or SATA-based drives directly on the board; traditional SATA ports connect 2.5"/3.5" drives and optical drives via cable.' },
  { id: 'chipset', x: 280, y: 110, w: 70, h: 50, label: 'Chipset', caption: 'A controller hub under its own heatsink that manages I/O traffic — USB ports, SATA lanes, some PCIe lanes — between the CPU and the rest of the board. The chipset model determines feature support and, on some platforms, CPU compatibility.' },
]

export default function MotherboardComponentDiagram() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= ZONES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 2000)
    return () => clearTimeout(t)
  }, [playing, active])

  const zone = ZONES[active]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Motherboard Component Layout</h3>
          <p className="text-sm text-soft">Domain 3.4 — step through the major zones of a typical ATX motherboard.</p>
        </div>
        <button
          onClick={() => {
            if (active >= ZONES.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= ZONES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 420 180" className="w-full h-48" aria-hidden>
          <rect x="10" y="10" width="400" height="160" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
          {ZONES.map((z, i) => (
            <g key={z.id}>
              <rect
                x={z.x}
                y={z.y}
                width={z.w}
                height={z.h}
                rx="3"
                className={`transition-all duration-500 ${i === active ? 'fill-accent-tint stroke-accent' : 'fill-wash stroke-line'}`}
                strokeWidth={i === active ? 2 : 1}
              />
              <text
                x={z.x + z.w / 2}
                y={z.y + z.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-[8px] font-medium ${i === active ? 'fill-accent' : 'fill-faint'}`}
              >
                {z.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{zone.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{zone.caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A no-POST call almost always traces back to one of these zones: a CPU not fully seated, RAM in the wrong
        slot pairing, or a missing power connector. Checking these in order is faster than reflashing the BIOS.
      </div>
    </div>
  )
}
