import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useBlocker } from 'react-router-dom'

interface RunGuardValue {
  /** True while a destructive-to-leave activity (exam/quiz run) is in progress. */
  active: boolean
  message: string
  setRun: (active: boolean, message?: string) => void
  /**
   * Ask permission for a non-navigation destructive action (e.g. switching the
   * cert, which would reset an in-progress attempt). Returns true if allowed.
   */
  confirmLeave: () => boolean
}

const RunGuardContext = createContext<RunGuardValue | null>(null)

const DEFAULT_MESSAGE = 'You have an attempt in progress. Leaving now discards it.'

export function RunGuardProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)

  const setRun = useCallback((next: boolean, msg?: string) => {
    setActive(next)
    setMessage(msg ?? DEFAULT_MESSAGE)
  }, [])

  const confirmLeave = useCallback(() => {
    if (!active) return true
    return window.confirm(`${message}\n\nContinue anyway?`)
  }, [active, message])

  // Guard full page unloads (tab close / reload) too.
  useEffect(() => {
    if (!active) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [active])

  const value = useMemo(
    () => ({ active, message, setRun, confirmLeave }),
    [active, message, setRun, confirmLeave],
  )

  return <RunGuardContext.Provider value={value}>{children}</RunGuardContext.Provider>
}

export function useRunGuardContext(): RunGuardValue {
  const ctx = useContext(RunGuardContext)
  if (!ctx) throw new Error('useRunGuardContext must be used within RunGuardProvider')
  return ctx
}

/**
 * Registers an in-progress activity for as long as `active` is true. Clears
 * itself on unmount so an abandoned page can never leave a stale guard.
 */
export function useRunGuard(active: boolean, message?: string) {
  const { setRun } = useRunGuardContext()
  useEffect(() => {
    setRun(active, message)
    return () => setRun(false)
  }, [active, message, setRun])
}

/**
 * Blocks in-app route changes while a run is active and asks for confirmation.
 * Must render inside both the data router and RunGuardProvider.
 */
export function NavigationGuard() {
  const { active, message } = useRunGuardContext()
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => active && currentLocation.pathname !== nextLocation.pathname,
  )

  if (blocker.state !== 'blocked') return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="navguard-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-ink/30 backdrop-blur-[2px] animate-fadein"
    >
      <div className="w-full max-w-sm rounded-soft border border-line bg-surface shadow-lift p-6 space-y-4 animate-scale-in">
        <h2 id="navguard-title" className="font-display text-lg text-ink">
          Leave this attempt?
        </h2>
        <p className="text-sm text-soft leading-relaxed">{message}</p>
        <div className="flex gap-2 justify-end pt-1">
          <button
            onClick={() => blocker.reset?.()}
            className="rounded-crisp border border-line bg-surface hover:border-line-strong px-4 py-2 text-sm text-ink transition-colors"
          >
            Stay
          </button>
          <button
            autoFocus
            onClick={() => blocker.proceed?.()}
            className="rounded-crisp bg-bad hover:opacity-90 text-paper px-4 py-2 text-sm font-semibold transition-opacity"
          >
            Discard &amp; leave
          </button>
        </div>
      </div>
    </div>
  )
}
