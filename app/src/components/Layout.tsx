import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import { CERTS, CERT_ORDER } from '../lib/certs'

const tabs = [
  { to: '/', label: 'Dashboard' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/exam', label: 'Exam Sim' },
  { to: '/feynman', label: 'Explain It' },
  { to: '/concepts', label: 'Figures' },
]

export default function Layout() {
  const { signOut } = useAuth()
  const { certId, cert, setCertId } = useCert()
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-paper/90 sticky top-0 z-10 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 pt-3 flex items-center gap-x-5 gap-y-0 flex-wrap">
          <span className="font-display text-lg font-semibold tracking-tight text-ink pb-3">
            Primer<span className="text-accent">.</span>
          </span>
          <select
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            title={`${cert.label} (${cert.examCode})`}
            className="rounded-crisp bg-surface border border-line px-2 py-1 text-sm text-ink mb-3"
          >
            {CERT_ORDER.map((id) => (
              <option key={id} value={id}>
                {CERTS[id].label}
              </option>
            ))}
          </select>
          <nav className="flex gap-4 overflow-x-auto order-last w-full sm:order-none sm:w-auto sm:flex-1">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.to === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap px-0.5 pb-3 text-sm border-b-2 transition-colors ${
                    isActive
                      ? 'text-ink font-medium border-accent'
                      : 'text-soft hover:text-ink border-transparent'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={() => void signOut()}
            className="text-sm text-soft hover:text-ink pb-3"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
