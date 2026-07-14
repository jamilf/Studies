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
  { to: '/concepts', label: 'Visuals' },
]

export default function Layout() {
  const { signOut } = useAuth()
  const { certId, cert, setCertId } = useCert()
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4 flex-wrap">
          <span className="font-bold text-emerald-400">Cert Trainer</span>
          <select
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            title={`${cert.label} (${cert.examCode})`}
            className="rounded-md bg-slate-800 border border-slate-700 px-2 py-1 text-sm text-slate-200"
          >
            {CERT_ORDER.map((id) => (
              <option key={id} value={id}>
                {CERTS[id].label}
              </option>
            ))}
          </select>
          <nav className="flex gap-1 flex-1">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm ${
                    isActive ? 'bg-emerald-600/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
          <button onClick={() => void signOut()} className="text-sm text-slate-400 hover:text-slate-200">
            Sign out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
