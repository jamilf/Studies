import { useState, type FormEvent } from 'react'
import { useAuth } from '../auth/AuthContext'

export default function SignIn() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      if (mode === 'signin') {
        const err = await signIn(email, password)
        if (err) setError(err)
      } else {
        const res = await signUp(email, password)
        if ('error' in res) {
          setError(res.error)
        } else if (res.ok === 'exists') {
          setMode('signin')
          setNotice('An account with this email already exists — sign in below.')
        } else if (res.ok === 'confirm_email') {
          setNotice(
            'Account created, but this Supabase project requires email confirmation. ' +
              'Check your inbox for the link — or turn off "Confirm email" in the Supabase ' +
              'dashboard (Authentication → Sign In / Providers → Email) and sign in directly.',
          )
        }
        // ok === 'session': the auth listener signs you in; nothing to do here.
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h1 className="text-xl font-bold text-emerald-400">Security+ Trainer</h1>
        <p className="text-sm text-slate-400">
          {mode === 'signin' ? 'Sign in to continue studying.' : 'Create your account (first run only).'}
        </p>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={8}
          placeholder="Password (8+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {notice && (
          <p className="text-sm text-amber-300 border border-amber-700/60 bg-amber-950/40 rounded-md p-3 leading-relaxed">
            {notice}
          </p>
        )}
        <button
          disabled={busy}
          className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-2 text-sm font-semibold"
        >
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="w-full text-xs text-slate-400 hover:text-slate-200"
        >
          {mode === 'signin' ? 'First time? Create an account' : 'Already registered? Sign in'}
        </button>
      </form>
    </div>
  )
}
