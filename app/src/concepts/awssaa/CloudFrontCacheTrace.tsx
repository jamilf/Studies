import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 40, y: 120, label: 'Viewer Request', detail: 'A viewer sends a GET request, which DNS routes to the nearest CloudFront edge location instead of the origin.' },
  { x: 160, y: 45, label: 'Edge Cache Check', detail: "The edge location computes the request's cache key (by default the URL, optionally including headers, cookies, or query strings you configure) and checks whether a valid object is already cached." },
  { x: 300, y: 120, label: 'Origin Fetch (Cache Miss)', detail: 'On a miss (or an expired TTL), the edge location forwards the request to the origin — S3, an ALB, or a custom origin — to retrieve a fresh copy.' },
  { x: 160, y: 195, label: 'Edge Cache Store', detail: "The response is stored at the edge and its freshness is governed by the object's Cache-Control/Expires headers, or the distribution's default/min/max TTL if the origin sets none." },
  { x: 420, y: 120, label: 'Response to Viewer', detail: 'The (now cached) object is served to the viewer. The next request for the same cache key from anyone near that edge location is served directly from cache — no origin round trip.' },
]

export default function CloudFrontCacheTrace() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1700)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">CloudFront Cache Request Trace</h3>
          <p className="text-sm text-soft">Domain 3.4 — watch a request travel from viewer to edge to origin and back.</p>
        </div>
        <button
          onClick={() => {
            if (step >= WAYPOINTS.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : step >= WAYPOINTS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[200px]">
        <svg viewBox="0 0 460 220" className="w-full h-52" aria-hidden>
          <polyline points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')} className="fill-none stroke-line-strong" strokeWidth="1.5" strokeDasharray="4 3" />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[9px] font-medium">
                {p.label}
              </text>
            </g>
          ))}
          <circle cx={w.x} cy={w.y} r="9" className="fill-none stroke-accent transition-all duration-700 ease-out" strokeWidth="2.5" />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Shortening the cache key (fewer headers/cookies/query strings included) raises the cache hit ratio; a longer,
        more specific key improves personalization but increases origin load. Setting a longer TTL reduces origin
        fetches but risks serving stale content longer.
      </div>
    </div>
  )
}
