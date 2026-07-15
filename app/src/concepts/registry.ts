import type { ComponentType } from 'react'
import ArpSpoofing from './secplus/ArpSpoofing'
import DrSiteSpectrum from './secplus/DrSiteSpectrum'
import OrderOfVolatility from './secplus/OrderOfVolatility'
import PkiLifecycle from './secplus/PkiLifecycle'
import RiskCalculator from './secplus/RiskCalculator'
import CiaAaaMatrix from './secplus/CiaAaaMatrix'
import SocialEngineeringLadder from './secplus/SocialEngineeringLadder'
import MalwareComparisonGrid from './secplus/MalwareComparisonGrid'
import ZeroTrustDiagram from './secplus/ZeroTrustDiagram'
import LogSourceSiemMatrix from './secplus/LogSourceSiemMatrix'
import IrProcessTimeline from './secplus/IrProcessTimeline'
import RiskTreatmentMatrix from './secplus/RiskTreatmentMatrix'
import ThirdPartyRiskSpectrum from './secplus/ThirdPartyRiskSpectrum'
import PyramidOfPain from './cysa/PyramidOfPain'
import SocAlertSeverityLadder from './cysa/SocAlertSeverityLadder'
import SiemRuleBuilder from './cysa/SiemRuleBuilder'
import CvssCalculator from './cysa/CvssCalculator'
import VulnScanTimeline from './cysa/VulnScanTimeline'
import PatchPriorityMatrix from './cysa/PatchPriorityMatrix'
import NistIrLifecycle from './cysa/NistIrLifecycle'
import CyberKillChain from './cysa/CyberKillChain'
import ContainmentComparison from './cysa/ContainmentComparison'
import EscalationLadder from './cysa/EscalationLadder'
import ReportSeverityDecision from './cysa/ReportSeverityDecision'
import VpcConnectivityScaling from './awssaa/VpcConnectivityScaling'
import IamPolicyEvaluation from './awssaa/IamPolicyEvaluation'
import SharedResponsibilitySpectrum from './awssaa/SharedResponsibilitySpectrum'
import KmsKeyComparison from './awssaa/KmsKeyComparison'
import MultiAzVsMultiRegion from './awssaa/MultiAzVsMultiRegion'
import AutoScalingTimeline from './awssaa/AutoScalingTimeline'
import StorageServiceSelector from './awssaa/StorageServiceSelector'
import CachingDecisionTree from './awssaa/CachingDecisionTree'
import DatabaseSelectionMatrix from './awssaa/DatabaseSelectionMatrix'
import PurchaseOptionSpectrum from './awssaa/PurchaseOptionSpectrum'
import S3StorageClassLadder from './awssaa/S3StorageClassLadder'
import CostCalculator from './awssaa/CostCalculator'
import ObjectLockModes from './awsscs/ObjectLockModes'
import GuardDutySeverityLadder from './awsscs/GuardDutySeverityLadder'
import AwsIrTimeline from './awsscs/AwsIrTimeline'
import CloudTrailWatchConfigComparison from './awsscs/CloudTrailWatchConfigComparison'
import LogPipelineDiagram from './awsscs/LogPipelineDiagram'
import SgVsNaclComparison from './awsscs/SgVsNaclComparison'
import VpcEndpointDecision from './awsscs/VpcEndpointDecision'
import WafRuleFlow from './awsscs/WafRuleFlow'
import CrossAccountTrustEvaluator from './awsscs/CrossAccountTrustEvaluator'
import PermissionBoundaryVsScp from './awsscs/PermissionBoundaryVsScp'
import EncryptionAtRestComparison from './awsscs/EncryptionAtRestComparison'
import ScpHierarchyLadder from './awsscs/ScpHierarchyLadder'
import ComplianceFrameworkMapping from './awsscs/ComplianceFrameworkMapping'
import SecurityModelLattice from './cissp/SecurityModelLattice'
import RiskManagementTimeline from './cissp/RiskManagementTimeline'
import GovernanceComparison from './cissp/GovernanceComparison'
import DataClassificationLadder from './cissp/DataClassificationLadder'
import DataLifecycleTimeline from './cissp/DataLifecycleTimeline'
import SymmetricVsAsymmetricCrypto from './cissp/SymmetricVsAsymmetricCrypto'
import AttackMappingLadder from './cissp/AttackMappingLadder'
import SecureNetworkDiagram from './cissp/SecureNetworkDiagram'
import AccessControlModelMatrix from './cissp/AccessControlModelMatrix'
import SsoFederationTimeline from './cissp/SsoFederationTimeline'
import PenTestTimeline from './cissp/PenTestTimeline'
import AuditTypeComparison from './cissp/AuditTypeComparison'
import IrPhaseLadder from './cissp/IrPhaseLadder'
import BcpSpectrum from './cissp/BcpSpectrum'
import SdlcTimeline from './cissp/SdlcTimeline'
import Owasp10Ladder from './cissp/Owasp10Ladder'
import TroubleshootingMethodology from './aplus1/TroubleshootingMethodology'
import MobileConnectivityComparison from './aplus1/MobileConnectivityComparison'
import FruTeardownOrder from './aplus1/FruTeardownOrder'
import CableConnectorComparison from './aplus1/CableConnectorComparison'
import WifiStandardSpectrum from './aplus1/WifiStandardSpectrum'
import PortsProtocolsMatcher from './aplus1/PortsProtocolsMatcher'
import RamCompatibilityLadder from './aplus1/RamCompatibilityLadder'
import PsuWattageCalculator from './aplus1/PsuWattageCalculator'
import RaidLevelComparison from './aplus1/RaidLevelComparison'
import HypervisorTypeComparison from './aplus1/HypervisorTypeComparison'
import CloudServiceResponsibilitySpectrum from './aplus1/CloudServiceResponsibilitySpectrum'
import PostBootTroubleshootingFlow from './aplus1/PostBootTroubleshootingFlow'
import PrintTroubleshooting from './aplus1/PrintTroubleshooting'
import WindowsEditionPicker from './aplus2/WindowsEditionPicker'
import FileSystemComparison from './aplus2/FileSystemComparison'
import BootSequenceTimeline from './aplus2/BootSequenceTimeline'
import SocialEngineeringPicker from './aplus2/SocialEngineeringPicker'
import MalwareSeverityLadder from './aplus2/MalwareSeverityLadder'
import PermissionCalculator from './aplus2/PermissionCalculator'
import BsodDecisionTree from './aplus2/BsodDecisionTree'
import MobileTroubleshootingSpectrum from './aplus2/MobileTroubleshootingSpectrum'
import BrowserHardeningWalkthrough from './aplus2/BrowserHardeningWalkthrough'
import ChangeManagementTimeline from './aplus2/ChangeManagementTimeline'
import DocumentationLifecycle from './aplus2/DocumentationLifecycle'
import EsdSafetyMatrix from './aplus2/EsdSafetyMatrix'
import SubnetVisualizer from './netplus/SubnetVisualizer'
import OsiStack from './netplus/OsiStack'
import TcpVsUdp from './netplus/TcpVsUdp'
import SwitchingVsRouting from './netplus/SwitchingVsRouting'
import VlanSegmentation from './netplus/VlanSegmentation'
import ApChannelOverlapSpectrum from './netplus/ApChannelOverlapSpectrum'
import SnmpMonitoringFlow from './netplus/SnmpMonitoringFlow'
import BackupTypeSpectrum from './netplus/BackupTypeSpectrum'
import FirewallAclEvaluator from './netplus/FirewallAclEvaluator'
import VpnTunnelComparison from './netplus/VpnTunnelComparison'
import TroubleshootingMethodologyTimeline from './netplus/TroubleshootingMethodologyTimeline'
import CableFaultDecisionTree from './netplus/CableFaultDecisionTree'
import DbLossCalculator from './netplus/DbLossCalculator'

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
    id: 'secplus-cia-aaa-matrix',
    certId: 'secplus',
    domain: 1,
    title: 'CIA Triad × AAA Framework',
    description: 'Pick a CIA element and an AAA element to see how the two frameworks relate.',
    Component: CiaAaaMatrix,
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
    id: 'secplus-social-engineering-ladder',
    certId: 'secplus',
    domain: 2,
    title: 'Social Engineering Ladder',
    description: 'Click a tier to see how sophistication and targeting escalate from mass phishing to BEC.',
    Component: SocialEngineeringLadder,
  },
  {
    id: 'secplus-malware-comparison-grid',
    certId: 'secplus',
    domain: 2,
    title: 'Malware Type Comparison',
    description: 'Pick a malware type to see its defining trait.',
    Component: MalwareComparisonGrid,
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
    id: 'secplus-zero-trust-diagram',
    certId: 'secplus',
    domain: 3,
    title: 'Zero Trust Architecture',
    description: 'Step through the shift from perimeter trust to per-request verification.',
    Component: ZeroTrustDiagram,
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
    id: 'secplus-log-source-siem-matrix',
    certId: 'secplus',
    domain: 4,
    title: 'Log Source Fit for SIEM Questions',
    description: 'Pick a security question and a log source to see how well they match.',
    Component: LogSourceSiemMatrix,
  },
  {
    id: 'secplus-ir-process-timeline',
    certId: 'secplus',
    domain: 4,
    title: 'Incident Response Process',
    description: 'Step through the six-stage incident response lifecycle.',
    Component: IrProcessTimeline,
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
    id: 'secplus-risk-treatment-matrix',
    certId: 'secplus',
    domain: 5,
    title: 'Risk Treatment Matrix',
    description: 'Pick likelihood and impact to get the recommended risk treatment.',
    Component: RiskTreatmentMatrix,
  },
  {
    id: 'secplus-third-party-risk-spectrum',
    certId: 'secplus',
    domain: 5,
    title: 'Third-Party Risk Management Spectrum',
    description: 'Drag across the tiers to see how vendor oversight rigor trades off with cost.',
    Component: ThirdPartyRiskSpectrum,
  },
  {
    id: 'cysa-soc-alert-severity-ladder',
    certId: 'cysa',
    domain: 1,
    title: 'SOC Alert Severity Ladder',
    description: 'Click a severity tier to see its typical triage SLA and what drives an alert into that tier.',
    Component: SocAlertSeverityLadder,
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
    id: 'cysa-siem-rule-builder',
    certId: 'cysa',
    domain: 1,
    title: 'SIEM Correlation Rule Builder',
    description: 'Pick a logged condition and see whether it clears the bar for a correlation rule/alert.',
    Component: SiemRuleBuilder,
  },
  {
    id: 'cysa-vuln-scan-timeline',
    certId: 'cysa',
    domain: 2,
    title: 'Vulnerability Scanning Lifecycle',
    description: 'Step through a full scan-to-remediation cycle.',
    Component: VulnScanTimeline,
  },
  {
    id: 'cysa-cvss-calculator',
    certId: 'cysa',
    domain: 2,
    title: 'CVSS v3 Base Score Estimator',
    description: 'Adjust the four exploitability metrics to see how they drive an illustrative CVSS base score.',
    Component: CvssCalculator,
  },
  {
    id: 'cysa-patch-priority-matrix',
    certId: 'cysa',
    domain: 2,
    title: 'Patch Priority & SLA Matrix',
    description: 'Pick a vulnerability severity and an asset\'s exposure to get the recommended patch SLA.',
    Component: PatchPriorityMatrix,
  },
  {
    id: 'cysa-cyber-kill-chain',
    certId: 'cysa',
    domain: 3,
    title: 'Lockheed Martin Cyber Kill Chain',
    description: 'Step through the seven stages of an intrusion.',
    Component: CyberKillChain,
  },
  {
    id: 'cysa-nist-ir-lifecycle',
    certId: 'cysa',
    domain: 3,
    title: 'NIST SP 800-61 Incident Response Lifecycle',
    description: 'Step through the four phases of the NIST incident response lifecycle.',
    Component: NistIrLifecycle,
  },
  {
    id: 'cysa-containment-comparison',
    certId: 'cysa',
    domain: 3,
    title: 'Containment Strategy: Segment vs Shut Down',
    description: 'Two ways to contain a compromised host, and what each costs you.',
    Component: ContainmentComparison,
  },
  {
    id: 'cysa-report-severity-decision',
    certId: 'cysa',
    domain: 4,
    title: 'Who Needs to Know? Report Audience Selector',
    description: 'Pick the incident\'s scope and data sensitivity to see who the report should go to.',
    Component: ReportSeverityDecision,
  },
  {
    id: 'cysa-escalation-ladder',
    certId: 'cysa',
    domain: 4,
    title: 'Incident Escalation Ladder',
    description: 'Click a tier to see who owns it and how fast it must move.',
    Component: EscalationLadder,
  },
  {
    id: 'awssaa-iam-policy-evaluation',
    certId: 'awssaa',
    domain: 1,
    title: 'IAM Policy Evaluation Logic',
    description: 'Pick which explicit statements exist to see how IAM resolves the request.',
    Component: IamPolicyEvaluation,
  },
  {
    id: 'awssaa-shared-responsibility-spectrum',
    certId: 'awssaa',
    domain: 1,
    title: 'Shared Responsibility Spectrum',
    description: 'Drag across service models to see the line move between what you manage and what AWS manages.',
    Component: SharedResponsibilitySpectrum,
  },
  {
    id: 'awssaa-kms-key-comparison',
    certId: 'awssaa',
    domain: 1,
    title: 'AWS-Managed vs Customer-Managed KMS Keys',
    description: 'Compare the two key ownership models in AWS KMS.',
    Component: KmsKeyComparison,
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
    id: 'awssaa-multi-az-vs-multi-region',
    certId: 'awssaa',
    domain: 2,
    title: 'Multi-AZ vs Multi-Region',
    description: 'Compare what each resilience pattern actually protects against.',
    Component: MultiAzVsMultiRegion,
  },
  {
    id: 'awssaa-auto-scaling-timeline',
    certId: 'awssaa',
    domain: 2,
    title: 'Auto Scaling Group Timeline',
    description: 'Step through a scale-out and scale-in cycle.',
    Component: AutoScalingTimeline,
  },
  {
    id: 'awssaa-storage-service-selector',
    certId: 'awssaa',
    domain: 3,
    title: 'AWS Storage Service Selector',
    description: 'Pick a workload to get the recommended storage service.',
    Component: StorageServiceSelector,
  },
  {
    id: 'awssaa-database-selection-matrix',
    certId: 'awssaa',
    domain: 3,
    title: 'Database Selection Matrix',
    description: 'Pick a data-model need to get the recommended AWS database service.',
    Component: DatabaseSelectionMatrix,
  },
  {
    id: 'awssaa-caching-decision-tree',
    certId: 'awssaa',
    domain: 3,
    title: 'Caching Service Decision Tree',
    description: 'Pick a caching need to get the recommended AWS service.',
    Component: CachingDecisionTree,
  },
  {
    id: 'awssaa-purchase-option-spectrum',
    certId: 'awssaa',
    domain: 4,
    title: 'EC2 Purchase Option Spectrum',
    description: 'Slide across purchase options to see how discount, commitment, and interruption risk trade off.',
    Component: PurchaseOptionSpectrum,
  },
  {
    id: 'awssaa-s3-storage-class-ladder',
    certId: 'awssaa',
    domain: 4,
    title: 'S3 Storage Class Ladder',
    description: 'Click a storage class to see its retrieval time and use case.',
    Component: S3StorageClassLadder,
  },
  {
    id: 'awssaa-cost-calculator',
    certId: 'awssaa',
    domain: 4,
    title: 'On-Demand vs Committed Cost Calculator',
    description: 'Adjust usage and discount to compare On-Demand cost against a Savings Plan / Reserved Instance commitment.',
    Component: CostCalculator,
  },
  {
    id: 'awsscs-guardduty-severity-ladder',
    certId: 'awsscs',
    domain: 1,
    title: 'GuardDuty Finding Severity Ladder',
    description: 'Click a severity tier to see example findings and the expected response urgency.',
    Component: GuardDutySeverityLadder,
  },
  {
    id: 'awsscs-aws-ir-timeline',
    certId: 'awsscs',
    domain: 1,
    title: 'AWS Incident Response Lifecycle',
    description: 'Walk through an AWS-native incident from detection to lessons learned.',
    Component: AwsIrTimeline,
  },
  {
    id: 'awsscs-cloudtrail-watch-config-comparison',
    certId: 'awsscs',
    domain: 2,
    title: 'CloudTrail vs CloudWatch vs AWS Config',
    description: 'Three different questions about your account, three different tools — pick a question to see which service answers it.',
    Component: CloudTrailWatchConfigComparison,
  },
  {
    id: 'awsscs-log-pipeline-diagram',
    certId: 'awsscs',
    domain: 2,
    title: 'Anatomy of a Log & Alert Pipeline',
    description: 'From an API call to a security team alert.',
    Component: LogPipelineDiagram,
  },
  {
    id: 'awsscs-sg-vs-nacl-comparison',
    certId: 'awsscs',
    domain: 3,
    title: 'Security Groups vs Network ACLs',
    description: 'Instance-level vs subnet-level filtering, and what "stateful" actually buys you.',
    Component: SgVsNaclComparison,
  },
  {
    id: 'awsscs-vpc-endpoint-decision',
    certId: 'awsscs',
    domain: 3,
    title: 'Gateway vs Interface VPC Endpoint',
    description: 'Pick the service and where the request originates to find the right endpoint type.',
    Component: VpcEndpointDecision,
  },
  {
    id: 'awsscs-waf-rule-flow',
    certId: 'awsscs',
    domain: 3,
    title: 'How a WAF Web ACL Evaluates a Request',
    description: 'Walk a request through Web ACL rule evaluation, in priority order.',
    Component: WafRuleFlow,
  },
  {
    id: 'awsscs-cross-account-trust-evaluator',
    certId: 'awsscs',
    domain: 4,
    title: 'Cross-Account AssumeRole: Two Locks, Two Keys',
    description: 'sts:AssumeRole needs BOTH the role\'s trust policy and the caller\'s permission policy to agree.',
    Component: CrossAccountTrustEvaluator,
  },
  {
    id: 'awsscs-permission-boundary-vs-scp',
    certId: 'awsscs',
    domain: 4,
    title: 'Permission Boundary vs Service Control Policy',
    description: 'Two different "guardrails" that both cap permissions without ever granting any.',
    Component: PermissionBoundaryVsScp,
  },
  {
    id: 'awsscs-object-lock-modes',
    certId: 'awsscs',
    domain: 5,
    title: 'S3 Object Lock: Governance vs Compliance',
    description: 'Pick a retention mode and an actor, then try to delete a locked object to see who can override.',
    Component: ObjectLockModes,
  },
  {
    id: 'awsscs-encryption-at-rest-comparison',
    certId: 'awsscs',
    domain: 5,
    title: 'S3 Server-Side Encryption: SSE-S3 vs SSE-KMS vs SSE-C',
    description: 'Same goal — encrypt at rest — but three very different key-management trade-offs.',
    Component: EncryptionAtRestComparison,
  },
  {
    id: 'awsscs-scp-hierarchy-ladder',
    certId: 'awsscs',
    domain: 6,
    title: 'SCP Hierarchy: Scope Narrows, Restrictions Stack',
    description: 'Click a layer to see what it applies to — effective permission is the intersection of ALL of them.',
    Component: ScpHierarchyLadder,
  },
  {
    id: 'awsscs-compliance-framework-mapping',
    certId: 'awsscs',
    domain: 6,
    title: 'Which Compliance Tool Do I Reach For?',
    description: 'Pick the requirement to find the AWS service built for it.',
    Component: ComplianceFrameworkMapping,
  },
  {
    id: 'cissp-risk-management-timeline',
    certId: 'cissp',
    domain: 1,
    title: 'The Risk Management Lifecycle',
    description: 'Step through identifying, treating, and monitoring risk.',
    Component: RiskManagementTimeline,
  },
  {
    id: 'cissp-governance-comparison',
    certId: 'cissp',
    domain: 1,
    title: 'Policy vs Procedure',
    description: 'Compare two levels of the governance document hierarchy.',
    Component: GovernanceComparison,
  },
  {
    id: 'cissp-data-classification-ladder',
    certId: 'cissp',
    domain: 2,
    title: 'Data Classification Ladder',
    description: 'Click a tier to see how handling requirements escalate with classification.',
    Component: DataClassificationLadder,
  },
  {
    id: 'cissp-data-lifecycle-timeline',
    certId: 'cissp',
    domain: 2,
    title: 'The Data Lifecycle',
    description: 'Step through the controls that matter most at each stage.',
    Component: DataLifecycleTimeline,
  },
  {
    id: 'cissp-security-model-lattice',
    certId: 'cissp',
    domain: 3,
    title: 'Bell-LaPadula vs. Biba Access Rules',
    description: 'Pick a model, a clearance level, and an action to see whether the access rule allows or denies it.',
    Component: SecurityModelLattice,
  },
  {
    id: 'cissp-symmetric-vs-asymmetric-crypto',
    certId: 'cissp',
    domain: 3,
    title: 'Symmetric vs Asymmetric Cryptography',
    description: 'Compare the two fundamental encryption models.',
    Component: SymmetricVsAsymmetricCrypto,
  },
  {
    id: 'cissp-attack-mapping-ladder',
    certId: 'cissp',
    domain: 4,
    title: 'Network Attack Sophistication Ladder',
    description: 'Click a tier to see how complexity and impact escalate.',
    Component: AttackMappingLadder,
  },
  {
    id: 'cissp-secure-network-diagram',
    certId: 'cissp',
    domain: 4,
    title: 'Building a Segmented Network, Layer by Layer',
    description: 'Step through defense-in-depth network design.',
    Component: SecureNetworkDiagram,
  },
  {
    id: 'cissp-access-control-model-matrix',
    certId: 'cissp',
    domain: 5,
    title: 'Access Control Models',
    description: 'Pick a model to see who sets permissions and how it\'s used.',
    Component: AccessControlModelMatrix,
  },
  {
    id: 'cissp-sso-federation-timeline',
    certId: 'cissp',
    domain: 5,
    title: 'SSO via Federated Identity',
    description: 'Step through a SAML/OIDC single sign-on flow.',
    Component: SsoFederationTimeline,
  },
  {
    id: 'cissp-pen-test-timeline',
    certId: 'cissp',
    domain: 6,
    title: 'The Penetration Testing Process',
    description: 'Step through a full engagement from scoping to reporting.',
    Component: PenTestTimeline,
  },
  {
    id: 'cissp-audit-type-comparison',
    certId: 'cissp',
    domain: 6,
    title: 'Internal vs External Audit',
    description: 'Compare who performs each audit type and how much assurance it provides.',
    Component: AuditTypeComparison,
  },
  {
    id: 'cissp-ir-phase-ladder',
    certId: 'cissp',
    domain: 7,
    title: 'Incident Response Phases',
    description: 'Click a phase to see what happens and how time-critical it is.',
    Component: IrPhaseLadder,
  },
  {
    id: 'cissp-bcp-spectrum',
    certId: 'cissp',
    domain: 7,
    title: 'Business Continuity Test Maturity',
    description: 'Slide across BCP testing maturity to see how assurance, cost, and disruption trade off.',
    Component: BcpSpectrum,
  },
  {
    id: 'cissp-sdlc-timeline',
    certId: 'cissp',
    domain: 8,
    title: 'Secure SDLC',
    description: 'Step through security integrated at every phase of development.',
    Component: SdlcTimeline,
  },
  {
    id: 'cissp-owasp-10-ladder',
    certId: 'cissp',
    domain: 8,
    title: 'OWASP Top 10 (2021) — Leading Categories',
    description: 'Click a category to see how it manifests in real applications.',
    Component: Owasp10Ladder,
  },
  {
    id: 'aplus1-mobile-connectivity-comparison',
    certId: 'aplus1',
    domain: 1,
    title: 'Mobile Device Connectivity Trade-offs',
    description: 'Compare range, throughput, and power draw across the four short-range connection methods.',
    Component: MobileConnectivityComparison,
  },
  {
    id: 'aplus1-fru-teardown-order',
    certId: 'aplus1',
    domain: 1,
    title: 'Laptop FRU Teardown Order',
    description: 'The field-replaceable-unit layers, outermost to innermost.',
    Component: FruTeardownOrder,
  },
  {
    id: 'aplus1-cable-connector-comparison',
    certId: 'aplus1',
    domain: 2,
    title: 'Cable & Connector Comparison',
    description: 'Speed, distance, and connector type across the four media you\'ll be asked to pick between.',
    Component: CableConnectorComparison,
  },
  {
    id: 'aplus1-wifi-standard-spectrum',
    certId: 'aplus1',
    domain: 2,
    title: '802.11 Wi-Fi Standard Spectrum',
    description: 'Slide across the standards to see how speed, frequency, and range trade off as Wi-Fi evolved.',
    Component: WifiStandardSpectrum,
  },
  {
    id: 'aplus1-ports-protocols-matcher',
    certId: 'aplus1',
    domain: 2,
    title: 'Common Ports & Protocols Matcher',
    description: 'Pick a port number, then pick the protocol you think it maps to.',
    Component: PortsProtocolsMatcher,
  },
  {
    id: 'aplus1-ram-compatibility-ladder',
    certId: 'aplus1',
    domain: 3,
    title: 'RAM Generation Compatibility Ladder',
    description: 'Click each generation to see why it\'s physically and electrically incompatible with the others.',
    Component: RamCompatibilityLadder,
  },
  {
    id: 'aplus1-psu-wattage-calculator',
    certId: 'aplus1',
    domain: 3,
    title: 'PSU Wattage Calculator',
    description: 'Sum component draw against the PSU\'s rating to see if there\'s enough headroom.',
    Component: PsuWattageCalculator,
  },
  {
    id: 'aplus1-raid-level-comparison',
    certId: 'aplus1',
    domain: 3,
    title: 'RAID 0 / 1 / 5 / 10 Comparison',
    description: 'Four identical drives, one shared size slider: see how striping, mirroring, and parity change usable capacity and fault tolerance.',
    Component: RaidLevelComparison,
  },
  {
    id: 'aplus1-hypervisor-type-comparison',
    certId: 'aplus1',
    domain: 4,
    title: 'Type 1 vs Type 2 Hypervisors',
    description: 'Bare-metal vs hosted virtualization, stacked to show what sits between the VM and the hardware.',
    Component: HypervisorTypeComparison,
  },
  {
    id: 'aplus1-cloud-service-responsibility-spectrum',
    certId: 'aplus1',
    domain: 4,
    title: 'IaaS / PaaS / SaaS Responsibility Spectrum',
    description: 'Drag across the service models to see the line move between what you manage and what the provider manages.',
    Component: CloudServiceResponsibilitySpectrum,
  },
  {
    id: 'aplus1-troubleshooting-methodology',
    certId: 'aplus1',
    domain: 5,
    title: 'The CompTIA Troubleshooting Methodology',
    description: 'Step through the six-step process (also tested on Core 2) with a worked example at each stage.',
    Component: TroubleshootingMethodology,
  },
  {
    id: 'aplus1-post-boot-troubleshooting-flow',
    certId: 'aplus1',
    domain: 5,
    title: 'POST / Boot Failure Troubleshooting Flow',
    description: 'Step through the boot sequence to see where a failure points you.',
    Component: PostBootTroubleshootingFlow,
  },
  {
    id: 'aplus1-print-troubleshooting',
    certId: 'aplus1',
    domain: 5,
    title: 'Print Troubleshooting: Symptom to Cause',
    description: 'Click a symptom to see its most likely cause and the fix to try first.',
    Component: PrintTroubleshooting,
  },
  {
    id: 'aplus2-windows-edition-picker',
    certId: 'aplus2',
    domain: 1,
    title: 'Windows Edition Feature Picker',
    description: 'Pick an edition and a feature to see whether it\'s unlocked.',
    Component: WindowsEditionPicker,
  },
  {
    id: 'aplus2-file-system-comparison',
    certId: 'aplus2',
    domain: 1,
    title: 'File System Comparison',
    description: 'Pick two file systems to compare side by side.',
    Component: FileSystemComparison,
  },
  {
    id: 'aplus2-boot-sequence-timeline',
    certId: 'aplus2',
    domain: 1,
    title: 'OS Boot Sequence Timeline',
    description: 'Walk through POST → bootloader → kernel → login.',
    Component: BootSequenceTimeline,
  },
  {
    id: 'aplus2-social-engineering-picker',
    certId: 'aplus2',
    domain: 2,
    title: 'Social-Engineering Red-Flag Picker',
    description: 'Pick the channel and the attacker\'s technique to see the verdict.',
    Component: SocialEngineeringPicker,
  },
  {
    id: 'aplus2-malware-severity-ladder',
    certId: 'aplus2',
    domain: 2,
    title: 'Malware Severity & Stealth Ladder',
    description: 'Click a tier to see how disruptive and how hidden each malware type tends to be.',
    Component: MalwareSeverityLadder,
  },
  {
    id: 'aplus2-permission-calculator',
    certId: 'aplus2',
    domain: 2,
    title: 'NTFS vs Share Permission Calculator',
    description: 'Combine an NTFS permission with a share permission to find the effective access.',
    Component: PermissionCalculator,
  },
  {
    id: 'aplus2-bsod-decision-tree',
    certId: 'aplus2',
    domain: 3,
    title: 'BSOD / Boot Error Decision Tree',
    description: 'Pick the symptom and when it happens to get the likely cause and fix path.',
    Component: BsodDecisionTree,
  },
  {
    id: 'aplus2-mobile-troubleshooting-spectrum',
    certId: 'aplus2',
    domain: 3,
    title: 'Mobile App Troubleshooting Spectrum',
    description: 'Drag across common mobile OS symptoms to see the likely cause and fix.',
    Component: MobileTroubleshootingSpectrum,
  },
  {
    id: 'aplus2-browser-hardening-walkthrough',
    certId: 'aplus2',
    domain: 3,
    title: 'Browser Hardening Walkthrough',
    description: 'Step through certificate warnings, extensions, pop-ups, and proxy settings.',
    Component: BrowserHardeningWalkthrough,
  },
  {
    id: 'aplus2-change-management-timeline',
    certId: 'aplus2',
    domain: 4,
    title: 'Change Management Process',
    description: 'Step through the documented process every IT change should follow.',
    Component: ChangeManagementTimeline,
  },
  {
    id: 'aplus2-documentation-lifecycle',
    certId: 'aplus2',
    domain: 4,
    title: 'IT Documentation Types',
    description: 'Click each document type to see what it captures and why it\'s maintained.',
    Component: DocumentationLifecycle,
  },
  {
    id: 'aplus2-esd-safety-matrix',
    certId: 'aplus2',
    domain: 4,
    title: 'ESD & Component Safety',
    description: 'Pick a component and a precaution to see whether the handling is safe.',
    Component: EsdSafetyMatrix,
  },
  {
    id: 'netplus-subnet-visualizer',
    certId: 'netplus',
    domain: 1,
    title: 'CIDR / Subnetting Visualizer',
    description: 'Enter a network address and drag the prefix length to see the mask, range, and host count live.',
    Component: SubnetVisualizer,
  },
  {
    id: 'netplus-osi-stack',
    certId: 'netplus',
    domain: 1,
    title: 'The OSI 7-Layer Model',
    description: 'Click any layer to see its PDU, protocols, and role in getting data across a network.',
    Component: OsiStack,
  },
  {
    id: 'netplus-tcp-vs-udp',
    certId: 'netplus',
    domain: 1,
    title: 'TCP vs. UDP',
    description: 'The two transport-layer protocols, and what happens to each when a segment goes missing.',
    Component: TcpVsUdp,
  },
  {
    id: 'netplus-switching-vs-routing',
    certId: 'netplus',
    domain: 2,
    title: 'Switching vs Routing',
    description: 'Compare how a Layer 2 switch and a Layer 3 router each decide where to forward traffic.',
    Component: SwitchingVsRouting,
  },
  {
    id: 'netplus-vlan-segmentation',
    certId: 'netplus',
    domain: 2,
    title: 'VLAN Segmentation',
    description: 'See how 802.1Q tagging splits one physical switch into isolated broadcast domains.',
    Component: VlanSegmentation,
  },
  {
    id: 'netplus-ap-channel-overlap-spectrum',
    certId: 'netplus',
    domain: 2,
    title: '2.4 GHz Channel Overlap',
    description: 'Slide across channel plans to see how spacing affects interference and throughput.',
    Component: ApChannelOverlapSpectrum,
  },
  {
    id: 'netplus-snmp-monitoring-flow',
    certId: 'netplus',
    domain: 3,
    title: 'SNMP Monitoring Flow',
    description: 'Step through polling, setting, and unsolicited traps.',
    Component: SnmpMonitoringFlow,
  },
  {
    id: 'netplus-backup-type-spectrum',
    certId: 'netplus',
    domain: 3,
    title: 'Backup Type Spectrum',
    description: 'Slide across backup types to see how each trades backup time, restore time, and storage.',
    Component: BackupTypeSpectrum,
  },
  {
    id: 'netplus-firewall-acl-evaluator',
    certId: 'netplus',
    domain: 4,
    title: 'Firewall ACL Evaluator',
    description: 'Pick a destination port and a rule set to see how top-down evaluation decides the outcome.',
    Component: FirewallAclEvaluator,
  },
  {
    id: 'netplus-vpn-tunnel-comparison',
    certId: 'netplus',
    domain: 4,
    title: 'VPN Tunnel Comparison',
    description: 'Contrast an always-on site-to-site tunnel with an on-demand client-to-site connection.',
    Component: VpnTunnelComparison,
  },
  {
    id: 'netplus-troubleshooting-methodology-timeline',
    certId: 'netplus',
    domain: 5,
    title: 'Network Troubleshooting Methodology',
    description: 'Step through CompTIA\'s seven-stage troubleshooting process.',
    Component: TroubleshootingMethodologyTimeline,
  },
  {
    id: 'netplus-cable-fault-decision-tree',
    certId: 'netplus',
    domain: 5,
    title: 'Cable Fault Decision Tree',
    description: 'Pick a symptom and a cable type to see the most likely root cause.',
    Component: CableFaultDecisionTree,
  },
  {
    id: 'netplus-db-loss-calculator',
    certId: 'netplus',
    domain: 5,
    title: 'Fiber Link Loss Calculator',
    description: 'Adjust fiber run length and connector/splice counts to estimate total loss against a link budget.',
    Component: DbLossCalculator,
  },
]

export function conceptsForCert(certId: string): ConceptEntry[] {
  return CONCEPTS.filter((c) => c.certId === certId)
}
