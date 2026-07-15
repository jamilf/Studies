interface CableSpec {
  name: string
  maxSpeed: string
  maxDistance: string
  connector: string
  notes: string
  tint: 'good' | 'accent' | 'warn' | 'bad'
}

const CABLES: CableSpec[] = [
  {
    name: 'Cat 5e',
    maxSpeed: '1 Gbps (1000BASE-T)',
    maxDistance: '100 m',
    connector: 'RJ-45',
    notes: 'Rated to 100 MHz. The practical floor for modern networks — fine for gigabit, not for 10G.',
    tint: 'warn',
  },
  {
    name: 'Cat 6 / 6a',
    maxSpeed: '10 Gbps (10GBASE-T)',
    maxDistance: 'Cat 6: 55 m at 10G / 100 m at 1G. Cat 6a: full 100 m at 10G',
    connector: 'RJ-45',
    notes: 'Rated to 250 MHz (Cat 6) / 500 MHz (Cat 6a). Cat 6a adds shielding to fight crosstalk at 10G over distance.',
    tint: 'good',
  },
  {
    name: 'Fiber (multimode / single-mode)',
    maxSpeed: '10–100+ Gbps',
    maxDistance: 'Multimode (OM3/4): 300–550 m. Single-mode: 10 km+',
    connector: 'LC, SC, ST',
    notes: 'Immune to EMI, no distance-based attenuation like copper. Single-mode is pricier but used for long campus/carrier runs.',
    tint: 'accent',
  },
  {
    name: 'Coax (RG-6)',
    maxSpeed: 'Up to ~10 Gbps theoretical (DOCSIS 3.1), far less in practice',
    maxDistance: 'Hundreds of meters (cable plant, not point-to-point Ethernet)',
    connector: 'F-connector',
    notes: 'Used for cable internet/CATV drops, not general LAN cabling — shares bandwidth across the neighborhood segment.',
    tint: 'bad',
  },
]

const TINT_CLASSES: Record<CableSpec['tint'], string> = {
  accent: 'border-accent-line bg-accent-tint',
  good: 'border-good-line bg-good-tint',
  warn: 'border-warn-line bg-warn-tint',
  bad: 'border-bad-line bg-bad-tint',
}

const TINT_TEXT: Record<CableSpec['tint'], string> = {
  accent: 'text-accent',
  good: 'text-good',
  warn: 'text-warn',
  bad: 'text-bad',
}

export default function CableConnectorComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Cable & Connector Comparison</h3>
        <p className="text-sm text-soft">
          Domain 2.3 — speed, distance, and connector type across the four media you'll be asked to pick between.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CABLES.map((c) => (
          <div key={c.name} className={`rounded-crisp border p-3 space-y-2 ${TINT_CLASSES[c.tint]}`}>
            <p className={`font-display font-semibold ${TINT_TEXT[c.tint]}`}>{c.name}</p>
            <div className="space-y-1.5 text-[11px]">
              <div>
                <p className="text-faint uppercase tracking-wider">Max speed</p>
                <p className="font-mono text-ink">{c.maxSpeed}</p>
              </div>
              <div>
                <p className="text-faint uppercase tracking-wider">Max distance</p>
                <p className="font-mono text-ink">{c.maxDistance}</p>
              </div>
              <div>
                <p className="text-faint uppercase tracking-wider">Connector</p>
                <p className="font-mono text-ink">{c.connector}</p>
              </div>
            </div>
            <p className="text-[11px] text-soft leading-snug border-t border-line pt-2">{c.notes}</p>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam heuristic: if the question mentions distance beyond 100 m or immunity to EMI, the answer is fiber. If it
        mentions "future-proofing" a new office build for 10 Gbps, the answer is Cat 6a. Coax mostly shows up as the
        ISP hand-off (modem) rather than as internal LAN cabling.
      </div>
    </div>
  )
}
