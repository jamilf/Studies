import { useMemo, useState } from 'react'

type YesNo = 'yes' | 'no'

interface Verdict {
  mode: string
  tint: 'accent' | 'good' | 'warn'
  reasoning: string
}

function evaluate(needsLanIdentity: YesNo, needsInternet: YesNo): Verdict {
  if (needsLanIdentity === 'yes') {
    return {
      mode: 'Bridged',
      tint: 'accent',
      reasoning:
        "Bridged mode connects the VM's virtual NIC directly to the host's physical NIC, so the VM gets its own IP address on the physical LAN (often via DHCP) and is reachable by other devices as if it were a separate physical machine.",
    }
  }
  if (needsInternet === 'yes') {
    return {
      mode: 'NAT',
      tint: 'good',
      reasoning:
        "NAT mode routes the VM's traffic out through the host's own IP address, translating it like a mini router. The VM can reach the internet/LAN outbound, but other devices on the physical network can't see or address it directly.",
    }
  }
  return {
    mode: 'Host-only / Internal',
    tint: 'warn',
    reasoning:
      "Host-only (internal) networking keeps the VM on a private virtual switch that never touches the physical NIC. It can talk to the host and other VMs on the same virtual switch, but has no path to the physical LAN or internet — ideal for isolated lab/test environments.",
  }
}

const TINT_CLASS: Record<Verdict['tint'], string> = {
  accent: 'border-accent bg-accent-tint text-accent',
  good: 'border-good bg-good-tint text-good',
  warn: 'border-warn bg-warn-tint text-warn',
}

export default function VirtualNetworkModePicker() {
  const [needsLanIdentity, setNeedsLanIdentity] = useState<YesNo>('no')
  const [needsInternet, setNeedsInternet] = useState<YesNo>('yes')

  const verdict = useMemo(() => evaluate(needsLanIdentity, needsInternet), [needsLanIdentity, needsInternet])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Virtual Switch Mode Picker</h3>
        <p className="text-sm text-soft">
          Domain 4.2 — answer two questions about a VM's networking needs to see which virtual switch mode fits.
        </p>
      </div>

      <div className="space-y-3">
        <Picker
          label="Does the VM need its own address reachable by other devices on the physical LAN?"
          value={needsLanIdentity}
          onChange={setNeedsLanIdentity}
        />
        <Picker
          label="Does the VM need outbound internet/LAN access at all?"
          value={needsInternet}
          onChange={setNeedsInternet}
        />
      </div>

      <div key={verdict.mode} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${TINT_CLASS[verdict.tint]}`}>
        <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Recommended mode</p>
        <p className="font-display text-2xl font-semibold">{verdict.mode}</p>
        <p className="text-sm text-ink mt-2 leading-relaxed">{verdict.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        All three modes route through a virtual switch created by the hypervisor, but they differ in visibility:
        bridged makes the VM a full peer on the physical network, NAT hides it behind the host's address while still
        allowing outbound traffic, and host-only/internal cuts it off from the physical network entirely.
      </div>
    </div>
  )
}

function Picker({ label, value, onChange }: { label: string; value: YesNo; onChange: (v: YesNo) => void }) {
  return (
    <div>
      <p className="text-sm text-soft mb-1.5">{label}</p>
      <div className="flex gap-2">
        {(['yes', 'no'] as YesNo[]).map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
              value === opt ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
