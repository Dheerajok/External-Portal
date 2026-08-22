'use client';

import React from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  Radio,
  ShieldAlert,
  Flame,
  AlertTriangle,
  Activity,
  Users,
  Building,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

export const AuthorityCommandCenterView: React.FC = () => {
  const { organizations, complaints, tasks, aiInsights } = usePortal();

  const totalOrgs = organizations.length;
  const verifiedOrgs = organizations.filter(o => o.verificationStatus !== 'pending').length;
  const openComplaints = complaints.filter(c => c.status !== 'Resolved');
  const criticalTasks = tasks.filter(t => t.priority === 'critical' || t.status === 'escalated');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#061121] text-white p-6 rounded-xl border border-red-900/60 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-700 flex items-center justify-center text-red-400">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                National Environmental Command Center
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Apex Regulatory Oversight & Rapid Incident Dispatch Room (CPCB / State Disaster Cell)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-[#0b192e] px-3.5 py-2 rounded-lg border border-[#1e3b68]">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Grid Health</span>
            <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Apex KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[11px] font-bold uppercase">Enrolled Entities</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalOrgs}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">{verifiedOrgs} Government Verified</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[11px] font-bold uppercase">Active Critical Incidents</span>
          <p className="text-3xl font-extrabold text-red-600 mt-1">{criticalTasks.length}</p>
          <p className="text-[11px] text-red-600 font-semibold">Immediate Dispatch Active</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[11px] font-bold uppercase">Unresolved Complaints</span>
          <p className="text-3xl font-extrabold text-amber-600 mt-1">{openComplaints.length}</p>
          <p className="text-[11px] text-slate-500">Under 4-hour SLA window</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[11px] font-bold uppercase">AI Watchdog Alerts</span>
          <p className="text-3xl font-extrabold text-indigo-600 mt-1">{aiInsights.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold">Real-Time Anomaly Detection</p>
        </div>
      </div>

      {/* Live Incidents Ticker */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-slate-900">
            <Flame className="w-4 h-4 text-red-600" />
            <span>Priority Environmental Escalations Ticker</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">AUTOSYNC 5s</span>
        </div>

        <div className="divide-y divide-slate-100">
          {complaints.filter(c => c.severity === 'critical' || c.status === 'Escalated').map(comp => (
            <div key={comp.id} className="p-4 bg-red-50/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-red-700">{comp.ticketNumber}</span>
                  <span className="font-bold text-slate-900">{comp.category}</span>
                  <span className="px-2 py-0.2 rounded bg-red-600 text-white font-bold text-[10px] uppercase">
                    CRITICAL
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">📍 {comp.location} ({comp.ward})</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-red-700 font-semibold">{comp.slaDeadline.split('(')[0]}</span>
                <button
                  onClick={() => alert(`Direct Zonal Commander override dispatched for ${comp.ticketNumber}`)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded font-bold transition shadow-sm"
                >
                  Commander Override
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
