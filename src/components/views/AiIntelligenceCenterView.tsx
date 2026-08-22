'use client';

import React from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  BrainCircuit,
  Sparkles,
  AlertTriangle,
  Flame,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';

export const AiIntelligenceCenterView: React.FC = () => {
  const { aiInsights } = usePortal();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              AI Environmental Intelligence & Anomaly Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Machine learning models continuously scanning citizen complaints, satellite sensor feeds, and fleet logistics to identify hotspots, anomalies, and collection gaps.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 font-bold rounded-lg flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Neural Watchdog Model v4.2 Active</span>
          </span>
        </div>
      </div>

      {/* AI Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {aiInsights.map(insight => (
          <div
            key={insight.id}
            className={`bg-white rounded-xl border p-6 shadow-sm space-y-4 hover:shadow-md transition ${
              insight.severity === 'critical'
                ? 'border-red-300 ring-1 ring-red-200'
                : insight.severity === 'warning'
                ? 'border-amber-300 ring-1 ring-amber-200'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    insight.severity === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : insight.severity === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {insight.type.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">📍 {insight.region}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 mt-2 leading-snug">
                  {insight.title}
                </h3>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-indigo-700 font-extrabold text-sm">
                  {insight.confidencePercent}%
                </span>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Confidence</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{insight.summary}</p>

            {/* Why This Matters Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-0.5">
                  Why This Matters:
                </span>
                <p className="text-slate-600 leading-relaxed">{insight.whyItMatters}</p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-indigo-900 text-[11px] uppercase tracking-wider block mb-0.5">
                  Recommended Action:
                </span>
                <p className="text-indigo-800 font-medium leading-relaxed">{insight.recommendedAction}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>Relevant Entities: <strong className="text-slate-700">{insight.relevantOrgType}</strong></span>
              <span className="text-[11px] text-slate-400">{insight.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
