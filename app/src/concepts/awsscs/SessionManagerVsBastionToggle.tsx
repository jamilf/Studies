import { useState } from 'react'

export default function SessionManagerVsBastionToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Bastion Host vs. Systems Manager Session Manager</h3>
        <p className="text-sm text-soft">Domain 3.3 — toggle between the legacy SSH bastion pattern and Session Manager.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>SSH Bastion</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Session Manager</span>
      </div>

      <div
        key={after ? 'after' : 'before'}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>{after ? 'Session Manager' : 'SSH Bastion'}</p>
        {after ? (
          <ul className="text-sm text-ink mt-2 space-y-1.5 list-disc list-inside">
            <li>No inbound ports open anywhere — the SSM Agent initiates an outbound connection to the Systems Manager endpoints.</li>
            <li>Access is controlled entirely by IAM policy, not by who holds an SSH key.</li>
            <li>Every session can be logged in full (commands and output) to CloudWatch Logs and/or S3 for audit.</li>
            <li>No bastion host to patch, scale, or lose as a single point of failure/attack surface.</li>
            <li>IAM conditions can require MFA or restrict access by source, tag, or time window.</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink mt-2 space-y-1.5 list-disc list-inside">
            <li>Bastion host has an open inbound port (22/3389) that must be reachable from wherever admins connect.</li>
            <li>Long-lived SSH key pairs are distributed to admins and must be manually rotated and revoked.</li>
            <li>The bastion itself is a single point of failure and a standing attack surface to patch and monitor.</li>
            <li>Session activity is not natively captured — you'd need your own auditd/shell-logging setup.</li>
            <li>Network-level access control (security groups/NACLs) is the only real gate, not identity.</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Session Manager removes the network attack surface entirely (no open inbound ports) and moves access
        control into IAM, which is why it is the AWS-recommended replacement for SSH/RDP bastion hosts in exam
        scenarios about secure instance access.
      </div>
    </div>
  )
}
