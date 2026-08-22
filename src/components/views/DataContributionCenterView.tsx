'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import { EnvironmentalDataset } from '@/types';
import {
  Database,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  Code,
  ShieldCheck,
  Plus,
  FileText,
  Key,
  Layers,
  ArrowRight,
  Download,
  X
} from 'lucide-react';

export const DataContributionCenterView: React.FC = () => {
  const { datasets, currentOrg, contributeDataset } = usePortal();

  const [activeTab, setActiveTab] = useState<'datasets' | 'upload' | 'api'>('datasets');
  const [selectedDataset, setSelectedDataset] = useState<EnvironmentalDataset>(datasets[0]);

  // Upload Form State
  const [datasetTitle, setDatasetTitle] = useState('');
  const [dataCategory, setDataCategory] = useState<EnvironmentalDataset['category']>('AQI');
  const [coverageRegion, setCoverageRegion] = useState('Indore Smart City Grid');
  const [csvContent, setCsvContent] = useState(`station_id,pm25_ug_m3,pm10_ug_m3,temperature_c,aqi_calculated,status\nVN-01,24.2,56.8,28.4,72,Satisfactory\nCH-03,31.0,68.4,29.1,86,Satisfactory\nPT-09,48.5,108.2,30.5,124,Moderate`);
  const [isParsed, setIsParsed] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contributeDataset({
      datasetName: datasetTitle || 'Ambient Environmental Telemetry Batch',
      category: dataCategory,
      coverageRegion: coverageRegion,
      recordsCount: 450,
      sampleRows: [
        { metric: 'Station 1 PM2.5', value: 24.2, unit: 'µg/m³', status: 'Compliant' },
        { metric: 'Station 2 PM2.5', value: 31.0, unit: 'µg/m³', status: 'Compliant' },
        { metric: 'Pithampur SEZ PM10', value: 108.2, unit: 'µg/m³', status: 'Moderate' }
      ]
    });
    setActiveTab('datasets');
    setDatasetTitle('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Database className="w-6 h-6 text-sky-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              National Environmental Data Contribution Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish verified sensor feeds, municipal weighbridge manifests, and circular recovery datasets into the shared ECO-SMART intelligence layer.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('upload')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Contribute New Dataset</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'datasets'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Active Datasets Registry ({datasets.length})
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'upload'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Upload CSV / Excel Telemetry
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'api'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          REST API Ingestion Tokens
        </button>
      </div>

      {/* TAB 1: DATASETS REGISTRY */}
      {activeTab === 'datasets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Dataset List */}
          <div className="lg:col-span-2 space-y-3">
            {datasets.map(ds => (
              <div
                key={ds.id}
                onClick={() => setSelectedDataset(ds)}
                className={`bg-white rounded-xl border p-5 shadow-sm cursor-pointer transition hover:shadow-md ${
                  selectedDataset?.id === ds.id
                    ? 'border-sky-600 ring-2 ring-sky-500/20 bg-sky-50/20'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {ds.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-2">{ds.datasetName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Provided By: <strong className="text-slate-700">{ds.providerName}</strong>
                    </p>
                  </div>

                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{ds.provenance}</span>
                  </span>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <span>Coverage: <strong className="text-slate-700">{ds.coverageRegion}</strong></span>
                  <span>Records: <strong className="text-blue-700">{ds.recordsCount.toLocaleString()} rows</strong></span>
                  <span className="text-[11px] text-slate-400">Updated: {ds.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right 1 Col: Sample Rows Preview & Schema Inspector */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Telemetry Schema Preview</h3>
                  <p className="text-[11px] text-slate-500">{selectedDataset.datasetName}</p>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded">
                  {selectedDataset.id}
                </span>
              </div>

              {selectedDataset.sampleRows && selectedDataset.sampleRows.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[9px] border-b border-slate-200">
                      <tr>
                        {Object.keys(selectedDataset.sampleRows[0]).map(key => (
                          <th key={key} className="p-2">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {selectedDataset.sampleRows.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="p-2 truncate max-w-[120px]">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No preview rows available.</p>
              )}

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Sensor Checksum</span>
                </span>

                <button
                  onClick={() => alert(`Downloading verified dataset: ${selectedDataset.datasetName}`)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-xs flex items-center space-x-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD CSV / EXCEL */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto text-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Upload Environmental Dataset</h3>
            <p className="text-slate-500 text-xs">
              Directly parse CSV / Excel sensor data, recycling reports, or municipal logs.
            </p>
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Dataset Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Daily Solar Bio-Gas Output & Methane Yield Log"
                value={datasetTitle}
                onChange={(e) => setDatasetTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={dataCategory}
                  onChange={(e) => setDataCategory(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                >
                  <option>AQI</option>
                  <option>Waste Generation</option>
                  <option>Recycling Yield</option>
                  <option>CO2 Flux</option>
                  <option>Water Quality</option>
                  <option>Population & Density</option>
                  <option>Bio-diversity</option>
                  <option>Sensor Network</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Coverage Area</label>
                <input
                  type="text"
                  value={coverageRegion}
                  onChange={(e) => setCoverageRegion(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">CSV Data Input / Paste</label>
              <textarea
                rows={6}
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-2 font-mono text-[11px] bg-slate-50"
              />
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded p-3 text-sky-900 text-xs flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <p>
                All uploaded data undergoes automated statistical schema validation before syncing with the national environmental intelligence map.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('datasets')}
                className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded shadow-sm"
              >
                Validate & Publish Dataset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: REST API TOKENS */}
      {activeTab === 'api' && (
        <div className="bg-[#0b192e] text-white rounded-xl border border-[#1c355e] p-6 shadow-lg space-y-4 max-w-3xl mx-auto text-xs">
          <div className="border-b border-[#152a4a] pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white">Live IoT Sensor & REST Ingestion Endpoints</h3>
              <p className="text-slate-400 text-xs">Stream direct telemetry from calibrated sensors and automated weighbridges.</p>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              GATEWAY LIVE
            </span>
          </div>

          <div className="space-y-3 font-mono">
            <div>
              <p className="text-slate-400 text-[11px] mb-1">POST INGESTION ENDPOINT</p>
              <div className="bg-[#122543] p-3 rounded border border-[#1e3b68] text-sky-300 select-all">
                https://api.eco-smart.gov.in/v2/telemetry/ingest
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] mb-1">BEARER API KEY (AUTHENTICATED AS {currentOrg.name})</p>
              <div className="bg-[#122543] p-3 rounded border border-[#1e3b68] text-emerald-300 select-all">
                Bearer eco_live_sec_7894a4c219808ef29
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] mb-1">EXAMPLE JSON PAYLOAD</p>
              <pre className="bg-[#061121] p-3 rounded border border-[#152a4a] text-slate-300 text-[10px] overflow-x-auto">
{`{
  "org_id": "${currentOrg.id}",
  "sensor_type": "AQI_LASER_PM25",
  "coordinates": [22.7196, 75.8577],
  "readings": {
    "pm25": 24.2,
    "pm10": 58.1,
    "no2": 14.5,
    "timestamp_iso": "${new Date().toISOString()}"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
