'use client';

import React from 'react';
import { usePortal } from '@/context/PortalContext';
import { OrgCategory } from '@/types';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Layers,
  Activity,
  Globe2,
  Users,
  CheckCircle,
  Network,
  Cpu,
  ChevronRight
} from 'lucide-react';

interface LandingPageViewProps {
  onEnterPortal: () => void;
  onOpenOnboarding: () => void;
  onSelectCategory: (category: OrgCategory) => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onEnterPortal,
  onOpenOnboarding,
  onSelectCategory
}) => {
  const { citizenPortalUrl } = usePortal();

  const orgCards: { key: OrgCategory; title: string; icon: string; tag: string; desc: string }[] = [
    { key: 'government', title: 'Government Authority', icon: '🏛️', tag: 'Regulatory & Apex', desc: 'Central & State pollution boards, environmental surveillance, statutory oversight.' },
    { key: 'municipality', title: 'Municipality / Local Body', icon: '🏙️', tag: 'Civic Operations', desc: 'City corporations, nagar palikas, zonal sanitation dispatch, ward management.' },
    { key: 'waste_management', title: 'Waste Management Organization', icon: '♻️', tag: 'Processing & RDF', desc: 'Integrated biomethanation, processing plants, weighbridge tracking, RDF ops.' },
    { key: 'ngo', title: 'NGO / Environmental Organization', icon: '🌱', tag: 'Grassroots Action', desc: 'Community cleanups, awareness campaigns, lake restorations, civic advocacy.' },
    { key: 'recycler', title: 'Recycling Organization', icon: '🏭', tag: 'Circular Economy', desc: 'E-Waste recovery, PET flaking, aluminium/metal reprocessing, EPR compliance.' },
    { key: 'corporate_csr', title: 'Corporate / CSR Partner', icon: '🏢', tag: 'ESG Investment', desc: 'Sponsorship of sensor grids, cleanup drives, EPR reporting, green funding.' },
    { key: 'educational', title: 'Educational Institution', icon: '🏫', tag: 'Youth & Academic', desc: 'University eco-councils, student volunteer brigade, campus waste drives.' },
    { key: 'research', title: 'Research Organization', icon: '🔬', tag: 'Scientific Modeling', desc: 'Atmospheric sensors, environmental data pipelines, GIS machine learning.' },
    { key: 'sustainability', title: 'Sustainability Organization', icon: '🌍', tag: 'Carbon & Climate', desc: 'Carbon accounting, lifecycle analysis, circular design consultation.' },
    { key: 'logistics', title: 'Collection / Logistics Partner', icon: '🚛', tag: 'Fleet & Dispatch', desc: 'GPS sanitation fleets, tipper trucks, hazmat routing, route optimization.' },
    { key: 'reward_partner', title: 'Reward / Business Partner', icon: '🏪', tag: 'Green Retail', desc: 'Reward redemption network, sustainable merchant discounts, eco-vouchers.' },
    { key: 'community', title: 'Community Organization', icon: '👥', tag: 'Local RWAs', desc: 'Neighborhood ward committees, local sorting hubs, citizen brigades.' },
    { key: 'other', title: 'Other Authorized Organization', icon: '🔗', tag: 'Ecosystem Partner', desc: 'Audited environmental contractors, verification inspectors, service providers.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-[#0b192e] text-white py-16 px-6 overflow-hidden border-b border-[#1c355e]">
        <div className="absolute inset-0 gov-grid-pattern opacity-40 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#122543] border border-[#1e3b68] text-xs font-semibold text-sky-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ECO-SMART Authority & Partner Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            One Ecosystem.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
              Every Environmental Stakeholder.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect authorities, municipalities, recyclers, NGOs, businesses and environmental datasets to turn sustainability challenges into coordinated, measurable action.
          </p>

          {/* Primary Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onEnterPortal}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm shadow-lg hover:shadow-blue-500/30 transition flex items-center space-x-2 cursor-pointer"
            >
              <span>Enter Workspace Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenOnboarding}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg text-sm shadow-md transition flex items-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Register Organization</span>
            </button>

            <a
              href={citizenPortalUrl}
              className="px-5 py-3 bg-[#122543] hover:bg-[#1a355f] text-slate-200 hover:text-white border border-[#1e3b68] rounded-lg text-sm font-semibold transition flex items-center space-x-2"
            >
              <span>Citizen ECO-SMART Platform</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Live Ecosystem Animated Connection Graph */}
          <div className="mt-12 bg-[#061121]/90 border border-[#1c355e] rounded-xl p-6 shadow-2xl backdrop-blur-md max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between border-b border-[#152a4a] pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Live Ecosystem Synchronization Grid</span>
              </div>
              <span className="text-[10px] text-slate-400">Bidirectional Citizen ↔ Authority Execution Pipeline</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
              {[
                { name: 'Citizens', icon: '👤', color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' },
                { name: 'Government', icon: '🏛️', color: 'border-blue-500/40 bg-blue-950/40 text-blue-300' },
                { name: 'Municipalities', icon: '🏙️', color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300' },
                { name: 'Waste Orgs', icon: '♻️', color: 'border-green-500/40 bg-green-950/40 text-green-300' },
                { name: 'Recyclers', icon: '🏭', color: 'border-amber-500/40 bg-amber-950/40 text-amber-300' },
                { name: 'NGOs', icon: '🌱', color: 'border-lime-500/40 bg-lime-950/40 text-lime-300' },
                { name: 'Businesses', icon: '🏢', color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' },
                { name: 'Sensor Data', icon: '📡', color: 'border-sky-500/40 bg-sky-950/40 text-sky-300' }
              ].map((node, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg border flex flex-col items-center justify-center space-y-1 ${node.color} relative overflow-hidden`}
                >
                  <span className="text-xl">{node.icon}</span>
                  <span className="text-[11px] font-bold truncate w-full">{node.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
              ))}
            </div>

            {/* Connection Subtitle */}
            <div className="mt-4 pt-3 border-t border-[#152a4a] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Automated Task Dispatch</span>
                <span className="text-slate-600">→</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Verified Proof of Action</span>
                <span className="text-slate-600">→</span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Citizen Reward Release</span>
              </div>
              <span className="font-mono text-sky-400">Avg Response Time: 28 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Organization Entry Section ("Who are you?") */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase">
            <span>Multi-Organization Entry System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Who Are You?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select your organization type to experience customized workflows, task queues, telemetry pipelines, and collaboration tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {orgCards.map(card => (
            <div
              key={card.key}
              onClick={() => {
                onSelectCategory(card.key);
                onOpenOnboarding();
              }}
              className="gov-card gov-card-hover rounded-xl p-5 border border-slate-200 cursor-pointer flex flex-col justify-between group bg-white"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{card.icon}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition">
                    {card.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition duration-150">
                <span>Enter / Onboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Ecosystem Pillars */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">OPERATE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organizations receive real-time tasks from citizens and municipalities, allocate field teams, upload proof of action, and verify impact on the ground.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">CONNECT</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discover verified recycling partners, educational eco-clubs, and CSR funding initiatives through a discoverable national directory and collaboration hub.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">INTELLIGENCE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesize AQI sensor feeds, waste segregation logs, and AI anomaly models to identify collection gaps, waste spikes, and high-risk hotspots.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
