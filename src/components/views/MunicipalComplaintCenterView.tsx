'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import { ComplaintItem, ComplaintCategory } from '@/types';
import {
  AlertCircle,
  Clock,
  MapPin,
  ShieldAlert,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Filter,
  Search,
  User,
  Phone,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';

export const MunicipalComplaintCenterView: React.FC = () => {
  const { complaints, updateComplaintStatus, resolveComplaint, assignComplaintTeam } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'escalated' | 'resolved'>('all');

  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintItem | null>(null);
  const [resolveModalComplaint, setResolveModalComplaint] = useState<ComplaintItem | null>(null);
  const [resolvePhotoUrl, setResolvePhotoUrl] = useState('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60');
  const [inspectorName, setInspectorName] = useState('Zonal Cleanliness Inspector');

  const complaintCategories: ComplaintCategory[] = [
    'Waste Overflow',
    'Illegal Dumping',
    'Missed Collection',
    'Plastic Waste',
    'E-Waste',
    'Open Burning',
    'Public Cleanliness',
    'Drainage Waste',
    'Hazardous Waste',
    'Other Environmental Issue'
  ];

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch =
      c.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSev = selectedSeverity === 'all' || c.severity === selectedSeverity;
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'escalated'
        ? c.status === 'Escalated'
        : c.status === 'Resolved';

    return matchesSearch && matchesCat && matchesSev && matchesTab;
  });

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolveModalComplaint) return;
    resolveComplaint(resolveModalComplaint.id, resolvePhotoUrl, inspectorName);
    setResolveModalComplaint(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Municipal Complaint & Civic Escalation Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time citizen reporting pipeline with automated AI categorization, SLA monitoring, and cross-authority escalation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-red-100 text-red-800 font-bold rounded-lg text-xs flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Escalation Protocol Active</span>
          </span>
        </div>
      </div>

      {/* SLA Escalation Flowchart Header */}
      <div className="bg-[#0b192e] text-white p-5 rounded-xl border border-[#1c355e] shadow-lg">
        <h3 className="font-bold text-xs uppercase tracking-wider text-sky-400 mb-3">
          Automated SLA Escalation Protocol (Swachh Municipal Guidelines)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#122543] p-3 rounded-lg border border-[#1e3b68]">
            <div className="flex items-center justify-between text-slate-400 font-bold text-[10px] mb-1">
              <span>STAGE 1: INTAKE</span>
              <span className="text-emerald-400">0 - 30 MIN</span>
            </div>
            <p className="font-bold text-white">AI Categorization & Ward Routing</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Automated geo-fenced team dispatch</p>
          </div>

          <div className="bg-[#122543] p-3 rounded-lg border border-[#1e3b68]">
            <div className="flex items-center justify-between text-slate-400 font-bold text-[10px] mb-1">
              <span>STAGE 2: DISPATCH</span>
              <span className="text-sky-400">30 MIN - 2 HR</span>
            </div>
            <p className="font-bold text-white">Zonal Team Acknowledgment</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Vehicle en route with GPS tracker</p>
          </div>

          <div className="bg-[#122543] p-3 rounded-lg border border-[#1e3b68]">
            <div className="flex items-center justify-between text-slate-400 font-bold text-[10px] mb-1">
              <span>STAGE 3: WARNING</span>
              <span className="text-amber-400">75% SLA ELAPSED</span>
            </div>
            <p className="font-bold text-white">Ward Supervisor Alert</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Automated SMS & portal reminder</p>
          </div>

          <div className="bg-[#122543] p-3 rounded-lg border border-red-700/60 bg-red-950/30">
            <div className="flex items-center justify-between text-red-300 font-bold text-[10px] mb-1">
              <span>STAGE 4: ESCALATION</span>
              <span className="text-red-400">SLA BREACH</span>
            </div>
            <p className="font-bold text-white">Zonal Commissioner Oversight</p>
            <p className="text-[11px] text-red-300 mt-0.5">High-priority flying squad reassignment</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Complaints ({complaints.length})
          </button>
          <button
            onClick={() => setActiveTab('escalated')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'escalated' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Escalated ({complaints.filter(c => c.status === 'Escalated').length})
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Resolved ({complaints.filter(c => c.status === 'Resolved').length})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search complaints, wards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-xs"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-slate-700 font-medium"
          >
            <option value="all">All Categories</option>
            {complaintCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-slate-700 font-medium"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredComplaints.map(comp => (
          <div
            key={comp.id}
            className={`bg-white rounded-xl border p-5 shadow-sm space-y-3 transition hover:shadow-md ${
              comp.status === 'Escalated' ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-extrabold text-sm text-slate-900">{comp.ticketNumber}</span>
                  <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                    comp.severity === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : comp.severity === 'high'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {comp.severity} Priority
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mt-1">{comp.category}</h4>
                <p className="text-xs text-slate-500">📍 {comp.location} ({comp.ward})</p>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                comp.status === 'Resolved'
                  ? 'bg-emerald-100 text-emerald-800'
                  : comp.status === 'Escalated'
                  ? 'bg-red-100 text-red-800'
                  : comp.status === 'Under Action'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {comp.status}
              </span>
            </div>

            {/* AI Classification Tag */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-indigo-700 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>AI Classification: {comp.aiClassification.detectedCategory}</span>
                </span>
                <span className="text-slate-500">Confidence: {comp.aiClassification.severityScore}%</span>
              </div>
              {comp.aiClassification.isDuplicateCluster && (
                <p className="text-[11px] text-red-600 font-semibold">
                  ⚠ Duplicate Cluster: {comp.aiClassification.clusterCount} nearby reports merged into single incident.
                </p>
              )}
            </div>

            {/* Evidence Image */}
            {comp.evidencePhotos.length > 0 && (
              <div className="h-32 rounded-lg overflow-hidden border border-slate-200 relative group">
                <img src={comp.evidencePhotos[0]} alt="Evidence" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold">
                  Citizen Geo-tagged Photo Evidence
                </div>
              </div>
            )}

            {/* Meta & Citizen Info */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="space-y-0.5">
                <p>Reported By: <strong className="text-slate-700">{comp.citizenName}</strong></p>
                <p>Submitted: {comp.submittedAt}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-red-600">SLA: {comp.slaDeadline.split('(')[0]}</p>
                <p className="text-[11px] text-slate-400">Assigned: {comp.assignedTeam}</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-end space-x-2 text-xs">
              {comp.status !== 'Resolved' && (
                <>
                  <button
                    onClick={() => updateComplaintStatus(comp.id, 'Under Action')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition shadow-sm"
                  >
                    Set Under Action
                  </button>

                  <button
                    onClick={() => updateComplaintStatus(comp.id, 'Escalated')}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded font-bold transition shadow-sm"
                  >
                    Escalate to Zonal Head
                  </button>

                  <button
                    onClick={() => setResolveModalComplaint(comp)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold transition shadow-sm"
                  >
                    Mark Resolved ✓
                  </button>
                </>
              )}

              {comp.status === 'Resolved' && (
                <div className="text-emerald-700 font-bold text-xs flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Resolved & Proof Filed</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RESOLUTION MODAL */}
      {resolveModalComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-slate-800 text-xs">
            <div className="bg-[#0b192e] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Submit Complaint Resolution Proof</h3>
              <button onClick={() => setResolveModalComplaint(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="p-5 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Post-Clean Action Photo URL</label>
                <input
                  type="text"
                  value={resolvePhotoUrl}
                  onChange={(e) => setResolvePhotoUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
                <div className="mt-2 h-24 rounded border overflow-hidden">
                  <img src={resolvePhotoUrl} alt="Resolved" className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Inspecting Officer Name / ID</label>
                <input
                  type="text"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResolveModalComplaint(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded shadow-sm"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
