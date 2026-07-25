import { useState } from 'react'

interface NetType {
  name: string
  fullName: string
  range: string
  typicalTech: string
  example: string
  detail: string
}

const TYPES: NetType[] = [
  {
    name: 'PAN',
    fullName: 'Personal Area Network',
    range: 'A few meters',
    typicalTech: 'Bluetooth, NFC, USB',
    example: 'Phone paired to a smartwatch or headset',
    detail:
      'The smallest scope — devices belonging to one person, connected directly to each other without any shared infrastructure. Bluetooth pairing is the classic PAN example on the exam.',
  },
  {
    name: 'LAN',
    fullName: 'Local Area Network',
    range: 'One building or floor',
    typicalTech: 'Ethernet, Wi-Fi',
    example: 'Office or home network behind one router',
    detail:
      'A single administrative network confined to one site, typically all reachable without crossing a router — the network a SOHO router creates and a technician configures most often.',
  },
  {
    name: 'MAN',
    fullName: 'Metropolitan Area Network',
    range: 'A city or campus cluster',
    typicalTech: 'Fiber backbone, microwave links',
    example: 'A university linking several campus buildings across town',
    detail:
      'Spans a larger geographic area than a LAN but smaller than a WAN — usually built and owned by a single organization or a regional carrier tying multiple LANs together.',
  },
  {
    name: 'WAN',
    fullName: 'Wide Area Network',
    range: 'Regional to global',
    typicalTech: 'Leased lines, MPLS, the public Internet',
    example: 'A company connecting branch offices in different states, or the Internet itself',
    detail:
      'Connects multiple LANs (and MANs) across long distances, usually leasing bandwidth from a carrier rather than owning the physical medium end to end. The Internet is the largest WAN there is.',
  },
]

export default function NetworkTypeSpectrum() {
  const [selected, setSelected] = useState(1)
  const t = TYPES[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Network Type Spectrum</h3>
        <p className="text-sm text-soft">
          Domain 2.7 — slide from the smallest to the largest network scope to compare range and typical technology.
        </p>
      </div>

      <input
        type="range" aria-label="Network Type Spectrum"
        min={0}
        max={TYPES.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[11px] text-faint px-0.5 -mt-3">
        {TYPES.map((type, i) => (
          <button
            key={type.name}
            onClick={() => setSelected(i)}
            className={`text-center font-mono transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TYPES.length}%` }}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Typical range</p>
          <p className="font-mono text-sm font-semibold text-ink">{t.range}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Typical technology</p>
          <p className="font-mono text-sm font-semibold text-ink">{t.typicalTech}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Example</p>
          <p className="text-sm font-semibold text-ink leading-snug">{t.example}</p>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">
          {t.name} <span className="text-soft font-normal">({t.fullName})</span>
        </h4>
        <p className="text-sm text-soft leading-relaxed">{t.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Scope, not speed, is what separates these on the exam: a PAN is device-to-device, a LAN stays inside one
        site's administrative boundary, a MAN links sites across a city, and a WAN spans regions — with the Internet
        as the ultimate WAN.
      </div>
    </div>
  )
}
