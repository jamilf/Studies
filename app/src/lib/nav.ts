/**
 * Single source of truth for the navigation tree. The top bar, the section
 * sub-bar, and the mobile bottom bar all render from this, so they can never
 * drift out of sync.
 */
export interface NavChild {
  label: string
  path: string
  /** One-line purpose, used as a title attribute / sub-bar hint. */
  blurb: string
}

export interface NavSection {
  id: string
  label: string
  path: string
  children?: NavChild[]
}

export const NAV: NavSection[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  {
    id: 'study',
    label: 'Study',
    path: '/study',
    children: [
      { label: 'Flashcards', path: '/study/flashcards', blurb: 'Spaced-repetition review' },
      { label: 'Explain It', path: '/study/explain', blurb: 'Feynman-style self-explanation' },
      { label: 'Figures', path: '/study/figures', blurb: 'Interactive concept diagrams' },
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    path: '/practice',
    children: [
      { label: 'Quiz', path: '/practice/quiz', blurb: '15-question practice set' },
      { label: 'Exam Sim', path: '/practice/exam', blurb: 'Full timed mock exam' },
    ],
  },
]

/** The top-level section that owns a pathname (deepest match wins). */
export function sectionForPath(pathname: string): NavSection | undefined {
  if (pathname === '/') return NAV[0]
  return NAV.find((s) => s.path !== '/' && pathname.startsWith(s.path))
}

/** The child entry that owns a pathname, if any. */
export function childForPath(pathname: string): NavChild | undefined {
  const section = sectionForPath(pathname)
  return section?.children?.find((c) => pathname.startsWith(c.path))
}

/** Human label for the current route, used for document.title. */
export function titleForPath(pathname: string): string {
  const child = childForPath(pathname)
  if (child) return child.label
  return sectionForPath(pathname)?.label ?? 'Primer'
}

/** Legacy flat URLs kept working so old bookmarks don't 404. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/flashcards': '/study/flashcards',
  '/feynman': '/study/explain',
  '/concepts': '/study/figures',
  '/quiz': '/practice/quiz',
  '/exam': '/practice/exam',
}
