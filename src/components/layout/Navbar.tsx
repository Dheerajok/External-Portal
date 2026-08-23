'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortal } from '@/context/PortalContext';
import { UserRole, PortalMode } from '@/types';
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Building2,
  Bell,
  Search,
  Layers,
  Sparkles,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sliders
} from 'lucide-react';

interface NavbarProps {
  onOpenOnboarding: () => void;
  onSelectOrgType?: (type: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOnboarding }) => {
  const {
    currentOrg,
    organizations,
    setCurrentOrgById,
    mode,
    setMode,
    role,
    setRole,
    notifications,
    unreadNotifsCount,
    markNotifAsRead,
    markAllNotifsAsRead,
    citizenPortalUrl
  } = usePortal();

  const [showOrgMenu, setShowOrgMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const rolesList: { key: UserRole; label: string; badge: string }[] = [
    { key: 'municipal_officer', label: 'Municipal Officer', badge: 'Authority' },
    { key: 'gov_authority', label: 'Government Authority (CPCB/State)', badge: 'Regulatory' },
    { key: 'super_admin', label: 'National Super Admin', badge: 'Apex' },
    { key: 'org_admin', label: 'Organization Admin', badge: 'Admin' },
    { key: 'operations_manager', label: 'Operations & Fleet Manager', badge: 'Logistics' },
    { key: 'field_worker', label: 'Field Worker / Rapid Unit', badge: 'Execution' },
    { key: 'data_manager', label: 'Environmental Data Manager', badge: 'Telemetry' },
    { key: 'researcher', label: 'Academic / R&D Scientist', badge: 'Research' },
    { key: 'csr_manager', label: 'Corporate CSR Officer', badge: 'Impact' },
    { key: 'viewer', label: 'Public Auditor / Viewer', badge: 'Read-Only' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b192e] text-white border-b border-[#1c355e] shadow-md">
      {/* Top Banner: Ecosystem Connection & Exit Controls */}
      <div className="bg-[#061121] border-b border-[#152a4a] px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          {/* Main Return Button */}
          <a
            href={citizenPortalUrl}
            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium rounded transition duration-150 shadow-sm"
            title="Return to citizen-facing ECO-SMART platform"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to ECO-SMART</span>
          </a>

          <a
            href={citizenPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-400 inline-flex items-center space-x-1 transition hidden sm:inline-flex"
          >
            <span>Open Citizen Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <span className="text-slate-600 hidden md:inline">|</span>

          <span className="text-slate-300 hidden md:inline-flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-200">ECO-SMART National Environmental Infrastructure</span>
            <span className="text-slate-400">(v2.4 Live Grid)</span>
          </span>
        </div>

        {/* Mode Switcher: Simple Mode vs Enterprise Mode */}
        <div className="flex items-center space-x-2">
          <div className="bg-[#122543] p-0.5 rounded flex items-center border border-[#1e3b68]">
            <button
              onClick={() => setMode('simple')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                mode === 'simple'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Streamlined view for small NGOs, local recyclers and community groups"
            >
              🌱 Simple Mode
            </button>
            <button
              onClick={() => setMode('enterprise')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                mode === 'enterprise'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Full institutional & enterprise capabilities: APIS, multi-department, audit logs"
            >
              🏢 Enterprise Mode
            </button>
          </div>

          <button
            onClick={onOpenOnboarding}
            className="px-2.5 py-0.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded text-[11px] transition shadow-sm"
          >
            + Register Organization
          </button>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Left: Portal Brand & Current Organization */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
              <span className="text-lg">🏛️</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-sky-400 transition">
                  ECO-SMART
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.2 rounded">
                  AUTHORITY & PARTNER PORTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400">National Environmental Execution & Intelligence Layer</p>
            </div>
          </Link>

          <div className="h-7 w-[1px] bg-[#1e3b68] hidden lg:block"></div>

          {/* Active Organization Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowOrgMenu(!showOrgMenu)}
              className="flex items-center space-x-2 px-2.5 py-1.5 bg-[#122543] hover:bg-[#183159] border border-[#1e3b68] rounded-md transition text-left"
            >
              <span className="text-base">{currentOrg.icon}</span>
              <div className="max-w-[200px] xl:max-w-[260px] truncate">
                <p className="text-xs font-semibold text-white truncate">{currentOrg.name}</p>
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{currentOrg.verificationBadge}</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {showOrgMenu && (
              <div
                className="absolute left-0 mt-1 w-80 bg-[#0b192e] border border-[#1e3b68] rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setShowOrgMenu(false)}
              >
                <div className="px-3 py-1.5 border-b border-[#1e3b68] flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Switch Organization</span>
                  <button
                    onClick={() => {
                      setShowOrgMenu(false);
                      onOpenOnboarding();
                    }}
                    className="text-[11px] text-sky-400 hover:underline"
                  >
                    + Add New
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {organizations.map(org => (
                    <button
                      key={org.id}
                      onClick={() => {
                        setCurrentOrgById(org.id);
                        setShowOrgMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-start space-x-2.5 hover:bg-[#122543] transition ${
                        org.id === currentOrg.id ? 'bg-[#122543]/80 border-l-2 border-sky-400' : ''
                      }`}
                    >
                      <span className="text-lg mt-0.5">{org.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{org.name}</p>
                        <p className="text-[10px] text-slate-400">{org.categoryLabel} • {org.city}</p>
                      </div>
                      {org.id === currentOrg.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center/Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Quick Search */}
          <div className="relative hidden xl:block w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks, complaints, partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#122543] border border-[#1e3b68] rounded-md pl-8 pr-3 py-1 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#122543] hover:bg-[#183159] border border-[#1e3b68] rounded-md text-xs font-medium text-slate-200 transition"
              title="Change simulated role permission"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Role:</span>
              <span className="font-semibold text-white">
                {rolesList.find(r => r.key === role)?.label || role}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div
                className="absolute right-0 mt-1 w-64 bg-[#0b192e] border border-[#1e3b68] rounded-lg shadow-2xl py-2 z-50"
                onMouseLeave={() => setShowRoleMenu(false)}
              >
                <div className="px-3 py-1 border-b border-[#1e3b68]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Select Active Role (RBAC)</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {rolesList.map(r => (
                    <button
                      key={r.key}
                      onClick={() => {
                        setRole(r.key);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#122543] text-xs transition ${
                        r.key === role ? 'bg-[#122543] text-sky-400 font-semibold' : 'text-slate-200'
                      }`}
                    >
                      <div>
                        <p>{r.label}</p>
                        <span className="text-[9px] uppercase px-1 rounded bg-[#1e3b68] text-slate-300">{r.badge}</span>
                      </div>
                      {r.key === role && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Super Admin Badge (thakrethe@gmail.com) */}
          <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-emerald-950/70 border border-emerald-700/60 rounded-md text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-emerald-300 text-[11px]">ADMIN</span>
                <span className="text-[10px] text-emerald-400/90 font-mono">thakrethe@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 bg-[#122543] hover:bg-[#183159] border border-[#1e3b68] rounded-md text-slate-200 transition"
              title="System Alerts & Escalations"
            >
              <Bell className="w-4 h-4 text-slate-200" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div
                className="absolute right-0 mt-1 w-80 bg-[#0b192e] border border-[#1e3b68] rounded-lg shadow-2xl py-2 z-50"
                onMouseLeave={() => setShowNotifMenu(false)}
              >
                <div className="px-3 py-1.5 border-b border-[#1e3b68] flex items-center justify-between">
                  <span className="text-xs font-bold text-white">System Alerts & Logs</span>
                  {unreadNotifsCount > 0 && (
                    <button
                      onClick={markAllNotifsAsRead}
                      className="text-[10px] text-sky-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#152a4a]">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">No alerts</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotifAsRead(n.id)}
                        className={`p-3 text-left hover:bg-[#122543] transition cursor-pointer ${
                          !n.read ? 'bg-[#122543]/60' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
