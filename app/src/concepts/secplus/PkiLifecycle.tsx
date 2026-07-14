import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Requester' | 'CA' | 'Browser/Client'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Generate key pair',
    who: 'Requester',
    detail:
      'The server (or user) generates a public/private key pair locally. The private key never leaves this machine — that single fact is why the rest of the chain can be trusted.',
  },
  {
    title: 'Submit a CSR',
    who: 'Requester',
    detail:
      'A Certificate Signing Request bundles the public key plus identity info (domain name, org) and is sent to a Certificate Authority. The private key is not included.',
  },
  {
    title: 'CA validates identity',
    who: 'CA',
    detail:
      'The CA checks that the requester actually controls the domain/identity claimed (domain validation, org validation, or extended validation depending on cert type).',
  },
  {
    title: 'CA signs the certificate',
    who: 'CA',
    detail:
      "The CA creates the certificate (public key + identity + validity dates) and signs it with the CA's own private key, cryptographically vouching for it.",
  },
  {
    title: 'Deploy the certificate',
    who: 'Requester',
    detail:
      'The signed certificate is installed on the server alongside the (still-secret) private key, ready to prove identity and support TLS key exchange.',
  },
  {
    title: 'Client validates the chain',
    who: 'Browser/Client',
    detail:
      "A connecting browser checks the certificate's signature against the issuing CA, and that CA's certificate against ITS issuer, all the way up to a root CA already trusted by the OS/browser. This is the chain of trust.",
  },
  {
    title: 'Renew or revoke',
    who: 'Requester',
    detail:
      'Before expiration, the cycle repeats (renew). If the private key is ever compromised, the CA revokes the certificate — published via a CRL (a downloadable list) or checked live via OCSP.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Requester: 'bg-accent text-paper',
  CA: 'bg-warn text-paper',
  'Browser/Client': 'bg-good text-paper',
}

export default function PkiLifecycle() {
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
          <h3 className="font-display text-lg text-ink">Certificate lifecycle & chain of trust</h3>
          <p className="text-sm text-soft">Domain 1.4 — walk through issuance, deployment, and validation.</p>
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

      {/* Timeline track */}
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
              <span
                className={`text-[10px] text-center leading-tight transition-colors ${
                  i === active ? 'text-ink' : 'text-faint group-hover:text-soft'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active step detail */}
      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>
            {STEPS[active].who}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3">
          <p className="font-semibold text-ink mb-1">CRL (Certificate Revocation List)</p>
          <p className="text-soft">
            The CA publishes a downloadable list of every revoked certificate. Clients fetch and check it — simple,
            but the list grows and can be stale between updates.
          </p>
        </div>
        <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3">
          <p className="font-semibold text-ink mb-1">OCSP (Online Certificate Status Protocol)</p>
          <p className="text-soft">
            The client asks the CA in real time about one specific certificate. Faster and fresher than a CRL — and
            with <em>OCSP stapling</em>, the server fetches the answer itself so the client never has to contact the
            CA directly.
          </p>
        </div>
      </div>
    </div>
  )
}
