export type OrgCategory =
  | 'government'
  | 'municipality'
  | 'waste_management'
  | 'ngo'
  | 'recycler'
  | 'corporate_csr'
  | 'educational'
  | 'research'
  | 'sustainability'
  | 'logistics'
  | 'reward_partner'
  | 'community'
  | 'other';

export type VerificationStatus =
  | 'government_verified'
  | 'verified'
  | 'data_verified'
  | 'environmental_partner'
  | 'active_partner'
  | 'pending';

export type PortalMode = 'simple' | 'enterprise';

export type UserRole =
  | 'super_admin'
  | 'gov_authority'
  | 'municipal_officer'
  | 'org_admin'
  | 'operations_manager'
  | 'field_worker'
  | 'data_manager'
  | 'researcher'
  | 'csr_manager'
  | 'viewer';

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type TaskStatus =
  | 'new'
  | 'accepted'
  | 'assigned'
  | 'in_progress'
  | 'awaiting_verification'
  | 'completed'
  | 'rejected'
  | 'escalated';

export type ComplaintCategory =
  | 'Waste Overflow'
  | 'Illegal Dumping'
  | 'Missed Collection'
  | 'Plastic Waste'
  | 'E-Waste'
  | 'Open Burning'
  | 'Public Cleanliness'
  | 'Drainage Waste'
  | 'Hazardous Waste'
  | 'Other Environmental Issue';

export interface Organization {
  id: string;
  name: string;
  category: OrgCategory;
  categoryLabel: string;
  icon: string;
  regId: string;
  state: string;
  district: string;
  city: string;
  address: string;
  website: string;
  officialEmail: string;
  contactNumber: string;
  representative: {
    name: string;
    designation: string;
    email: string;
    contact: string;
  };
  operationalAreas: {
    states: string[];
    districts: string[];
    cities: string[];
    municipalZones: string[];
  };
  capabilities: string[];
  verificationStatus: VerificationStatus;
  verificationBadge: string;
  performanceScore: number;
  responseAvgMinutes: number;
  activeTasksCount: number;
  completedTasksCount: number;
  impactMetrics: {
    wasteCollectedKg: number;
    wasteRecycledKg: number;
    co2AvoidedKg: number;
    complaintsResolved: number;
    treesEquivalent: number;
    waterSavedLiters: number;
    energySavedKwh: number;
    peopleEngaged: number;
  };
  rating: number;
  coordinates: [number, number];
  isSimpleModeRecommended?: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  location: string;
  coordinates: [number, number];
  zone: string;
  priority: TaskPriority;
  reportedBy: string;
  reportedAt: string;
  description: string;
  photos: string[];
  status: TaskStatus;
  assignedOrgId: string;
  assignedOrgName: string;
  assignedTeam?: string;
  deadline: string;
  proofOfAction?: {
    photos: string[];
    notes: string;
    verifiedAt?: string;
    verifiedBy?: string;
    weighbridgeSlipKg?: number;
    gpsVerification: boolean;
  };
  aiRecommendation?: {
    orgName: string;
    capabilityMatch: number;
    distanceKm: number;
    avgResponseMinutes: number;
    confidence: number;
  };
  citizenRewardPoints: number;
  estimatedWasteKg?: number;
}

export interface ComplaintItem {
  id: string;
  ticketNumber: string;
  category: ComplaintCategory;
  location: string;
  coordinates: [number, number];
  ward: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  submittedAt: string;
  slaDeadline: string;
  status: 'Open' | 'Assigned' | 'Under Action' | 'Escalated' | 'Resolved' | 'Closed';
  evidencePhotos: string[];
  aiClassification: {
    detectedCategory: string;
    severityScore: number;
    recommendedAuthority: string;
    isDuplicateCluster?: boolean;
    clusterCount?: number;
  };
  assignedAuthority: string;
  assignedTeam: string;
  citizenName: string;
  citizenPhone: string;
  slaTimeline: {
    submitted: string;
    assigned?: string;
    warningAt?: string;
    escalatedAt?: string;
    resolvedAt?: string;
  };
  resolutionProof?: {
    photoUrl: string;
    timestamp: string;
    inspectorName: string;
    feedbackScore?: number;
  };
}

export interface WasteOperationRecord {
  id: string;
  routeId: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  zone: string;
  status: 'In Transit' | 'Collecting' | 'Sorting' | 'Processed' | 'Completed';
  totalCollectedKg: number;
  segregation: {
    organicKg: number;
    dryRecyclableKg: number;
    plasticKg: number;
    eWasteKg: number;
    hazardousKg: number;
  };
  destinationFacility: string;
  co2OffsetKg: number;
  timestamp: string;
  gpsTrack: [number, number][];
}

export interface CollaborationRequest {
  id: string;
  title: string;
  fromOrgId: string;
  fromOrgName: string;
  fromOrgType: string;
  toOrgId: string;
  toOrgName: string;
  toOrgType: string;
  scope: string;
  category: 'Recycling Partnership' | 'CSR Environmental Mission' | 'Municipal Joint Clean' | 'Research & Sensor Data' | 'E-Waste Takeback';
  status: 'Pending' | 'Accepted' | 'Active' | 'Completed' | 'Declined';
  proposedAt: string;
  durationMonths: number;
  targetImpactKg: number;
}

export interface EnvironmentalDataset {
  id: string;
  datasetName: string;
  providerOrgId: string;
  providerName: string;
  providerType: OrgCategory;
  category: 'AQI' | 'Waste Generation' | 'Recycling Yield' | 'CO2 Flux' | 'Water Quality' | 'Population & Density' | 'Bio-diversity' | 'Sensor Network';
  coverageRegion: string;
  recordsCount: number;
  lastUpdated: string;
  provenance: 'Verified Data' | 'Government Data' | 'Partner Data' | 'Open Data' | 'Simulated Data';
  verificationStatus: 'Verified' | 'Under Review' | 'Flagged';
  dataUrl?: string;
  sampleRows?: Record<string, string | number>[];
}

export interface AiEnvironmentalInsight {
  id: string;
  type: 'hotspot' | 'anomaly' | 'gap' | 'trend' | 'recommendation';
  title: string;
  summary: string;
  whyItMatters: string;
  recommendedAction: string;
  relevantOrgType: string;
  confidencePercent: number;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  region: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'task' | 'complaint' | 'verification' | 'collaboration' | 'ai_alert' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
