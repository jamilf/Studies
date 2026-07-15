import { useState } from 'react'

export default function SgVsNaclComparison() {
  const [returnTrafficTest, setReturnTrafficTest] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Security Groups vs Network ACLs</h3>
        <p className="text-sm text-soft">Domain 3.1 — instance-level vs subnet-level filtering, and what "stateful" actually buys you.</p>
      </div>

      <button
        onClick={() => setReturnTrafficTest((s) => !s)}
        className={`w-full rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
          returnTrafficTest ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
        }`}
      >
        {returnTrafficTest ? 'Simulating inbound request + its return traffic — click to reset' : 'Simulate: allow one inbound request, then watch its reply'}
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">Security Group</h4>
          <dl className="text-xs space-y-1.5 font-mono text-ink">
            <div className="flex justify-between"><dt className="text-soft font-sans">Applies to</dt><dd>ENI / instance level</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">State</dt><dd>Stateful</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Rule types</dt><dd>Allow only (implicit deny)</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Evaluation</dt><dd>All rules evaluated, most permissive wins</dd></div>
          </dl>
          <div
            className={`rounded-crisp px-3 py-2 text-xs transition-colors ${
              returnTrafficTest ? 'bg-good-tint border border-good-line text-good' : 'bg-surface border border-line text-faint'
            }`}
          >
            {returnTrafficTest
              ? 'Inbound rule allows port 443 in. The reply traffic is automatically permitted back out — no outbound rule needed, because the SG tracks connection state.'
              : 'No test running. A stateful SG only needs an inbound rule; it remembers the connection to auto-allow the reply.'}
          </div>
          <p className="text-[11px] text-faint">Think of it as a firewall around the instance's network interface.</p>
        </div>

        <div className="rounded-crisp border border-line bg-wash p-4 space-y-3">
          <h4 className="font-display font-semibold text-ink">Network ACL</h4>
          <dl className="text-xs space-y-1.5 font-mono text-ink">
            <div className="flex justify-between"><dt className="text-soft font-sans">Applies to</dt><dd>Subnet level</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">State</dt><dd>Stateless</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Rule types</dt><dd>Allow AND Deny</dd></div>
            <div className="flex justify-between"><dt className="text-soft font-sans">Evaluation</dt><dd>Rule number order, first match wins</dd></div>
          </dl>
          <div
            className={`rounded-crisp px-3 py-2 text-xs transition-colors ${
              returnTrafficTest ? 'bg-warn-tint border border-warn-line text-warn' : 'bg-surface border border-line text-faint'
            }`}
          >
            {returnTrafficTest
              ? 'Inbound rule allows port 443 in — but the NACL has no memory of that connection. Unless an OUTBOUND rule explicitly allows the ephemeral return ports, the reply is dropped.'
              : 'No test running. A stateless NACL evaluates every packet independently in both directions.'}
          </div>
          <p className="text-[11px] text-faint">Think of it as a checkpoint at the subnet boundary, blind to connection history.</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tell: if a scenario forgets to open the ephemeral port range (1024–65535) outbound on the NACL and
        traffic mysteriously fails only in one direction, that's a stateless NACL problem — a security group
        would never need that rule.
      </div>
    </div>
  )
}
