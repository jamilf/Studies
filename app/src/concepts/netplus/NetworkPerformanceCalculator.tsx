import { useMemo, useState } from 'react'

type Rating = 'good' | 'warn' | 'bad'

interface Verdict {
  rating: Rating
  label: string
}

function rateLatency(ms: number): Verdict {
  if (ms <= 50) return { rating: 'good', label: 'Fine for real-time apps' }
  if (ms <= 150) return { rating: 'warn', label: 'Noticeable in calls/gaming' }
  return { rating: 'bad', label: 'Real-time apps will suffer' }
}

function rateJitter(ms: number): Verdict {
  if (ms <= 10) return { rating: 'good', label: 'Smooth, stable delivery' }
  if (ms <= 30) return { rating: 'warn', label: 'Audio/video may stutter' }
  return { rating: 'bad', label: 'Jitter buffer will overflow' }
}

function rateLoss(pct: number): Verdict {
  if (pct <= 0.5) return { rating: 'good', label: 'Effectively lossless' }
  if (pct <= 2) return { rating: 'warn', label: 'Retransmits, minor artifacts' }
  return { rating: 'bad', label: 'Calls drop, TCP throughput collapses' }
}

function overallRating(latency: Verdict, jitter: Verdict, loss: Verdict): Verdict {
  const ratings = [latency.rating, jitter.rating, loss.rating]
  if (ratings.includes('bad')) return { rating: 'bad', label: 'Poor — unusable for VoIP/video' }
  if (ratings.includes('warn')) return { rating: 'warn', label: 'Marginal — degraded real-time experience' }
  return { rating: 'good', label: 'Good — real-time traffic will perform well' }
}

const RATING_CLASSES: Record<Rating, string> = {
  good: 'border-good bg-good-tint text-good',
  warn: 'border-warn bg-warn-tint text-warn',
  bad: 'border-bad bg-bad-tint text-bad',
}

export default function NetworkPerformanceCalculator() {
  const [latencyMs, setLatencyMs] = useState(40)
  const [jitterMs, setJitterMs] = useState(8)
  const [lossPct, setLossPct] = useState(0.5)

  const latency = useMemo(() => rateLatency(latencyMs), [latencyMs])
  const jitter = useMemo(() => rateJitter(jitterMs), [jitterMs])
  const loss = useMemo(() => rateLoss(lossPct), [lossPct])
  const overall = useMemo(() => overallRating(latency, jitter, loss), [latency, jitter, loss])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Latency, Jitter &amp; Packet Loss</h3>
        <p className="text-sm text-soft">
          Domain 5.5 — drag the sliders to see how the three core performance metrics combine into an overall
          verdict for real-time traffic.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Latency</span>
            <span className="font-mono">{latencyMs} ms</span>
          </div>
          <input type="range" aria-label="Latency, Jitter &amp; Packet Loss" min={0} max={300} step={5} value={latencyMs} onChange={(e) => setLatencyMs(Number(e.target.value))} className="w-full accent-accent" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Jitter</span>
            <span className="font-mono">{jitterMs} ms</span>
          </div>
          <input type="range" aria-label="Latency, Jitter &amp; Packet Loss" min={0} max={50} step={1} value={jitterMs} onChange={(e) => setJitterMs(Number(e.target.value))} className="w-full accent-accent" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Packet loss</span>
            <span className="font-mono">{lossPct.toFixed(1)}%</span>
          </div>
          <input type="range" aria-label="Latency, Jitter &amp; Packet Loss" min={0} max={10} step={0.1} value={lossPct} onChange={(e) => setLossPct(Number(e.target.value))} className="w-full accent-accent" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className={`rounded-crisp border-l-2 px-3 py-2 ${RATING_CLASSES[latency.rating]}`}>
          <p className="text-xs font-semibold">Latency</p>
          <p className="text-xs">{latency.label}</p>
        </div>
        <div className={`rounded-crisp border-l-2 px-3 py-2 ${RATING_CLASSES[jitter.rating]}`}>
          <p className="text-xs font-semibold">Jitter</p>
          <p className="text-xs">{jitter.label}</p>
        </div>
        <div className={`rounded-crisp border-l-2 px-3 py-2 ${RATING_CLASSES[loss.rating]}`}>
          <p className="text-xs font-semibold">Packet loss</p>
          <p className="text-xs">{loss.label}</p>
        </div>
      </div>

      <div className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${RATING_CLASSES[overall.rating]}`}>
        <p className="font-display text-2xl font-semibold">{overall.label}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Bulk file transfers tolerate latency and jitter reasonably well because TCP just retransmits and buffers.
        Real-time UDP traffic like VoIP and video conferencing is far less forgiving — it's the worst metric, not
        the average, that determines whether a call sounds broken.
      </div>
    </div>
  )
}
