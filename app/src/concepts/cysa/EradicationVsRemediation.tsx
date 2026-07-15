export default function EradicationVsRemediation() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Eradication vs. Remediation</h3>
        <p className="text-sm text-soft">Domain 3.2 — two phases that sound similar but answer different questions.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-accent-line bg-accent-tint/50 p-4">
          <p className="text-sm font-semibold text-accent mb-2">Eradication</p>
          <p className="text-xs text-soft mb-3">"Is the attacker's presence gone from this incident?" — happens during containment/eradication/recovery, on this incident's timeline.</p>
          <p className="text-xs font-semibold text-ink mb-1">Typical actions</p>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside mb-3">
            <li>Delete malware, webshells, and dropped tools from affected hosts</li>
            <li>Disable or reset credentials the attacker used or created</li>
            <li>Remove the specific persistence mechanism (scheduled task, registry run key, rogue service)</li>
          </ul>
          <p className="text-xs font-semibold text-ink mb-1">Owner &amp; timing</p>
          <p className="text-sm text-soft">IR team, during active response — measured in hours to a couple of days.</p>
        </div>

        <div className="rounded-crisp border border-warn-line bg-warn-tint/50 p-4">
          <p className="text-sm font-semibold text-warn mb-2">Remediation</p>
          <p className="text-xs text-soft mb-3">"How do we make sure this class of incident can't happen again?" — usually a post-incident, longer-term fix.</p>
          <p className="text-xs font-semibold text-ink mb-1">Typical actions</p>
          <ul className="text-sm text-soft space-y-1 list-disc list-inside mb-3">
            <li>Patch the vulnerability the attacker actually exploited, everywhere it exists</li>
            <li>Fix the underlying misconfiguration (open port, weak ACL, missing MFA)</li>
            <li>Update processes, training, or tooling identified in root cause analysis</li>
          </ul>
          <p className="text-xs font-semibold text-ink mb-1">Owner &amp; timing</p>
          <p className="text-sm text-soft">System/vulnerability owners, post-incident — measured in days to weeks, tracked like any other change.</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Eradication closes out this incident; remediation closes out the reason it happened. A team that eradicates
        the malware but skips remediation will patch nothing — and see the same exploit succeed again next month.
      </div>
    </div>
  )
}
