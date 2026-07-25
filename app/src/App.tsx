import { lazy } from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { CertProvider } from './cert/CertContext'
import Layout from './components/Layout'
import { PageSkeleton } from './components/Skeleton'
import { SectionLayout } from './components/SectionNav'
import { LEGACY_REDIRECTS } from './lib/nav'
import SignIn from './pages/SignIn'

// Routes load on demand. SignIn stays eager: it is the first thing an
// unauthenticated visitor sees, so it must not wait on a second round trip.
const Concepts = lazy(() => import('./pages/Concepts'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Exam = lazy(() => import('./pages/Exam'))
const Feynman = lazy(() => import('./pages/Feynman'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const Quiz = lazy(() => import('./pages/Quiz'))

/**
 * A data router (not <HashRouter>) so `useBlocker` is available — it is what
 * stops a nav click from silently destroying an in-progress exam.
 *
 * The exam keeps its phase in a search param (`?attempt=run|review`) rather
 * than a child route: changing the matched route remounts the element and
 * would wipe the in-memory form and timer, whereas a param change does not.
 */
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'study',
        element: <SectionLayout />,
        children: [
          { index: true, element: <Navigate to="/study/flashcards" replace /> },
          { path: 'flashcards', element: <Flashcards /> },
          { path: 'explain', element: <Feynman /> },
          { path: 'figures', element: <Concepts /> },
        ],
      },
      {
        path: 'practice',
        element: <SectionLayout />,
        children: [
          { index: true, element: <Navigate to="/practice/quiz" replace /> },
          { path: 'quiz', element: <Quiz /> },
          { path: 'quiz/:kind', element: <Quiz /> },
          { path: 'exam', element: <Exam /> },
        ],
      },
      ...Object.entries(LEGACY_REDIRECTS).map(([from, to]) => ({
        path: from.slice(1),
        element: <Navigate to={to} replace />,
      })),
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

function Gate() {
  const { session, loading } = useAuth()
  if (loading)
    return (
      <div className="p-8">
        <PageSkeleton label="Signing you in" />
      </div>
    )
  if (!session) return <SignIn />
  return <RouterProvider router={router} />
}

export default function App() {
  return (
    <AuthProvider>
      <CertProvider>
        <Gate />
      </CertProvider>
    </AuthProvider>
  )
}
