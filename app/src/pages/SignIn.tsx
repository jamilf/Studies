import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useReducedMotion } from '../lib/useReducedMotion'

// Positioned, rotated flashcard motifs that drift behind the hero.
const MOTIFS: { className: string; style: CSSProperties }[] = [
  {
    className: 'absolute -left-16 top-24 h-40 w-56 rounded-soft border border-line bg-surface/60 shadow-card animate-float-slow',
    style: { ['--float-rot' as string]: '-8deg', animationDelay: '0s' },
  },
  {
    className: 'absolute right-[-3rem] top-16 h-32 w-48 rounded-soft border border-line bg-surface/50 shadow-card animate-float-slow',
    style: { ['--float-rot' as string]: '7deg', animationDelay: '1.6s' },
  },
  {
    className: 'absolute left-[12%] bottom-10 h-28 w-44 rounded-soft border border-line bg-surface/40 shadow-card animate-float-slow',
    style: { ['--float-rot' as string]: '4deg', animationDelay: '3.1s' },
  },
  {
    className: 'absolute right-[16%] bottom-16 h-36 w-52 rounded-soft border border-line bg-surface/50 shadow-card animate-float-slow',
    style: { ['--float-rot' as string]: '-5deg', animationDelay: '2.2s' },
  },
]

const CERT_CYCLE = [
  'Security+ SY0-701',
  'CySA+ CS0-003',
  'CISSP',
  'AWS Solutions Architect',
  'AWS Security Specialty',
  'A+ Core 1 & 2',
  'Network+ N10-009',
]

export default function SignIn() {
  const { signIn, signUp } = useAuth()
  const reduced = useReducedMotion()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [certIndex, setCertIndex] = useState(0)

  // Rotate the "what it covers" line. Static (first entry) under reduced motion.
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setCertIndex((i) => (i + 1) % CERT_CYCLE.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [reduced])

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
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Faint drifting flashcard motifs behind the content. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {MOTIFS.map((m, i) => (
          <div key={i} className={m.className} style={m.style} />
        ))}
      </div>

      <div className="relative w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-display text-5xl font-semibold tracking-tight text-ink animate-rise">
            Primer
            <span className="text-accent inline-block animate-pulse-dot">.</span>
          </h1>
          <p className="text-sm text-soft mt-3 animate-rise stagger-1">
            Spaced repetition and exam simulation for certification study.
          </p>
          <p className="mt-4 h-5 text-xs uppercase tracking-wider text-faint animate-rise stagger-2">
            <span className="text-faint">Now covering </span>
            <span key={certIndex} className="font-mono text-accent inline-block animate-fadein">
              {CERT_CYCLE[certIndex]}
            </span>
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 bg-surface border border-line rounded-soft shadow-card p-6 animate-scale-in stagger-3"
        >
          <p className="text-sm text-soft transition-opacity">
            {mode === 'signin' ? 'Sign in to continue studying.' : 'Create your account (first run only).'}
          </p>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-crisp bg-surface border border-line focus:border-accent focus:shadow-card px-3 py-2 text-sm text-ink placeholder:text-faint outline-none transition-all duration-200"
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Password (8+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-crisp bg-surface border border-line focus:border-accent focus:shadow-card px-3 py-2 text-sm text-ink placeholder:text-faint outline-none transition-all duration-200"
          />
          {error && <p className="text-sm text-bad animate-rise">{error}</p>}
          {notice && (
            <p className="text-sm text-ink bg-warn-tint border-l-2 border-warn rounded-crisp px-4 py-3 leading-relaxed animate-rise">
              {notice}
            </p>
          )}
          <button
            disabled={busy}
            className="sheen w-full rounded-crisp bg-accent hover:bg-accent-deep disabled:opacity-50 text-paper py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
          >
            {busy ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
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
