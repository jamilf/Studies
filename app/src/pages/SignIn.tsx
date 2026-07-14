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
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Primer<span className="text-accent">.</span>
          </h1>
          <p className="text-sm text-soft mt-2">
            Spaced repetition and exam simulation for certification study.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4 bg-surface border border-line rounded-soft shadow-card p-6">
          <p className="text-sm text-soft">
            {mode === 'signin' ? 'Sign in to continue studying.' : 'Create your account (first run only).'}
          </p>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-crisp bg-surface border border-line focus:border-accent px-3 py-2 text-sm text-ink placeholder:text-faint outline-none transition-colors"
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Password (8+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-crisp bg-surface border border-line focus:border-accent px-3 py-2 text-sm text-ink placeholder:text-faint outline-none transition-colors"
          />
          {error && <p className="text-sm text-bad">{error}</p>}
          {notice && (
            <p className="text-sm text-ink bg-warn-tint border-l-2 border-warn rounded-crisp px-4 py-3 leading-relaxed">
              {notice}
            </p>
          )}
          <button
            disabled={busy}
            className="w-full rounded-crisp bg-accent hover:bg-accent-deep disabled:opacity-50 text-paper py-2 text-sm font-semibold transition-colors"
          >
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="w-full text-xs text-soft hover:text-ink transition-colors"
          >
            {mode === 'signin' ? 'First time? Create an account' : 'Already registered? Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
