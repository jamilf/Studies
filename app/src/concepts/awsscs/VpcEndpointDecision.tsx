import { useMemo, useState } from 'react'

type ServiceId = 's3' | 'dynamodb' | 'kms' | 'secretsmanager' | 'sns' | 'sqs'

interface ServiceOption {
  id: ServiceId
  label: string
}

interface OriginOption {
  id: boolean
  label: string
}

const SERVICES: ServiceOption[] = [
  { id: 's3', label: 'S3' },
  { id: 'dynamodb', label: 'DynamoDB' },
  { id: 'kms', label: 'KMS' },
  { id: 'secretsmanager', label: 'Secrets Manager' },
  { id: 'sns', label: 'SNS' },
  { id: 'sqs', label: 'SQS' },
]

const ORIGIN_OPTIONS: OriginOption[] = [
  { id: false, label: 'Inside this VPC' },
  { id: true, label: 'On-premises (Direct Connect / VPN)' },
]

const GATEWAY_ELIGIBLE: ServiceId[] = ['s3', 'dynamodb']

interface Verdict {
  endpointType: 'gateway' | 'interface'
  reason: string
}

function decide(service: ServiceId, fromOnPrem: boolean): Verdict {
  const isGatewayEligible = GATEWAY_ELIGIBLE.includes(service)

  if (isGatewayEligible && !fromOnPrem) {
    return {
      endpointType: 'gateway',
      reason:
        'S3 and DynamoDB are the only two services with Gateway Endpoints. Traffic stays within the VPC and is routed via a route table entry — no hourly or per-GB charge.',
    }
  }
  if (isGatewayEligible && fromOnPrem) {
    return {
      endpointType: 'interface',
      reason:
        'A Gateway Endpoint only works for traffic that originates inside the VPC via its route table — it is not reachable from on-premises over Direct Connect/VPN. Use an Interface Endpoint (PrivateLink) instead, which is a normal ENI with a private IP.',
    }
  }
  const serviceLabel = SERVICES.find((s) => s.id === service)?.label ?? service
  return {
    endpointType: 'interface',
    reason: `${serviceLabel} has no Gateway Endpoint option. Every other AWS service is reached privately through an Interface Endpoint — an ENI with a private IP, billed hourly plus per-GB data processing.`,
  }
}

export default function VpcEndpointDecision() {
  const [service, setService] = useState<ServiceId>('s3')
  const [fromOnPrem, setFromOnPrem] = useState(false)

  const verdict = useMemo(() => decide(service, fromOnPrem), [service, fromOnPrem])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Gateway vs Interface VPC Endpoint</h3>
        <p className="text-sm text-soft">Domain 3.2 — pick the service and where the request originates to find the right endpoint type.</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-soft mb-1">Which service are you accessing privately?</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setService(s.id)}
                className={`rounded-crisp border px-3 py-1.5 text-sm font-medium transition-colors ${
                  service === s.id ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-soft mb-1">Where does the request originate?</p>
          <div className="flex gap-2">
            {ORIGIN_OPTIONS.map((opt) => (
              <button
                key={String(opt.id)}
                onClick={() => setFromOnPrem(opt.id)}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                  fromOnPrem === opt.id ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        key={`${service}-${fromOnPrem}`}
        className={`rounded-crisp border-l-2 px-4 py-3 text-sm animate-fadein ${
          verdict.endpointType === 'gateway' ? 'border-good bg-good-tint' : 'border-accent bg-accent-tint'
        }`}
      >
        <p className={`font-display font-semibold mb-1 ${verdict.endpointType === 'gateway' ? 'text-good' : 'text-accent'}`}>
          {verdict.endpointType === 'gateway' ? 'Gateway Endpoint' : 'Interface Endpoint (PrivateLink)'}
        </p>
        <p className="text-ink">{verdict.reason}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Rule of thumb: "S3 or DynamoDB, from inside the VPC, free" means Gateway. Everything else — or S3/DynamoDB
        reached from outside the VPC — means Interface (PrivateLink), which always shows up as an ENI with a
        private IP address and a per-hour + per-GB cost.
      </div>
    </div>
  )
}
