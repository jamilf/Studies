interface Point {
  text: string
}

const WATERFALL: Point[] = [
  { text: 'Sequential, linear phases (requirements → design → build → test → deploy) — each phase must finish before the next begins.' },
  { text: 'Security is typically validated at the end, via a single pre-release penetration test or audit gate.' },
  { text: 'Requirements changes discovered late are expensive — there\'s no built-in mechanism to revisit an earlier phase.' },
  { text: 'Works well for well-understood, stable requirements (e.g., safety-critical or heavily regulated systems) where up-front rigor matters more than speed.' },
]

const DEVSECOPS: Point[] = [
  { text: 'Iterative sprints (an evolution of Agile) deliver small increments continuously, with feedback loops built into every cycle.' },
  { text: 'Security is "shifted left" and automated directly into the CI/CD pipeline — SAST, SCA, and unit tests gate every commit, not just the final release.' },
  { text: 'Threat modeling and security requirements are revisited every sprint, so changing requirements are cheap to absorb.' },
  { text: 'Requires strong automation and cultural buy-in (developers, security, and operations sharing ownership) — harder to bootstrap in a siloed organization.' },
]

export default function DevMethodologyComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Waterfall vs. Agile / DevSecOps</h3>
        <p className="text-sm text-soft">Domain 8.1 — compare how each development methodology integrates (or bolts on) security.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-surface p-4">
          <p className="font-display text-base font-semibold text-ink mb-2">Waterfall</p>
          <ul className="text-sm text-soft space-y-1.5 list-disc list-inside">
            {WATERFALL.map((p) => (
              <li key={p.text}>{p.text}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-crisp border border-accent-line bg-accent-tint p-4">
          <p className="font-display text-base font-semibold text-accent mb-2">Agile / DevSecOps</p>
          <ul className="text-sm text-ink space-y-1.5 list-disc list-inside">
            {DEVSECOPS.map((p) => (
              <li key={p.text}>{p.text}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Agile broke development into short, iterative cycles; DevSecOps takes that further by folding security
        tooling directly into the automated build and deployment pipeline, rather than treating it as a final
        gate. The trade-off isn't "more secure vs. less secure" so much as when and how continuously security
        feedback reaches the developer.
      </div>
    </div>
  )
}
