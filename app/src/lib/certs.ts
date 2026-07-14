/**
 * Certification registry: domains, blueprint weights, and exam-simulator
 * parameters per cert. Content rows in Supabase carry a matching `cert` id.
 * Weights are fractions summing to 1; scoring is a linear approximation of
 * each vendor's (undisclosed) equating — a training signal, not a promise.
 */
export interface CertConfig {
  id: string
  label: string
  examCode: string
  domains: Record<number, string>
  weights: Record<number, number>
  exam: {
    questions: number
    minutes: number
    pass: number
    scaleMin: number
    scaleMax: number
  }
}

export const CERTS: Record<string, CertConfig> = {
  aplus1: {
    id: 'aplus1',
    label: 'A+ Core 1',
    examCode: '220-1101',
    domains: {
      1: 'Mobile Devices',
      2: 'Networking',
      3: 'Hardware',
      4: 'Virtualization & Cloud Computing',
      5: 'Hardware & Network Troubleshooting',
    },
    weights: { 1: 0.13, 2: 0.23, 3: 0.25, 4: 0.11, 5: 0.28 },
    exam: { questions: 90, minutes: 90, pass: 675, scaleMin: 100, scaleMax: 900 },
  },
  aplus2: {
    id: 'aplus2',
    label: 'A+ Core 2',
    examCode: '220-1102',
    domains: {
      1: 'Operating Systems',
      2: 'Security',
      3: 'Software Troubleshooting',
      4: 'Operational Procedures',
    },
    weights: { 1: 0.28, 2: 0.28, 3: 0.23, 4: 0.21 },
    exam: { questions: 90, minutes: 90, pass: 700, scaleMin: 100, scaleMax: 900 },
  },
  netplus: {
    id: 'netplus',
    label: 'Network+',
    examCode: 'N10-009',
    domains: {
      1: 'Networking Concepts',
      2: 'Network Implementation',
      3: 'Network Operations',
      4: 'Network Security',
      5: 'Network Troubleshooting',
    },
    weights: { 1: 0.23, 2: 0.2, 3: 0.19, 4: 0.14, 5: 0.24 },
    exam: { questions: 90, minutes: 90, pass: 720, scaleMin: 100, scaleMax: 900 },
  },
  secplus: {
    id: 'secplus',
    label: 'Security+',
    examCode: 'SY0-701',
    domains: {
      1: 'General Security Concepts',
      2: 'Threats, Vulnerabilities & Mitigations',
      3: 'Security Architecture',
      4: 'Security Operations',
      5: 'Program Management & Oversight',
    },
    weights: { 1: 0.12, 2: 0.22, 3: 0.18, 4: 0.28, 5: 0.2 },
    exam: { questions: 90, minutes: 90, pass: 750, scaleMin: 100, scaleMax: 900 },
  },
  cysa: {
    id: 'cysa',
    label: 'CySA+',
    examCode: 'CS0-003',
    domains: {
      1: 'Security Operations',
      2: 'Vulnerability Management',
      3: 'Incident Response & Management',
      4: 'Reporting & Communication',
    },
    weights: { 1: 0.33, 2: 0.3, 3: 0.2, 4: 0.17 },
    exam: { questions: 85, minutes: 165, pass: 750, scaleMin: 100, scaleMax: 900 },
  },
  awssaa: {
    id: 'awssaa',
    label: 'AWS SAA',
    examCode: 'SAA-C03',
    domains: {
      1: 'Design Secure Architectures',
      2: 'Design Resilient Architectures',
      3: 'Design High-Performing Architectures',
      4: 'Design Cost-Optimized Architectures',
    },
    weights: { 1: 0.3, 2: 0.26, 3: 0.24, 4: 0.2 },
    exam: { questions: 65, minutes: 130, pass: 720, scaleMin: 100, scaleMax: 1000 },
  },
  awsscs: {
    id: 'awsscs',
    label: 'AWS Security',
    examCode: 'SCS-C02',
    domains: {
      1: 'Threat Detection & Incident Response',
      2: 'Security Logging & Monitoring',
      3: 'Infrastructure Security',
      4: 'Identity & Access Management',
      5: 'Data Protection',
      6: 'Management & Security Governance',
    },
    weights: { 1: 0.14, 2: 0.18, 3: 0.2, 4: 0.16, 5: 0.18, 6: 0.14 },
    exam: { questions: 65, minutes: 170, pass: 750, scaleMin: 100, scaleMax: 1000 },
  },
  cissp: {
    id: 'cissp',
    label: 'CISSP',
    examCode: 'ISC2 2024',
    domains: {
      1: 'Security & Risk Management',
      2: 'Asset Security',
      3: 'Security Architecture & Engineering',
      4: 'Communication & Network Security',
      5: 'Identity & Access Management',
      6: 'Security Assessment & Testing',
      7: 'Security Operations',
      8: 'Software Development Security',
    },
    weights: { 1: 0.16, 2: 0.1, 3: 0.13, 4: 0.13, 5: 0.13, 6: 0.12, 7: 0.13, 8: 0.1 },
    exam: { questions: 100, minutes: 180, pass: 700, scaleMin: 0, scaleMax: 1000 },
  },
}

export const DEFAULT_CERT = 'secplus'
export const CERT_ORDER = ['aplus1', 'aplus2', 'netplus', 'secplus', 'cysa', 'awssaa', 'awsscs', 'cissp']

export function certConfig(id: string): CertConfig {
  return CERTS[id] ?? CERTS[DEFAULT_CERT]
}

/**
 * Apportion an exam form across domains by blueprint weight (largest
 * remainder method) so counts sum exactly to the form size.
 */
export function domainCounts(cfg: CertConfig): Record<number, number> {
  const total = cfg.exam.questions
  const entries = Object.entries(cfg.weights).map(([d, w]) => {
    const exact = w * total
    return { domain: Number(d), floor: Math.floor(exact), frac: exact - Math.floor(exact) }
  })
  let remaining = total - entries.reduce((s, e) => s + e.floor, 0)
  entries.sort((a, b) => b.frac - a.frac)
  const counts: Record<number, number> = {}
  for (const e of entries) {
    counts[e.domain] = e.floor + (remaining > 0 ? 1 : 0)
    if (remaining > 0) remaining -= 1
  }
  return counts
}
