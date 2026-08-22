'use client';

import React from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  LayoutDashboard,
  Sparkles,
  ClipboardList,
  AlertCircle,
  Truck,
  MapPin,
  Users,
  Handshake,
  Globe2,
  BrainCircuit,
  Database,
  BarChart3,
  Award,
  FileSpreadsheet,
  Radio,
  Network,
  Code2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { tasks, complaints, mode, currentOrg } = usePortal();

  const pendingTasksCount = tasks.filter(t => t.status === 'new' || t.status === 'assigned' || t.status === 'escalated').length;
  const activeComplaintsCount = complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length;

  const menuSections = [
    {
      title: 'ECOSYSTEM OVERVIEW',
      items: [
        { id: 'landing', label: 'Ecosystem Portal Home', icon: Sparkles, badge: 'Hub' },
        { id: 'overview', label: 'Organization Dashboard', icon: LayoutDashboard },
        { id: 'command-center', label: 'National Command Center', icon: Radio, badge: 'Live', enterpriseOnly: true },
        { id: 'architecture', label: 'ECO-SMART Live Flow', icon: Network }
      ]
    },
    {
      title: 'OPERATIONS & EXECUTION',
      items: [
        { id: 'tasks', label: 'Universal Task Center', icon: ClipboardList, count: pendingTasksCount },
        { id: 'complaints', label: 'Municipal Complaints', icon: AlertCircle, count: activeComplaintsCount },
        { id: 'waste-ops', label: 'Waste Ops & Recovery', icon: Truck }
      ]
    },
    {
      title: 'CONNECT & COLLABORATE',
      items: [
        { id: 'org-map', label: 'Organization Map & Directory', icon: MapPin },
        { id: 'partners', label: 'Find a Partner', icon: Users },
        { id: 'collaboration', label: 'Collaboration Center', icon: Handshake }
      ]
    },
    {
      title: 'DATA & INTELLIGENCE',
      items: [
        { id: 'gis-map', label: 'Environmental GIS Map', icon: Globe2, badge: 'Layers' },
        { id: 'ai-intelligence', label: 'AI Environmental Intelligence', icon: BrainCircuit, badge: 'AI' },
        { id: 'data-center', label: 'Data Contribution Center', icon: Database },
        { id: 'external-intel', label: 'External Indicators & Census', icon: BarChart3 }
      ]
    },
    {
      title: 'GOVERNANCE & IMPACT',
      items: [
        { id: 'impact', label: 'Impact & Scorecard', icon: Award },
        { id: 'reports', label: 'Reporting & Exports', icon: FileSpreadsheet },
        { id: 'api-hub', label: 'Developer APIs & Webhooks', icon: Code2, enterpriseOnly: true }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0b192e] text-slate-300 border-r border-[#1c355e] flex flex-col justify-between flex-shrink-0 min-h-[calc(100vh-80px)]">
      <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
        {/* Simple Mode Active Indicator */}
        {mode === 'simple' && (
          <div className="bg-emerald-950/70 border border-emerald-700/60 p-2.5 rounded-md text-xs text-emerald-300">
            <div className="flex items-center space-x-1.5 font-semibold text-emerald-200">
              <span>🌱</span>
              <span>Simple Mode Active</span>
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-1 leading-snug">
              Streamlined for grassroots NGOs and local community operators.
            </p>
          </div>
        )}

        {menuSections.map((section, idx) => {
          const visibleItems = section.items.filter(
            item => mode === 'enterprise' || !item.enterpriseOnly
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {visibleItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm font-semibold'
                          : 'hover:bg-[#122543] hover:text-white text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {item.count !== undefined && item.count > 0 && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-white text-blue-700' : 'bg-red-500 text-white'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                        {item.badge && (
                          <span
                            className={`px-1 py-0.2 rounded text-[9px] uppercase font-bold ${
                              isActive
                                ? 'bg-blue-800 text-blue-100'
                                : 'bg-[#183159] text-sky-400 border border-[#224479]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Organization Status Footer */}
      <div className="p-3 border-t border-[#1c355e] bg-[#061121] text-xs">
        <div className="flex items-center space-x-2 mb-1.5">
          <span className="text-base">{currentOrg.icon}</span>
          <div className="truncate flex-1">
            <p className="font-semibold text-white truncate text-xs">{currentOrg.name}</p>
            <p className="text-[10px] text-slate-400">{currentOrg.city}, {currentOrg.state}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#122543] text-slate-400">
          <span>Performance Score</span>
          <span className="font-bold text-emerald-400">{currentOrg.performanceScore} / 100</span>
        </div>
      </div>
    </aside>
  );
};
