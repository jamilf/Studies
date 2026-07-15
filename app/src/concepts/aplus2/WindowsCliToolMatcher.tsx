import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'ipconfig /all', back: 'Displays full TCP/IP configuration for every adapter — IP address, subnet mask, default gateway, DNS servers, and MAC address. Add /release and /renew to drop and re-request a DHCP lease.' },
  { front: 'chkdsk /f /r', back: "Scans a volume for file-system errors and bad sectors. /f fixes errors found; /r locates bad sectors and recovers readable data from them (implies /f). Often needs a reboot to run against the boot volume." },
  { front: 'sfc /scannow', back: 'System File Checker scans all protected system files and replaces corrupted ones with cached copies from %WinDir%\\System32\\dllcache. The go-to first step when Windows itself seems to be misbehaving.' },
  { front: 'diskpart', back: 'Launches an interactive command-line disk-partitioning utility (list disk, select disk, create partition, format, assign). More powerful — and more dangerous — than the Disk Management GUI.' },
  { front: 'gpupdate /force', back: "Immediately reapplies all Group Policy settings, both computer and user, instead of waiting for the periodic background refresh. Used after editing a GPO to confirm the change actually applies." },
  { front: 'net use', back: "Maps, lists, or disconnects network drives and shared resources from the command line, e.g. net use Z: \\\\server\\share. Also net use * /delete to clear all mapped drives." },
  { front: 'robocopy', back: "Robust File Copy — a resilient bulk copy/mirror tool that can resume interrupted transfers, preserve permissions and timestamps, and mirror entire directory trees (/MIR). The modern successor to xcopy." },
  { front: 'shutdown /r /t 0', back: 'Forces an immediate restart (/r) with a zero-second delay (/t 0). Useful for scripting a restart on a remote or unattended machine without touching the GUI Start menu.' },
]

export default function WindowsCliToolMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Windows Command-Line Tool Matcher</h3>
        <p className="text-sm text-soft">Domain 1.2 — click a command to flip it and reveal what it actually does.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-mono text-sm font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 tends to describe a symptom and ask which command-line tool fixes it. Corrupted system
        files → sfc. Bad sectors/file-system errors → chkdsk. Group Policy not applying → gpupdate. Need a
        partition rebuilt from scratch → diskpart.
      </div>
    </div>
  )
}
