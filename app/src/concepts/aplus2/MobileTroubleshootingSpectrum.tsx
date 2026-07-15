import { useState } from 'react'

interface Tier {
  name: string
  likelyCause: string
  fix: string
  severity: number
}

const TIERS: Tier[] = [
  {
    name: "App won't launch / force closes",
    likelyCause: 'Corrupted app cache/data, an app update that conflicts with the OS version, or insufficient free storage.',
    fix: 'Force-stop the app, clear its cache (then data if needed), confirm free storage space, and update or reinstall the app.',
    severity: 1,
  },
  {
    name: "App won't sync data",
    likelyCause: 'No/weak network connectivity, background data restricted for that app, an expired auth token, or the account is signed out.',
    fix: 'Check Wi-Fi/cellular connectivity, verify background data and battery-optimization settings aren\'t blocking the app, and re-authenticate the account.',
    severity: 2,
  },
  {
    name: 'Unintended Bluetooth/Wi-Fi pairing or connectivity issues',
    likelyCause: 'Stale paired-device list, radio stuck after a sleep/wake cycle, or a rogue nearby device auto-connecting.',
    fix: 'Forget and re-pair the device, toggle airplane mode to reset the radios, and review the paired-device list for anything unrecognized.',
    severity: 2,
  },
  {
    name: 'Battery drain / won\'t hold a charge',
    likelyCause: 'A misbehaving app stuck awake in the background, screen brightness/timeout set too high, or (on older devices) genuine battery wear.',
    fix: 'Check the battery-usage breakdown for the worst offending app, force-stop or restrict it, lower screen brightness/timeout, and disable unused radios (GPS, Bluetooth) when idle.',
    severity: 3,
  },
  {
    name: 'Overheating',
    likelyCause: 'Heavy sustained CPU/GPU use (gaming, video, or a runaway process), charging while under load, or direct sunlight/poor ventilation.',
    fix: 'Close background apps, remove the case while charging, avoid direct sun, and update the OS/apps — overheating often traces back to a buggy app pegging the CPU.',
    severity: 4,
  },
  {
    name: 'Slow performance / unresponsive touchscreen',
    likelyCause: 'Storage nearly full, too many background processes, a pending OS update, or (for the touchscreen specifically) a cracked digitizer or a stuck screen protector.',
    fix: 'Free up storage, restart the device, clear cache partitions, and install pending updates; if only touch input is affected, inspect the screen/digitizer for physical damage.',
    severity: 4,
  },
]

const SEVERITY_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function MobileTroubleshootingSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Mobile App Troubleshooting Spectrum</h3>
        <p className="text-sm text-soft">Domain 3.5 — drag across common mobile OS symptoms to see the likely cause and fix.</p>
      </div>

      <input
        type="range"
        min={0}
        max={TIERS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3 gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center leading-tight transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>

      <div className="rounded-crisp border border-line bg-wash p-3">
        <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Severity / annoyance</p>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.severity ? SEVERITY_COLOR[i] : 'bg-line/50'}`} />
          ))}
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-2">
        <h4 className="font-semibold text-ink">{t.name}</h4>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-faint">Likely cause</p>
          <p className="text-sm text-soft leading-relaxed">{t.likelyCause}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-faint">Fix</p>
          <p className="text-sm text-soft leading-relaxed">{t.fix}</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: for mobile devices, always try the least invasive fix first — force-stop/clear cache, then
        restart the device, then reinstall the app — before jumping to a factory reset. Most 1102 mobile
        troubleshooting scenarios have an answer that stops well short of a full wipe.
      </div>
    </div>
  )
}
