'use client';

import React, { useState } from 'react';
import { PortalProvider, usePortal } from '@/context/PortalContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { OrganizationOnboardingModal } from '@/components/onboarding/OrganizationOnboardingModal';

// Views
import { LandingPageView } from '@/components/views/LandingPageView';
import { OrganizationDashboardView } from '@/components/views/OrganizationDashboardView';
import { UniversalTaskCenterView } from '@/components/views/UniversalTaskCenterView';
import { MunicipalComplaintCenterView } from '@/components/views/MunicipalComplaintCenterView';
import { WasteOperationsView } from '@/components/views/WasteOperationsView';
import { OrganizationDirectoryMapView } from '@/components/views/OrganizationDirectoryMapView';
import { CollaborationCenterView } from '@/components/views/CollaborationCenterView';
import { EnvironmentalGisMapView } from '@/components/views/EnvironmentalGisMapView';
import { AiIntelligenceCenterView } from '@/components/views/AiIntelligenceCenterView';
import { DataContributionCenterView } from '@/components/views/DataContributionCenterView';
import { ExternalDataIntelligenceView } from '@/components/views/ExternalDataIntelligenceView';
import { UnifiedImpactDashboardView } from '@/components/views/UnifiedImpactDashboardView';
import { ReportingCenterView } from '@/components/views/ReportingCenterView';
import { AuthorityCommandCenterView } from '@/components/views/AuthorityCommandCenterView';
import { EcoSmartArchitectureView } from '@/components/views/EcoSmartArchitectureView';
import { ApiIntegrationHubView } from '@/components/views/ApiIntegrationHubView';
import { OrgCategory } from '@/types';

function PortalApp() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [selectedOnboardType, setSelectedOnboardType] = useState<string>('ngo');

  const handleSelectCategory = (cat: OrgCategory) => {
    setSelectedOnboardType(cat);
    setShowOnboardingModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        onOpenOnboarding={() => {
          setSelectedOnboardType('ngo');
          setShowOnboardingModal(true);
        }}
      />

      {/* Main Body with Sidebar or Landing */}
      {activeTab === 'landing' ? (
        <div className="flex-1">
          <LandingPageView
            onEnterPortal={() => setActiveTab('overview')}
            onOpenOnboarding={() => setShowOnboardingModal(true)}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="flex-1 overflow-y-auto min-h-[calc(100vh-140px)] bg-slate-50">
            {activeTab === 'overview' && (
              <OrganizationDashboardView
                onNavigateTab={setActiveTab}
                onOpenOnboarding={() => setShowOnboardingModal(true)}
              />
            )}
            {activeTab === 'tasks' && <UniversalTaskCenterView />}
            {activeTab === 'complaints' && <MunicipalComplaintCenterView />}
            {activeTab === 'waste-ops' && <WasteOperationsView />}
            {activeTab === 'org-map' && <OrganizationDirectoryMapView />}
            {activeTab === 'partners' && <OrganizationDirectoryMapView />}
            {activeTab === 'collaboration' && <CollaborationCenterView />}
            {activeTab === 'gis-map' && <EnvironmentalGisMapView />}
            {activeTab === 'ai-intelligence' && <AiIntelligenceCenterView />}
            {activeTab === 'data-center' && <DataContributionCenterView />}
            {activeTab === 'external-intel' && <ExternalDataIntelligenceView />}
            {activeTab === 'impact' && <UnifiedImpactDashboardView />}
            {activeTab === 'reports' && <ReportingCenterView />}
            {activeTab === 'command-center' && <AuthorityCommandCenterView />}
            {activeTab === 'architecture' && <EcoSmartArchitectureView />}
            {activeTab === 'api-hub' && <ApiIntegrationHubView />}
          </main>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* 6-Step Onboarding & Verification Modal */}
      <OrganizationOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => {
          setShowOnboardingModal(false);
          setActiveTab('overview');
        }}
        initialType={selectedOnboardType}
      />
    </div>
  );
}

export default function Page() {
  return (
    <PortalProvider>
      <PortalApp />
    </PortalProvider>
  );
}
