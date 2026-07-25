import { useCert } from '../cert/CertContext'
import { CERTS, CERT_ORDER } from '../lib/certs'
import { useRunGuardContext } from './NavGuard'

/**
 * Global scope control. Changing the cert re-scopes every page in the app, so
 * it is presented as a deliberate labelled control rather than a bare <select>,
 * and it asks before discarding an in-progress attempt.
 */
export default function CertScope() {
  const { certId, cert, setCertId } = useCert()
  const { confirmLeave } = useRunGuardContext()

  return (
    <label
      title={`${cert.label} (${cert.examCode}) — changes what every page shows`}
      className="inline-flex items-center gap-2 rounded-crisp border border-line bg-surface pl-2.5 pr-2 py-1 hover:border-accent-line transition-colors cursor-pointer"
    >
      <span className="text-[10px] uppercase tracking-wider text-faint select-none">Studying</span>
      <select
        value={certId}
        onChange={(e) => {
          if (confirmLeave()) setCertId(e.target.value)
        }}
        className="bg-transparent text-sm text-ink outline-none cursor-pointer"
      >
        {CERT_ORDER.map((id) => (
          <option key={id} value={id}>
            {CERTS[id].label}
          </option>
        ))}
      </select>
      <span className="font-mono text-[10px] text-faint hidden sm:inline">{cert.examCode}</span>
    </label>
  )
}
