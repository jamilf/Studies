import { useState } from 'react'

export default function DueCareVsDueDiligence() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Due Diligence vs Due Care</h3>
        <p className="text-sm text-soft">Domain 1.4 — toggle between the research step and the action step of the prudent-person rule.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Due Diligence</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Due Care</span>
      </div>

      <div
        key={after ? 'after' : 'before'}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-2 ${after ? 'border-good bg-good-tint' : 'border-accent bg-accent-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-accent'}`}>
          {after ? 'Due Care — taking the action' : 'Due Diligence — researching before you act'}
        </p>
        {after ? (
          <ul className="text-sm text-ink space-y-1 list-disc pl-4">
            <li>Doing what a "reasonable, prudent person" would actually do to protect the organization.</li>
            <li>Ongoing — patching systems, enforcing policy, training staff, responding to incidents.</li>
            <li>Answers: "Did we act responsibly on what we knew?"</li>
            <li>Failure to exercise it can support a finding of negligence.</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink space-y-1 list-disc pl-4">
            <li>The research and investigation performed before making a decision or commitment.</li>
            <li>A point-in-time activity — vendor risk assessments, background checks, security audits before acquisition.</li>
            <li>Answers: "Did we know what we needed to know?"</li>
            <li>Practicing it establishes the informed basis for later due care.</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A simple memory hook: due diligence is the <span className="text-ink font-medium">investigation</span>
        ("do detect"), due care is the <span className="text-ink font-medium">action</span> taken as a result
        ("do correct"). Courts assess negligence liability by asking whether an organization exercised both.
      </div>
    </div>
  )
}
