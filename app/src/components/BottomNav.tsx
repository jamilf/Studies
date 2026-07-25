import { NavLink, useLocation } from 'react-router-dom'
import { NAV, sectionForPath } from '../lib/nav'

/**
 * Thumb-reachable primary navigation for small screens. Mirrors the desktop
 * top bar exactly (same NAV source), so the two can never disagree.
 */
export default function BottomNav() {
  const { pathname } = useLocation()
  const activeId = sectionForPath(pathname)?.id

  return (
    <nav
      aria-label="Primary"
      className="sm:hidden fixed bottom-0 inset-x-0 z-20 border-t border-line bg-paper/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex">
        {NAV.map((section) => {
          const isActive = section.id === activeId
          return (
            <NavLink
              key={section.id}
              to={section.path}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex-1 py-3 text-center text-sm transition-colors"
            >
              <span className={isActive ? 'text-ink font-medium' : 'text-soft'}>{section.label}</span>
              <span
                aria-hidden
                className={`absolute inset-x-5 top-0 h-0.5 rounded-full bg-accent transition-transform duration-300 origin-center ${
                  isActive ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
