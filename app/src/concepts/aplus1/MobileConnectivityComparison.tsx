interface Method {
  name: string
  range: string
  speed: string
  power: string
  useCase: string
  tint: 'accent' | 'good' | 'warn' | 'bad'
}

const METHODS: Method[] = [
  {
    name: 'NFC',
    range: '~4 cm (touch/tap)',
    speed: '106 – 424 kbps',
    power: 'Very low, often unpowered (passive tags)',
    useCase: 'Contactless payment (Apple Pay/Google Pay), quick device pairing, access badges.',
    tint: 'accent',
  },
  {
    name: 'Bluetooth',
    range: 'Class 2 typical: ~10 m; Class 1: up to 100 m',
    speed: 'Up to ~2–3 Mbps (BLE / EDR)',
    power: 'Low — designed for battery-powered peripherals',
    useCase: 'Wireless headsets, keyboards/mice, fitness trackers, car infotainment pairing.',
    tint: 'good',
  },
  {
    name: 'USB-C',
    range: 'Wired only (cable length)',
    speed: 'Up to 10/20 Gbps (USB 3.2), 40 Gbps with Thunderbolt 3/4',
    power: 'Delivers power too — USB PD up to 240 W (EPR)',
    useCase: 'Charging, tethered data transfer, DisplayPort Alt Mode video out — now the mandated standard on new EU phones.',
    tint: 'warn',
  },
  {
    name: 'Lightning',
    range: 'Wired only (cable length)',
    speed: '~480 Mbps (USB 2.0 speed on most iPhones)',
    power: 'Charges the device but tops out well below USB-C PD',
    useCase: 'Legacy Apple iPhone/iPad connector (pre-iPhone 15) — Apple proprietary, being retired in favor of USB-C.',
    tint: 'bad',
  },
]

const TINT_CLASSES: Record<Method['tint'], string> = {
  accent: 'border-accent-line bg-accent-tint',
  good: 'border-good-line bg-good-tint',
  warn: 'border-warn-line bg-warn-tint',
  bad: 'border-bad-line bg-bad-tint',
}

const TINT_TEXT: Record<Method['tint'], string> = {
  accent: 'text-accent',
  good: 'text-good',
  warn: 'text-warn',
  bad: 'text-bad',
}

export default function MobileConnectivityComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Mobile Device Connectivity Trade-offs</h3>
        <p className="text-sm text-soft">
          Domain 1.1 — compare range, throughput, and power draw across the four short-range connection methods.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {METHODS.map((m) => (
          <div key={m.name} className={`rounded-crisp border p-3 space-y-2 ${TINT_CLASSES[m.tint]}`}>
            <p className={`font-display font-semibold ${TINT_TEXT[m.tint]}`}>{m.name}</p>
            <div className="space-y-1.5 text-[11px]">
              <div>
                <p className="text-faint uppercase tracking-wider">Range</p>
                <p className="font-mono text-ink">{m.range}</p>
              </div>
              <div>
                <p className="text-faint uppercase tracking-wider">Speed</p>
                <p className="font-mono text-ink">{m.speed}</p>
              </div>
              <div>
                <p className="text-faint uppercase tracking-wider">Power</p>
                <p className="text-soft">{m.power}</p>
              </div>
            </div>
            <p className="text-[11px] text-soft leading-snug border-t border-line pt-2">{m.useCase}</p>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam angle: NFC and Bluetooth are wireless and trade range for power efficiency, while USB-C and Lightning
        are wired and trade mobility for raw throughput and reliable charging. USB-C now covers both data (up to
        40 Gbps over Thunderbolt) and high-wattage charging in one connector, which is why it has displaced Lightning
        on current-generation devices.
      </div>
    </div>
  )
}
