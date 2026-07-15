interface Identity {
  name: string
  who: string
  credentials: string
  bestFor: string
  bullets: string[]
}

const IDENTITIES: Identity[] = [
  {
    name: 'IAM User',
    who: 'A permanent identity for a single person or application.',
    credentials: 'Long-term password and/or access keys.',
    bestFor: 'Individual humans who need a persistent login, or legacy apps that cannot assume a role.',
    bullets: ['Credentials must be manually rotated', 'Attach policies directly or via a group', 'Root user is a special, unrestricted case — avoid daily use'],
  },
  {
    name: 'IAM Group',
    who: 'A container of IAM users — not a real identity, cannot be logged into.',
    credentials: 'None — a group has no credentials of its own.',
    bestFor: 'Applying the same set of permissions to many users at once (e.g. all "Billing" staff).',
    bullets: ['Simplifies permission management at scale', 'A user can belong to multiple groups', 'Groups cannot be nested inside other groups'],
  },
  {
    name: 'IAM Role',
    who: 'A temporary identity that any trusted principal can assume.',
    credentials: 'Short-lived, auto-rotated STS tokens — no long-term secret to leak.',
    bestFor: 'EC2 instances, Lambda functions, cross-account access, and federated/SSO users.',
    bullets: ['No password or long-term access key exists', 'Trust policy controls who may assume it', 'The AWS-recommended way to grant workload permissions'],
  },
]

export default function IamRolesUsersGroups() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">IAM Users vs Groups vs Roles</h3>
        <p className="text-sm text-soft">Domain 1.1 — compare the three ways IAM represents "who" is making a request.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {IDENTITIES.map((id) => (
          <div key={id.name} className="rounded-crisp border border-line bg-surface p-4 flex flex-col gap-2">
            <p className="font-display text-base font-semibold text-ink">{id.name}</p>
            <p className="text-xs text-soft leading-relaxed">{id.who}</p>
            <div className="rounded-crisp bg-wash px-2.5 py-1.5">
              <p className="text-[10px] uppercase tracking-wider text-faint mb-0.5">Credentials</p>
              <p className="text-xs text-ink">{id.credentials}</p>
            </div>
            <ul className="text-xs text-soft space-y-1 mt-1">
              {id.bullets.map((b) => (
                <li key={b} className="flex gap-1.5">
                  <span className="text-accent">-</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-faint mt-auto pt-2 border-t border-line">{id.bestFor}</p>
          </div>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Groups exist purely to organize users — they can never be assumed by a service and never appear in a trust
        policy. When a scenario mentions an EC2 instance, Lambda function, or another AWS account needing access,
        the exam-correct answer is almost always a role, not a user with embedded access keys.
      </div>
    </div>
  )
}
