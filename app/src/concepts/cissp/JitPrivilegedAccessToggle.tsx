import { useState } from 'react'

export default function JitPrivilegedAccessToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Standing Privileged Access vs. Just-in-Time (JIT)</h3>
        <p className="text-sm text-soft">Domain 5.4 — toggle to compare always-on admin rights with time-bound, brokered elevation.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Standing access</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Just-in-time (PAM)</span>
      </div>

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-2 ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'Just-in-time privileged access' : 'Standing (always-on) privileged access'}
        </p>
        {after ? (
          <ul className="text-sm text-ink space-y-1 list-disc list-inside">
            <li>Admin credentials live in a privileged access management (PAM) vault, not in a person's daily account.</li>
            <li>A user checks out elevated rights for a defined task and time window, with an approval workflow.</li>
            <li>The session is recorded/monitored and access is auto-revoked when the window (or task) ends.</li>
            <li>The vault rotates the credential after each checkout, so a leaked password has a short shelf life.</li>
            <li>The attack surface is minimal — there's no permanently elevated account sitting around to steal.</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink space-y-1 list-disc list-inside">
            <li>An account holds domain admin (or root) rights permanently, whether or not it's being used right now.</li>
            <li>Credentials are often shared among several admins and rarely rotated.</li>
            <li>There's no per-use approval — anyone with the password has full access, indefinitely.</li>
            <li>A single phished or stale credential grants an attacker unlimited, unmonitored standing access.</li>
            <li>This is exactly the pattern attackers hunt for to achieve lateral movement and privilege escalation.</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Just-in-time access is a core Zero Trust and privileged access management (PAM) principle: privilege should
        exist only for as long as it's needed, be brokered through a vault, and leave an auditable trail — reducing
        the standing attack surface that comes with permanent administrative accounts.
      </div>
    </div>
  )
}
