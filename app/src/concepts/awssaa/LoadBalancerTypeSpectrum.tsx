import { useState } from 'react'

interface Tier {
  name: string
  layer: number
  throughput: number
  flexibility: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'Classic LB', layer: 3, throughput: 2, flexibility: 1, desc: 'Legacy load balancer supporting both L4 and basic L7 routing — AWS no longer recommends it for new workloads; kept mainly for old EC2-Classic setups.' },
  { name: 'Application LB', layer: 5, throughput: 3, flexibility: 5, desc: 'Layer 7 (HTTP/HTTPS) — routes by path, host header, or query string, supports WebSockets, and integrates with ECS/EKS target groups. The default choice for web applications.' },
  { name: 'Network LB', layer: 2, throughput: 5, flexibility: 2, desc: 'Layer 4 (TCP/UDP/TLS) — handles millions of requests per second with ultra-low latency, supports a static IP / Elastic IP per AZ, and preserves the client source IP.' },
  { name: 'Gateway LB', layer: 1, throughput: 4, flexibility: 3, desc: 'Layer 3 (GENEVE on port 6081) — transparently inserts third-party virtual appliances (firewalls, IDS/IPS) inline into the traffic path for inspection.' },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function LoadBalancerTypeSpectrum() {
  const [selected, setSelected] = useState(1)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Elastic Load Balancer Types</h3>
        <p className="text-sm text-soft">Domain 2.2 — slide across ELB types to compare OSI layer, throughput, and routing flexibility.</p>
      </div>

      <input type="range" min={0} max={TIERS.length - 1} step={1} value={selected} onChange={(e) => setSelected(Number(e.target.value))} className="w-full" />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button key={tier.name} onClick={() => setSelected(i)} className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`} style={{ width: `${100 / TIERS.length}%` }}>
            {tier.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">OSI layer focus</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.layer ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Raw throughput</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.throughput ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Routing flexibility</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.flexibility ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Layer, not brand name, is the exam signal: HTTP path/host routing → ALB; extreme throughput, static IP, or
        raw TCP/UDP → NLB; inline third-party network appliances → GWLB.
      </div>
    </div>
  )
}
