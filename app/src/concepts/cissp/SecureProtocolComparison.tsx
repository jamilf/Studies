import { useMemo, useState } from 'react'

type UseCase = 'admin' | 'web' | 'site' | 'host'

interface Verdict {
  protocol: string
  layer: string
  port: string
  rationale: string
}

const USE_CASE_LABEL: Record<UseCase, string> = {
  admin: 'Remote CLI administration',
  web: 'Web / application traffic',
  site: 'Site-to-site network link',
  host: 'Host-to-host VPN tunnel',
}

const VERDICTS: Record<UseCase, Verdict> = {
  admin: {
    protocol: 'SSH',
    layer: 'Application layer',
    port: 'TCP/22',
    rationale: 'SSH gives an authenticated, encrypted interactive shell plus port forwarding and secure file copy (SCP/SFTP) — the standard way to administer routers, switches, and servers remotely.',
  },
  web: {
    protocol: 'TLS',
    layer: 'Presentation layer (wraps application traffic)',
    port: 'TCP/443 (HTTPS)',
    rationale: 'TLS encrypts and authenticates a single application session end to end — it is what turns HTTP into HTTPS, and is equally used to secure email (SMTPS/IMAPS) and other app protocols.',
  },
  site: {
    protocol: 'IPsec (tunnel mode)',
    layer: 'Network layer',
    port: 'UDP/500 (IKE), ESP protocol 50',
    rationale: 'Operating at the network layer, IPsec transparently encrypts every packet between two gateways regardless of the application generating the traffic — the standard for site-to-site VPNs between offices.',
  },
  host: {
    protocol: 'IPsec (transport mode)',
    layer: 'Network layer',
    port: 'UDP/500 (IKE), ESP protocol 50',
    rationale: 'Transport mode encrypts only the payload (not the whole packet header), which is more efficient than tunnel mode when both endpoints are hosts rather than gateways.',
  },
}

export default function SecureProtocolComparison() {
  const [useCase, setUseCase] = useState<UseCase>('admin')
  const verdict = useMemo(() => VERDICTS[useCase], [useCase])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Which Secure Protocol Fits?</h3>
        <p className="text-sm text-soft">Domain 4.3 — pick a use case to see which secure channel protocol it calls for and why.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(USE_CASE_LABEL) as UseCase[]).map((k) => (
          <button
            key={k}
            onClick={() => setUseCase(k)}
            className={`rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
              useCase === k ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {USE_CASE_LABEL[k]}
          </button>
        ))}
      </div>

      <div key={useCase} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein space-y-1.5">
        <p className="font-display text-lg font-semibold text-accent">{verdict.protocol}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Layer:</span> {verdict.layer}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Port/protocol:</span> {verdict.port}</p>
        <p className="text-sm text-ink">{verdict.rationale}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        SSH, TLS, and IPsec all provide confidentiality and integrity, but at different layers and scopes — SSH and
        TLS secure a single application session, while IPsec secures everything between two endpoints regardless of
        the application, which is why it's the default choice for network-to-network VPNs.
      </div>
    </div>
  )
}
