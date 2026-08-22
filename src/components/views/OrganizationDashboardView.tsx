'use client';

import React from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Truck,
  Leaf,
  Activity,
  Layers,
  Sparkles,
  Database,
  FileCheck,
  Building
} from 'lucide-react';

interface DashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenOnboarding: () => void;
}

export const OrganizationDashboardView: React.FC<DashboardProps> = ({
  onNavigateTab,
  onOpenOnboarding
}) => {
  const { currentOrg, tasks, complaints, aiInsights, acceptTask, verifyTaskAction, mode } = usePortal();

  const activeTasks = tasks.filter(t => t.status !== 'completed' && t.status !== 'rejected');
  const criticalComplaints = complaints.filter(c => c.severity === 'critical' || c.severity === 'high');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Organization Header */}
      <div className="bg-[#0b192e] text-white rounded-xl p-6 border border-[#1c355e] shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-xl bg-[#122543] border border-[#1e3b68] flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
            {currentOrg.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentOrg.name}
              </h1>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentOrg.verificationBadge}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
              <div className="flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentOrg.categoryLabel}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Operational Area: {currentOrg.city}, {currentOrg.state}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-mono text-slate-400">Reg: {currentOrg.regId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('tasks')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow-sm"
          >
            Universal Task Center ({activeTasks.length})
          </button>

          <button
            onClick={() => onNavigateTab('data-center')}
            className="px-4 py-2 bg-[#122543] hover:bg-[#183159] text-sky-300 border border-[#1e3b68] rounded-lg text-xs font-semibold transition"
          >
            Contribute Data
          </button>
        </div>
      </div>

      {/* AI Anomaly Alert Banner if any */}
      {aiInsights.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start justify-between gap-3 text-xs text-amber-900 shadow-sm">
          <div className="flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200 px-1.5 py-0.2 rounded text-amber-900 mr-2">
                ECO-SMART AI Alert
              </span>
              <span className="font-bold">{aiInsights[0].title}</span>
              <p className="text-amber-800 text-[11px] mt-1">{aiInsights[0].summary}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('ai-intelligence')}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[11px] flex-shrink-0"
          >
            Inspect Alert →
          </button>
        </div>
      )}

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Active Tasks</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{currentOrg.activeTasksCount}</p>
          <p className="text-[10px] text-blue-600 font-medium mt-1">In progress & assigned</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Completed Actions</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{currentOrg.completedTasksCount}</p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Verified on ground</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Waste Handled</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {(currentOrg.impactMetrics.wasteCollectedKg / 1000).toFixed(1)}k <span className="text-xs font-normal text-slate-500">kg</span>
          </p>
          <p className="text-[10px] text-emerald-600 font-medium mt-1">
            {(currentOrg.impactMetrics.wasteRecycledKg / 1000).toFixed(1)}k kg recycled
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">CO₂ Avoided</p>
          <p className="text-2xl font-extrabold text-teal-600 mt-1">
            {(currentOrg.impactMetrics.co2AvoidedKg / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-500">t</span>
          </p>
          <p className="text-[10px] text-teal-600 font-medium mt-1">
            ≈ {currentOrg.impactMetrics.treesEquivalent} trees planted
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Avg Response Time</p>
          <p className="text-2xl font-extrabold text-sky-700 mt-1">{currentOrg.responseAvgMinutes} <span className="text-xs font-normal text-slate-500">min</span></p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Under 45m target</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Performance Score</p>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1">{currentOrg.performanceScore} <span className="text-xs font-normal text-slate-500">/100</span></p>
          <p className="text-[10px] text-indigo-600 font-medium mt-1">★ {currentOrg.rating} / 5.0 Rating</p>
        </div>
      </div>

      {/* Main Grid: Active Task Center & Municipal Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Assigned Tasks Requiring Action */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Assigned Tasks Queue</h3>
                <p className="text-xs text-slate-500">Direct execution requests routed via ECO-SMART AI Engine</p>
              </div>
              <button
                onClick={() => onNavigateTab('tasks')}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center space-x-1"
              >
                <span>View All Tasks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {activeTasks.slice(0, 3).map(task => (
                <div key={task.id} className="p-4 hover:bg-slate-50/70 transition space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{task.title}</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                          task.priority === 'critical'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'high'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {task.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        📍 {task.location} • {task.zone}
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      task.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : task.status === 'awaiting_verification'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{task.description}</p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs">
                    <span className="text-[11px] text-slate-500">
                      SLA: <strong className="text-slate-700">{task.deadline}</strong>
                    </span>

                    <div className="flex items-center space-x-2">
                      {task.status === 'new' && (
                        <button
                          onClick={() => acceptTask(task.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[11px] transition shadow-sm"
                        >
                          Accept Task
                        </button>
                      )}

                      {task.status === 'awaiting_verification' && (
                        <button
                          onClick={() => verifyTaskAction(task.id)}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded text-[11px] transition shadow-sm"
                        >
                          Verify & Release Citizen Reward
                        </button>
                      )}

                      <button
                        onClick={() => onNavigateTab('tasks')}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[11px] transition"
                      >
                        Task Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Capabilities & Jurisdictions summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Active Operational Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentOrg.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold"
                >
                  ✓ {cap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Urgent Municipal Complaints & Rapid SLA */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Municipal Complaint Feed</h3>
                <p className="text-xs text-slate-500">Real-time citizen civic reports</p>
              </div>
              <button
                onClick={() => onNavigateTab('complaints')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Open Hub →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {complaints.slice(0, 3).map(comp => (
                <div key={comp.id} className="p-4 space-y-1.5 text-xs hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{comp.ticketNumber}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                      comp.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {comp.severity}
                    </span>
                  </div>

                  <p className="font-semibold text-slate-800">{comp.category}</p>
                  <p className="text-slate-500 text-[11px]">📍 {comp.location} ({comp.ward})</p>

                  <div className="pt-1.5 flex items-center justify-between text-[11px] border-t border-slate-100">
                    <span className="text-slate-500">Status: <strong className="text-slate-800">{comp.status}</strong></span>
                    <span className="text-red-600 font-semibold">{comp.slaDeadline.split(' ')[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Action Link Box */}
          <div className="bg-gradient-to-br from-[#0b192e] to-[#122543] text-white p-5 rounded-xl border border-[#1c355e] space-y-3 shadow-md">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-white">Ecosystem Collaboration</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect with 12+ verified recyclers, NGOs, and research institutions operating across Indore and Central India.
            </p>
            <button
              onClick={() => onNavigateTab('partners')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow"
            >
              Discover Environmental Partners →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
