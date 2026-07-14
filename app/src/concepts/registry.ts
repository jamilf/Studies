import type { ComponentType } from 'react'
import PkiLifecycle from './secplus/PkiLifecycle'

export interface ConceptEntry {
  id: string
  certId: string
  domain: number
  title: string
  description: string
  Component: ComponentType
}

export const CONCEPTS: ConceptEntry[] = [
  {
    id: 'secplus-pki-lifecycle',
    certId: 'secplus',
    domain: 1,
    title: 'Certificate Lifecycle & Chain of Trust',
    description: 'Step through issuance, validation, deployment, and revocation (CRL vs OCSP).',
    Component: PkiLifecycle,
  },
]

export function conceptsForCert(certId: string): ConceptEntry[] {
  return CONCEPTS.filter((c) => c.certId === certId)
}
