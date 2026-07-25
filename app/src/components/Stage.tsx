import type { ReactNode } from 'react'

/**
 * Vertical stage for the single-card study surfaces (Flashcards, Quiz, Explain
 * It). On a 900px desktop viewport the card used to sit in the top third with
 * ~350-400px of dead space beneath it; centring it in the height that is left
 * after the header and section bar fixes that. Mobile is untouched — there the
 * content already fills the screen and any min-height would only add scroll.
 *
 * 13rem = header (~5rem) + main padding (4rem) + section sub-bar (~4rem).
 */
export default function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="sm:flex sm:flex-col sm:justify-center sm:min-h-[calc(100vh-13rem)]">{children}</div>
  )
}
