import { useState } from 'react'

interface Tool {
  name: string
  category: string
  detail: string
  guiReliance: number
  dataImpact: number
}

const TOOLS: Tool[] = [
  {
    name: 'Spotlight',
    category: 'Search',
    detail: 'System-wide search (Cmd+Space) that indexes files, apps, emails, and even performs quick calculations or unit conversions from a single search field.',
    guiReliance: 5,
    dataImpact: 1,
  },
  {
    name: 'Mission Control',
    category: 'Window management',
    detail: 'Shows all open windows, full-screen apps, and virtual desktops (Spaces) in one gesture-driven overview, making it fast to jump between running work.',
    guiReliance: 5,
    dataImpact: 1,
  },
  {
    name: 'Finder',
    category: 'File management',
    detail: 'The macOS file-manager equivalent of File Explorer — browses the file system, and its sidebar surfaces iCloud Drive, AirDrop, and network shares.',
    guiReliance: 4,
    dataImpact: 2,
  },
  {
    name: 'Keychain Access',
    category: 'Credential management',
    detail: 'Stores saved passwords, certificates, and secure notes in encrypted keychains, and syncs them across a user\'s devices via iCloud Keychain.',
    guiReliance: 4,
    dataImpact: 3,
  },
  {
    name: 'Time Machine',
    category: 'Backup',
    detail: 'Automatic, versioned backups to an external or network drive — lets a technician restore a single file or roll back an entire system to a prior snapshot.',
    guiReliance: 3,
    dataImpact: 5,
  },
  {
    name: 'Terminal',
    category: 'Command line',
    detail: 'A full Unix shell (zsh by default on modern macOS) for scripting and low-level troubleshooting — the macOS counterpart to the Windows command prompt.',
    guiReliance: 1,
    dataImpact: 5,
  },
]

const METER_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function MacOsToolSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TOOLS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">macOS Tool Spectrum</h3>
        <p className="text-sm text-soft">Domain 1.6 — slide across core macOS features to see what each one is for.</p>
      </div>

      <input
        type="range" aria-label="macOS Tool Spectrum"
        min={0}
        max={TOOLS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3 gap-1">
        {TOOLS.map((tool, i) => (
          <button
            key={tool.name}
            onClick={() => setSelected(i)}
            className={`text-center leading-tight transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TOOLS.length}%` }}
          >
            {tool.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">GUI reliance</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.guiReliance ? METER_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Impact if misused</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.dataImpact ? METER_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-crisp px-2 py-0.5 text-[11px] font-semibold bg-accent text-paper">{t.category}</span>
          <h4 className="font-semibold text-ink">{t.name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{t.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: know each tool's Windows analog — Spotlight is like Windows Search, Mission Control is like
        Task View, Finder is like File Explorer, Keychain Access is like Credential Manager, and Time Machine
        is like File History/Backup and Restore.
      </div>
    </div>
  )
}
