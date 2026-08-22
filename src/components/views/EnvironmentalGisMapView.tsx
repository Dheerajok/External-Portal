'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  Globe2,
  Layers,
  MapPin,
  Flame,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Building,
  Activity,
  Wind,
  Trash2,
  Factory
} from 'lucide-react';

export const EnvironmentalGisMapView: React.FC = () => {
  const { organizations, complaints, tasks } = usePortal();

  const [activeLayers, setActiveLayers] = useState<{
    aqi: boolean;
    waste: boolean;
    complaints: boolean;
    organizations: boolean;
    hotspots: boolean;
  }>({
    aqi: true,
    waste: true,
    complaints: true,
    organizations: true,
    hotspots: true
  });

  const [selectedZone, setSelectedZone] = useState<{
    name: string;
    ward: string;
    aqi: number;
    wasteDensityKgDay: number;
    segregationRate: string;
    complaintsOpen: number;
    riskLevel: 'Low' | 'Moderate' | 'Critical';
    activeCollector: string;
  }>({
    name: 'Zone 3 (Vijay Nagar Commercial Core)',
    ward: 'Wards 18, 19, 20, 21',
    aqi: 82,
    wasteDensityKgDay: 48000,
    segregationRate: '99.2%',
    complaintsOpen: 3,
    riskLevel: 'Moderate',
    activeCollector: 'Indore Municipal Corp Squad 04'
  });

  const zonesList = [
    { name: 'Zone 1 (Rajwada Historic City)', ward: 'Wards 01-08', aqi: 74, wasteDensityKgDay: 32000, segregationRate: '98.8%', complaintsOpen: 2, riskLevel: 'Low' as const, activeCollector: 'IMC Rapid Unit 01' },
    { name: 'Zone 3 (Vijay Nagar Commercial)', ward: 'Wards 18-21', aqi: 82, wasteDensityKgDay: 48000, segregationRate: '99.2%', complaintsOpen: 3, riskLevel: 'Moderate' as const, activeCollector: 'IMC Squad 04' },
    { name: 'Zone 5 (Palasia & Old City)', ward: 'Wards 22-29', aqi: 78, wasteDensityKgDay: 36000, segregationRate: '99.0%', complaintsOpen: 1, riskLevel: 'Low' as const, activeCollector: 'Prakriti Mitra + IMC' },
    { name: 'Zone 7 (Rau / Silicon City)', ward: 'Wards 30-36', aqi: 68, wasteDensityKgDay: 24000, segregationRate: '97.5%', complaintsOpen: 4, riskLevel: 'Moderate' as const, activeCollector: 'CleanRoute Logistics' },
    { name: 'Zone 9 (Bhanwarkuan / IT Park)', ward: 'Wards 44-50', aqi: 89, wasteDensityKgDay: 41000, segregationRate: '98.1%', complaintsOpen: 2, riskLevel: 'Low' as const, activeCollector: 'Bharat Recyclers Fleet' },
    { name: 'Pithampur Industrial Corridor', ward: 'SEZ Sector 1-4', aqi: 128, wasteDensityKgDay: 95000, segregationRate: '96.2%', complaintsOpen: 6, riskLevel: 'Critical' as const, activeCollector: 'Industrial Hazardous Unit' }
  ];

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Globe2 className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              National Environmental GIS Multi-Layer Grid
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Synthesized geospatial dashboard combining real-time AQI sensors, municipal waste heatmaps, open complaints, and recovery centers.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Real-Time Sensor Satellites: 28 Online</span>
          </span>
        </div>
      </div>

      {/* Layer Toggle Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
          Geospatial Telemetry Layers:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toggleLayer('aqi')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeLayers.aqi ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>AQI Sensors</span>
          </button>

          <button
            onClick={() => toggleLayer('waste')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeLayers.waste ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Waste Density</span>
          </button>

          <button
            onClick={() => toggleLayer('complaints')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeLayers.complaints ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Complaints</span>
          </button>

          <button
            onClick={() => toggleLayer('organizations')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeLayers.organizations ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Partner Hubs</span>
          </button>

          <button
            onClick={() => toggleLayer('hotspots')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeLayers.hotspots ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>AI Risk Hotspots</span>
          </button>
        </div>
      </div>

      {/* Main Map & Zone Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High Fidelity Interactive Geospatial Visualizer */}
        <div className="lg:col-span-2 bg-[#0b192e] rounded-xl border border-[#1c355e] p-6 shadow-xl relative min-h-[480px] flex flex-col justify-between overflow-hidden text-white">
          <div className="absolute inset-0 gov-grid-pattern opacity-30 pointer-events-none"></div>

          {/* Top Map HUD Overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs border-b border-[#152a4a] pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono font-bold text-slate-200">CENTRAL MALWA GIS COORD: 22.7196° N, 75.8577° E</span>
            </div>
            <span className="font-mono text-sky-400 text-[11px]">ZOOM LEVEL 12.4 • WGS84</span>
          </div>

          {/* Interactive Zone Hotspots Overlay */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
            {zonesList.map(zone => (
              <div
                key={zone.name}
                onClick={() => setSelectedZone(zone)}
                className={`p-3.5 rounded-xl border cursor-pointer transition backdrop-blur-md ${
                  selectedZone.name === zone.name
                    ? 'border-sky-400 bg-sky-950/70 ring-2 ring-sky-400/30'
                    : 'border-[#1e3b68] bg-[#122543]/80 hover:bg-[#183159]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-bold text-xs text-white leading-tight">{zone.name.split('(')[0]}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                    zone.riskLevel === 'Critical'
                      ? 'bg-red-950 text-red-400 border border-red-800'
                      : zone.riskLevel === 'Moderate'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {zone.riskLevel}
                  </span>
                </div>

                <div className="mt-2.5 space-y-1 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">AQI:</span>
                    <span className="font-bold text-sky-300">{zone.aqi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Daily Waste:</span>
                    <span>{(zone.wasteDensityKgDay / 1000).toFixed(0)}t</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Segregation:</span>
                    <span className="text-emerald-400 font-semibold">{zone.segregationRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Legend Footer */}
          <div className="relative z-10 pt-3 border-t border-[#152a4a] flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Satisfactory (AQI &lt; 100)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Moderate Spill Risk</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span>Critical Incident Hotspot</span>
              </span>
            </div>
            <span className="text-slate-500 font-mono">CPCB / SWM Sentinel Synchronized</span>
          </div>
        </div>

        {/* Right 1 Col: Selected Zone Environmental Inspector */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Zone Telemetry Inspector
              </span>
              <h3 className="font-extrabold text-base text-slate-900 mt-2">
                {selectedZone.name}
              </h3>
              <p className="text-xs text-slate-500">{selectedZone.ward}</p>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Live Ambient AQI:</span>
                <span className="font-bold text-sm text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  {selectedZone.aqi} AQI
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Daily Waste Generated:</span>
                <span className="font-bold text-slate-900">{selectedZone.wasteDensityKgDay.toLocaleString()} kg / day</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Source Segregation Rate:</span>
                <span className="font-bold text-emerald-700">{selectedZone.segregationRate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Active Civic Complaints:</span>
                <span className="font-bold text-red-600">{selectedZone.complaintsOpen} tickets</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Municipal Fleet:</span>
                <span className="font-semibold text-slate-800">{selectedZone.activeCollector}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Overall Environmental Risk:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                  selectedZone.riskLevel === 'Critical'
                    ? 'bg-red-100 text-red-800'
                    : selectedZone.riskLevel === 'Moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {selectedZone.riskLevel}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert(`Detailed GIS Telemetry Export for ${selectedZone.name} downloaded.`)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow-sm"
              >
                Export Zonal Environmental Report →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
