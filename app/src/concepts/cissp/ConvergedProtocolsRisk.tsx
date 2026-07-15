import { useState } from 'react'

export default function ConvergedProtocolsRisk() {
  const [after, setAfter] = useState<boolean>(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Securing Converged Voice (VoIP/SIP)</h3>
        <p className="text-sm text-soft">Domain 4.1 — toggle between an unsecured and a hardened SIP/VoIP deployment.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Before</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>After</span>
      </div>

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-2 ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'Hardened deployment' : 'Default / unsecured deployment'}
        </p>
        {after ? (
          <ul className="text-sm text-ink space-y-1 list-disc pl-4">
            <li>Signaling runs over SIPS (SIP over TLS), so call setup and caller ID cannot be read or spoofed in transit.</li>
            <li>Media streams use SRTP, encrypting the actual voice payload against eavesdropping.</li>
            <li>Voice traffic sits on its own VLAN, separated from data traffic and firewalled at a session border controller.</li>
            <li>Phones and PBX admin interfaces require strong, unique credentials — no vendor default passwords.</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink space-y-1 list-disc pl-4">
            <li>SIP signaling is sent in plaintext, letting an attacker on the path see or forge call setup and caller ID (vishing setup).</li>
            <li>RTP media is unencrypted, so voice conversations can be captured and replayed off the wire.</li>
            <li>Voice and data share the same flat network, letting a compromised workstation reach the phone system directly.</li>
            <li>Default credentials on phones or the PBX enable toll fraud — an attacker routes billable calls through the org's trunk.</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        VoIP is a "converged protocol" because it carries a traditionally separate service (telephony) over the same
        IP network as everything else — that convenience is exactly what expands the attack surface unless voice
        gets its own segmentation and encryption, not just a shared, trusted LAN.
      </div>
    </div>
  )
}
