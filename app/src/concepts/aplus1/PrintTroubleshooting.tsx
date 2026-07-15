import { useState } from 'react'

interface Symptom {
  name: string
  cause: string
  fix: string
}

const SYMPTOMS: Symptom[] = [
  {
    name: 'Streaks or lines on printed pages',
    cause:
      'On a laser printer, usually a scratched or worn drum, or a leaking toner cartridge. On inkjet, a partially clogged nozzle or a smudged encoder strip.',
    fix: 'Run the built-in nozzle-cleaning/head-alignment utility on inkjet; replace the drum unit or cartridge on laser if streaks repeat at a fixed interval down the page.',
  },
  {
    name: 'Faded or light print',
    cause: 'Toner running low, or (on inkjet) low ink, a low-quality print setting, or clogged nozzles.',
    fix: 'Check toner/ink levels first, shake or replace the cartridge, and confirm the driver isn\'t set to a draft/eco print quality.',
  },
  {
    name: 'Paper jams',
    cause:
      'Worn pickup/separation rollers, humidity-swollen paper, an overfilled tray, or torn paper left behind from a previous jam.',
    fix: 'Clear the full paper path (including rollers you can\'t see), fan and reload paper below the fill line, and clean or replace pickup rollers if jams recur on every job.',
  },
  {
    name: 'Garbled/incorrect characters printed',
    cause: 'Wrong or corrupted print driver, or (on older parallel/serial-era gear) a bad cable — still tested as a concept for driver-mismatch symptoms.',
    fix: 'Reinstall the correct manufacturer driver for the exact model, and clear the print spooler queue before retrying.',
  },
  {
    name: 'Print job stuck in queue / nothing prints',
    cause: 'A stalled print spooler service, the printer offline/paused in the OS, or the wrong device set as default.',
    fix: 'Restart the Print Spooler service, clear the queue, confirm the printer isn\'t marked "offline" or "paused," and verify it is the default device.',
  },
  {
    name: 'Color output looks wrong',
    cause: 'An empty or wrong-colored cartridge, incorrect color profile/ICC settings, or nozzles clogged on one color channel only.',
    fix: 'Run a nozzle check to isolate which color channel is failing, confirm the correct ICC color profile is selected, and replace the affected cartridge.',
  },
]

export default function PrintTroubleshooting() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Print Troubleshooting: Symptom to Cause</h3>
        <p className="text-sm text-soft">
          Domain 5.3 — click a symptom to see its most likely cause and the fix to try first.
        </p>
      </div>

      <div className="space-y-1.5">
        {SYMPTOMS.map((s, i) => (
          <button key={s.name} onClick={() => setSelected(selected === i ? null : i)} className="w-full text-left group">
            <div
              className={`rounded-crisp border px-3 py-2 transition-colors ${
                selected === i ? 'border-accent bg-accent-tint' : 'border-line bg-wash group-hover:border-line-strong'
              }`}
            >
              <span className="text-sm font-medium text-ink">{s.name}</span>
            </div>
            {selected === i && (
              <div className="mt-1.5 mb-2 rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm animate-fadein space-y-1.5">
                <p className="text-soft">
                  <span className="font-semibold text-ink">Likely cause: </span>
                  {s.cause}
                </p>
                <p className="text-soft">
                  <span className="font-semibold text-ink">Fix: </span>
                  {s.fix}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam expects you to separate laser-specific causes (drum, fuser, toner) from inkjet-specific causes
        (clogged nozzles, ink levels) rather than treating "printer trouble" as one generic bucket — the printer
        technology changes both the likely cause and the correct fix.
      </div>
    </div>
  )
}
