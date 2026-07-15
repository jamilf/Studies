import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Inspect' | 'Remove' | 'Configure'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Take certificate warnings seriously',
    who: 'Inspect',
    detail:
      'A browser "Your connection is not private" warning means the cert is expired, self-signed, or doesn\'t match the domain — possibly an on-path attack intercepting traffic. Never click through it on a site handling credentials or payment; instead, check the system clock (a wrong date is a common false alarm) and verify the URL is exactly correct.',
  },
  {
    title: 'Audit installed extensions',
    who: 'Inspect',
    detail:
      'Open the extensions/add-ons manager and review everything installed, especially ones the user doesn\'t recognize. Malicious or abandoned extensions are a top vector for browser hijacking, ad injection, and credential theft because they run with broad page-access permissions.',
  },
  {
    title: 'Remove unwanted/unknown extensions and toolbars',
    who: 'Remove',
    detail:
      'Disable, then fully remove, any extension that isn\'t explicitly needed — especially "helper" toolbars bundled with other software installs. If the homepage or default search engine changed without the user\'s action, a rogue extension is the prime suspect (browser hijacking symptom).',
  },
  {
    title: 'Block unwanted pop-ups',
    who: 'Configure',
    detail:
      'Confirm the built-in pop-up blocker is enabled and review any sites added to the allow list. Persistent pop-ups that reappear after closing, or ones claiming "your computer is infected," point to adware or a compromised ad network — not a real system alert.',
  },
  {
    title: 'Verify proxy and DNS settings',
    who: 'Configure',
    detail:
      'Check the browser/OS proxy configuration for an unfamiliar proxy server or a PAC file the user didn\'t set — malware often silently routes traffic through an attacker-controlled proxy to intercept or redirect it. Confirm DNS settings point to a trusted resolver rather than one injected by malware.',
  },
  {
    title: 'Reset to defaults if compromise is suspected',
    who: 'Configure',
    detail:
      'When multiple settings have drifted (homepage, search engine, proxy, new extensions) and can\'t be individually trusted, resetting the browser to its default settings is faster and more reliable than chasing each change one at a time.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Inspect: 'bg-accent text-paper',
  Remove: 'bg-bad text-paper',
  Configure: 'bg-good text-paper',
}

export default function BrowserHardeningWalkthrough() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Browser Hardening Walkthrough</h3>
          <p className="text-sm text-soft">Domain 3.3 — step through certificate warnings, extensions, pop-ups, and proxy settings.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
              <span
                className={`text-[10px] text-center leading-tight transition-colors ${
                  i === active ? 'text-ink' : 'text-faint group-hover:text-soft'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>
            {STEPS[active].who}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 frames these as browser-specific security best practices under Domain 3 (troubleshooting)
        AND Domain 2 (security) — a hijacked homepage, unexpected proxy, or unremovable pop-up are all classic
        "browser has been compromised" symptom questions.
      </div>
    </div>
  )
}
