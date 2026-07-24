import { useLayoutEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement | null>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  // Slide the accent underline to the active tab. Re-measures on route change,
  // cert relabels, and resize (the nav wraps on small screens).
  useLayoutEffect(() => {
    function measure() {
      const nav = navRef.current
      if (!nav) return
      const active = nav.querySelector<HTMLElement>('[data-active="true"]')
      if (!active) {
        setIndicator(null)
        return
      }
      setIndicator({ left: active.offsetLeft, width: active.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pathname])

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-paper/90 sticky top-0 z-10 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 pt-3 flex items-center gap-x-5 gap-y-0 flex-wrap animate-fadein">
          <span className="font-display text-lg font-semibold tracking-tight text-ink pb-3">
            Primer<span className="text-accent inline-block animate-pulse-dot">.</span>
          </span>
          <select
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            title={`${cert.label} (${cert.examCode})`}
            className="rounded-crisp bg-surface border border-line hover:border-accent-line px-2 py-1 text-sm text-ink mb-3 transition-colors"
          >
            {CERT_ORDER.map((id) => (
              <option key={id} value={id}>
                {CERTS[id].label}
              </option>
            ))}
          </select>
          <nav
            ref={navRef}
            className="relative flex gap-4 overflow-x-auto order-last w-full sm:order-none sm:w-auto sm:flex-1"
          >
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.to === '/'}
                data-active={pathname === t.to || (t.to === '/' && pathname === '')}
                className={({ isActive }) =>
                  `group relative whitespace-nowrap px-0.5 pb-3 text-sm transition-colors ${
                    isActive ? 'text-ink font-medium' : 'text-soft hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t.label}
                    {/* Hover underline grows from center on inactive tabs. */}
                    {!isActive && (
                      <span className="pointer-events-none absolute inset-x-0 bottom-2 h-px origin-center scale-x-0 bg-line-strong transition-transform duration-200 group-hover:scale-x-100" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            {/* Shared sliding indicator. */}
            {indicator && (
              <span
                className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
          </nav>
          <button
            onClick={() => void signOut()}
            className="text-sm text-soft hover:text-ink pb-3 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Keyed so each route change replays the entrance animation. */}
        <div key={pathname} className="animate-rise">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
