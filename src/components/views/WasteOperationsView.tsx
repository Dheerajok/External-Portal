'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import { WasteOperationRecord } from '@/types';
import {
  Truck,
  Activity,
  Layers,
  Scale,
  Leaf,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  RefreshCw,
  Zap
} from 'lucide-react';

export const WasteOperationsView: React.FC = () => {
  const { wasteRecords, currentOrg } = usePortal();
  const [selectedRoute, setSelectedRoute] = useState<WasteOperationRecord>(wasteRecords[0]);

  // Aggregate stats
  const totalWeightKg = wasteRecords.reduce((acc, r) => acc + r.totalCollectedKg, 0);
  const totalCo2Kg = wasteRecords.reduce((acc, r) => acc + r.co2OffsetKg, 0);
  const totalOrganicKg = wasteRecords.reduce((acc, r) => acc + r.segregation.organicKg, 0);
  const totalPlasticKg = wasteRecords.reduce((acc, r) => acc + r.segregation.plasticKg, 0);
  const totalEWasteKg = wasteRecords.reduce((acc, r) => acc + r.segregation.eWasteKg, 0);
  const totalDryKg = wasteRecords.reduce((acc, r) => acc + r.segregation.dryRecyclableKg, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Truck className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Waste Operations & Circular Recovery Hub</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time fleet telemetry, segregation breakdown, bio-methanation transfer, and weighbridge audit tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Weighbridge Telemetry Connected</span>
          </span>
        </div>
      </div>

      {/* Top Recovery Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Total Collected</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {(totalWeightKg / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">t</span>
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">100% Segregated at Source</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Wet / Organic</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">
            {(totalOrganicKg / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">t</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1">→ Bio-CNG / Compost</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Dry Recyclable</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">
            {(totalDryKg / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">t</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1">→ MRF Sorting Line</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Plastic Recovery</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">
            {(totalPlasticKg / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">t</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1">→ Pyrolysis & Flakes</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase">E-Waste Salvaged</p>
          <p className="text-2xl font-extrabold text-purple-600 mt-1">
            {(totalEWasteKg / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">t</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1">→ Heavy Metals Extracted</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase">CO₂ Offset</p>
          <p className="text-2xl font-extrabold text-teal-600 mt-1">
            {(totalCo2Kg / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">t</span>
          </p>
          <p className="text-[10px] text-teal-600 font-semibold mt-1">Avoided Landfill Methane</p>
        </div>
      </div>

      {/* Main 2 Column Operational Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Routes & Weighbridge Records */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Active Collection & Transfer Routes</h3>
                <p className="text-xs text-slate-500">GPS tracked vehicles reporting to Devguradia & Industrial SEZ</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {wasteRecords.map(rec => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRoute(rec)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition space-y-3 ${
                    selectedRoute?.id === rec.id ? 'bg-blue-50/50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs text-slate-900">{rec.routeId}</span>
                        <span className="font-semibold text-slate-800 text-xs">{rec.routeName}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        🚛 Vehicle: <strong className="text-slate-700">{rec.vehicleNumber}</strong> • Driver: {rec.driverName}
                      </p>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      rec.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {rec.status}
                    </span>
                  </div>

                  {/* Segregation Visual Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Total Net Payload: <strong className="text-slate-800">{rec.totalCollectedKg} kg</strong></span>
                      <span>Target Facility: {rec.destinationFacility.split(' ')[0]}</span>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${(rec.segregation.organicKg / rec.totalCollectedKg) * 100}%` }}
                        className="bg-emerald-500 h-full"
                        title={`Organic: ${rec.segregation.organicKg}kg`}
                      ></div>
                      <div
                        style={{ width: `${(rec.segregation.dryRecyclableKg / rec.totalCollectedKg) * 100}%` }}
                        className="bg-blue-500 h-full"
                        title={`Dry: ${rec.segregation.dryRecyclableKg}kg`}
                      ></div>
                      <div
                        style={{ width: `${(rec.segregation.plasticKg / rec.totalCollectedKg) * 100}%` }}
                        className="bg-amber-500 h-full"
                        title={`Plastic: ${rec.segregation.plasticKg}kg`}
                      ></div>
                      <div
                        style={{ width: `${(rec.segregation.eWasteKg / rec.totalCollectedKg) * 100}%` }}
                        className="bg-purple-500 h-full"
                        title={`E-Waste: ${rec.segregation.eWasteKg}kg`}
                      ></div>
                    </div>

                    <div className="flex items-center space-x-3 text-[10px] text-slate-500 pt-1">
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Organic ({rec.segregation.organicKg}kg)</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>Dry ({rec.segregation.dryRecyclableKg}kg)</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>Plastic ({rec.segregation.plasticKg}kg)</span>
                      </span>
                      {rec.segregation.eWasteKg > 0 && (
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          <span>E-Waste ({rec.segregation.eWasteKg}kg)</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Selected Route Inspection & Facility Certificate */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Weighbridge Certificate</h3>
              <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                TICKET #WB-2026-981
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-bold text-slate-900">{selectedRoute.vehicleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Route:</span>
                <span className="font-semibold text-slate-800">{selectedRoute.routeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Zone Jurisdiction:</span>
                <span>{selectedRoute.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination Plant:</span>
                <span className="font-semibold text-emerald-700 text-right max-w-[180px]">
                  {selectedRoute.destinationFacility}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-sm">
                <span>Verified Net Weight:</span>
                <span className="text-blue-700">{selectedRoute.totalCollectedKg} kg</span>
              </div>
              <div className="flex justify-between text-xs text-teal-700">
                <span>Certified Carbon Offset:</span>
                <span className="font-bold">{selectedRoute.co2OffsetKg} kg CO₂</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Central SWM 2016 Compliant</span>
              </div>
              <p>
                Digital manifest encrypted and synchronized to National EPR & Municipal portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
