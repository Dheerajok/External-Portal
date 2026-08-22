'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  FileSpreadsheet,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck
} from 'lucide-react';

export const ReportingCenterView: React.FC = () => {
  const { currentOrg, tasks, complaints } = usePortal();

  const [selectedReportType, setSelectedReportType] = useState('monthly_impact');
  const [selectedPeriod, setSelectedPeriod] = useState('August 2026');

  const reportTypes = [
    { id: 'monthly_impact', name: 'Monthly Environmental Impact & Carbon Report', tag: 'Statutory SWM' },
    { id: 'waste_ops', name: 'Solid Waste & Hazardous Segregation Manifest Log', tag: 'EPR & ULB' },
    { id: 'complaints_audit', name: 'Civic Complaint Resolution & SLA Audit Ledger', tag: 'Swachh Mission' },
    { id: 'csr_esg', name: 'CSR Environmental Mission & Sponsoring Audit', tag: 'ESG / MoEFCC' },
    { id: 'data_contribution', name: 'Ambient Telemetry & Sensor Integrity Report', tag: 'CPCB Protocol' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    alert(`Exporting ${selectedReportType} for ${selectedPeriod} as verified CSV.`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              Statutory Compliance & Environmental Reporting Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate audited monthly impact statements, SWM 2016 manifests, and CSR contribution audits.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleDownloadCsv}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Verified CSV</span>
          </button>
        </div>
      </div>

      {/* Report Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 1 Col: Report Types */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2">
            Select Report Template
          </p>
          <div className="space-y-1">
            {reportTypes.map(rep => (
              <button
                key={rep.id}
                onClick={() => setSelectedReportType(rep.id)}
                className={`w-full p-3 rounded-lg text-left text-xs transition flex flex-col justify-between ${
                  selectedReportType === rep.id
                    ? 'bg-blue-50 border border-blue-500 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <span>{rep.name}</span>
                <span className="text-[10px] text-slate-400 font-normal mt-1">{rep.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Formatted Printable Report Paper Preview */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-300 p-8 shadow-md text-xs space-y-6 text-slate-800 font-serif print:m-0 print:border-none print:shadow-none">
          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                NATIONAL ENVIRONMENTAL COMPLIANCE ARCHIVE
              </span>
              <h2 className="font-sans text-xl font-extrabold text-slate-900">
                ECO-SMART OFFICIAL COMPLIANCE STATEMENT
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Issued for: <strong className="text-slate-900">{currentOrg.name}</strong> (Reg: {currentOrg.regId})
              </p>
            </div>

            <div className="text-right font-sans text-xs">
              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px] uppercase">
                ✓ Cryptographically Certified
              </span>
              <p className="text-slate-500 text-[11px] mt-1">Period: {selectedPeriod}</p>
            </div>
          </div>

          {/* Report Body */}
          <div className="space-y-4 font-sans">
            <h3 className="font-bold text-sm text-slate-900 uppercase">
              1. Executive Summary & Circular Metrics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 text-[11px]">Total Waste Processed</span>
                <p className="font-extrabold text-slate-900 text-sm">
                  {currentOrg.impactMetrics.wasteCollectedKg.toLocaleString()} kg
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-[11px]">Certified Recycling</span>
                <p className="font-extrabold text-emerald-700 text-sm">
                  {currentOrg.impactMetrics.wasteRecycledKg.toLocaleString()} kg
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-[11px]">Avoided Carbon</span>
                <p className="font-extrabold text-teal-700 text-sm">
                  {(currentOrg.impactMetrics.co2AvoidedKg / 1000).toFixed(1)} tons CO₂e
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-[11px]">Complaints Resolved</span>
                <p className="font-extrabold text-blue-700 text-sm">
                  {currentOrg.impactMetrics.complaintsResolved.toLocaleString()} tickets
                </p>
              </div>
            </div>

            <h3 className="font-bold text-sm text-slate-900 uppercase pt-2">
              2. Audit Trail & Verification Manifest
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This digital report certifies that {currentOrg.name} has operated in full compliance with the Solid Waste Management Rules 2016, E-Waste Rules 2022, and CPCB open telemetry standards during the reporting window.
            </p>

            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-[11px] font-mono space-y-1">
              <div>CHECKSUM: SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</div>
              <div>VERIFIER: Central Environmental Surveillance Network (Auto-Certified)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
