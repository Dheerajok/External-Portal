'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import {
  Code2,
  Key,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  RefreshCw,
  Copy,
  Terminal,
  ExternalLink
} from 'lucide-react';

export const ApiIntegrationHubView: React.FC = () => {
  const { currentOrg } = usePortal();
  const [apiKey, setApiKey] = useState('eco_live_sec_7894a4c219808ef29');
  const [webhookUrl, setWebhookUrl] = useState('https://fleet.imcindore.gov.in/api/v1/ecosmart-webhook');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    const newKey = `eco_live_sec_${Math.random().toString(36).substring(2, 12)}_${Math.random().toString(36).substring(2, 10)}`;
    setApiKey(newKey);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Code2 className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              Developer APIs, Webhooks & Telemetry Integration Hub
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Connect external ERPs, IoT weight scales, SCADA systems, and fleet dispatch software via high-throughput REST endpoints.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>API Gateway 99.99% Uptime</span>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Credentials & Endpoints */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Production REST API Key</h3>
              <button
                onClick={handleRegenerate}
                className="text-[11px] text-blue-600 hover:underline flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate Key</span>
              </button>
            </div>

            <div className="space-y-1.5 font-mono">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-mono text-xs select-all"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-sans font-bold flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-sans">
                Scoped to: <strong>{currentOrg.name}</strong> • Rate limit: 1,000 req/min
              </p>
            </div>

            {/* Webhooks config */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">Real-Time Webhook Dispatch Endpoint</h4>
              <p className="text-slate-500 text-[11px]">
                Receive HTTP POST callbacks whenever a new citizen complaint is assigned to your ward.
              </p>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 font-mono text-xs"
              />
            </div>
          </div>

          {/* Quick Code Examples */}
          <div className="bg-[#0b192e] rounded-xl border border-[#1c355e] p-6 shadow-md text-white text-xs space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-[#152a4a] pb-2 text-slate-400">
              <span className="font-bold text-sky-400">cURL Task Proof Ingestion</span>
              <span>Bash</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed select-all">
{`curl -X POST https://api.eco-smart.gov.in/v2/tasks/TSK-2026-8812/proof \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "net_weight_kg": 340,
    "photo_proof_url": "https://img.eco-smart.gov.in/proof_8812.jpg",
    "verified_coordinates": [22.7238, 75.8824],
    "notes": "Devguradia Bio-Methanation intake complete."
  }'`}
            </pre>
          </div>
        </div>

        {/* Right 1 Col: Status & Rate Limits */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900">API Health & Rate Quotas</h3>

            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">API Ingest Status:</span>
                <span className="font-bold text-emerald-700">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Avg Ingestion Latency:</span>
                <span className="font-bold text-slate-900">32 ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">24h Requests:</span>
                <span className="font-bold text-blue-700">148,920</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Error Rate:</span>
                <span className="font-bold text-slate-900">0.002%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
