import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { CertProvider } from './cert/CertContext'
import Layout from './components/Layout'
import { SectionLayout } from './components/SectionNav'
import { LEGACY_REDIRECTS } from './lib/nav'
import Concepts from './pages/Concepts'
import Dashboard from './pages/Dashboard'
import Exam from './pages/Exam'
import Feynman from './pages/Feynman'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import SignIn from './pages/SignIn'

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
  if (loading) return <p className="p-8 text-soft">Loading…</p>
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
