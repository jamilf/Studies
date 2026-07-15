import { useEffect, useState } from 'react'

interface Step {
  title: string
  layer: 'Physical' | 'IP config' | 'Routing' | 'Name resolution'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Check the physical link',
    layer: 'Physical',
    detail: 'Confirm the NIC\'s link light is lit and the cable is fully seated at both ends. No link light means the problem is here — nothing above this layer matters yet.',
  },
  {
    title: 'Confirm the local IP configuration',
    layer: 'IP config',
    detail: 'Run ipconfig/ifconfig. A valid IP for the subnet is good; a 169.254.x.x APIPA address means the device never got a DHCP lease and is a strong clue in itself.',
  },
  {
    title: 'Ping the default gateway',
    layer: 'Routing',
    detail: 'If the local IP looks right, ping the gateway to confirm the device can at least reach the router on its own segment before blaming anything further out.',
  },
  {
    title: 'Ping a known external IP',
    layer: 'Routing',
    detail: 'Ping something like 8.8.8.8. Success here but failure resolving names isolates the problem to DNS rather than general connectivity.',
  },
  {
    title: 'Test name resolution',
    layer: 'Name resolution',
    detail: 'Ping or nslookup a hostname such as google.com. If the IP ping worked but the hostname doesn\'t resolve, DNS itself — not connectivity — is the fault.',
  },
  {
    title: 'Check the switch port and cabling',
    layer: 'Physical',
    detail: 'If everything upstream still fails, swap the patch cable and try a different switch port — a disabled port, bad VLAN assignment, or port security lockout can look identical to a dead NIC.',
  },
]

const LAYER_COLOR: Record<Step['layer'], string> = {
  Physical: 'bg-accent text-paper',
  'IP config': 'bg-warn text-paper',
  Routing: 'bg-good text-paper',
  'Name resolution': 'bg-heat-5 text-paper',
}

export default function WiredConnectivityTroubleshootingTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  const step = STEPS[active]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Wired Connectivity Troubleshooting</h3>
          <p className="text-sm text-soft">
            Domain 5.7 — step through diagnosing a "no network" wired connection from the cable outward.
          </p>
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
                  i <= active ? LAYER_COLOR[s.layer] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${LAYER_COLOR[step.layer]}`}>{step.layer}</span>
          <h4 className="font-semibold text-ink">{step.title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{step.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Work bottom-up through the OSI stack: physical link, then a valid local address, then routing to the
        gateway and beyond, then name resolution last. A failure at any step means you stop testing further up the
        stack until that step is fixed.
      </div>
    </div>
  )
}
