import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** What failed, used in the message: "figure", "page". */
  label?: string
}

interface State {
  error: Error | null
}

/**
 * Contains a render failure so it cannot take down the rest of the app. React
 * offers no hook equivalent, so this stays a class component.
 *
 * Remount it with a `key` (e.g. the active figure id) to clear the error when
 * the user moves on.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Contained render error:', error, info.componentStack)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    const label = this.props.label ?? 'section'
    return (
      <div
        role="alert"
        className="rounded-crisp border-l-2 border-bad bg-bad-tint px-4 py-3 text-sm animate-fadein"
      >
        <p className="font-display font-semibold text-bad">This {label} failed to load</p>
        <p className="text-ink mt-1 leading-relaxed">
          The rest of the page is unaffected. Try again, or move on and come back to it.
        </p>
        <p className="font-mono text-[11px] text-soft mt-2 break-words">{error.message}</p>
        <button
          onClick={() => this.setState({ error: null })}
          className="mt-3 rounded-crisp border border-line bg-surface hover:border-line-strong px-3 py-1.5 text-sm text-ink transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }
}
