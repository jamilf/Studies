import { useMemo, useState } from 'react'

type Symptom = 'Blue screen with stop code' | 'No display / no POST' | '"Boot device not found"' | 'Boot loop (restarts before logon)'
type Timing = 'Before Windows starts (POST/firmware)' | 'While Windows is loading' | 'After logon, during normal use'

interface Verdict {
  cause: string
  fix: string
  tint: 'bad' | 'warn'
}

function evaluate(symptom: Symptom, timing: Timing): Verdict {
  if (symptom === 'No display / no POST') {
    return {
      cause: 'Hardware failure before the OS is even involved — RAM, PSU, motherboard, or a loose cable/GPU seating issue.',
      fix: 'Reseat RAM and expansion cards, check the PSU and all power connectors, and clear the CMOS. If POST still fails, swap components one at a time to isolate the failed part. This is not a Windows problem yet.',
      tint: 'bad',
    }
  }
  if (symptom === '"Boot device not found"') {
    return {
      cause: 'Firmware cannot locate a bootable OS partition — wrong boot order, a disconnected/failed drive, or a corrupt/missing boot partition (MBR/GPT or BCD).',
      fix: 'Check the UEFI boot order and drive cabling first. If the drive is detected, boot to Windows Recovery Environment and run bootrec /fixmbr, bootrec /fixboot, and bootrec /rebuildbcd (or diskpart to confirm the partition is marked active).',
      tint: 'bad',
    }
  }
  if (symptom === 'Boot loop (restarts before logon)') {
    if (timing === 'Before Windows starts (POST/firmware)') {
      return {
        cause: 'The system never gets far enough to load Windows — likely a hardware fault causing the firmware itself to reset.',
        fix: 'Treat as hardware: reseat RAM, check PSU voltages, and test with minimal hardware attached.',
        tint: 'bad',
      }
    }
    return {
      cause: 'Windows starts loading, then a driver or corrupted system file crashes it hard enough to force an automatic restart before the desktop appears.',
      fix: 'Interrupt the boot 2-3 times to force Automatic Repair, or boot into Safe Mode from Advanced Startup and roll back the most recently installed driver/update. sfc /scannow and DISM /RestoreHealth from a recovery command prompt fix corrupted system files.',
      tint: 'warn',
    }
  }
  // Blue screen with stop code
  if (timing === 'Before Windows starts (POST/firmware)' ) {
    return {
      cause: 'A stop code this early usually means a corrupted boot-critical driver or a failing disk is preventing the kernel from finishing initialization.',
      fix: 'Boot to Recovery Environment, run chkdsk /f and sfc /scannow, and check Startup Repair. If the stop code references a specific .sys file, that driver is the prime suspect.',
      tint: 'bad',
    }
  }
  if (timing === 'While Windows is loading') {
    return {
      cause: 'A driver loaded during kernel/session initialization (commonly a video, storage, or third-party security driver) is faulting.',
      fix: 'Boot into Safe Mode, uninstall or roll back the most recently added/updated driver, and check Reliability Monitor / Event Viewer for the exact stop code (e.g., DRIVER_IRQL_NOT_LESS_OR_EQUAL) to identify the offending .sys file.',
      tint: 'warn',
    }
  }
  return {
    cause: 'A driver, failing RAM, overheating, or a buggy application/service is crashing the kernel during normal use — this is the widest category and needs the stop code to narrow down.',
    fix: 'Read the exact stop code and check Event Viewer\'s System log for the Bug Check event. Run Windows Memory Diagnostic for RAM, check temps, and update or roll back recently changed drivers before reinstalling Windows as a last resort.',
    tint: 'warn',
  }
}

const SYMPTOMS: Symptom[] = ['Blue screen with stop code', 'No display / no POST', '"Boot device not found"', 'Boot loop (restarts before logon)']
const TIMINGS: Timing[] = ['Before Windows starts (POST/firmware)', 'While Windows is loading', 'After logon, during normal use']

export default function BsodDecisionTree() {
  const [symptom, setSymptom] = useState<Symptom>('Blue screen with stop code')
  const [timing, setTiming] = useState<Timing>('While Windows is loading')

  const verdict = useMemo(() => evaluate(symptom, timing), [symptom, timing])
  const disabled = symptom === 'No display / no POST' || symptom === '"Boot device not found"'

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">BSOD / Boot Error Decision Tree</h3>
        <p className="text-sm text-soft">Domain 3.1 — pick the symptom and when it happens to get the likely cause and fix path.</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Symptom</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SYMPTOMS.map((s) => (
            <button
              key={s}
              onClick={() => setSymptom(s)}
              className={`rounded-crisp border px-2 py-2 text-xs font-medium text-left transition-colors ${
                symptom === s ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className={`text-xs mb-1.5 ${disabled ? 'text-faint' : 'text-soft'}`}>
          When it happens {disabled && '(not applicable to this symptom)'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {TIMINGS.map((t) => (
            <button
              key={t}
              disabled={disabled}
              onClick={() => setTiming(t)}
              className={`rounded-crisp border px-2 py-2 text-xs font-medium text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                timing === t && !disabled ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div
        key={`${symptom}-${timing}`}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${verdict.tint === 'bad' ? 'border-bad bg-bad-tint' : 'border-warn bg-warn-tint'}`}
      >
        <p className={`text-[11px] uppercase tracking-wider font-semibold mb-1 ${verdict.tint === 'bad' ? 'text-bad' : 'text-warn'}`}>
          Likely cause
        </p>
        <p className="text-sm text-ink leading-relaxed mb-3">{verdict.cause}</p>
        <p className={`text-[11px] uppercase tracking-wider font-semibold mb-1 ${verdict.tint === 'bad' ? 'text-bad' : 'text-warn'}`}>
          Fix path
        </p>
        <p className="text-sm text-ink leading-relaxed">{verdict.fix}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 troubleshooting questions reward narrowing scope before naming a fix — "when did it start
        happening" and "how far does it get" separate hardware failures (fix at POST) from driver/software failures
        (fix in Safe Mode or Recovery Environment).
      </div>
    </div>
  )
}
