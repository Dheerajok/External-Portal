'use client';

import React from 'react';
import { usePortal } from '@/context/PortalContext';
import { Shield, Lock, Radio, ExternalLink, ArrowUpRight, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { citizenPortalUrl } = usePortal();

  return (
    <footer className="bg-[#061121] border-t border-[#1c355e] text-slate-400 py-8 px-6 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🏛️</span>
            <span className="font-bold text-white text-sm">ECO-SMART Authority & Partner Portal</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            The national-scale execution, collaboration, and environmental intelligence operating layer connecting citizens, local bodies, recyclers, and regulatory agencies.
          </p>
          <div className="flex items-center space-x-2 text-emerald-400 text-[11px] pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>National Telemetry Grid: Operational</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2.5">Stakeholder Access</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li><a href="#" className="hover:text-white transition">Government Authorities & CPCB</a></li>
            <li><a href="#" className="hover:text-white transition">Municipal Corporations & ULBs</a></li>
            <li><a href="#" className="hover:text-white transition">Authorized Recyclers & SEZ Units</a></li>
            <li><a href="#" className="hover:text-white transition">Environmental NGOs & Communities</a></li>
            <li><a href="#" className="hover:text-white transition">CSR & Corporate ESG Foundations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2.5">Data & Standards</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li><a href="#" className="hover:text-white transition">Central Pollution Control Protocols</a></li>
            <li><a href="#" className="hover:text-white transition">Solid Waste Management (SWM 2016)</a></li>
            <li><a href="#" className="hover:text-white transition">E-Waste Management Rules (2022)</a></li>
            <li><a href="#" className="hover:text-white transition">Extended Producer Responsibility (EPR)</a></li>
            <li><a href="#" className="hover:text-white transition">Open Telemetry & Sensor API Specs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2.5">Citizen Ecosystem</h4>
          <p className="text-slate-400 text-xs mb-3 leading-relaxed">
            Looking for public reports, rewards redemption, community leaderboards, or personal carbon tracking?
          </p>
          <a
            href={citizenPortalUrl}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-700/80 hover:bg-blue-600 text-white rounded text-xs font-semibold transition"
          >
            <span>Open Citizen ECO-SMART</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#122543] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div className="flex items-center space-x-3">
          <span>© 2026 ECO-SMART Environmental Infrastructure Network</span>
          <span>•</span>
          <span>Security & Data Sovereignty Compliant</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center space-x-1 text-slate-400">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Gov Cryptographic TLS</span>
          </span>
          <span className="inline-flex items-center space-x-1 text-slate-400">
            <Lock className="w-3 h-3 text-sky-400" />
            <span>Zero-Trust RBAC</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
