interface Point {
  label: string
  value: string
}

const REST_API: Point[] = [
  { label: 'Cost', value: '~$3.50 per million requests' },
  { label: 'Auth options', value: 'IAM, Cognito, Lambda authorizers, API keys & usage plans' },
  { label: 'Request handling', value: 'Request validation, mapping templates, response transformation' },
  { label: 'Edge options', value: 'Edge-optimized (CloudFront-backed) or Regional endpoints' },
  { label: 'Protection', value: 'Native AWS WAF integration, per-stage/per-method throttling' },
]

const HTTP_API: Point[] = [
  { label: 'Cost', value: '~$1.00 per million requests (up to ~70% cheaper)' },
  { label: 'Auth options', value: 'IAM, Cognito, or native OIDC/OAuth 2.0 JWT authorizers' },
  { label: 'Request handling', value: 'Simple Lambda/HTTP proxy integration — no mapping templates' },
  { label: 'Edge options', value: 'Regional only, with lower baseline latency than REST API' },
  { label: 'Protection', value: 'Built-in automatic CORS configuration; fewer built-in controls' },
]

export default function ApiGatewayTypeComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">API Gateway: REST API vs HTTP API</h3>
        <p className="text-sm text-soft">Domain 3.5 — compare the two API Gateway types for building a high-performing front door to your backend.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-crisp border border-line-strong bg-surface p-4">
          <p className="text-sm font-semibold text-ink mb-3">REST API</p>
          <ul className="space-y-2">
            {REST_API.map((p) => (
              <li key={p.label} className="text-sm">
                <span className="text-faint">{p.label}: </span>
                <span className="text-soft">{p.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-crisp border border-accent-line bg-accent-tint p-4">
          <p className="text-sm font-semibold text-accent mb-3">HTTP API</p>
          <ul className="space-y-2">
            {HTTP_API.map((p) => (
              <li key={p.label} className="text-sm">
                <span className="text-faint">{p.label}: </span>
                <span className="text-ink">{p.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Choose HTTP API by default for a simple, low-latency proxy to Lambda or an HTTP backend — reach for REST API
        only when you need its extra feature set (usage plans/API keys, request validation, WAF, edge-optimized
        endpoints). Need a persistent, bidirectional connection instead of request/response? That's a third type —
        a WebSocket API.
      </div>
    </div>
  )
}
