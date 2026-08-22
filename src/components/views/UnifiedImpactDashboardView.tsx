'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  Award,
  TrendingUp,
  Leaf,
  Droplets,
  Zap,
  Users,
  ShieldCheck,
  CheckCircle2,
  Download,
  Building,
  Scale
} from 'lucide-react';

export const UnifiedImpactDashboardView: React.FC = () => {
  const { currentOrg, organizations } = usePortal();
  const [impactScope, setImpactScope] = useState<'current_org' | 'national_grid'>('current_org');

  // National aggregated metrics
  const nationalWasteKg = organizations.reduce((acc, o) => acc + o.impactMetrics.wasteCollectedKg, 0);
  const nationalRecycledKg = organizations.reduce((acc, o) => acc + o.impactMetrics.wasteRecycledKg, 0);
  const nationalCo2Kg = organizations.reduce((acc, o) => acc + o.impactMetrics.co2AvoidedKg, 0);
  const nationalComplaints = organizations.reduce((acc, o) => acc + o.impactMetrics.complaintsResolved, 0);
  const nationalTrees = organizations.reduce((acc, o) => acc + o.impactMetrics.treesEquivalent, 0);
  const nationalWaterLiters = organizations.reduce((acc, o) => acc + o.impactMetrics.waterSavedLiters, 0);
  const nationalEnergyKwh = organizations.reduce((acc, o) => acc + o.impactMetrics.energySavedKwh, 0);
  const nationalPeople = organizations.reduce((acc, o) => acc + o.impactMetrics.peopleEngaged, 0);

  const activeMetrics =
    impactScope === 'current_org'
      ? currentOrg.impactMetrics
      : {
          wasteCollectedKg: nationalWasteKg,
          wasteRecycledKg: nationalRecycledKg,
          co2AvoidedKg: nationalCo2Kg,
          complaintsResolved: nationalComplaints,
          treesEquivalent: nationalTrees,
          waterSavedLiters: nationalWaterLiters,
          energySavedKwh: nationalEnergyKwh,
          peopleEngaged: nationalPeople
        };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              National & Organization Environmental Impact Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Certified carbon offset, circular waste diversion, and resource conservation ledger synchronized across ECO-SMART.
          </p>
        </div>

        {/* Scope Switcher */}
        <div className="bg-slate-200 p-0.5 rounded-lg flex text-xs font-semibold">
          <button
            onClick={() => setImpactScope('current_org')}
            className={`px-3 py-1.5 rounded-md transition ${
              impactScope === 'current_org' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            {currentOrg.name.split(' ')[0]} Impact
          </button>
          <button
            onClick={() => setImpactScope('national_grid')}
            className={`px-3 py-1.5 rounded-md transition ${
              impactScope === 'national_grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            All-India ECO-SMART Grid
          </button>
        </div>
      </div>

      {/* Primary Impact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Total Waste Diverted</span>
            <Scale className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">
            {(activeMetrics.wasteCollectedKg / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}{' '}
            <span className="text-sm font-normal text-slate-500">metric tons</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold">
            {(activeMetrics.wasteRecycledKg / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} tons recycled
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Certified CO₂ Avoided</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">
            {(activeMetrics.co2AvoidedKg / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}{' '}
            <span className="text-sm font-normal text-slate-500">tons CO₂e</span>
          </p>
          <p className="text-[11px] text-slate-500">
            Equivalent to ≈ {activeMetrics.treesEquivalent.toLocaleString()} trees planted
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Water Conserved</span>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-3xl font-extrabold text-sky-600">
            {(activeMetrics.waterSavedLiters / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}{' '}
            <span className="text-sm font-normal text-slate-500">kL</span>
          </p>
          <p className="text-[11px] text-slate-500">Through recycled process streams</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Citizen Community Reach</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-extrabold text-indigo-600">
            {activeMetrics.peopleEngaged.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500">Active participants & reporters</p>
        </div>
      </div>

      {/* Performance Scorecard Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">
              Organization Performance Scorecard & Accountability Index
            </h3>
            <p className="text-xs text-slate-500">
              Objective benchmark calculated from task turnaround, data quality, citizen satisfaction, and resolution rates.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-blue-700">{currentOrg.performanceScore}</span>
            <span className="text-xs text-slate-400 font-bold">/ 100 Score</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[11px] font-bold uppercase">Response Time Compliance</span>
            <p className="text-xl font-bold text-slate-900">96.4%</p>
            <p className="text-emerald-600 text-[11px]">Avg {currentOrg.responseAvgMinutes} min response</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[11px] font-bold uppercase">Task Completion Rate</span>
            <p className="text-xl font-bold text-slate-900">98.2%</p>
            <p className="text-emerald-600 text-[11px]">{currentOrg.completedTasksCount} verified tasks</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[11px] font-bold uppercase">Telemetry Data Quality</span>
            <p className="text-xl font-bold text-slate-900">99.5%</p>
            <p className="text-blue-600 text-[11px]">Zero validation flags</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[11px] font-bold uppercase">Citizen Satisfaction</span>
            <p className="text-xl font-bold text-slate-900">4.9 / 5.0</p>
            <p className="text-amber-600 text-[11px]">★ 98% positive reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};
