import { useMemo, useState } from 'react'

export default function PortSecurityRiskCalculator() {
  const [openPorts, setOpenPorts] = useState(2)
  const [firewallLevel, setFirewallLevel] = useState(1)
  const [vulnServices, setVulnServices] = useState(1)
  const [adminShares, setAdminShares] = useState(0)

  const riskScore = useMemo(() => {
    const raw = openPorts * 6 + (2 - firewallLevel) * 15 + vulnServices * 12 + adminShares * 10
    return Math.min(100, raw)
  }, [openPorts, firewallLevel, vulnServices, adminShares])

  const riskLabel = riskScore < 30 ? 'Low' : riskScore < 65 ? 'Moderate' : 'High'
  const riskBorder = riskScore < 30 ? 'border-good' : riskScore < 65 ? 'border-warn' : 'border-bad'
  const riskBg = riskScore < 30 ? 'bg-good-tint' : riskScore < 65 ? 'bg-warn-tint' : 'bg-bad-tint'
  const riskText = riskScore < 30 ? 'text-good' : riskScore < 65 ? 'text-warn' : 'text-bad'

  const firewallLabels = ['Off', 'Basic (default rules)', 'Custom, least-privilege rules']

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Workstation Port Exposure Calculator</h3>
        <p className="text-sm text-soft">Domain 2.9 — adjust firewall and port settings to see how workstation exposure changes.</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Inbound ports open beyond defaults (e.g. RDP 3389, Telnet 23, SMB 445)</span>
            <span className="font-mono text-ink">{openPorts}</span>
          </div>
          <input type="range" min={0} max={8} step={1} value={openPorts} onChange={(e) => setOpenPorts(Number(e.target.value))} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Firewall configuration</span>
            <span className="font-mono text-ink">{firewallLabels[firewallLevel]}</span>
          </div>
          <input type="range" min={0} max={2} step={1} value={firewallLevel} onChange={(e) => setFirewallLevel(Number(e.target.value))} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Unpatched/legacy services running (e.g. old SMBv1, Telnet daemon)</span>
            <span className="font-mono text-ink">{vulnServices}</span>
          </div>
          <input type="range" min={0} max={5} step={1} value={vulnServices} onChange={(e) => setVulnServices(Number(e.target.value))} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between text-xs text-soft mb-1">
            <span>Default admin shares (ADMIN$, C$) left enabled</span>
            <span className="font-mono text-ink">{adminShares === 1 ? 'Enabled' : 'Disabled'}</span>
          </div>
          <input type="range" min={0} max={1} step={1} value={adminShares} onChange={(e) => setAdminShares(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Formula</p>
          <p className="text-xs text-ink font-mono leading-relaxed">
            ports×6 + (2−firewall)×15 + vulnSvc×12 + adminShares×10
          </p>
        </div>
        <div className={`rounded-crisp border-l-2 ${riskBorder} ${riskBg} px-4 py-3`}>
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Exposure risk</p>
          <p className={`font-display text-lg font-semibold ${riskText}`}>{riskLabel} ({riskScore}/100)</p>
        </div>
      </div>

      <div key={riskScore} className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 animate-fadein text-sm text-soft">
        Every unnecessary open port is an attack surface, an unpatched legacy service on that port is an easy
        exploit target, a weak firewall configuration removes the last line of defense, and enabled default
        admin shares hand an attacker who does get in a ready-made path to every file on the drive.
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: workstation port security best practice is to close/disable anything not explicitly needed
        (deny by default), keep the firewall on with custom least-privilege rules instead of broad allow-all
        exceptions, and disable legacy protocols like Telnet and SMBv1 in favor of SSH and current SMB versions.
      </div>
    </div>
  )
}
