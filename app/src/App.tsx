import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { CertProvider } from './cert/CertContext'
import Layout from './components/Layout'
import Concepts from './pages/Concepts'
import Dashboard from './pages/Dashboard'
import Exam from './pages/Exam'
import Feynman from './pages/Feynman'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import SignIn from './pages/SignIn'

function Gate() {
  const { session, loading } = useAuth()
  if (loading) return <p className="p-8 text-soft">Loading…</p>
  if (!session) return <SignIn />
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="flashcards" element={<Flashcards />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="exam" element={<Exam />} />
        <Route path="feynman" element={<Feynman />} />
        <Route path="concepts" element={<Concepts />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CertProvider>
        <HashRouter>
          <Gate />
        </HashRouter>
      </CertProvider>
    </AuthProvider>
  )
}
