import { useMemo, useState } from 'react'

type Block = { label: string; kind: 'data' | 'parity' | 'mirror' | 'empty' }

interface RaidLevel {
  name: string
  minDrives: number
  faultTolerance: string
  capacityFormula: (driveSizeGb: number) => number
  formulaText: string
  drives: Block[][] // one array of blocks per drive column
  tint: 'accent' | 'good' | 'warn' | 'bad'
  summary: string
}

const KIND_CLASS: Record<Block['kind'], string> = {
  data: 'bg-accent-tint border-accent text-accent',
  parity: 'bg-warn-tint border-warn text-warn',
  mirror: 'bg-good-tint border-good text-good',
  empty: 'bg-wash border-line text-faint',
}

const LEVELS: RaidLevel[] = [
  {
    name: 'RAID 0',
    minDrives: 2,
    faultTolerance: 'None — any single drive failure loses all data',
    capacityFormula: (s) => 4 * s,
    formulaText: 'n × drive size (using all 4 drives)',
    tint: 'bad',
    summary:
      'Pure striping: each block is written to a different drive with no duplication. Maximizes speed and capacity, but a single drive failure destroys the whole array.',
    drives: [
      [{ label: 'A1', kind: 'data' }],
      [{ label: 'B1', kind: 'data' }],
      [{ label: 'C1', kind: 'data' }],
      [{ label: 'D1', kind: 'data' }],
    ],
  },
  {
    name: 'RAID 1',
    minDrives: 2,
    faultTolerance: 'Survives 1 of 2 drives failing (full duplicate)',
    capacityFormula: (s) => 1 * s,
    formulaText: 'drive size (only 2 of the 4 drives are used, as one mirrored pair)',
    tint: 'good',
    summary:
      'Pure mirroring: every block is duplicated in full on a second drive. Simple and safe, but you pay for 2x the raw storage to get 1x usable capacity — and it only needs 2 drives, not 4.',
    drives: [
      [{ label: 'A1', kind: 'mirror' }],
      [{ label: 'A1', kind: 'mirror' }],
      [{ label: '—', kind: 'empty' }],
      [{ label: '—', kind: 'empty' }],
    ],
  },
  {
    name: 'RAID 5',
    minDrives: 3,
    faultTolerance: 'Survives exactly 1 drive failure (parity rebuild)',
    capacityFormula: (s) => 3 * s,
    formulaText: '(n − 1) × drive size = 3 of 4 drives\' worth',
    tint: 'warn',
    summary:
      'Striping with distributed parity: each stripe writes data across most drives plus a rotating parity block, so no single drive is a bottleneck or a single point of failure. Best balance of capacity, speed, and protection for most file servers.',
    drives: [
      [{ label: 'A1', kind: 'data' }, { label: 'Bp', kind: 'parity' }],
      [{ label: 'A2', kind: 'data' }, { label: 'B1', kind: 'data' }],
      [{ label: 'A3', kind: 'data' }, { label: 'B2', kind: 'data' }],
      [{ label: 'Ap', kind: 'parity' }, { label: 'B3', kind: 'data' }],
    ],
  },
  {
    name: 'RAID 10',
    minDrives: 4,
    faultTolerance: 'Survives 1 drive per mirrored pair (up to 2 total)',
    capacityFormula: (s) => 2 * s,
    formulaText: '(n ÷ 2) × drive size = 2 mirrored pairs, striped',
    tint: 'accent',
    summary:
      "Mirroring + striping combined: drives are mirrored in pairs (RAID 1), then data is striped across those pairs (RAID 0). Delivers RAID 1's safety with RAID 0's speed, at the cost of 50% usable capacity and needing at least 4 drives.",
    drives: [
      [{ label: 'A1', kind: 'mirror' }],
      [{ label: 'A1', kind: 'mirror' }],
      [{ label: 'B1', kind: 'data' }],
      [{ label: 'B1', kind: 'data' }],
    ],
  },
]

const TINT_TEXT: Record<RaidLevel['tint'], string> = {
  accent: 'text-accent',
  good: 'text-good',
  warn: 'text-warn',
  bad: 'text-bad',
}

export default function RaidLevelComparison() {
  const [driveSize, setDriveSize] = useState(2000)

  const capacities = useMemo(
    () => LEVELS.map((l) => ({ name: l.name, gb: l.capacityFormula(driveSize) })),
    [driveSize],
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">RAID 0 / 1 / 5 / 10 Comparison</h3>
        <p className="text-sm text-soft">
          Domain 3.6 — four identical drives, one shared size slider: see how striping, mirroring, and parity change
          usable capacity and fault tolerance.
        </p>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-soft">Size per drive (4 identical drives)</span>
          <span className="font-mono text-ink font-medium">{driveSize.toLocaleString()} GB</span>
        </div>
        <input
          type="range"
          min={500}
          max={8000}
          step={500}
          value={driveSize}
          onChange={(e) => setDriveSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {LEVELS.map((level, li) => (
          <div key={level.name} className="rounded-crisp border border-line bg-wash p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className={`font-display font-semibold ${TINT_TEXT[level.tint]}`}>{level.name}</p>
              <span className="text-[10px] font-mono text-faint">min {level.minDrives} drives</span>
            </div>

            <div className="flex gap-1.5">
              {level.drives.map((col, di) => (
                <div key={di} className="flex-1 space-y-1">
                  {col.map((b, bi) => (
                    <div
                      key={bi}
                      className={`rounded-crisp border px-1 py-1.5 text-center text-[10px] font-mono ${KIND_CLASS[b.kind]}`}
                    >
                      {b.label}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <p className="text-faint uppercase tracking-wider">Usable</p>
                <p className="font-mono text-ink font-semibold">{capacities[li].gb.toLocaleString()} GB</p>
              </div>
              <div>
                <p className="text-faint uppercase tracking-wider">Tolerance</p>
                <p className="text-soft leading-tight">{level.faultTolerance}</p>
              </div>
            </div>
            <p className="text-[10px] text-faint font-mono">{level.formulaText}</p>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Capacity vs. protection is the exam's favorite trade-off here: RAID 0 gives 100% capacity and zero protection,
        RAID 1 gives 50% capacity and the simplest protection, RAID 5 recovers most of that lost capacity while still
        surviving one failure, and RAID 10 spends capacity again to get both speed and stronger fault tolerance than
        RAID 5 (parity rebuilds under RAID 5 are slow and stress every remaining drive).
      </div>
    </div>
  )
}
