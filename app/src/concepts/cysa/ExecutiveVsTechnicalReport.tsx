import { useState } from 'react'

export default function ExecutiveVsTechnicalReport() {
  const [technical, setTechnical] = useState<boolean>(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Executive Summary vs. Technical Report</h3>
        <p className="text-sm text-soft">Domain 4.1 — toggle between the two audiences a single vulnerability finding gets written for.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!technical ? 'text-ink' : 'text-faint'}`}>Executive</span>
        <button
          onClick={() => setTechnical((t) => !t)}
          className={`relative h-6 w-11 rounded-full transition-colors ${technical ? 'bg-accent' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${technical ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${technical ? 'text-ink' : 'text-faint'}`}>Technical</span>
      </div>

      <div key={technical ? 'technical' : 'executive'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${technical ? 'border-accent bg-accent-tint' : 'border-good bg-good-tint'}`}>
        {technical ? (
          <>
            <p className="font-display text-lg font-semibold text-accent">Technical Report</p>
            <ul className="text-sm text-ink mt-2 space-y-1 list-disc list-inside">
              <li>CVE ID, CVSS vector string, and affected software/version</li>
              <li>Exact hosts, IPs, and ports where the finding was confirmed</li>
              <li>Proof-of-concept detail, exploitability, and required remediation steps</li>
              <li>Written for the engineers who will actually apply the fix</li>
            </ul>
          </>
        ) : (
          <>
            <p className="font-display text-lg font-semibold text-good">Executive Summary</p>
            <ul className="text-sm text-ink mt-2 space-y-1 list-disc list-inside">
              <li>Business risk in plain language — what could happen, and to what asset or data</li>
              <li>Trend metrics: overall risk posture, SLA compliance, cost/effort to fix</li>
              <li>A short, prioritized ask: budget, headcount, or a go/no-go decision</li>
              <li>Written for leadership who need to decide, not to patch</li>
            </ul>
          </>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Same underlying finding, two different jobs: the technical report has to be precise enough to act on, while
        the executive summary has to be short enough to be read — CS0-003 expects you to know which one to hand to
        which audience, not just that both exist.
      </div>
    </div>
  )
}
