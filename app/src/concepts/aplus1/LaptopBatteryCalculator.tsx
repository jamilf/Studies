import { useMemo, useState } from 'react'

export default function LaptopBatteryCalculator() {
  const [capacityWh, setCapacityWh] = useState(56)
  const [brightness, setBrightness] = useState(60)
  const [radiosOn, setRadiosOn] = useState(2)

  const idleDraw = 3.5 // W — CPU low-power state, motherboard, storage controller
  const displayWattPerPercent = 0.07 // W per 1% brightness, roughly 0-7 W across the range
  const radioDraw = 1.2 // W per active radio (Wi-Fi, Bluetooth, cellular modem)

  const displayDraw = useMemo(() => brightness * displayWattPerPercent, [brightness])
  const radiosDraw = useMemo(() => radiosOn * radioDraw, [radiosOn])
  const totalDraw = useMemo(() => idleDraw + displayDraw + radiosDraw, [displayDraw, radiosDraw])
  const runtimeHours = useMemo(() => capacityWh / totalDraw, [capacityWh, totalDraw])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Laptop Battery Runtime Calculator</h3>
        <p className="text-sm text-soft">
          Domain 1.1 — adjust battery capacity and power draw to see how estimated runtime responds.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Battery capacity</span>
            <span className="font-mono text-ink font-medium">{capacityWh} Wh</span>
          </div>
          <input
            type="range" aria-label="Battery capacity"
            min={30}
            max={99}
            step={1}
            value={capacityWh}
            onChange={(e) => setCapacityWh(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Screen brightness</span>
            <span className="font-mono text-ink font-medium">{brightness}%</span>
          </div>
          <input
            type="range" aria-label="Screen brightness"
            min={0}
            max={100}
            step={5}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Active radios</span>
            <span className="font-mono text-ink font-medium">{radiosOn} of 3</span>
          </div>
          <input
            type="range" aria-label="Active radios"
            min={0}
            max={3}
            step={1}
            value={radiosOn}
            onChange={(e) => setRadiosOn(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Total power draw</p>
          <p className="font-mono text-xl font-semibold text-ink">{totalDraw.toFixed(1)} W</p>
          <p className="text-[11px] text-faint mt-1 font-mono">
            {idleDraw} + {displayDraw.toFixed(1)} + {radiosDraw.toFixed(1)}
          </p>
        </div>
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Formula</p>
          <p className="text-[11px] text-soft leading-snug">idle + (brightness × 0.07) + (radios × 1.2)</p>
        </div>
        <div className="rounded-crisp border-l-2 border-accent bg-accent-tint px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Estimated runtime</p>
          <p className="font-mono text-xl font-semibold text-accent">{runtimeHours.toFixed(1)} hrs</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This is a simplified model, but the exam-relevant point is real: display backlight and radios (Wi-Fi,
        Bluetooth, cellular) are the two biggest software-adjustable drains on a laptop battery. When a customer asks
        how to extend battery life, dimming the screen and disabling unused radios are the first two things to check
        — before recommending a battery replacement.
      </div>
    </div>
  )
}
