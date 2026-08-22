'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import { CollaborationRequest } from '@/types';
import {
  Handshake,
  Users,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Building,
  Target,
  Sparkles,
  X
} from 'lucide-react';

export const CollaborationCenterView: React.FC = () => {
  const {
    collaborations,
    organizations,
    currentOrg,
    createCollaborationProposal,
    updateCollaborationStatus
  } = usePortal();

  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active');
  const [showProposalModal, setShowProposalModal] = useState(false);

  // Proposal form state
  const [proposalTitle, setProposalTitle] = useState('');
  const [targetOrgId, setTargetOrgId] = useState(organizations[1]?.id || '');
  const [proposalCategory, setProposalCategory] = useState<CollaborationRequest['category']>('Recycling Partnership');
  const [proposalScope, setProposalScope] = useState('');
  const [targetKg, setTargetKg] = useState<number>(50000);
  const [durationMonths, setDurationMonths] = useState<number>(12);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOrg = organizations.find(o => o.id === targetOrgId);
    createCollaborationProposal({
      title: proposalTitle || 'Cross-Sector Environmental Co-Action Initiative',
      toOrgId: targetOrgId,
      toOrgName: targetOrg?.name || 'Selected Environmental Partner',
      toOrgType: targetOrg?.categoryLabel || 'Recycler',
      category: proposalCategory,
      scope: proposalScope || 'Coordinated collection, logistics and certified recycling protocol.',
      targetImpactKg: Number(targetKg),
      durationMonths: Number(durationMonths)
    });
    setShowProposalModal(false);
    setProposalTitle('');
    setProposalScope('');
  };

  const filteredCollabs = collaborations.filter(c => {
    if (activeTab === 'active') return c.status === 'Active';
    if (activeTab === 'pending') return c.status === 'Pending';
    return c.status === 'Completed' || c.status === 'Declined';
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Handshake className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              Cross-Sector Collaboration Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Initiate joint sustainability projects between Municipalities ↔ Recyclers, NGOs ↔ Schools, and Corporates ↔ Community Foundations.
          </p>
        </div>

        <button
          onClick={() => setShowProposalModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Collaboration Proposal</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'active'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Active Collaborations ({collaborations.filter(c => c.status === 'Active').length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'pending'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Proposals & Requests ({collaborations.filter(c => c.status === 'Pending').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'completed'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Completed Initiatives
        </button>
      </div>

      {/* Collaborations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCollabs.map(collab => (
          <div
            key={collab.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {collab.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-2 leading-snug">
                  {collab.title}
                </h3>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                collab.status === 'Active'
                  ? 'bg-emerald-100 text-emerald-800'
                  : collab.status === 'Pending'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {collab.status}
              </span>
            </div>

            {/* Entity Bridge */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between text-xs text-slate-800">
              <div className="w-[45%]">
                <span className="text-[10px] text-slate-500 block">Lead Entity</span>
                <span className="font-bold truncate block">{collab.fromOrgName}</span>
                <span className="text-[10px] text-blue-600 font-medium">{collab.fromOrgType}</span>
              </div>

              <span className="text-slate-400 font-bold">⇄</span>

              <div className="w-[45%] text-right">
                <span className="text-[10px] text-slate-500 block">Partner Entity</span>
                <span className="font-bold truncate block">{collab.toOrgName}</span>
                <span className="text-[10px] text-emerald-600 font-medium">{collab.toOrgType}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{collab.scope}</p>

            {/* Metrics */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span>Target: {(collab.targetImpactKg / 1000).toFixed(0)} metric tonnes</span>
              </div>

              <span className="text-slate-400 text-[11px]">Duration: {collab.durationMonths} Months</span>
            </div>

            {collab.status === 'Pending' && (
              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  onClick={() => updateCollaborationStatus(collab.id, 'Declined')}
                  className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold"
                >
                  Decline
                </button>
                <button
                  onClick={() => updateCollaborationStatus(collab.id, 'Active')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold shadow-sm"
                >
                  Accept Proposal ✓
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* NEW PROPOSAL MODAL */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-slate-800 text-xs">
            <div className="bg-[#0b192e] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Create Cross-Sector Collaboration Proposal</h3>
              <button onClick={() => setShowProposalModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Collaboration Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University E-Waste Collection & Circular Reward Drive"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Partner Organization *</label>
                <select
                  value={targetOrgId}
                  onChange={(e) => setTargetOrgId(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                >
                  {organizations
                    .filter(o => o.id !== currentOrg.id)
                    .map(org => (
                      <option key={org.id} value={org.id}>
                        {org.name} ({org.categoryLabel} • {org.city})
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={proposalCategory}
                    onChange={(e) => setProposalCategory(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-md p-2 bg-white"
                  >
                    <option>Recycling Partnership</option>
                    <option>CSR Environmental Mission</option>
                    <option>Municipal Joint Clean</option>
                    <option>Research & Sensor Data</option>
                    <option>E-Waste Takeback</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Impact (kg)</label>
                  <input
                    type="number"
                    value={targetKg}
                    onChange={(e) => setTargetKg(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scope & Responsibilities</label>
                <textarea
                  rows={3}
                  value={proposalScope}
                  onChange={(e) => setProposalScope(e.target.value)}
                  placeholder="Outline roles, logistics, verification protocol, and public milestones..."
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProposalModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded shadow-sm"
                >
                  Submit Collaboration Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
