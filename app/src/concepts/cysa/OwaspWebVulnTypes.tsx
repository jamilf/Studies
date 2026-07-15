interface Row {
  field: string
  sqli: string
  xss: string
}

const ROWS: Row[] = [
  { field: 'Mechanism', sqli: 'Unsanitized input is concatenated into a database query, letting an attacker alter its logic.', xss: 'Unsanitized input is reflected or stored into a page, letting an attacker inject script that a browser will execute.' },
  { field: 'Executes where', sqli: 'Server-side, inside the database engine.', xss: "Client-side, inside a victim's browser session." },
  { field: 'Typical target', sqli: 'The backend data store — read, modify, or delete records; sometimes full database takeover.', xss: 'Other users of the application — session tokens, credentials, or forcing actions on their behalf.' },
  { field: 'Example indicator', sqli: "A single quote ( ' ) in an input field triggers a database error message.", xss: 'A script tag or event handler submitted in a form field is rendered/executed unescaped on the page.' },
  { field: 'Primary mitigation', sqli: 'Parameterized queries / prepared statements and least-privilege database accounts.', xss: 'Output encoding/escaping, a strict Content Security Policy, and input validation.' },
]

export default function OwaspWebVulnTypes() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">SQL Injection vs. Cross-Site Scripting</h3>
        <p className="text-sm text-soft">Domain 2.4 — two of the most common web application vulnerability classes, compared side by side.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-surface p-4 space-y-3">
          <h4 className="font-display text-base font-semibold text-ink">SQL Injection</h4>
          {ROWS.map((r) => (
            <div key={r.field}>
              <p className="text-[11px] font-semibold text-soft uppercase tracking-wide">{r.field}</p>
              <p className="text-sm text-ink">{r.sqli}</p>
            </div>
          ))}
        </div>
        <div className="rounded-crisp border border-line bg-surface p-4 space-y-3">
          <h4 className="font-display text-base font-semibold text-ink">Cross-Site Scripting (XSS)</h4>
          {ROWS.map((r) => (
            <div key={r.field}>
              <p className="text-[11px] font-semibold text-soft uppercase tracking-wide">{r.field}</p>
              <p className="text-sm text-ink">{r.xss}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Both stem from the same root cause — trusting unvalidated input — but they attack different trust boundaries:
        SQLi breaks the boundary between application and database, while XSS breaks the boundary between application
        and browser.
      </div>
    </div>
  )
}
