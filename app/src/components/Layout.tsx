import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import { NAV, sectionForPath, titleForPath } from '../lib/nav'
import BottomNav from './BottomNav'
import CertScope from './CertScope'
import { NavigationGuard, RunGuardProvider } from './NavGuard'

export default function Layout() {
  return (
    <RunGuardProvider>
      <Shell />
      <NavigationGuard />
    </RunGuardProvider>
  )
}

function Shell() {
  const { signOut } = useAuth()
  const { cert } = useCert()
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement | null>(null)
  const mainRef = useRef<HTMLElement | null>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  const activeId = sectionForPath(pathname)?.id

  // Slide the accent underline to the active section.
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

  // Per-route document title: sane browser history and multi-tab use.
  useEffect(() => {
    document.title = `${titleForPath(pathname)} · ${cert.label} · Primer`
  }, [pathname, cert.label])

  // Move focus to the main landmark on route change so keyboard and screen
  // reader users land in the new content instead of the top of the document.
  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-crisp focus:bg-accent focus:text-paper focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header className="border-b border-line bg-paper/90 sticky top-0 z-10 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4">
          {/* Row 1 — identity, scope, account */}
          <div className="flex items-center gap-3 py-2.5 animate-fadein">
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Primer<span className="text-accent inline-block animate-pulse-dot">.</span>
            </span>
            <CertScope />
            <div className="flex-1" />
            <button
              onClick={() => void signOut()}
              className="text-sm text-soft hover:text-ink transition-colors"
            >
              Sign out
            </button>
          </div>

          {/* Row 2 — primary sections (desktop; mobile uses the bottom bar) */}
          <nav ref={navRef} aria-label="Primary" className="relative hidden sm:flex gap-5">
            {NAV.map((section) => {
              const isActive = section.id === activeId
              return (
                <NavLink
                  key={section.id}
                  to={section.path}
                  data-active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative whitespace-nowrap px-0.5 pb-2.5 text-sm transition-colors ${
                    isActive ? 'text-ink font-medium' : 'text-soft hover:text-ink'
                  }`}
                >
                  {section.label}
                  {!isActive && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-1.5 h-px origin-center scale-x-0 bg-line-strong transition-transform duration-200 group-hover:scale-x-100" />
                  )}
                </NavLink>
              )
            })}
            {indicator && (
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
          </nav>
        </div>
      </header>

      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto max-w-5xl px-4 py-8 pb-24 sm:pb-8 outline-none"
      >
        <div key={pathname} className="animate-rise">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
