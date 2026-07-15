import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Client' | 'Local DNS' | 'Public DNS'
  detail: string
}

const STEPS: Step[] = [
  { title: 'Confirm the symptom', who: 'Client', detail: 'A browser or app reports "server not found" — first try pinging the FQDN. If ping also fails to resolve a name, the problem is DNS, not general connectivity.' },
  { title: 'Query DNS directly', who: 'Client', detail: 'Run nslookup <fqdn> or dig <fqdn> to ask a resolver for the record directly, bypassing the browser and OS cache entirely.' },
  { title: 'Target the internal resolver', who: 'Local DNS', detail: 'Repeat the lookup against the internal DNS server explicitly, e.g. nslookup <fqdn> <internal-dns-ip>, to see whether it can answer at all.' },
  { title: 'Target a public resolver', who: 'Public DNS', detail: 'Run dig @8.8.8.8 <fqdn> (or nslookup <fqdn> 8.8.8.8) against a known-good public resolver to isolate whether the fault is local or upstream.' },
  { title: 'Compare the results', who: 'Client', detail: 'If the public resolver returns a good answer but the internal one doesn\'t, the internal DNS server has a stale/missing record, a failed zone transfer, or is down. If neither resolves, the problem is likely authoritative or upstream.' },
  { title: 'Flush and retest', who: 'Client', detail: 'Once the record is fixed, flush the local resolver cache (ipconfig /flushdns or systemd-resolve --flush-caches) so the client stops using the old cached answer.' },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Client: 'bg-accent text-paper',
  'Local DNS': 'bg-warn text-paper',
  'Public DNS': 'bg-good text-paper',
}

export default function DnsTroubleshootingFlow() {
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

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">DNS Troubleshooting with nslookup/dig</h3>
          <p className="text-sm text-soft">
            Domain 5.3 — step through isolating a name-resolution failure to the internal or upstream DNS server.
          </p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors shrink-0"
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
        nslookup and dig both bypass application and OS-level caching to query a resolver directly, which is exactly
        what separates a "the website is down" report from "DNS is broken" — and pointing the query at different
        servers is how you find out which DNS server is at fault.
      </div>
    </div>
  )
}
