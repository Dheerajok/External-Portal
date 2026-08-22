import {
  Organization,
  TaskItem,
  ComplaintItem,
  WasteOperationRecord,
  CollaborationRequest,
  EnvironmentalDataset,
  AiEnvironmentalInsight,
  SystemNotification
} from '../types';

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-indore-imc',
    name: 'Indore Municipal Corporation - Waste & Cleanliness Dept',
    category: 'municipality',
    categoryLabel: 'Municipality / Local Body',
    icon: '🏙️',
    regId: 'MP-IMC-SBM-2024-001',
    state: 'Madhya Pradesh',
    district: 'Indore',
    city: 'Indore',
    address: 'Palika Bhawan, Shivaji Market, Indore - 452001',
    website: 'https://imcindore.mp.gov.in',
    officialEmail: 'swachh@imcindore.mp.gov.in',
    contactNumber: '+91 731 253 7111',
    representative: {
      name: 'Dr. Harshvardhan Sharma',
      designation: 'Additional Municipal Commissioner (Swachh)',
      email: 'h.sharma@imcindore.mp.gov.in',
      contact: '+91 98260 11223'
    },
    operationalAreas: {
      states: ['Madhya Pradesh'],
      districts: ['Indore'],
      cities: ['Indore', 'Mhow', 'Rau'],
      municipalZones: ['Zone 1 (Rajwada)', 'Zone 3 (Vijay Nagar)', 'Zone 5 (Palasia)', 'Zone 7 (Rau)', 'Zone 9 (Bhanwarkuan)']
    },
    capabilities: [
      'Waste Collection',
      'Waste Processing',
      'Complaint Resolution',
      'Environmental Monitoring',
      'Logistics',
      'Data Contribution'
    ],
    verificationStatus: 'government_verified',
    verificationBadge: 'Government Verified Authority',
    performanceScore: 98.4,
    responseAvgMinutes: 28,
    activeTasksCount: 14,
    completedTasksCount: 3840,
    impactMetrics: {
      wasteCollectedKg: 428000,
      wasteRecycledKg: 395000,
      co2AvoidedKg: 285000,
      complaintsResolved: 4120,
      treesEquivalent: 14250,
      waterSavedLiters: 1850000,
      energySavedKwh: 450000,
      peopleEngaged: 850000
    },
    rating: 4.9,
    coordinates: [22.7196, 75.8577],
    isSimpleModeRecommended: false
  },
  {
    id: 'org-cpcb-central',
    name: 'Central Pollution Control Board (CPCB Regional Hub)',
    category: 'government',
    categoryLabel: 'Government Authority',
    icon: '🏛️',
    regId: 'GOI-CPCB-REG-502',
    state: 'National / Central Hub',
    district: 'New Delhi',
    city: 'New Delhi',
    address: 'Parivesh Bhawan, CBD-cum-Office Complex, East Arjun Nagar, Delhi - 110032',
    website: 'https://cpcb.nic.in',
    officialEmail: 'authority@cpcb.gov.in',
    contactNumber: '+91 11 4310 2030',
    representative: {
      name: 'Sunita Verma, IFS',
      designation: 'Director of Environmental Surveillance',
      email: 'sverma@cpcb.gov.in',
      contact: '+91 11 4310 2035'
    },
    operationalAreas: {
      states: ['All India', 'Madhya Pradesh', 'Maharashtra', 'Delhi-NCR', 'Karnataka'],
      districts: ['All Districts'],
      cities: ['National Network'],
      municipalZones: ['Central Oversight Grid']
    },
    capabilities: [
      'Environmental Monitoring',
      'Complaint Resolution',
      'Research',
      'Data Contribution'
    ],
    verificationStatus: 'government_verified',
    verificationBadge: 'Apex Regulatory Body',
    performanceScore: 97.0,
    responseAvgMinutes: 35,
    activeTasksCount: 8,
    completedTasksCount: 1250,
    impactMetrics: {
      wasteCollectedKg: 1200000,
      wasteRecycledKg: 980000,
      co2AvoidedKg: 890000,
      complaintsResolved: 8200,
      treesEquivalent: 44500,
      waterSavedLiters: 9200000,
      energySavedKwh: 1200000,
      peopleEngaged: 4200000
    },
    rating: 4.95,
    coordinates: [28.6139, 77.2090],
    isSimpleModeRecommended: false
  },
  {
    id: 'org-bharat-recyclers',
    name: 'Bharat Green Cycle & E-Waste Solutions Ltd.',
    category: 'recycler',
    categoryLabel: 'Recycling Organization',
    icon: '🏭',
    regId: 'CIN-U37200MP2019PTC049210',
    state: 'Madhya Pradesh',
    district: 'Indore',
    city: 'Pithampur Industrial Area',
    address: 'Sector 3, Plot 14-B, Pithampur SEZ, Dhar/Indore - 454774',
    website: 'https://bharatrecycle.org',
    officialEmail: 'partnerships@bharatrecycle.org',
    contactNumber: '+91 7292 405820',
    representative: {
      name: 'Rajesh Agrawal',
      designation: 'Head of Industrial Procurement & Circular Ops',
      email: 'rajesh.a@bharatrecycle.org',
      contact: '+91 94250 88712'
    },
    operationalAreas: {
      states: ['Madhya Pradesh', 'Gujarat', 'Maharashtra'],
      districts: ['Indore', 'Dhar', 'Ujjain', 'Dewas'],
      cities: ['Indore', 'Pithampur', 'Ujjain'],
      municipalZones: ['Indore Industrial Belt', 'Sanwer Corridor', 'Rau SEZ']
    },
    capabilities: [
      'Waste Processing',
      'Recycling',
      'E-Waste',
      'Plastic Waste',
      'Logistics',
      'Data Contribution'
    ],
    verificationStatus: 'verified',
    verificationBadge: 'Verified Industrial Recycler',
    performanceScore: 94.2,
    responseAvgMinutes: 45,
    activeTasksCount: 19,
    completedTasksCount: 2190,
    impactMetrics: {
      wasteCollectedKg: 284000,
      wasteRecycledKg: 268000,
      co2AvoidedKg: 194000,
      complaintsResolved: 820,
      treesEquivalent: 9700,
      waterSavedLiters: 890000,
      energySavedKwh: 340000,
      peopleEngaged: 140000
    },
    rating: 4.8,
    coordinates: [22.6186, 75.6885],
    isSimpleModeRecommended: false
  },
  {
    id: 'org-prakriti-mitra',
    name: 'Prakriti Mitra Foundation',
    category: 'ngo',
    categoryLabel: 'NGO / Environmental Organization',
    icon: '🌱',
    regId: 'NGO-DARPAN-MP-2021-8841',
    state: 'Madhya Pradesh',
    district: 'Indore',
    city: 'Indore',
    address: '102 Green Heights, Anand Bazar, Old Palasia, Indore - 452001',
    website: 'https://prakritimitra.org',
    officialEmail: 'action@prakritimitra.org',
    contactNumber: '+91 731 498 3341',
    representative: {
      name: 'Ananya Deshmukh',
      designation: 'Founder & Community Lead',
      email: 'ananya@prakritimitra.org',
      contact: '+91 97520 44321'
    },
    operationalAreas: {
      states: ['Madhya Pradesh'],
      districts: ['Indore'],
      cities: ['Indore'],
      municipalZones: ['Ward 14 (Khajrana)', 'Ward 22 (Palasia)', 'Ward 45 (Bhawarkua)']
    },
    capabilities: [
      'Complaint Resolution',
      'Plastic Waste',
      'Education',
      'Community Campaigns',
      'Data Contribution'
    ],
    verificationStatus: 'verified',
    verificationBadge: 'Verified Grassroots NGO',
    performanceScore: 96.1,
    responseAvgMinutes: 38,
    activeTasksCount: 6,
    completedTasksCount: 780,
    impactMetrics: {
      wasteCollectedKg: 42000,
      wasteRecycledKg: 38500,
      co2AvoidedKg: 31000,
      complaintsResolved: 640,
      treesEquivalent: 1550,
      waterSavedLiters: 140000,
      energySavedKwh: 48000,
      peopleEngaged: 95000
    },
    rating: 4.9,
    coordinates: [22.7244, 75.8839],
    isSimpleModeRecommended: true
  },
  {
    id: 'org-cleanroute-logistics',
    name: 'CleanRoute Eco-Logistics Fleet',
    category: 'logistics',
    categoryLabel: 'Collection / Logistics Partner',
    icon: '🚛',
    regId: 'MP-LOG-2022-7719',
    state: 'Madhya Pradesh',
    district: 'Indore',
    city: 'Indore',
    address: 'Transport Nagar, Ring Road, Indore - 452014',
    website: 'https://cleanroutelogistics.in',
    officialEmail: 'dispatch@cleanroutelogistics.in',
    contactNumber: '+91 731 280 9900',
    representative: {
      name: 'Vikram Singh',
      designation: 'Fleet Operations Director',
      email: 'vikram@cleanroutelogistics.in',
      contact: '+91 98930 11984'
    },
    operationalAreas: {
      states: ['Madhya Pradesh'],
      districts: ['Indore', 'Ujjain', 'Dewas'],
      cities: ['Indore', 'Dewas'],
      municipalZones: ['All Municipal Zones 1-19']
    },
    capabilities: [
      'Waste Collection',
      'Logistics',
      'Food Waste',
      'E-Waste'
    ],
    verificationStatus: 'verified',
    verificationBadge: 'Verified Logistics Partner',
    performanceScore: 92.5,
    responseAvgMinutes: 22,
    activeTasksCount: 22,
    completedTasksCount: 5410,
    impactMetrics: {
      wasteCollectedKg: 610000,
      wasteRecycledKg: 520000,
      co2AvoidedKg: 390000,
      complaintsResolved: 2900,
      treesEquivalent: 19500,
      waterSavedLiters: 2100000,
      energySavedKwh: 610000,
      peopleEngaged: 480000
    },
    rating: 4.75,
    coordinates: [22.6953, 75.8644],
    isSimpleModeRecommended: false
  },
  {
    id: 'org-tata-csr',
    name: 'Tata Sustainability & Green CSR Initiative',
    category: 'corporate_csr',
    categoryLabel: 'Corporate / CSR Partner',
    icon: '🏢',
    regId: 'CSR-CORP-GOI-2018-093',
    state: 'Maharashtra / MP Hub',
    district: 'Mumbai / Indore',
    city: 'Indore Regional Office',
    address: 'Brilliant Convention Centre Complex, Scheme 78, Indore - 452010',
    website: 'https://tatasustainability.com',
    officialEmail: 'csr.enviro@tata.com',
    contactNumber: '+91 22 6665 8282',
    representative: {
      name: 'Meera Iyer',
      designation: 'Head of ESG & Circularity Investments',
      email: 'm.iyer@tata.com',
      contact: '+91 98200 45990'
    },
    operationalAreas: {
      states: ['Madhya Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
      districts: ['Indore', 'Pune', 'Bengaluru', 'Nagpur'],
      cities: ['Indore', 'Pune', 'Bengaluru'],
      municipalZones: ['Indore Smart City Grid']
    },
    capabilities: [
      'CSR',
      'Education',
      'Research',
      'Environmental Monitoring',
      'Rewards',
      'Data Contribution'
    ],
    verificationStatus: 'environmental_partner',
    verificationBadge: 'Strategic CSR Environmental Partner',
    performanceScore: 97.8,
    responseAvgMinutes: 50,
    activeTasksCount: 4,
    completedTasksCount: 310,
    impactMetrics: {
      wasteCollectedKg: 180000,
      wasteRecycledKg: 175000,
      co2AvoidedKg: 160000,
      complaintsResolved: 450,
      treesEquivalent: 8000,
      waterSavedLiters: 1200000,
      energySavedKwh: 290000,
      peopleEngaged: 320000
    },
    rating: 4.95,
    coordinates: [22.7533, 75.8937],
    isSimpleModeRecommended: false
  },
  {
    id: 'org-iit-lab',
    name: 'IIT Indore Centre for Environmental & Sensor Research',
    category: 'research',
    categoryLabel: 'Research Organization',
    icon: '🔬',
    regId: 'INST-IIT-IND-2009-RND',
    state: 'Madhya Pradesh',
    district: 'Indore',
    city: 'Simrol, Indore',
    address: 'Khandwa Road, Simrol, Indore - 453552',
    website: 'https://iiti.ac.in/env-lab',
    officialEmail: 'envlab@iiti.ac.in',
    contactNumber: '+91 731 660 3000',
    representative: {
      name: 'Prof. Alok Mukherjee, Ph.D.',
      designation: 'Principal Investigator - Urban AQI & Waste Models',
      email: 'alok.m@iiti.ac.in',
      contact: '+91 94060 22345'
    },
    operationalAreas: {
      states: ['Madhya Pradesh', 'National'],
      districts: ['Indore', 'Ujjain', 'Bhopal'],
      cities: ['Indore', 'Simrol'],
      municipalZones: ['Academic Corridor', 'Malwa Basin']
    },
    capabilities: [
      'Research',
      'Environmental Monitoring',
      'Data Contribution',
      'Education'
    ],
    verificationStatus: 'data_verified',
    verificationBadge: 'Verified Academic Research Lab',
    performanceScore: 99.1,
    responseAvgMinutes: 60,
    activeTasksCount: 5,
    completedTasksCount: 420,
    impactMetrics: {
      wasteCollectedKg: 12500,
      wasteRecycledKg: 11900,
      co2AvoidedKg: 9400,
      complaintsResolved: 180,
      treesEquivalent: 470,
      waterSavedLiters: 95000,
      energySavedKwh: 32000,
      peopleEngaged: 55000
    },
    rating: 4.98,
    coordinates: [22.5204, 75.9207],
    isSimpleModeRecommended: false
  },
  {
    id: 'org-davv-eco-club',
    name: 'Devi Ahilya University Green Youth Council',
    category: 'educational',
    categoryLabel: 'Educational Institution',
    icon: '🏫',
    regId: 'UNIV-DAVV-GREEN-2015',
    state: 'Madhya Pradesh',
    district: 'Indore',
    city: 'Indore',
    address: 'Nalanda Campus, RNT Marg, Indore - 452001',
    website: 'https://dauniv.ac.in',
    officialEmail: 'greencell@dauniv.ac.in',
    contactNumber: '+91 731 252 7532',
    representative: {
      name: 'Dr. Shalini Saxena',
      designation: 'Dean of Student Welfare & Eco-Affairs',
      email: 'ssaxena@dauniv.ac.in',
      contact: '+91 98270 33411'
    },
    operationalAreas: {
      states: ['Madhya Pradesh'],
      districts: ['Indore'],
      cities: ['Indore'],
      municipalZones: ['University Campuses (Nalanda, Takshashila)']
    },
    capabilities: [
      'Education',
      'Plastic Waste',
      'Community Campaigns',
      'Data Contribution'
    ],
    verificationStatus: 'verified',
    verificationBadge: 'Verified University Partner',
    performanceScore: 91.0,
    responseAvgMinutes: 55,
    activeTasksCount: 3,
    completedTasksCount: 290,
    impactMetrics: {
      wasteCollectedKg: 18400,
      wasteRecycledKg: 17200,
      co2AvoidedKg: 12800,
      complaintsResolved: 140,
      treesEquivalent: 640,
      waterSavedLiters: 82000,
      energySavedKwh: 24000,
      peopleEngaged: 35000
    },
    rating: 4.7,
    coordinates: [22.7150, 75.8750],
    isSimpleModeRecommended: true
  },
  {
    id: 'org-green-rewards-merchant',
    name: 'EcoKart Sustainable Retail & Rewards Network',
    category: 'reward_partner',
    categoryLabel: 'Reward / Business Partner',
    icon: '🏪',
    regId: 'GSTIN-23AABCE4412Q1ZX',
    state: 'Madhya Pradesh',
    district: 'Indore',
    city: 'Indore',
    address: 'Phoenix Citadel Mall, MR-10 Road, Indore - 452016',
    website: 'https://ecokartrewards.com',
    officialEmail: 'merchant.partner@ecokart.com',
    contactNumber: '+91 731 612 8800',
    representative: {
      name: 'Rohan Talreja',
      designation: 'Merchant Network Lead',
      email: 'rohan.t@ecokart.com',
      contact: '+91 99810 55667'
    },
    operationalAreas: {
      states: ['Madhya Pradesh', 'Gujarat'],
      districts: ['Indore', 'Bhopal', 'Ahmedabad'],
      cities: ['Indore', 'Bhopal'],
      municipalZones: ['Retail & Commercial Hubs']
    },
    capabilities: [
      'Rewards',
      'CSR',
      'Data Contribution'
    ],
    verificationStatus: 'active_partner',
    verificationBadge: 'Active Rewards Ecosystem Partner',
    performanceScore: 93.8,
    responseAvgMinutes: 15,
    activeTasksCount: 2,
    completedTasksCount: 1820,
    impactMetrics: {
      wasteCollectedKg: 35000,
      wasteRecycledKg: 34000,
      co2AvoidedKg: 28000,
      complaintsResolved: 0,
      treesEquivalent: 1400,
      waterSavedLiters: 120000,
      energySavedKwh: 40000,
      peopleEngaged: 180000
    },
    rating: 4.85,
    coordinates: [22.7667, 75.8988],
    isSimpleModeRecommended: true
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'TSK-2026-8812',
    title: 'Urgent Commercial Waste Overflow Cleanup & Sorting',
    category: 'Waste Pickup & Segregation',
    location: 'Chhappan Dukan Food Street, New Palasia, Ward 22',
    coordinates: [22.7238, 75.8824],
    zone: 'Zone 5 (Palasia)',
    priority: 'high',
    reportedBy: 'Citizen Reporter #ES-9402 (via ECO-SMART App)',
    reportedAt: '2026-08-23 04:15 AM',
    description: 'Post midnight food stall bulk cardboard & organic packaging accumulating behind booth 18. Needs mechanized tipper and immediate compost segregation.',
    photos: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=60'
    ],
    status: 'in_progress',
    assignedOrgId: 'org-indore-imc',
    assignedOrgName: 'Indore Municipal Corporation - Waste & Cleanliness Dept',
    assignedTeam: 'Night Quick Response Unit Alpha 4',
    deadline: '2026-08-23 07:00 AM (SLA: 3h)',
    proofOfAction: {
      photos: [],
      notes: 'Vehicle MP-09-EZ-4412 dispatched with 2 sanitization workers. Weighbridge ticket will be scanned on delivery.',
      gpsVerification: true
    },
    aiRecommendation: {
      orgName: 'Indore Municipal Corporation - Quick Response Unit',
      capabilityMatch: 98,
      distanceKm: 1.8,
      avgResponseMinutes: 24,
      confidence: 0.96
    },
    citizenRewardPoints: 120,
    estimatedWasteKg: 340
  },
  {
    id: 'TSK-2026-8813',
    title: 'Industrial E-Waste Drop-off & Certified Destruction',
    category: 'E-Waste Takeback',
    location: 'Crystal IT Park, Ring Road, Zone 9',
    coordinates: [22.6890, 75.8640],
    zone: 'Zone 9 (Bhanwarkuan)',
    priority: 'medium',
    reportedBy: 'Infosys BPM Campus Facility Manager',
    reportedAt: '2026-08-22 06:30 PM',
    description: 'Bulk batch of 48 decommissioned desktop monitors, lithium UPS batteries, and server racks ready for safe metal recovery and PCB shredding.',
    photos: [
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=60'
    ],
    status: 'assigned',
    assignedOrgId: 'org-bharat-recyclers',
    assignedOrgName: 'Bharat Green Cycle & E-Waste Solutions Ltd.',
    assignedTeam: 'Heavy Hazmat Logistics Truck #03',
    deadline: '2026-08-24 12:00 PM (SLA: 36h)',
    aiRecommendation: {
      orgName: 'Bharat Green Cycle & E-Waste Solutions Ltd.',
      capabilityMatch: 99,
      distanceKm: 4.2,
      avgResponseMinutes: 40,
      confidence: 0.99
    },
    citizenRewardPoints: 350,
    estimatedWasteKg: 620
  },
  {
    id: 'TSK-2026-8814',
    title: 'Illegal Plastic Dumping in Kahn River Green Corridor',
    category: 'Environmental Inspection',
    location: 'Kahn Riverfront Walkway near Krishnapura Chhatri',
    coordinates: [22.7165, 75.8570],
    zone: 'Zone 1 (Rajwada)',
    priority: 'critical',
    reportedBy: 'Prakriti Mitra Field Volunteer',
    reportedAt: '2026-08-23 01:20 AM',
    description: 'Multiple single-use plastic sacks discarded near water edge. High hazard of drainage clogging before forecasted morning rain showers.',
    photos: [
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop&q=60'
    ],
    status: 'escalated',
    assignedOrgId: 'org-indore-imc',
    assignedOrgName: 'Indore Municipal Corporation - Waste & Cleanliness Dept',
    assignedTeam: 'Rapid Environmental Action Taskforce',
    deadline: '2026-08-23 05:00 AM (ESCALATED)',
    proofOfAction: {
      photos: [],
      notes: 'Escalation raised to Zonal Commissioner due to water body proximity.',
      gpsVerification: true
    },
    aiRecommendation: {
      orgName: 'Indore Municipal Corporation + Prakriti Mitra NGO Co-Action',
      capabilityMatch: 95,
      distanceKm: 0.9,
      avgResponseMinutes: 20,
      confidence: 0.94
    },
    citizenRewardPoints: 200,
    estimatedWasteKg: 180
  },
  {
    id: 'TSK-2026-8815',
    title: 'University Campus Dry Leaves Composting Transfer',
    category: 'Organic & Food Waste',
    location: 'DAVV Takshashila Campus, Khandwa Road',
    coordinates: [22.6880, 75.8770],
    zone: 'Zone 9 (Bhanwarkuan)',
    priority: 'low',
    reportedBy: 'DAVV Green Youth Council Lead',
    reportedAt: '2026-08-22 02:00 PM',
    description: '3 metric tonnes of shredded dry garden pruning gathered in biodegradable bags. Ready for transport to Central Devguradia Bio-Methanation plant.',
    photos: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60'
    ],
    status: 'awaiting_verification',
    assignedOrgId: 'org-cleanroute-logistics',
    assignedOrgName: 'CleanRoute Eco-Logistics Fleet',
    assignedTeam: 'Bio-Waste Fleet #08',
    deadline: '2026-08-23 06:00 PM',
    proofOfAction: {
      photos: [
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60'
      ],
      notes: 'Transfer complete. Bio-methanation gate pass #BM-7740 verified with 3,120 kg net weight.',
      verifiedAt: '2026-08-22 05:40 PM',
      verifiedBy: 'Devguradia Plant Superintendent',
      weighbridgeSlipKg: 3120,
      gpsVerification: true
    },
    citizenRewardPoints: 150,
    estimatedWasteKg: 3120
  },
  {
    id: 'TSK-2026-8816',
    title: 'AQI Micro-Sensor Calibrations & Particulate Verification',
    category: 'Data Verification & Sensor Network',
    location: 'Vijay Nagar Square Junction, Zone 3',
    coordinates: [22.7533, 75.8937],
    zone: 'Zone 3 (Vijay Nagar)',
    priority: 'medium',
    reportedBy: 'Automated AI Telemetry Watchdog',
    reportedAt: '2026-08-23 03:00 AM',
    description: 'PM2.5 laser scattering sensor #VN-04 drift detected (+18% variance against satellite optical depth). Requires field recalibration & filter cleansing.',
    photos: [
      'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&auto=format&fit=crop&q=60'
    ],
    status: 'new',
    assignedOrgId: 'org-iit-lab',
    assignedOrgName: 'IIT Indore Centre for Environmental & Sensor Research',
    deadline: '2026-08-23 02:00 PM',
    aiRecommendation: {
      orgName: 'IIT Indore Sensor Research Team',
      capabilityMatch: 100,
      distanceKm: 8.5,
      avgResponseMinutes: 50,
      confidence: 0.98
    },
    citizenRewardPoints: 80
  },
  {
    id: 'TSK-2026-8817',
    title: 'Public Cleanliness Drive - Pipliyapala Lake Catchment',
    category: 'Community Campaign',
    location: 'Regional Park / Pipliyapala Lake Basin',
    coordinates: [22.6780, 75.8450],
    zone: 'Zone 7 (Rau)',
    priority: 'medium',
    reportedBy: 'Prakriti Mitra Foundation',
    reportedAt: '2026-08-22 10:00 AM',
    description: 'Weekend lake shoreline plastic retrieval drive with 45 student volunteers. Need collection bags and prompt transfer truck at 11:30 AM.',
    photos: [
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=60'
    ],
    status: 'completed',
    assignedOrgId: 'org-prakriti-mitra',
    assignedOrgName: 'Prakriti Mitra Foundation',
    assignedTeam: 'Volunteer Brigade Green Vanguard',
    deadline: '2026-08-22 01:00 PM',
    proofOfAction: {
      photos: [
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=60'
      ],
      notes: 'Cleared 480 kg of single-use bottles and snack wrappers. Transferred to Bharat Recyclers.',
      verifiedAt: '2026-08-22 12:45 PM',
      verifiedBy: 'Indore Parks Officer',
      weighbridgeSlipKg: 480,
      gpsVerification: true
    },
    citizenRewardPoints: 500,
    estimatedWasteKg: 480
  }
];

export const INITIAL_COMPLAINTS: ComplaintItem[] = [
  {
    id: 'CMP-2026-901',
    ticketNumber: 'ES-CMP-10284',
    category: 'Waste Overflow',
    location: 'Near Geeta Bhawan Square, AB Road',
    coordinates: [22.7160, 75.8790],
    ward: 'Ward 38',
    severity: 'high',
    submittedAt: '2026-08-23 03:40 AM',
    slaDeadline: '2026-08-23 07:40 AM (4h SLA)',
    status: 'Under Action',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=60'
    ],
    aiClassification: {
      detectedCategory: 'Commercial & Mixed Domestic Overflow',
      severityScore: 88,
      recommendedAuthority: 'IMC Zone 5 Flying Squad',
      isDuplicateCluster: false
    },
    assignedAuthority: 'Indore Municipal Corporation',
    assignedTeam: 'Quick Clean Squad 12',
    citizenName: 'Deepak Malviya',
    citizenPhone: '+91 98261 XXXXX',
    slaTimeline: {
      submitted: '2026-08-23 03:40 AM',
      assigned: '2026-08-23 03:48 AM',
      warningAt: '2026-08-23 06:40 AM'
    }
  },
  {
    id: 'CMP-2026-902',
    ticketNumber: 'ES-CMP-10285',
    category: 'Open Burning',
    location: 'Vacant plot behind Super Corridor ISBT',
    coordinates: [22.7750, 75.8250],
    ward: 'Ward 04',
    severity: 'critical',
    submittedAt: '2026-08-23 02:10 AM',
    slaDeadline: '2026-08-23 04:10 AM (2h SLA - HAZARD)',
    status: 'Escalated',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1599827552599-ea217b7a66b9?w=800&auto=format&fit=crop&q=60'
    ],
    aiClassification: {
      detectedCategory: 'Toxic Smoke & Thermal Emission Anomaly',
      severityScore: 96,
      recommendedAuthority: 'Pollution Control & Fire Rapid Unit',
      isDuplicateCluster: true,
      clusterCount: 3
    },
    assignedAuthority: 'CPCB Surveillance & IMC Disaster Unit',
    assignedTeam: 'Emergency Response Vehicle Hazmat-01',
    citizenName: 'Pooja Tiwari',
    citizenPhone: '+91 97530 XXXXX',
    slaTimeline: {
      submitted: '2026-08-23 02:10 AM',
      assigned: '2026-08-23 02:18 AM',
      warningAt: '2026-08-23 03:30 AM',
      escalatedAt: '2026-08-23 04:00 AM'
    }
  },
  {
    id: 'CMP-2026-903',
    ticketNumber: 'ES-CMP-10286',
    category: 'Illegal Dumping',
    location: 'Bypass Road near Ralamandal Forest Boundary',
    coordinates: [22.6520, 75.9180],
    ward: 'Outer Boundary Zone',
    severity: 'high',
    submittedAt: '2026-08-22 11:30 PM',
    slaDeadline: '2026-08-23 07:30 AM',
    status: 'Assigned',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=60'
    ],
    aiClassification: {
      detectedCategory: 'Construction & Demolition Debris',
      severityScore: 78,
      recommendedAuthority: 'Forest Border Environmental Marshal'
    },
    assignedAuthority: 'Forest Dept + IMC Vigilance Cell',
    assignedTeam: 'Vigilance Patrol 06',
    citizenName: 'Kunal Joshi',
    citizenPhone: '+91 94258 XXXXX',
    slaTimeline: {
      submitted: '2026-08-22 11:30 PM',
      assigned: '2026-08-22 11:45 PM'
    }
  },
  {
    id: 'CMP-2026-904',
    ticketNumber: 'ES-CMP-10287',
    category: 'Drainage Waste',
    location: 'Sarafa Bazaar Main Gutter Inlet, Rajwada',
    coordinates: [22.7180, 75.8560],
    ward: 'Ward 08',
    severity: 'medium',
    submittedAt: '2026-08-22 04:00 PM',
    slaDeadline: '2026-08-23 12:00 PM',
    status: 'Resolved',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop&q=60'
    ],
    aiClassification: {
      detectedCategory: 'Plastic Siltation in Storm Drainage',
      severityScore: 72,
      recommendedAuthority: 'IMC Sewerage & Drainage Wing'
    },
    assignedAuthority: 'Indore Municipal Corporation',
    assignedTeam: 'Suction Machine Crew Bravo 2',
    citizenName: 'Manoj Patidar',
    citizenPhone: '+91 98932 XXXXX',
    slaTimeline: {
      submitted: '2026-08-22 04:00 PM',
      assigned: '2026-08-22 04:15 PM',
      resolvedAt: '2026-08-22 07:30 PM'
    },
    resolutionProof: {
      photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60',
      timestamp: '2026-08-22 07:30 PM',
      inspectorName: 'Sanjay Yadav (Ward Inspector 08)',
      feedbackScore: 5
    }
  }
];

export const INITIAL_WASTE_RECORDS: WasteOperationRecord[] = [
  {
    id: 'WOP-2026-441',
    routeId: 'ROUTE-VN-09',
    routeName: 'Vijay Nagar - Scheme 54 Morning Green Loop',
    vehicleNumber: 'MP-09-GE-2940 (Electric Tipper)',
    driverName: 'Rameshwar Solanki',
    zone: 'Zone 3 (Vijay Nagar)',
    status: 'In Transit',
    totalCollectedKg: 2840,
    segregation: {
      organicKg: 1680,
      dryRecyclableKg: 790,
      plasticKg: 240,
      eWasteKg: 85,
      hazardousKg: 45
    },
    destinationFacility: 'Devguradia Central Bio-Methanation & RDF Plant',
    co2OffsetKg: 1890,
    timestamp: '2026-08-23 04:50 AM',
    gpsTrack: [
      [22.7533, 75.8937],
      [22.7510, 75.8910],
      [22.7480, 75.8890],
      [22.7440, 75.8850]
    ]
  },
  {
    id: 'WOP-2026-442',
    routeId: 'ROUTE-PW-04',
    routeName: 'Pithampur Industrial E-Waste Recovery Transit',
    vehicleNumber: 'MP-09-TR-8120 (GPS Heavy Carrier)',
    driverName: 'Balwant Chauhan',
    zone: 'Pithampur SEZ Sector 3',
    status: 'Processed',
    totalCollectedKg: 4620,
    segregation: {
      organicKg: 0,
      dryRecyclableKg: 820,
      plasticKg: 1100,
      eWasteKg: 2650,
      hazardousKg: 50
    },
    destinationFacility: 'Bharat Green Cycle Metal Extraction Hub',
    co2OffsetKg: 3450,
    timestamp: '2026-08-22 06:15 PM',
    gpsTrack: [
      [22.6186, 75.6885],
      [22.6250, 75.7100],
      [22.6400, 75.7500]
    ]
  }
];

export const INITIAL_COLLABORATIONS: CollaborationRequest[] = [
  {
    id: 'COL-2026-101',
    title: 'Smart City E-Waste Safe Takeback & University Rewards Scheme',
    fromOrgId: 'org-indore-imc',
    fromOrgName: 'Indore Municipal Corporation',
    fromOrgType: 'Municipality',
    toOrgId: 'org-bharat-recyclers',
    toOrgName: 'Bharat Green Cycle & E-Waste Solutions Ltd.',
    toOrgType: 'Recycler',
    scope: 'Establish 20 permanent electronic waste deposit kiosks across government colleges and tech parks, offering citizens instant ECO-SMART reward credits for verified batteries & chips.',
    category: 'E-Waste Takeback',
    status: 'Active',
    proposedAt: '2026-08-10',
    durationMonths: 12,
    targetImpactKg: 75000
  },
  {
    id: 'COL-2026-102',
    title: 'Corporate CSR Funding for Low-Cost AQI Sensor Grid in High-Density Wards',
    fromOrgId: 'org-tata-csr',
    fromOrgName: 'Tata Sustainability & Green CSR Initiative',
    fromOrgType: 'Corporate / CSR',
    toOrgId: 'org-iit-lab',
    toOrgName: 'IIT Indore Centre for Environmental & Sensor Research',
    toOrgType: 'Research Organization',
    scope: 'Deploy 50 calibrated particulate sensors in industrial fringe communities with open dashboard telemetry shared to CPCB and citizen portal.',
    category: 'Research & Sensor Data',
    status: 'Active',
    proposedAt: '2026-08-01',
    durationMonths: 24,
    targetImpactKg: 120000
  },
  {
    id: 'COL-2026-103',
    title: 'Plastic-Free River Corridor Community Cleanups with Merchant Vouchers',
    fromOrgId: 'org-prakriti-mitra',
    fromOrgName: 'Prakriti Mitra Foundation',
    fromOrgType: 'NGO',
    toOrgId: 'org-green-rewards-merchant',
    toOrgName: 'EcoKart Sustainable Retail & Rewards Network',
    toOrgType: 'Reward Partner',
    scope: 'Sponsor eco-merchandise vouchers for 1,000 active weekend volunteers retrieving non-biodegradable trash from public water reservoirs.',
    category: 'CSR Environmental Mission',
    status: 'Active',
    proposedAt: '2026-08-15',
    durationMonths: 6,
    targetImpactKg: 25000
  }
];

export const INITIAL_DATASETS: EnvironmentalDataset[] = [
  {
    id: 'DS-2026-01',
    datasetName: 'Real-time Ambient Air Quality Index (AQI PM2.5 / PM10 / NO2) - Malwa Region',
    providerOrgId: 'org-cpcb-central',
    providerName: 'Central Pollution Control Board (CPCB)',
    providerType: 'government',
    category: 'AQI',
    coverageRegion: 'Madhya Pradesh (Indore, Ujjain, Dewas, Bhopal)',
    recordsCount: 148520,
    lastUpdated: '2026-08-23 04:55 AM (Live API)',
    provenance: 'Verified Data',
    verificationStatus: 'Verified',
    sampleRows: [
      { station: 'Indore - Chhoti Gwaltoli', aqi: 74, pm25: 23.4, pm10: 58.1, status: 'Satisfactory' },
      { station: 'Indore - Vijay Nagar', aqi: 82, pm25: 28.0, pm10: 64.2, status: 'Satisfactory' },
      { station: 'Pithampur Industrial SEZ', aqi: 112, pm25: 41.2, pm10: 98.4, status: 'Moderate' },
      { station: 'Ujjain - Mahakal Corridor', aqi: 62, pm25: 18.5, pm10: 48.0, status: 'Good' }
    ]
  },
  {
    id: 'DS-2026-02',
    datasetName: 'Zonal Daily Municipal Waste Segregation & Gate Weight Log',
    providerOrgId: 'org-indore-imc',
    providerName: 'Indore Municipal Corporation',
    providerType: 'municipality',
    category: 'Waste Generation',
    coverageRegion: 'Indore City (19 Municipal Zones)',
    recordsCount: 42100,
    lastUpdated: '2026-08-23 04:00 AM',
    provenance: 'Verified Data',
    verificationStatus: 'Verified',
    sampleRows: [
      { zone: 'Zone 1 (Rajwada)', wetWasteKg: 18240, dryWasteKg: 14200, domesticHazKg: 240, segregationRate: '98.8%' },
      { zone: 'Zone 3 (Vijay Nagar)', wetWasteKg: 26100, dryWasteKg: 21900, domesticHazKg: 310, segregationRate: '99.2%' },
      { zone: 'Zone 5 (Palasia)', wetWasteKg: 19800, dryWasteKg: 16400, domesticHazKg: 190, segregationRate: '99.0%' }
    ]
  },
  {
    id: 'DS-2026-03',
    datasetName: 'Certified Secondary Raw Material Recovery Yields (Plastic, Aluminium, Glass, E-Waste)',
    providerOrgId: 'org-bharat-recyclers',
    providerName: 'Bharat Green Cycle & E-Waste Solutions Ltd.',
    providerType: 'recycler',
    category: 'Recycling Yield',
    coverageRegion: 'Central India Industrial Corridor',
    recordsCount: 18900,
    lastUpdated: '2026-08-22 08:30 PM',
    provenance: 'Partner Data',
    verificationStatus: 'Verified',
    sampleRows: [
      { material: 'PET Flakes Grade A', processedKg: 45000, recoveredKg: 42300, purityPercent: 94.0, carbonSavedTonnes: 67.6 },
      { material: 'HDPE Granules', processedKg: 32000, recoveredKg: 29800, purityPercent: 93.1, carbonSavedTonnes: 44.7 },
      { material: 'E-Waste PCB Copper/Gold Recovery', processedKg: 8500, recoveredKg: 7900, purityPercent: 98.2, carbonSavedTonnes: 124.0 }
    ]
  }
];

export const INITIAL_AI_INSIGHTS: AiEnvironmentalInsight[] = [
  {
    id: 'INS-01',
    type: 'hotspot',
    title: 'AI Detected 23% Commercial Waste Spike in Zone 3 (Vijay Nagar Commercial Square)',
    summary: 'Weekend night restaurant operations caused an unexpected 23% surge in non-biodegradable food packaging waste compared to standard baseline.',
    whyItMatters: 'If not collected before 07:00 AM, morning commuter traffic increases roadside dispersal and street animal scavenging risk.',
    recommendedAction: 'Dispatch supplementary 4-tonne compactor vehicle from Palasia depot and alert commercial ward supervisor.',
    relevantOrgType: 'Indore Municipal Corporation + CleanRoute Logistics',
    confidencePercent: 96.4,
    severity: 'warning',
    timestamp: '2026-08-23 04:30 AM',
    region: 'Zone 3 (Vijay Nagar)'
  },
  {
    id: 'INS-02',
    type: 'anomaly',
    title: 'Complaint Clustering: 3 Separate Citizen Reports Represent Single Hazardous Incident',
    summary: 'Complaints #ES-CMP-10285, #ES-CMP-10288, and #ES-CMP-10291 reported within 400m radius of Super Corridor indicate identical industrial open burn.',
    whyItMatters: 'Prevents redundant team dispatches and aggregates priority score to Level 1 Immediate Fire & Pollution Hazard.',
    recommendedAction: 'Merged into Single Master Incident Ticket with combined GPS pinpoint. Dispatched emergency hazmat crew.',
    relevantOrgType: 'CPCB Regional Surveillance + IMC Fire Marshall',
    confidencePercent: 99.1,
    severity: 'critical',
    timestamp: '2026-08-23 02:45 AM',
    region: 'Super Corridor ISBT Area'
  },
  {
    id: 'INS-03',
    type: 'gap',
    title: 'Collection Infrastructure Gap Identified: Zone 7 Outer Sector E-Waste Takeback Shortfall',
    summary: 'Zone 7 (Rau / Silicon City) has over 45,000 residents but zero authorized permanent e-waste dropoff hubs within a 6km radius.',
    whyItMatters: 'Lead, mercury, and lithium battery disposal is at risk of entering standard domestic municipal streams.',
    recommendedAction: 'Propose automated collaboration agreement between Bharat Green Cycle and local Silicon City Community Association.',
    relevantOrgType: 'Recycling Organizations & Community RWAs',
    confidencePercent: 92.8,
    severity: 'info',
    timestamp: '2026-08-22 11:00 PM',
    region: 'Zone 7 (Rau / Silicon City)'
  },
  {
    id: 'INS-04',
    type: 'recommendation',
    title: 'Optimal Route Recommendation: Shift Devguradia RDF Transfer Window to Avoid Peak Congestion',
    summary: 'Moving bulk transfer logistics 45 minutes earlier (05:15 AM instead of 06:00 AM) reduces fleet fuel consumption by 14.2% and cuts 1.8 tonnes CO2 weekly.',
    whyItMatters: 'Improves city air quality along Ring Road while saving municipal operational expenditures.',
    recommendedAction: 'Apply revised schedule to Route VN-09, PW-04, and RG-12 automatically.',
    relevantOrgType: 'Logistics Fleets & Municipal Dispatchers',
    confidencePercent: 97.5,
    severity: 'info',
    timestamp: '2026-08-22 09:15 PM',
    region: 'Devguradia Transit Corridor'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'New High Priority Task Assigned',
    message: 'Task #TSK-2026-8812 (Chhappan Dukan Commercial Waste Overflow) assigned to your organization.',
    type: 'task',
    timestamp: '15m ago',
    read: false,
    actionUrl: '/tasks'
  },
  {
    id: 'NOTIF-02',
    title: 'SLA Escalation Alert',
    message: 'Complaint #ES-CMP-10285 has reached 80% SLA threshold. Authority notification issued.',
    type: 'complaint',
    timestamp: '45m ago',
    read: false,
    actionUrl: '/complaints'
  },
  {
    id: 'NOTIF-03',
    title: 'AI Anomaly Detected',
    message: 'AI identified a 23% waste spike in Zone 3. Automated resource allocation suggestion generated.',
    type: 'ai_alert',
    timestamp: '1h ago',
    read: true,
    actionUrl: '/ai-intelligence'
  },
  {
    id: 'NOTIF-04',
    title: 'Collaboration Proposal Accepted',
    message: 'Bharat Green Cycle accepted your E-Waste Takeback Partnership proposal.',
    type: 'collaboration',
    timestamp: '3h ago',
    read: true,
    actionUrl: '/collaboration'
  }
];

export const REGIONAL_ENVIRONMENTAL_INDICATORS = [
  { state: 'Madhya Pradesh', city: 'Indore', population: '3,275,000', aqi: 74, aqiStatus: 'Satisfactory', wasteGeneratedTonsDay: 1200, segregationPercent: 99.1, recyclingRate: 94.5, complaintsOpen: 14, riskIndex: 'Low' },
  { state: 'Madhya Pradesh', city: 'Bhopal', population: '2,450,000', aqi: 88, aqiStatus: 'Satisfactory', wasteGeneratedTonsDay: 950, segregationPercent: 92.4, recyclingRate: 88.0, complaintsOpen: 28, riskIndex: 'Moderate' },
  { state: 'Maharashtra', city: 'Mumbai', population: '14,800,000', aqi: 142, aqiStatus: 'Moderate', wasteGeneratedTonsDay: 7200, segregationPercent: 81.0, recyclingRate: 74.5, complaintsOpen: 195, riskIndex: 'High' },
  { state: 'Maharashtra', city: 'Pune', population: '5,100,000', aqi: 98, aqiStatus: 'Satisfactory', wasteGeneratedTonsDay: 2100, segregationPercent: 89.2, recyclingRate: 86.4, complaintsOpen: 42, riskIndex: 'Moderate' },
  { state: 'Delhi-NCR', city: 'New Delhi', population: '19,500,000', aqi: 185, aqiStatus: 'Unhealthy for Sensitive', wasteGeneratedTonsDay: 11000, segregationPercent: 72.5, recyclingRate: 68.2, complaintsOpen: 320, riskIndex: 'Critical' },
  { state: 'Karnataka', city: 'Bengaluru', population: '12,300,000', aqi: 85, aqiStatus: 'Satisfactory', wasteGeneratedTonsDay: 4800, segregationPercent: 84.8, recyclingRate: 81.0, complaintsOpen: 88, riskIndex: 'Moderate' },
  { state: 'Gujarat', city: 'Surat', population: '6,200,000', aqi: 92, aqiStatus: 'Satisfactory', wasteGeneratedTonsDay: 2400, segregationPercent: 95.1, recyclingRate: 91.8, complaintsOpen: 22, riskIndex: 'Low' },
  { state: 'Telangana', city: 'Hyderabad', population: '9,800,000', aqi: 104, aqiStatus: 'Moderate', wasteGeneratedTonsDay: 4100, segregationPercent: 83.2, recyclingRate: 79.0, complaintsOpen: 76, riskIndex: 'Moderate' }
];
