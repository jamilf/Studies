import type { ComponentType } from 'react'
import ArpSpoofing from './secplus/ArpSpoofing'
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
  {
    id: 'secplus-arp-spoofing',
    certId: 'secplus',
    domain: 2,
    title: 'ARP Spoofing & On-Path Attacks',
    description: 'Watch a poisoned ARP cache redirect a victim\'s traffic through an attacker.',
    Component: ArpSpoofing,
  },
]

export function conceptsForCert(certId: string): ConceptEntry[] {
  return CONCEPTS.filter((c) => c.certId === certId)
}
