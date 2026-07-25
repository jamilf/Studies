import { useMemo, useState } from 'react'

export default function VulnManagementKpiCalculator() {
  const [found, setFound] = useState<number>(120)
  const [remediatedOnTime, setRemediatedOnTime] = useState<number>(84)
  const [avgDetectDays, setAvgDetectDays] = useState<number>(6)
  const [avgRemediateDays, setAvgRemediateDays] = useState<number>(18)

  const cappedRemediated = Math.min(remediatedOnTime, found)

  const slaCompliance = useMemo(
    () => (found === 0 ? 0 : Math.round((cappedRemediated / found) * 1000) / 10),
    [cappedRemediated, found],
  )

  const complianceStyle = useMemo(() => {
    if (slaCompliance >= 90) return 'border-good bg-good-tint text-good'
    if (slaCompliance >= 70) return 'border-warn bg-warn-tint text-warn'
    return 'border-bad bg-bad-tint text-bad'
  }, [slaCompliance])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Vulnerability Management KPI Calculator</h3>
        <p className="text-sm text-soft">Domain 4.1 — adjust scan and remediation figures to see the KPIs a vulnerability report would surface.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Vulnerabilities found this cycle</span>
            <span className="font-mono text-ink font-medium">{found}</span>
          </div>
          <input type="range" aria-label="Vulnerabilities found this cycle" min={10} max={500} step={5} value={found} onChange={(e) => setFound(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Remediated within SLA</span>
            <span className="font-mono text-ink font-medium">{cappedRemediated}</span>
          </div>
          <input type="range" aria-label="Remediated within SLA" min={0} max={found} step={1} value={cappedRemediated} onChange={(e) => setRemediatedOnTime(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Avg. days to detect</span>
            <span className="font-mono text-ink font-medium">{avgDetectDays}d</span>
          </div>
          <input type="range" aria-label="Avg. days to detect" min={0} max={30} step={1} value={avgDetectDays} onChange={(e) => setAvgDetectDays(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Avg. days to remediate</span>
            <span className="font-mono text-ink font-medium">{avgRemediateDays}d</span>
          </div>
          <input type="range" aria-label="Avg. days to remediate" min={0} max={90} step={1} value={avgRemediateDays} onChange={(e) => setAvgRemediateDays(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className={`rounded-crisp border-l-2 px-4 py-3 text-center ${complianceStyle}`}>
          <p className="font-mono text-2xl font-semibold">{slaCompliance}%</p>
          <p className="text-xs mt-1">SLA Compliance</p>
          <p className="text-[10px] font-mono mt-1 opacity-70">remediated / found</p>
        </div>
        <div className="rounded-crisp border-l-2 border-line-strong bg-wash px-4 py-3 text-center">
          <p className="font-mono text-2xl font-semibold text-ink">{avgDetectDays}d</p>
          <p className="text-xs text-soft mt-1">Mean Time to Detect (MTTD)</p>
        </div>
        <div className="rounded-crisp border-l-2 border-line-strong bg-wash px-4 py-3 text-center">
          <p className="font-mono text-2xl font-semibold text-ink">{avgRemediateDays}d</p>
          <p className="text-xs text-soft mt-1">Mean Time to Remediate (MTTR)</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A good vulnerability report leads with metrics like these, not a raw list of CVEs — SLA compliance shows
        whether the patching process is keeping pace, while MTTD and MTTR separate "how fast do we find problems"
        from "how fast do we fix them," which point to two different teams to improve.
      </div>
    </div>
  )
}
