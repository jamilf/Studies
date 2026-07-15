import { useState } from 'react'

interface Layer {
  name: string
  scope: string
  detail: string
}

const LAYERS: Layer[] = [
  { name: 'AWS Shield Standard', scope: 'Automatic, free, all customers', detail: 'Enabled by default on every AWS account at no cost — protects against common, most-frequently-occurring network and transport layer (L3/L4) DDoS attacks like SYN floods.' },
  { name: 'AWS WAF', scope: 'Application layer (L7) rules', detail: 'A web application firewall you attach to CloudFront, ALB, API Gateway, or AppSync — filters requests with rules for SQL injection, XSS, rate limiting, and geo-blocking.' },
  { name: 'AWS Shield Advanced', scope: 'Paid, enhanced DDoS protection', detail: 'Adds near-real-time visibility, larger and more sophisticated attack detection, 24/7 access to the AWS DDoS Response Team (DRT), and cost protection against scaling charges during an attack.' },
  { name: 'AWS Firewall Manager', scope: 'Central policy, multi-account', detail: 'Centrally manages WAF rules, Shield Advanced protections, and security group policies across every account in an AWS Organization from a single place.' },
]

const COLOR = ['bg-heat-1', 'bg-heat-3', 'bg-heat-5', 'bg-heat-6']
const TEXT = ['text-ink', 'text-ink', 'text-paper', 'text-paper']

export default function WafShieldEdgeProtection() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">WAF, Shield &amp; Firewall Manager</h3>
        <p className="text-sm text-soft">Domain 1.2 — click a layer of AWS edge protection to see its scope.</p>
      </div>

      <div className="flex flex-col gap-1">
        {LAYERS.map((layer, i) => (
          <button
            key={layer.name}
            onClick={() => setSelected(i)}
            className={`w-full text-left rounded-crisp px-4 py-2 transition-all duration-200 ${COLOR[i]} ${TEXT[i]} ${
              selected === i ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.01]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-sm">{layer.name}</span>
              <span className="font-mono text-[11px] opacity-80">{layer.scope}</span>
            </div>
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{LAYERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Shield defends against volumetric/network-layer floods, WAF filters malicious application-layer requests,
        and Firewall Manager rolls both out consistently across every account — the exam often tests picking the
        one service that matches the described attack layer.
      </div>
    </div>
  )
}
