import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Animates a number from 0 up to `target` with requestAnimationFrame.
 * Honors reduced-motion by jumping straight to the final value. Re-runs
 * whenever `target` changes (e.g. the cert switches on the dashboard).
 */
export function useCountUp(target: number, durationMs = 900): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? target : 0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (reduced || target === 0) {
      setValue(target)
      return
    }
    const start = performance.now()
    const from = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      // easeOutCubic for a natural settle
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [target, durationMs, reduced])

  return value
}
