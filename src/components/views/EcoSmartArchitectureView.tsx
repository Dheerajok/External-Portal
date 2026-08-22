'use client';

import React from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  Network,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Building,
  CheckCircle2,
  Award,
  Zap,
  Globe2,
  Database
} from 'lucide-react';

export const EcoSmartArchitectureView: React.FC = () => {
  const { citizenPortalUrl } = usePortal();

  const flowSteps = [
    { step: '01', title: 'Citizen Action / Report', actor: 'Citizen Portal', desc: 'Citizen reports waste overflow, books e-waste pickup, or logs clean activity.', icon: '👤', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
    { step: '02', title: 'ECO-SMART Core Ingestion', actor: 'Platform Core', desc: 'Central API validates GPS, timestamps, and citizen credentials.', icon: '⚡', color: 'border-blue-500 bg-blue-50 text-blue-800' },
    { step: '03', title: 'AI Matching & Routing', actor: 'AI Intelligence Engine', desc: 'Evaluates severity, organization capabilities, distance, and historical turnaround.', icon: '🤖', color: 'border-indigo-500 bg-indigo-50 text-indigo-800' },
    { step: '04', title: 'Authority & Partner Portal', actor: 'External Portal', desc: 'Relevant municipality, NGO, or recycler receives task notification instantly.', icon: '🏛️', color: 'border-sky-500 bg-sky-50 text-sky-800' },
    { step: '05', title: 'On-Ground Action', actor: 'Field Operational Team', desc: 'Vehicle or volunteer squad arrives at geo-fenced coordinates for cleanup/sorting.', icon: '🚛', color: 'border-amber-500 bg-amber-50 text-amber-800' },
    { step: '06', title: 'Proof Submission', actor: 'Partner Portal', desc: 'Field team uploads photo evidence, net weight slip, and GPS timestamp.', icon: '📸', color: 'border-purple-500 bg-purple-50 text-purple-800' },
    { step: '07', title: 'Authority Verification', actor: 'Inspector / AI Sentinel', desc: 'Automated + officer review verifies genuine execution.', icon: '🛡️', color: 'border-cyan-500 bg-cyan-50 text-cyan-800' },
    { step: '08', title: 'Citizen Reward Release', actor: 'Citizen Platform', desc: 'Citizen receives verified reward points, leaderboard rank, and status update.', icon: '🎁', color: 'border-rose-500 bg-rose-50 text-rose-800' },
    { step: '09', title: 'Certified Impact Ledger', actor: 'National Database', desc: 'Kg collected, kg recycled, and CO2 avoided recorded into national audit matrix.', icon: '📊', color: 'border-teal-500 bg-teal-50 text-teal-800' },
    { step: '10', title: 'AI Model Continuous Learning', actor: 'Continuous AI', desc: 'Platform tunes future routing and updates regional risk heatmaps.', icon: '🧠', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              ECO-SMART Closed-Loop Ecosystem Architecture
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing the bidirectional execution flow connecting the Citizen Portal with the Authority & Partner Portal.
          </p>
        </div>

        <a
          href={citizenPortalUrl}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
        >
          <span>Open Citizen ECO-SMART Portal →</span>
        </a>
      </div>

      {/* 10-Step Interactive Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {flowSteps.map((step, idx) => (
          <div
            key={step.step}
            className={`p-4 rounded-xl border-2 ${step.color} shadow-sm space-y-2 relative flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black opacity-60">STEP {step.step}</span>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider block mt-1 opacity-75">
                {step.actor}
              </span>
              <h4 className="font-extrabold text-xs text-slate-900 mt-0.5">{step.title}</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">{step.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span>{idx < 9 ? 'Next →' : '✓ Completed'}</span>
              <span>100% Automated</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bidirectional Synchronization Diagram Box */}
      <div className="bg-[#0b192e] text-white p-8 rounded-2xl border border-[#1c355e] shadow-xl text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 bg-blue-900/60 border border-blue-700 text-sky-400 font-bold text-xs rounded-full">
            REAL-TIME BIDIRECTIONAL SYNC
          </span>
          <h3 className="text-2xl font-black text-white">
            Seamless Citizen ↔ Ecosystem Execution Pipeline
          </h3>
          <p className="text-xs text-slate-300">
            Citizen reports on the public portal directly trigger instant operational tasks in the Authority & Partner Portal, and partner resolution proofs instantly credit citizen rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs">
          <div className="bg-[#122543] p-4 rounded-xl border border-[#1e3b68] text-left space-y-1.5">
            <span className="text-emerald-400 font-bold text-[10px] uppercase">1. Citizen Level</span>
            <p className="font-bold text-white">Public ECO-SMART Website</p>
            <p className="text-slate-400 text-[11px]">Civic reports, waste booking, reward redemption, community leaderboards.</p>
          </div>

          <div className="bg-[#122543] p-4 rounded-xl border border-sky-600 text-left space-y-1.5 ring-2 ring-sky-500/20">
            <span className="text-sky-400 font-bold text-[10px] uppercase">2. Intelligence & Match</span>
            <p className="font-bold text-white">ECO-SMART AI Engine</p>
            <p className="text-slate-400 text-[11px]">Categorization, duplicate clustering, entity match scoring, SLA monitors.</p>
          </div>

          <div className="bg-[#122543] p-4 rounded-xl border border-[#1e3b68] text-left space-y-1.5">
            <span className="text-indigo-400 font-bold text-[10px] uppercase">3. Ecosystem Execution</span>
            <p className="font-bold text-white">Authority & Partner Portal</p>
            <p className="text-slate-400 text-[11px]">Municipal dispatch, recycler intake, NGO cleanups, statutory compliance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
