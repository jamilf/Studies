import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Firmware' | 'Bootloader' | 'Kernel' | 'User session'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'POST',
    who: 'Firmware',
    detail:
      'The Power-On Self-Test runs from UEFI/BIOS firmware, checking CPU, RAM, and attached hardware before anything else loads. Beep codes or POST error codes at this stage point to a hardware fault, not an OS problem.',
  },
  {
    title: 'Firmware hands off to boot device',
    who: 'Firmware',
    detail:
      'UEFI reads the boot order from NVRAM and looks for a valid EFI system partition (GPT disks) or, on legacy BIOS, reads the MBR\'s boot code. "Boot device not found" errors happen here when the disk, boot order, or partition table is broken.',
  },
  {
    title: 'Windows Boot Manager (bootmgr)',
    who: 'Bootloader',
    detail:
      'bootmgr reads the Boot Configuration Data (BCD) store to find installed OS entries and hands control to Windows Boot Loader (winload.exe). A corrupt BCD produces "A required device isn\'t connected" or similar boot-manager errors, fixable with bootrec /rebuildbcd from Recovery.',
  },
  {
    title: 'Kernel loads (ntoskrnl.exe)',
    who: 'Kernel',
    detail:
      'winload.exe loads the Windows kernel, HAL, and boot-start drivers into memory. A driver that fails here is a classic cause of boot-loop BSODs — Safe Mode or "Last Known Good" style recovery bypasses non-critical drivers to get past this step.',
  },
  {
    title: 'Session Manager & services start',
    who: 'Kernel',
    detail:
      'smss.exe initializes the session, starts the Windows subsystem (csrss.exe), and wininit.exe launches the Service Control Manager, which starts services set to Automatic. A hung service here causes a long delay before the logon screen ever appears.',
  },
  {
    title: 'Winlogon & user logon',
    who: 'User session',
    detail:
      'winlogon.exe presents the logon screen. After credentials are validated, the user profile loads and the shell (explorer.exe) starts, handing off to the desktop environment.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Firmware: 'bg-warn text-paper',
  Bootloader: 'bg-accent text-paper',
  Kernel: 'bg-bad text-paper',
  'User session': 'bg-good text-paper',
}

export default function BootSequenceTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1800)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">OS Boot Sequence Timeline</h3>
          <p className="text-sm text-soft">Domain 1.1 — walk through POST → bootloader → kernel → login.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
              <span
                className={`text-[10px] text-center leading-tight transition-colors ${
                  i === active ? 'text-ink' : 'text-faint group-hover:text-soft'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>
            {STEPS[active].who}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: knowing which stage failed tells you where to troubleshoot. Beeping/no display = hardware/POST.
        "Boot device not found" or BCD errors = firmware/bootloader (bootrec, bcdedit). A crash right after the
        Windows logo = driver/kernel (Safe Mode, driver rollback). Hangs at "Please wait" = a stuck service.
      </div>
    </div>
  )
}
