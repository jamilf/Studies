import { useState } from 'react'

export default function SdnControlPlaneToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Traditional Control Plane vs SDN</h3>
        <p className="text-sm text-soft">
          Domain 1.7 — toggle to see where forwarding decisions get made, before and after centralizing control.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Traditional</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>SDN</span>
      </div>

      <div
        key={after ? 'after' : 'before'}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-warn bg-warn-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-warn'}`}>
          {after ? 'SDN — Centralized Control Plane' : 'Traditional — Distributed Control Plane'}
        </p>
        {after ? (
          <ul className="text-sm text-ink mt-2 space-y-1.5 list-disc list-inside">
            <li>An SDN controller holds the network-wide view and makes all forwarding decisions</li>
            <li>Southbound API (e.g. OpenFlow) pushes flow tables down to switches, which just forward packets</li>
            <li>Northbound APIs let orchestration tools and applications program the network directly</li>
            <li>A policy change is written once, in software, and applied everywhere at once</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink mt-2 space-y-1.5 list-disc list-inside">
            <li>Every router and switch bundles its own control plane and data plane together</li>
            <li>Each device runs its own routing protocol instance and decides forwarding independently</li>
            <li>Configuration is per-device, typically via CLI, one SSH session at a time</li>
            <li>A network-wide policy change means touching every affected device one at a time</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        SDN does not replace routers and switches — it separates the decision-making (control plane) from the
        packet-forwarding hardware (data plane), so the whole network can be programmed and managed from one place.
      </div>
    </div>
  )
}
