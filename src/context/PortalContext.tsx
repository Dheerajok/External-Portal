'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Organization,
  TaskItem,
  ComplaintItem,
  WasteOperationRecord,
  CollaborationRequest,
  EnvironmentalDataset,
  AiEnvironmentalInsight,
  SystemNotification,
  PortalMode,
  UserRole,
  TaskStatus
} from '../types';
import {
  INITIAL_ORGANIZATIONS,
  INITIAL_TASKS,
  INITIAL_COMPLAINTS,
  INITIAL_WASTE_RECORDS,
  INITIAL_COLLABORATIONS,
  INITIAL_DATASETS,
  INITIAL_AI_INSIGHTS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface PortalContextType {
  currentOrg: Organization;
  organizations: Organization[];
  mode: PortalMode;
  role: UserRole;
  tasks: TaskItem[];
  complaints: ComplaintItem[];
  wasteRecords: WasteOperationRecord[];
  collaborations: CollaborationRequest[];
  datasets: EnvironmentalDataset[];
  aiInsights: AiEnvironmentalInsight[];
  notifications: SystemNotification[];
  unreadNotifsCount: number;
  
  // Actions
  setCurrentOrgById: (orgId: string) => void;
  setMode: (mode: PortalMode) => void;
  setRole: (role: UserRole) => void;
  registerOrganization: (orgData: Partial<Organization>) => Organization;
  
  // Task Actions
  acceptTask: (taskId: string) => void;
  rejectTask: (taskId: string, reason?: string) => void;
  assignTaskTeam: (taskId: string, team: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  submitTaskProof: (taskId: string, proof: { photos: string[]; notes: string; weighbridgeSlipKg?: number }) => void;
  verifyTaskAction: (taskId: string) => void;
  createTask: (newTask: Partial<TaskItem>) => void;
  
  // Complaint Actions
  updateComplaintStatus: (complaintId: string, status: ComplaintItem['status'], notes?: string) => void;
  assignComplaintTeam: (complaintId: string, team: string, authority?: string) => void;
  resolveComplaint: (complaintId: string, proofUrl: string, inspectorName: string) => void;
  
  // Collaboration Actions
  createCollaborationProposal: (proposal: Partial<CollaborationRequest>) => void;
  updateCollaborationStatus: (collabId: string, status: CollaborationRequest['status']) => void;
  
  // Data Actions
  contributeDataset: (dataset: Partial<EnvironmentalDataset>) => void;
  
  // Notifications
  markNotifAsRead: (id: string) => void;
  markAllNotifsAsRead: () => void;
  
  // Navigation Helper
  citizenPortalUrl: string;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  const [currentOrg, setCurrentOrg] = useState<Organization>(INITIAL_ORGANIZATIONS[0]);
  const [mode, setMode] = useState<PortalMode>('enterprise');
  const [role, setRole] = useState<UserRole>('municipal_officer');
  
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [complaints, setComplaints] = useState<ComplaintItem[]>(INITIAL_COMPLAINTS);
  const [wasteRecords, setWasteRecords] = useState<WasteOperationRecord[]>(INITIAL_WASTE_RECORDS);
  const [collaborations, setCollaborations] = useState<CollaborationRequest[]>(INITIAL_COLLABORATIONS);
  const [datasets, setDatasets] = useState<EnvironmentalDataset[]>(INITIAL_DATASETS);
  const [aiInsights, setAiInsights] = useState<AiEnvironmentalInsight[]>(INITIAL_AI_INSIGHTS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  const citizenPortalUrl = process.env.NEXT_PUBLIC_CITIZEN_PORTAL_URL || 'http://localhost:3000';

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const setCurrentOrgById = (orgId: string) => {
    const found = organizations.find(o => o.id === orgId);
    if (found) {
      setCurrentOrg(found);
      if (found.isSimpleModeRecommended) {
        setMode('simple');
      }
    }
  };

  const registerOrganization = (orgData: Partial<Organization>): Organization => {
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: orgData.name || 'New Registered Environmental Partner',
      category: orgData.category || 'ngo',
      categoryLabel: orgData.categoryLabel || 'Environmental Partner',
      icon: orgData.icon || '🌱',
      regId: orgData.regId || `REG-IND-${Math.floor(1000 + Math.random() * 9000)}`,
      state: orgData.state || 'Madhya Pradesh',
      district: orgData.district || 'Indore',
      city: orgData.city || 'Indore',
      address: orgData.address || 'Smart City Zone',
      website: orgData.website || 'https://eco-smart.gov.in',
      officialEmail: orgData.officialEmail || 'contact@partner.org',
      contactNumber: orgData.contactNumber || '+91 731 000 0000',
      representative: orgData.representative || {
        name: 'Authorized Official',
        designation: 'Director / Lead',
        email: 'lead@partner.org',
        contact: '+91 99999 88888'
      },
      operationalAreas: orgData.operationalAreas || {
        states: ['Madhya Pradesh'],
        districts: ['Indore'],
        cities: ['Indore'],
        municipalZones: ['Zone 1', 'Zone 2']
      },
      capabilities: orgData.capabilities || ['Waste Collection', 'Complaint Resolution', 'Data Contribution'],
      verificationStatus: 'verified',
      verificationBadge: 'Verified Environmental Partner',
      performanceScore: 92.0,
      responseAvgMinutes: 40,
      activeTasksCount: 1,
      completedTasksCount: 0,
      impactMetrics: {
        wasteCollectedKg: 0,
        wasteRecycledKg: 0,
        co2AvoidedKg: 0,
        complaintsResolved: 0,
        treesEquivalent: 0,
        waterSavedLiters: 0,
        energySavedKwh: 0,
        peopleEngaged: 150
      },
      rating: 5.0,
      coordinates: orgData.coordinates || [22.7196, 75.8577],
      isSimpleModeRecommended: orgData.category === 'ngo' || orgData.category === 'community'
    };

    setOrganizations(prev => [newOrg, ...prev]);
    setCurrentOrg(newOrg);

    // Add notification
    const newNotif: SystemNotification = {
      id: `NOTIF-${Date.now()}`,
      title: 'Organization Successfully Onboarded',
      message: `${newOrg.name} has been enrolled into ECO-SMART National Partner Registry.`,
      type: 'verification',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrg;
  };

  const acceptTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              status: 'accepted',
              assignedOrgId: currentOrg.id,
              assignedOrgName: currentOrg.name
            }
          : t
      )
    );
  };

  const rejectTask = (taskId: string, reason?: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              status: 'rejected',
              description: `${t.description} [Rejected by ${currentOrg.name}: ${reason || 'Capacity exceeded'}]`
            }
          : t
      )
    );
  };

  const assignTaskTeam = (taskId: string, team: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              status: 'in_progress',
              assignedTeam: team
            }
          : t
      )
    );
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const submitTaskProof = (taskId: string, proof: { photos: string[]; notes: string; weighbridgeSlipKg?: number }) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status: 'awaiting_verification',
            proofOfAction: {
              photos: proof.photos.length > 0 ? proof.photos : ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60'],
              notes: proof.notes,
              weighbridgeSlipKg: proof.weighbridgeSlipKg || t.estimatedWasteKg || 250,
              gpsVerification: true
            }
          };
        }
        return t;
      })
    );
  };

  const verifyTaskAction = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const wasteKg = t.proofOfAction?.weighbridgeSlipKg || t.estimatedWasteKg || 300;
          
          // Update current Org Impact
          setCurrentOrg(curr => ({
            ...curr,
            completedTasksCount: curr.completedTasksCount + 1,
            impactMetrics: {
              ...curr.impactMetrics,
              wasteCollectedKg: curr.impactMetrics.wasteCollectedKg + wasteKg,
              wasteRecycledKg: curr.impactMetrics.wasteRecycledKg + Math.round(wasteKg * 0.85),
              co2AvoidedKg: curr.impactMetrics.co2AvoidedKg + Math.round(wasteKg * 0.65),
              treesEquivalent: curr.impactMetrics.treesEquivalent + Math.max(1, Math.round(wasteKg / 25))
            }
          }));

          return {
            ...t,
            status: 'completed',
            proofOfAction: {
              ...t.proofOfAction,
              photos: t.proofOfAction?.photos || [],
              notes: t.proofOfAction?.notes || 'Verified by Authority Portal',
              verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              verifiedBy: `${currentOrg.name} - Official Inspector`,
              gpsVerification: true
            }
          };
        }
        return t;
      })
    );
  };

  const createTask = (newTask: Partial<TaskItem>) => {
    const item: TaskItem = {
      id: `TSK-2026-${Math.floor(8900 + Math.random() * 900)}`,
      title: newTask.title || 'New Environmental Action Task',
      category: newTask.category || 'Waste Pickup & Segregation',
      location: newTask.location || 'Indore Smart City Sector',
      coordinates: newTask.coordinates || [22.7196, 75.8577],
      zone: newTask.zone || 'Zone 1 (Rajwada)',
      priority: newTask.priority || 'medium',
      reportedBy: newTask.reportedBy || 'Authority Dispatcher',
      reportedAt: 'Just now',
      description: newTask.description || 'Action required per standard operating protocol.',
      photos: newTask.photos || ['https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=60'],
      status: 'new',
      assignedOrgId: newTask.assignedOrgId || currentOrg.id,
      assignedOrgName: newTask.assignedOrgName || currentOrg.name,
      deadline: '24h SLA',
      citizenRewardPoints: 100,
      estimatedWasteKg: newTask.estimatedWasteKg || 150
    };

    setTasks(prev => [item, ...prev]);
  };

  const updateComplaintStatus = (complaintId: string, status: ComplaintItem['status'], notes?: string) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId) {
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...c,
            status,
            slaTimeline: {
              ...c.slaTimeline,
              ...(status === 'Under Action' ? { assigned: nowStr } : {}),
              ...(status === 'Escalated' ? { escalatedAt: nowStr } : {}),
              ...(status === 'Resolved' ? { resolvedAt: nowStr } : {})
            }
          };
        }
        return c;
      })
    );
  };

  const assignComplaintTeam = (complaintId: string, team: string, authority?: string) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === complaintId
          ? {
              ...c,
              assignedTeam: team,
              assignedAuthority: authority || currentOrg.name,
              status: 'Assigned'
            }
          : c
      )
    );
  };

  const resolveComplaint = (complaintId: string, photoUrl: string, inspectorName: string) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === complaintId
          ? {
              ...c,
              status: 'Resolved',
              resolutionProof: {
                photoUrl: photoUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                inspectorName: inspectorName || 'Senior Zonal Officer',
                feedbackScore: 5
              },
              slaTimeline: {
                ...c.slaTimeline,
                resolvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            }
          : c
      )
    );
  };

  const createCollaborationProposal = (proposal: Partial<CollaborationRequest>) => {
    const item: CollaborationRequest = {
      id: `COL-2026-${Math.floor(110 + Math.random() * 900)}`,
      title: proposal.title || 'Cross-Sector Sustainability Partnership',
      fromOrgId: currentOrg.id,
      fromOrgName: currentOrg.name,
      fromOrgType: currentOrg.categoryLabel,
      toOrgId: proposal.toOrgId || 'org-bharat-recyclers',
      toOrgName: proposal.toOrgName || 'Bharat Green Cycle',
      toOrgType: proposal.toOrgType || 'Recycler',
      scope: proposal.scope || 'Joint circular economy and recycling initiative under ECO-SMART.',
      category: proposal.category || 'Recycling Partnership',
      status: 'Pending',
      proposedAt: new Date().toISOString().split('T')[0],
      durationMonths: proposal.durationMonths || 12,
      targetImpactKg: proposal.targetImpactKg || 50000
    };

    setCollaborations(prev => [item, ...prev]);
  };

  const updateCollaborationStatus = (collabId: string, status: CollaborationRequest['status']) => {
    setCollaborations(prev =>
      prev.map(c => (c.id === collabId ? { ...c, status } : c))
    );
  };

  const contributeDataset = (dataset: Partial<EnvironmentalDataset>) => {
    const item: EnvironmentalDataset = {
      id: `DS-2026-${Math.floor(10 + Math.random() * 90)}`,
      datasetName: dataset.datasetName || 'Partner Environmental Telemetry Stream',
      providerOrgId: currentOrg.id,
      providerName: currentOrg.name,
      providerType: currentOrg.category,
      category: dataset.category || 'Waste Generation',
      coverageRegion: dataset.coverageRegion || `${currentOrg.city}, ${currentOrg.state}`,
      recordsCount: dataset.recordsCount || 1250,
      lastUpdated: 'Just now',
      provenance: 'Partner Data',
      verificationStatus: 'Verified',
      sampleRows: dataset.sampleRows || [
        { metric: 'Baseline Indicator', value: '45.8', unit: 'metric-ton', status: 'Optimal' },
        { metric: 'Secondary Recovery', value: '88.2', unit: '% yield', status: 'Verified' }
      ]
    };

    setDatasets(prev => [item, ...prev]);
  };

  const markNotifAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <PortalContext.Provider
      value={{
        currentOrg,
        organizations,
        mode,
        role,
        tasks,
        complaints,
        wasteRecords,
        collaborations,
        datasets,
        aiInsights,
        notifications,
        unreadNotifsCount,
        setCurrentOrgById,
        setMode,
        setRole,
        registerOrganization,
        acceptTask,
        rejectTask,
        assignTaskTeam,
        updateTaskStatus,
        submitTaskProof,
        verifyTaskAction,
        createTask,
        updateComplaintStatus,
        assignComplaintTeam,
        resolveComplaint,
        createCollaborationProposal,
        updateCollaborationStatus,
        contributeDataset,
        markNotifAsRead,
        markAllNotifsAsRead,
        citizenPortalUrl
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}
