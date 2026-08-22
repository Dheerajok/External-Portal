'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import { Organization, OrgCategory } from '@/types';
import {
  MapPin,
  ShieldCheck,
  Building,
  Award,
  Search,
  Filter,
  Users,
  Handshake,
  CheckCircle,
  ExternalLink,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

interface DirectoryProps {
  onOpenCollaborationModal?: (targetOrg: Organization) => void;
}

export const OrganizationDirectoryMapView: React.FC<DirectoryProps> = ({ onOpenCollaborationModal }) => {
  const { organizations, setCurrentOrgById, currentOrg } = usePortal();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization>(organizations[0]);

  const categories: { key: string; label: string; icon: string }[] = [
    { key: 'all', label: 'All Organizations', icon: '🌐' },
    { key: 'government', label: 'Government', icon: '🏛️' },
    { key: 'municipality', label: 'Municipality', icon: '🏙️' },
    { key: 'recycler', label: 'Recycler', icon: '🏭' },
    { key: 'ngo', label: 'NGO & Civic', icon: '🌱' },
    { key: 'logistics', label: 'Logistics', icon: '🚛' },
    { key: 'corporate_csr', label: 'Corporate CSR', icon: '🏢' },
    { key: 'research', label: 'Research & Labs', icon: '🔬' },
    { key: 'educational', label: 'Universities', icon: '🏫' },
    { key: 'reward_partner', label: 'Reward Partners', icon: '🏪' }
  ];

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || org.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              National Organization Directory & Partner Network
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Discover verified authorities, municipal bodies, industrial recyclers, NGOs, and research institutions across the ECO-SMART grid.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold rounded-lg">
            {organizations.length} Verified Partners Active
          </span>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                selectedCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by organization name, city, capabilities (e.g. 'Plastic', 'E-Waste', 'Indore')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Main Split View: Directory Cards + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredOrgs.map(org => (
            <div
              key={org.id}
              onClick={() => setSelectedOrg(org)}
              className={`bg-white rounded-xl border p-5 shadow-sm cursor-pointer transition flex flex-col justify-between hover:shadow-md ${
                selectedOrg.id === org.id
                  ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{org.icon}</span>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">{org.name}</h3>
                <p className="text-xs text-blue-700 font-medium mt-0.5">{org.categoryLabel}</p>
                <p className="text-[11px] text-slate-500 mt-1">📍 {org.city}, {org.state}</p>

                {/* Capabilities pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {org.capabilities.slice(0, 3).map((cap, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {cap}
                    </span>
                  ))}
                  {org.capabilities.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{org.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">★ {org.rating} / 5.0</span>
                <span className="text-blue-600 font-semibold flex items-center space-x-1">
                  <span>View Details</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right 1 Col: Comprehensive Organization Profile Inspector */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-4xl">{selectedOrg.icon}</span>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                  {selectedOrg.name}
                </h3>
                <div className="flex items-center space-x-1 text-emerald-700 text-xs font-bold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{selectedOrg.verificationBadge}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Reg ID / CIN:</span>
                <span className="font-mono font-bold text-slate-900">{selectedOrg.regId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-800">{selectedOrg.city}, {selectedOrg.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Official Representative:</span>
                <span className="text-slate-900 font-semibold">{selectedOrg.representative.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Title:</span>
                <span>{selectedOrg.representative.designation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Response Speed:</span>
                <span className="text-emerald-700 font-bold">~{selectedOrg.responseAvgMinutes} min average</span>
              </div>
            </div>

            {/* Impact Track Record */}
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Certified Environmental Impact
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-500 text-[11px]">Waste Collected</p>
                  <p className="font-extrabold text-slate-900">
                    {(selectedOrg.impactMetrics.wasteCollectedKg / 1000).toFixed(1)}k kg
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-[11px]">CO₂ Avoided</p>
                  <p className="font-extrabold text-teal-700">
                    {(selectedOrg.impactMetrics.co2AvoidedKg / 1000).toFixed(1)} t
                  </p>
                </div>
              </div>
            </div>

            {/* Capabilities List */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Certified Capabilities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedOrg.capabilities.map((cap, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-800 font-medium"
                  >
                    ✓ {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Collaboration CTA */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentOrgById(selectedOrg.id)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow-sm"
              >
                Switch & Operate as {selectedOrg.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
