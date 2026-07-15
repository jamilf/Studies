import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Client' | 'Server'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Discover',
    who: 'Client',
    detail: 'The client broadcasts a DHCPDISCOVER to 255.255.255.255 because it has no IP address yet and does not know where a DHCP server lives.',
  },
  {
    title: 'Offer',
    who: 'Server',
    detail: 'Any DHCP server that hears the discover responds with a DHCPOFFER proposing an IP address, subnet mask, lease time, and other options (default gateway, DNS servers).',
  },
  {
    title: 'Request',
    who: 'Client',
    detail: 'The client broadcasts a DHCPREQUEST naming the offer it accepts. Broadcasting it also tells any other servers that offered that their offer was not chosen.',
  },
  {
    title: 'Acknowledge',
    who: 'Server',
    detail: 'The chosen server confirms with a DHCPACK, finalizing the lease. The client binds the address, gateway, and DNS settings and can now use the network.',
  },
  {
    title: 'Renew',
    who: 'Client',
    detail: 'At the T1 timer (50% of the lease), the client unicasts a DHCPREQUEST directly to the server to renew the same address before it expires, restarting the lease clock without a fresh DORA exchange.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = { Client: 'bg-accent text-paper', Server: 'bg-good text-paper' }

export default function DhcpLeaseTimeline() {
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
          <h3 className="font-display text-lg text-ink">DHCP Lease Process (DORA)</h3>
          <p className="text-sm text-soft">Domain 2.2 — step through Discover, Offer, Request, Acknowledge, and the later renewal.</p>
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
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>{STEPS[active].who}</span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        DORA repeats in full only when a client has no valid lease. Renewal at T1 is a lightweight two-message
        exchange directly with the same server — it only falls back to a broadcast DHCPDISCOVER if that server does
        not respond by T2 (87.5% of the lease).
      </div>
    </div>
  )
}
