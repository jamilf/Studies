import { useState } from 'react'

interface Tier {
  name: string
  summary: string
  detail: string
}

const TIERS: Tier[] = [
  {
    name: 'VNC (Virtual Network Computing)',
    summary: 'Basic screen sharing',
    detail: 'Cross-platform remote screen sharing. Simple to set up, but encryption and authentication strength vary a lot by implementation — some VNC servers transmit with weak or no encryption by default.',
  },
  {
    name: 'RDP (Remote Desktop Protocol)',
    summary: 'Built into Windows Pro+',
    detail: 'Microsoft\'s native remote desktop protocol, encrypted by default and listening on port 3389. Widely used for direct Windows-to-Windows remote sessions.',
  },
  {
    name: 'Third-party remote support software',
    summary: 'Helpdesk-style tools',
    detail: 'Dedicated remote-support applications add features like session recording, in-band chat, file transfer, and often multi-factor authentication — common for helpdesk and MSP support sessions.',
  },
  {
    name: 'SSH (Secure Shell)',
    summary: 'Encrypted CLI access',
    detail: 'Encrypted command-line remote access, typically on port 22. The standard for administering servers and network gear rather than interacting with a graphical desktop.',
  },
  {
    name: 'RMM (Remote Monitoring and Management)',
    summary: 'Agent-based fleet management',
    detail: 'An installed agent lets technicians proactively monitor, patch, alert on, and remotely control many endpoints at once — built for managing a fleet, not just one ad hoc session.',
  },
  {
    name: 'VPN (Virtual Private Network)',
    summary: 'Network-level secure tunnel',
    detail: 'Creates an encrypted tunnel that extends a remote host onto the corporate network itself. Many of the tools above are only considered secure enough for sensitive use when carried over a VPN tunnel.',
  },
]

const HEAT = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6']
const HEAT_TEXT = ['text-ink', 'text-ink', 'text-ink', 'text-paper', 'text-paper', 'text-paper']

export default function RemoteAccessLadder() {
  const [selected, setSelected] = useState(1)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Remote Access Technology Ladder</h3>
        <p className="text-sm text-soft">Domain 4.9 — click a tier to compare remote access technologies from simple screen sharing to a full network tunnel.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            style={{ width: `${40 + (i / (TIERS.length - 1)) * 55}%` }}
            className={`transition-all duration-300 rounded-crisp py-2.5 text-center text-sm font-semibold ${HEAT[i]} ${HEAT_TEXT[i]} ${
              i === selected ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-[1.02]' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div key={selected} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${HEAT[selected]} ${HEAT_TEXT[selected]}`}>
            {TIERS[selected].summary}
          </span>
          <h4 className="font-semibold text-ink">{TIERS[selected].name}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{TIERS[selected].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: know each protocol's default port and encryption posture (RDP 3389, SSH 22) and recognize that
        VPN is usually the transport layer that makes the others safe to use over an untrusted network, not a
        competing remote-control tool itself.
      </div>
    </div>
  )
}
