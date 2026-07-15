export default function HypervisorTypeComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Type 1 vs Type 2 Hypervisors</h3>
        <p className="text-sm text-soft">Domain 4.1 — bare-metal vs hosted virtualization, stacked to show what sits between the VM and the hardware.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-good-line bg-good-tint/40 p-4 space-y-3">
          <p className="text-sm font-semibold text-good">Type 1 — Bare Metal</p>
          <div className="space-y-1.5">
            <Layer label="VM" sub="Guest OS + apps" />
            <Layer label="VM" sub="Guest OS + apps" />
            <Layer label="Hypervisor" sub="ESXi, Hyper-V, XenServer — runs directly on hardware" emphasized />
            <Layer label="Physical hardware" sub="CPU / RAM / storage / NICs" muted />
          </div>
          <p className="text-[11px] text-soft leading-snug border-t border-line pt-2">
            No host OS in the way — the hypervisor <em>is</em> the OS layer. Lower overhead, better performance and
            security isolation. Standard for production servers and datacenters.
          </p>
        </div>

        <div className="rounded-crisp border border-warn-line bg-warn-tint/40 p-4 space-y-3">
          <p className="text-sm font-semibold text-warn">Type 2 — Hosted</p>
          <div className="space-y-1.5">
            <Layer label="VM" sub="Guest OS + apps" />
            <Layer label="VM" sub="Guest OS + apps" />
            <Layer label="Hypervisor" sub="VirtualBox, VMware Workstation/Fusion, Parallels — an application" emphasized />
            <Layer label="Host OS" sub="Windows, macOS, Linux — a full OS underneath" muted />
            <Layer label="Physical hardware" sub="CPU / RAM / storage / NICs" muted />
          </div>
          <p className="text-[11px] text-soft leading-snug border-t border-line pt-2">
            Runs as a program on top of a normal desktop OS. Easy to install and use, but every VM's I/O passes
            through the host OS too — more overhead. Standard for developer/test sandboxes on a laptop or desktop.
          </p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam tell: if the scenario is a datacenter or production server consolidation, it's Type 1 (bare metal,
        no host OS). If the scenario is "a developer wants to test another OS on their existing Windows/Mac laptop,"
        it's Type 2 (hosted, runs as an app on top of that laptop's OS).
      </div>
    </div>
  )
}

function Layer({ label, sub, emphasized, muted }: { label: string; sub: string; emphasized?: boolean; muted?: boolean }) {
  return (
    <div
      className={`rounded-crisp border px-3 py-2 ${
        emphasized ? 'border-accent bg-accent-tint' : muted ? 'border-line bg-wash' : 'border-line bg-surface'
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span className={`text-xs font-semibold ${emphasized ? 'text-accent' : 'text-ink'}`}>{label}</span>
        <span className="text-[10px] text-faint">{sub}</span>
      </div>
    </div>
  )
}
