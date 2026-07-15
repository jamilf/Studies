import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Frequent pop-ups',
    back: 'Adware or a browser hijacker bundled with a "free" download — clean it via Programs and Features / browser extension list, not just by closing the pop-up.',
  },
  {
    front: 'Browser redirection',
    back: 'A hijacked search provider, malicious extension, or a modified hosts file is silently rerouting traffic — check the hosts file and installed extensions.',
  },
  {
    front: 'Renamed system files',
    back: 'A common ransomware/rootkit behavior meant to break normal boot or evade antivirus signature matching — treat as an active infection, not corruption.',
  },
  {
    front: 'Hijacked email (spam sent from your account)',
    back: 'The account credentials were compromised, often through a phishing link — reset the password everywhere it was reused and enable MFA.',
  },
  {
    front: 'Access denied errors on files you normally use',
    back: 'Malware or an attacker may have changed NTFS permissions or ownership on the file — check the security tab, not just antivirus logs.',
  },
  {
    front: 'Invalid digital certificate warnings',
    back: 'Could mean a man-in-the-middle attack, a spoofed site, or a compromised/expired certificate — never click through the warning on a login or financial site.',
  },
  {
    front: 'OS update failures that suddenly start happening',
    back: 'Malware sometimes blocks Windows Update on purpose to prevent a patch from removing it — investigate before assuming it is a routine update glitch.',
  },
  {
    front: 'Rogue antivirus pop-up demanding payment',
    back: 'A fake security alert (scareware) designed to scare the user into paying or installing more malware — it is not a real antivirus product.',
  },
]

export default function PcSecuritySymptomMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">PC Security Symptom Matcher</h3>
        <p className="text-sm text-soft">Domain 3.2 — click a symptom to reveal the likely security issue and next step.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-display text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        These symptoms come straight from the 3.2 objective's symptom list — the exam frequently gives you one of
        these phrases verbatim and expects you to name the security issue behind it, not just a generic "run
        antivirus" answer.
      </div>
    </div>
  )
}
