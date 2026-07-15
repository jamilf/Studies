import { useEffect, useState } from 'react'

const PHASES = [
  { label: 'Log sources generate events', caption: 'Endpoints, servers, network devices, and applications each generate raw log events locally — authentication attempts, firewall drops, process starts, and more.' },
  { label: 'Agents forward the logs', caption: 'Lightweight collector agents (or syslog) ship those raw events off the host in near real time, so an attacker who compromises the host can\'t also erase the evidence.' },
  { label: 'SIEM ingests and normalizes', caption: 'The SIEM parses each source\'s different log format into a common schema and timestamps everything to a single clock, so events from unrelated systems can be compared side by side.' },
  { label: 'Correlation & analysis', caption: 'Correlation rules and behavioral analytics (UEBA) look across the normalized stream for patterns a single log line would never reveal — like one account failing login on ten hosts in one minute.' },
  { label: 'Alert & triage', caption: 'A matching pattern raises an alert, which lands in the SOC analyst\'s queue for triage, investigation, and — if confirmed — escalation into the incident response process.' },
]

export default function LogMonitoringPipelineDiagram() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 2000)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">The Logging & Monitoring Pipeline</h3>
          <p className="text-sm text-soft">Domain 7.2 — step through how a raw log event becomes an analyst's alert.</p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-8 min-h-[200px]">
        <svg viewBox="0 0 600 170" className="w-full h-44" aria-hidden>
          <defs>
            <marker id="lmarrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-line-strong" />
            </marker>
          </defs>

          <g className={`transition-opacity duration-700 ${phase >= 0 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="10" y="65" width="90" height="40" rx="4" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
            <text x="55" y="89" textAnchor="middle" className="fill-ink text-[9px] font-medium">Log Sources</text>
          </g>

          <line x1="105" y1="85" x2="150" y2="85" markerEnd="url(#lmarrow)" className={`stroke-line-strong transition-opacity duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} strokeWidth="1.5" />

          <g className={`transition-opacity duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="155" y="65" width="90" height="40" rx="4" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
            <text x="200" y="89" textAnchor="middle" className="fill-ink text-[9px] font-medium">Collector Agent</text>
          </g>

          <line x1="250" y1="85" x2="295" y2="85" markerEnd="url(#lmarrow)" className={`stroke-line-strong transition-opacity duration-700 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`} strokeWidth="1.5" />

          <g className={`transition-opacity duration-700 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="300" y="55" width="100" height="60" rx="4" className="fill-warn-tint stroke-warn" strokeWidth="1.5" />
            <text x="350" y="82" textAnchor="middle" className="fill-ink text-[9px] font-medium">SIEM</text>
            <text x="350" y="96" textAnchor="middle" className="fill-ink text-[8px]">normalize</text>
          </g>

          <line x1="400" y1="85" x2="445" y2="85" markerEnd="url(#lmarrow)" className={`stroke-line-strong transition-opacity duration-700 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`} strokeWidth="1.5" />

          <g className={`transition-opacity duration-700 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="450" y="15" width="110" height="50" rx="4" strokeDasharray="4 3" className="fill-none stroke-accent-line" strokeWidth="1.5" />
            <text x="455" y="10" className="fill-accent text-[8px] font-semibold">Correlation / UEBA</text>
            <text x="505" y="45" textAnchor="middle" className="fill-ink text-[8px] font-medium">Pattern match</text>
          </g>

          <line x1="505" y1="65" x2="505" y2="115" markerEnd="url(#lmarrow)" className={`stroke-line-strong transition-opacity duration-700 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`} strokeWidth="1.5" />

          <g className={`transition-opacity duration-700 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="450" y="120" width="110" height="40" rx="4" className="fill-good-tint stroke-good" strokeWidth="1.5" />
            <text x="505" y="144" textAnchor="middle" className="fill-ink text-[9px] font-medium">SOC Analyst Alert</text>
          </g>
        </svg>
      </div>

      <div className="flex gap-2">
        {PHASES.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setPlaying(false)
              setPhase(i)
            }}
            className={`flex-1 rounded-crisp px-2 py-1.5 text-[11px] font-medium transition-colors border ${
              i === phase ? 'bg-accent-tint border-accent text-accent' : i < phase ? 'bg-wash border-line text-soft' : 'bg-surface border-line text-faint hover:text-ink'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm text-ink leading-relaxed animate-fadein">
        {PHASES[phase].caption}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Logging generates raw evidence; monitoring is what turns that evidence into a timely alert. Without
        normalization and correlation across sources, a SOC only sees isolated log lines — the pipeline is what
        makes cross-system attack patterns visible.
      </div>
    </div>
  )
}
