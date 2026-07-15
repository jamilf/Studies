import { useState } from 'react'

export default function CustomerCommunicationToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Customer Communication & Professionalism</h3>
        <p className="text-sm text-soft">Domain 4.7 — toggle to compare an unprofessional response with a professional one for the same scenario.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Before</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>After</span>
      </div>

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold mb-2 ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'Professional response' : 'Unprofessional response'}
        </p>
        {after ? (
          <ul className="text-sm text-ink space-y-1.5 list-disc list-inside">
            <li>Actively listens and lets the customer finish explaining the problem without interrupting.</li>
            <li>Avoids jargon and explains next steps in plain language the customer can follow.</li>
            <li>Avoids being judgmental of the customer's technical skill or the mistake that caused the issue.</li>
            <li>Sets clear expectations (what will happen, and roughly when) and follows up as promised.</li>
            <li>Puts distractions away — no texting, side conversations, or unrelated calls during the interaction.</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink space-y-1.5 list-disc list-inside">
            <li>Interrupts the customer partway through describing the problem to jump to a fix.</li>
            <li>Uses heavy technical jargon the customer has no way to follow.</li>
            <li>Blames the customer or implies they caused the problem through carelessness.</li>
            <li>Gives no timeline or follow-up, leaving the customer unsure what happens next.</li>
            <li>Answers a text message or has a side conversation mid-interaction.</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 professionalism questions usually present a short scenario and ask which behavior was wrong
        or right — look for the single behavior that violates active listening, avoiding jargon, or maintaining a
        positive, non-judgmental attitude.
      </div>
    </div>
  )
}
