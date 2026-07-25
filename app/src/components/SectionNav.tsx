import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { sectionForPath } from '../lib/nav'

/**
 * Secondary navigation for a top-level section (Study / Practice). Rendered by
 * the section's layout route so its children never have to know about it.
 */
export function SectionNav() {
  const { pathname } = useLocation()
  const section = sectionForPath(pathname)
  if (!section?.children?.length) return null

  return (
    <nav aria-label={`${section.label} sections`} className="mb-6 -mt-1">
      <div className="inline-flex flex-wrap gap-1 rounded-crisp border border-line bg-wash p-1">
        {section.children.map((child) => (
          <NavLink
            key={child.path}
            to={child.path}
            title={child.blurb}
            className={({ isActive }) =>
              `rounded-crisp px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'bg-surface text-ink font-medium shadow-card'
                  : 'text-soft hover:text-ink'
              }`
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

/** Layout route element: sub-bar above the section's current page. */
export function SectionLayout() {
  return (
    <>
      <SectionNav />
      <Outlet />
    </>
  )
}
