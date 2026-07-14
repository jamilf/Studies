import type { ComponentType } from 'react'
import ArpSpoofing from './secplus/ArpSpoofing'
import DrSiteSpectrum from './secplus/DrSiteSpectrum'
import OrderOfVolatility from './secplus/OrderOfVolatility'
import PkiLifecycle from './secplus/PkiLifecycle'
import RiskCalculator from './secplus/RiskCalculator'
import PyramidOfPain from './cysa/PyramidOfPain'
import VpcConnectivityScaling from './awssaa/VpcConnectivityScaling'
import ObjectLockModes from './awsscs/ObjectLockModes'

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
  {
    id: 'secplus-dr-site-spectrum',
    certId: 'secplus',
    domain: 3,
    title: 'Disaster Recovery Site Spectrum',
    description: 'Slide across cold, pilot light, warm, hot, and multi-site tiers to compare RTO/RPO/cost.',
    Component: DrSiteSpectrum,
  },
  {
    id: 'secplus-order-of-volatility',
    certId: 'secplus',
    domain: 4,
    title: 'Order of Volatility',
    description: 'Click through evidence tiers from CPU cache to backups to see why collection order matters.',
    Component: OrderOfVolatility,
  },
  {
    id: 'secplus-risk-calculator',
    certId: 'secplus',
    domain: 5,
    title: 'Quantitative Risk Calculator',
    description: 'Play with SLE/ARO/ALE inputs to see when a control is financially justified.',
    Component: RiskCalculator,
  },
  {
    id: 'cysa-pyramid-of-pain',
    certId: 'cysa',
    domain: 1,
    title: 'The Pyramid of Pain',
    description: 'Click each indicator tier to see how costly it is for an attacker to change.',
    Component: PyramidOfPain,
  },
  {
    id: 'awssaa-vpc-connectivity-scaling',
    certId: 'awssaa',
    domain: 2,
    title: 'VPC Peering vs Transit Gateway Scaling',
    description: 'Drag the VPC count slider to see peering connections grow quadratically vs Transit Gateway linearly.',
    Component: VpcConnectivityScaling,
  },
  {
    id: 'awsscs-object-lock-modes',
    certId: 'awsscs',
    domain: 5,
    title: 'S3 Object Lock: Governance vs Compliance',
    description: 'Pick a retention mode and an actor, then try to delete a locked object to see who can override.',
    Component: ObjectLockModes,
  },
]

export function conceptsForCert(certId: string): ConceptEntry[] {
  return CONCEPTS.filter((c) => c.certId === certId)
}
