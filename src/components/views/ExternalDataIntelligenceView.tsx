'use client';

import React, { useState } from 'react';
import { REGIONAL_ENVIRONMENTAL_INDICATORS } from '@/data/mockData';
import {
  BarChart3,
  Search,
  Filter,
  ShieldCheck,
  Globe2,
  TrendingUp,
  Download,
  Info
} from 'lucide-react';

export const ExternalDataIntelligenceView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const filteredIndicators = REGIONAL_ENVIRONMENTAL_INDICATORS.filter(item => {
    const matchesSearch =
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'all' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              National Environmental Indicators & Census Data
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated cross-jurisdiction telemetry from Central Pollution Control Board (CPCB), Swachh Bharat Urban Missions, and open satellite observations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert('Exporting full national environmental indicator matrix to CSV...')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export National Matrix</span>
          </button>
        </div>
      </div>

      {/* Data Provenance Trust Banners */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-2.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></span>
          <div>
            <span className="font-bold text-slate-900 block">Verified Data</span>
            <span className="text-[11px] text-slate-500">CPCB & SWM Portals</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-2.5">
          <span className="w-3 h-3 rounded-full bg-sky-500 flex-shrink-0"></span>
          <div>
            <span className="font-bold text-slate-900 block">Partner Data</span>
            <span className="text-[11px] text-slate-500">Recyclers & Labs</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-2.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></span>
          <div>
            <span className="font-bold text-slate-900 block">Open Satellites</span>
            <span className="text-[11px] text-slate-500">Copernicus / ISRO</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-2.5">
          <span className="w-3 h-3 rounded-full bg-indigo-500 flex-shrink-0"></span>
          <div>
            <span className="font-bold text-slate-900 block">Demo & Sandbox</span>
            <span className="text-[11px] text-slate-500">Simulated Streams</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search state, city, indicators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-xs"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="font-semibold text-slate-500">Filter State:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-1.5 bg-white text-slate-700 font-medium"
          >
            <option value="all">All States</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi-NCR">Delhi-NCR</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Telangana">Telangana</option>
          </select>
        </div>
      </div>

      {/* Indicators Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">City & State</th>
                <th className="p-3.5">Urban Population</th>
                <th className="p-3.5">Ambient AQI</th>
                <th className="p-3.5">Waste (Tons / Day)</th>
                <th className="p-3.5">Segregation %</th>
                <th className="p-3.5">Recycling Rate</th>
                <th className="p-3.5">Open Complaints</th>
                <th className="p-3.5">Risk Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIndicators.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">
                    <div>{row.city}</div>
                    <div className="text-[11px] font-normal text-slate-500">{row.state}</div>
                  </td>
                  <td className="p-3.5 text-slate-700">{row.population}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-sky-700">{row.aqi}</span>
                    <span className="text-[10px] text-slate-400 block">{row.aqiStatus}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">{row.wasteGeneratedTonsDay.toLocaleString()} t</td>
                  <td className="p-3.5 font-bold text-emerald-700">{row.segregationPercent}%</td>
                  <td className="p-3.5 font-semibold text-blue-700">{row.recyclingRate}%</td>
                  <td className="p-3.5 text-red-600 font-bold">{row.complaintsOpen}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      row.riskIndex === 'Critical'
                        ? 'bg-red-100 text-red-700'
                        : row.riskIndex === 'High'
                        ? 'bg-amber-100 text-amber-700'
                        : row.riskIndex === 'Moderate'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {row.riskIndex}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
