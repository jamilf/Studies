import { useState } from 'react'

interface FsSpec {
  name: string
  journaling: string
  maxFile: string
  maxVolume: string
  osSupport: string
  bestFor: string
  recommended?: boolean
}

const FILESYSTEMS: FsSpec[] = [
  {
    name: 'NTFS',
    journaling: 'Yes — full metadata journal',
    maxFile: '~16 EB (theoretical)',
    maxVolume: '~8 PB',
    osSupport: 'Native read/write on Windows only; macOS reads but cannot write by default',
    bestFor: 'Windows internal/system drives — permissions, encryption, quotas, compression',
    recommended: true,
  },
  {
    name: 'FAT32',
    journaling: 'No journaling',
    maxFile: '4 GB (hard limit)',
    maxVolume: '2 TB (32-bit cluster limit)',
    osSupport: 'Universally supported — Windows, macOS, Linux, cameras, game consoles, router USB ports',
    bestFor: 'Small removable/USB drives that must work on almost any device',
  },
  {
    name: 'exFAT',
    journaling: 'No journaling',
    maxFile: '~16 EB (theoretical, no practical 4 GB cap)',
    maxVolume: '~128 PB (theoretical)',
    osSupport: 'Windows and macOS natively; Linux needs exfat-utils/exfatprogs',
    bestFor: 'Large flash drives and SD cards exchanged between Windows and macOS',
  },
  {
    name: 'ext4',
    journaling: 'Yes — journaling with checksums',
    maxFile: '16 TB',
    maxVolume: '1 EB',
    osSupport: 'Native on Linux; Windows and macOS need third-party drivers',
    bestFor: 'Linux internal system and data volumes',
  },
  {
    name: 'APFS',
    journaling: 'Yes — copy-on-write with metadata journaling',
    maxFile: '8 EB',
    maxVolume: '8 EB',
    osSupport: 'Native on macOS (10.13+), iOS, iPadOS; not natively readable/writable on Windows or Linux',
    bestFor: 'macOS internal system and data volumes, especially on SSD/flash storage',
  },
]

const SPEC_ROWS: { key: keyof FsSpec; label: string }[] = [
  { key: 'journaling', label: 'Journaling' },
  { key: 'maxFile', label: 'Max file size' },
  { key: 'maxVolume', label: 'Max volume size' },
  { key: 'osSupport', label: 'OS support' },
  { key: 'bestFor', label: 'Best used for' },
]

export default function FileSystemComparison() {
  const [leftName, setLeftName] = useState('NTFS')
  const [rightName, setRightName] = useState('exFAT')

  const left = FILESYSTEMS.find((f) => f.name === leftName)!
  const right = FILESYSTEMS.find((f) => f.name === rightName)!

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">File System Comparison</h3>
        <p className="text-sm text-soft">Domain 1.1 — pick two file systems to compare side by side.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <select
          value={leftName}
          onChange={(e) => setLeftName(e.target.value)}
          className="w-full rounded-crisp border border-line bg-surface px-3 py-2 text-sm text-ink"
        >
          {FILESYSTEMS.map((f) => (
            <option key={f.name} value={f.name}>
              {f.name}
            </option>
          ))}
        </select>
        <select
          value={rightName}
          onChange={(e) => setRightName(e.target.value)}
          className="w-full rounded-crisp border border-line bg-surface px-3 py-2 text-sm text-ink"
        >
          {FILESYSTEMS.map((f) => (
            <option key={f.name} value={f.name}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[left, right].map((fs) => (
          <div
            key={fs.name}
            className={`rounded-crisp border p-4 space-y-3 ${
              fs.recommended ? 'border-good-line bg-good-tint/50' : 'border-line bg-wash'
            }`}
          >
            <h4 className="font-display text-base font-semibold text-ink">{fs.name}</h4>
            {SPEC_ROWS.map((row) => (
              <div key={row.key}>
                <p className="text-[10px] uppercase tracking-wider text-faint">{row.label}</p>
                <p className="font-mono text-xs text-ink leading-snug">{fs[row.key]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: know FAT32's hard 4 GB single-file ceiling — it's the classic reason a large ISO or video file
        "won't copy" to a USB drive, and the fix is reformatting to exFAT or NTFS. Also remember journaling file
        systems (NTFS, ext4, APFS) recover from an unclean shutdown far more gracefully than FAT32/exFAT, which lack
        a journal.
      </div>
    </div>
  )
}
