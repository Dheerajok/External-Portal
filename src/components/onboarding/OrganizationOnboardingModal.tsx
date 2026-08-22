'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import { OrgCategory } from '@/types';
import {
  X,
  CheckCircle2,
  Building2,
  ShieldCheck,
  MapPin,
  User,
  Sliders,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Key,
  Download,
  AlertCircle
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export const OrganizationOnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  initialType
}) => {
  const { registerOrganization } = usePortal();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [category, setCategory] = useState<OrgCategory>((initialType as OrgCategory) || 'ngo');
  const [orgName, setOrgName] = useState('');
  const [regId, setRegId] = useState('');
  const [state, setState] = useState('Madhya Pradesh');
  const [district, setDistrict] = useState('Indore');
  const [city, setCity] = useState('Indore');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  // Rep State
  const [repName, setRepName] = useState('');
  const [repDesignation, setRepDesignation] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [repContact, setRepContact] = useState('');

  // Operations Area
  const [selectedStates, setSelectedStates] = useState<string[]>(['Madhya Pradesh']);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(['Indore']);
  const [selectedCities, setSelectedCities] = useState<string[]>(['Indore']);
  const [selectedZones, setSelectedZones] = useState<string[]>(['Zone 1 (Rajwada)', 'Zone 3 (Vijay Nagar)']);

  // Capabilities
  const allCapabilities = [
    'Waste Collection',
    'Waste Processing',
    'Recycling',
    'E-Waste',
    'Food Waste',
    'Plastic Waste',
    'Complaint Resolution',
    'Environmental Monitoring',
    'Research',
    'CSR',
    'Education',
    'Logistics',
    'Rewards',
    'Data Contribution'
  ];
  const [capabilities, setCapabilities] = useState<string[]>([
    'Waste Collection',
    'Plastic Waste',
    'Complaint Resolution',
    'Data Contribution'
  ]);

  const [generatedKey, setGeneratedKey] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const orgTypes: { key: OrgCategory; label: string; icon: string; desc: string }[] = [
    { key: 'government', label: 'Government Authority', icon: '🏛️', desc: 'Central & State pollution boards, environmental ministries' },
    { key: 'municipality', label: 'Municipality / Local Body', icon: '🏙️', desc: 'City corporations, nagar palikas, cantonment boards' },
    { key: 'waste_management', label: 'Waste Management Organization', icon: '♻️', desc: 'Integrated waste processing, biomethanation & RDF operators' },
    { key: 'ngo', label: 'NGO / Environmental Organization', icon: '🌱', desc: 'Grassroots cleanups, conservation groups, civic societies' },
    { key: 'recycler', label: 'Recycling Organization', icon: '🏭', desc: 'Plastic, metal, battery, e-waste processing facilities' },
    { key: 'corporate_csr', label: 'Corporate / CSR Partner', icon: '🏢', desc: 'ESG funds, corporate green foundations, sustainability teams' },
    { key: 'educational', label: 'Educational Institution', icon: '🏫', desc: 'Universities, colleges, student eco-clubs' },
    { key: 'research', label: 'Research Organization', icon: '🔬', desc: 'Environmental laboratories, scientific sensor networks' },
    { key: 'sustainability', label: 'Sustainability Organization', icon: '🌍', desc: 'Carbon offset auditors, circular economy accelerators' },
    { key: 'logistics', label: 'Collection / Logistics Partner', icon: '🚛', desc: 'Sanitation vehicle fleets, GPS transfer carriers' },
    { key: 'reward_partner', label: 'Reward / Business Partner', icon: '🏪', desc: 'Green merchants, eco-vouchers, sustainable retail' },
    { key: 'community', label: 'Community Organization', icon: '👥', desc: 'Resident welfare associations, youth volunteer brigades' },
    { key: 'other', label: 'Other Authorized Organization', icon: '🔗', desc: 'Audited environmental contractors and service providers' }
  ];

  const handleToggleCapability = (cap: string) => {
    if (capabilities.includes(cap)) {
      setCapabilities(capabilities.filter(c => c !== cap));
    } else {
      setCapabilities([...capabilities, cap]);
    }
  };

  const handleFinish = () => {
    const activeTypeObj = orgTypes.find(t => t.key === category);
    const newOrg = registerOrganization({
      name: orgName || 'Registered Environmental Partner',
      category,
      categoryLabel: activeTypeObj?.label || 'Environmental Partner',
      icon: activeTypeObj?.icon || '🌱',
      regId: regId || `REG-IND-${Math.floor(1000 + Math.random() * 9000)}`,
      state,
      district,
      city,
      address: address || 'Smart City Sector',
      website: website || 'https://eco-smart.gov.in',
      officialEmail: officialEmail || 'info@partner.org',
      contactNumber: contactNumber || '+91 99999 00000',
      representative: {
        name: repName || 'Authorized Officer',
        designation: repDesignation || 'Program Lead',
        email: repEmail || officialEmail || 'lead@partner.org',
        contact: repContact || contactNumber || '+91 99999 11111'
      },
      operationalAreas: {
        states: selectedStates,
        districts: selectedDistricts,
        cities: selectedCities,
        municipalZones: selectedZones
      },
      capabilities
    });

    const mockApiKey = `eco_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedKey(mockApiKey);
    setIsCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-800">
        {/* Modal Header */}
        <div className="bg-[#0b192e] text-white px-6 py-4 flex items-center justify-between border-b border-[#1c355e]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🏛️</span>
              <h2 className="font-bold text-lg text-white">Organization Registration & Verification</h2>
            </div>
            <p className="text-xs text-slate-300">
              Join the ECO-SMART National Environmental Coordination Infrastructure
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold text-slate-500">
            <span className={currentStep >= 1 ? 'text-blue-600 font-bold' : ''}>1. Organization Type</span>
            <span>→</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-bold' : ''}>2. Details</span>
            <span>→</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-bold' : ''}>3. Representative</span>
            <span>→</span>
            <span className={currentStep >= 4 ? 'text-blue-600 font-bold' : ''}>4. Operations</span>
            <span>→</span>
            <span className={currentStep >= 5 ? 'text-blue-600 font-bold' : ''}>5. Capabilities</span>
            <span>→</span>
            <span className={currentStep >= 6 ? 'text-blue-600 font-bold' : ''}>6. Verification</span>
          </div>
        </div>

        {/* Step Contents */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* STEP 1: ORGANIZATION TYPE */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Step 1: Select Your Organization Category</h3>
                <p className="text-xs text-slate-500">
                  Select the entity category under which your organization operates within the environmental ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {orgTypes.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setCategory(t.key)}
                    className={`p-3.5 rounded-lg border text-left transition flex flex-col justify-between ${
                      category === t.key
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{t.icon}</span>
                      {category === t.key && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{t.label}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: ORGANIZATION DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Step 2: Organization Official Details</h3>
                <p className="text-xs text-slate-500">
                  Provide verified statutory registration information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organization Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Central India Clean Foundation"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Statutory Registration / CIN / Darpan ID *</label>
                  <input
                    type="text"
                    placeholder="e.g. MP-NGO-2024-8841 or CIN-U37200..."
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Website</label>
                  <input
                    type="url"
                    placeholder="https://example.org"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Organization Email *</label>
                  <input
                    type="email"
                    placeholder="contact@example.org"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Registered City & State</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City (e.g. Indore)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Headquarters / Physical Office Address</label>
                  <input
                    type="text"
                    placeholder="Full street address, building number, pin code"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: AUTHORIZED REPRESENTATIVE */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Step 3: Authorized Representative</h3>
                <p className="text-xs text-slate-500">
                  Enter the details of the designated nodal officer or executive representative responsible for ECO-SMART operations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Representative Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Verma"
                    value={repName}
                    onChange={(e) => setRepName(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation / Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Director of Operations / Zonal Secretary"
                    value={repDesignation}
                    onChange={(e) => setRepDesignation(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Representative Email *</label>
                  <input
                    type="email"
                    placeholder="r.verma@example.org"
                    value={repEmail}
                    onChange={(e) => setRepEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Mobile / Emergency Line *</label>
                  <input
                    type="tel"
                    placeholder="+91 98260 XXXXX"
                    value={repContact}
                    onChange={(e) => setRepContact(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>
                  ECO-SMART uses end-to-end cryptographic verification. Digital OTP challenge and authorization credentials will be issued to this representative.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: AREAS OF OPERATION */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Step 4: Operational Jurisdictions & Coverage</h3>
                <p className="text-xs text-slate-500">
                  Select the geographical regions where your organization can receive and execute tasks.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Active States</label>
                  <div className="flex flex-wrap gap-2">
                    {['Madhya Pradesh', 'Maharashtra', 'Delhi-NCR', 'Gujarat', 'Karnataka', 'All India'].map(s => (
                      <button
                        key={s}
                        onClick={() => {
                          if (selectedStates.includes(s)) {
                            setSelectedStates(selectedStates.filter(item => item !== s));
                          } else {
                            setSelectedStates([...selectedStates, s]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-md border text-xs font-medium transition ${
                          selectedStates.includes(s)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Municipal Zones / Wards</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Zone 1 (Rajwada Central)',
                      'Zone 3 (Vijay Nagar Commercial)',
                      'Zone 5 (Palasia East)',
                      'Zone 7 (Rau / Silicon City)',
                      'Zone 9 (Bhanwarkuan / Tech Park)',
                      'Zone 12 (Pithampur SEZ Sector)'
                    ].map(z => (
                      <button
                        key={z}
                        onClick={() => {
                          if (selectedZones.includes(z)) {
                            setSelectedZones(selectedZones.filter(item => item !== z));
                          } else {
                            setSelectedZones([...selectedZones, z]);
                          }
                        }}
                        className={`p-2 rounded border text-left text-xs font-medium transition ${
                          selectedZones.includes(z)
                            ? 'bg-blue-50 border-blue-500 text-blue-800'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        ✓ {z}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CAPABILITIES */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Step 5: Organization Capabilities</h3>
                <p className="text-xs text-slate-500">
                  Check all capabilities that your organization provides. ECO-SMART AI uses these to match citizen complaints and tasks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {allCapabilities.map(cap => {
                  const isChecked = capabilities.includes(cap);
                  return (
                    <button
                      key={cap}
                      onClick={() => handleToggleCapability(cap)}
                      className={`p-3 rounded-lg border text-left text-xs font-semibold flex items-center justify-between transition ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/70 text-blue-950'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cap}</span>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: VERIFICATION & COMPLETION */}
          {currentStep === 6 && (
            <div className="space-y-4 text-center py-4">
              {!isCompleted ? (
                <div className="space-y-4 max-w-lg mx-auto">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Ready to Activate Verification</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Click below to verify entity credentials against the national environmental registry and generate your secure API token.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Organization:</span>
                      <span className="font-bold text-slate-900">{orgName || 'New Environmental Partner'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Category:</span>
                      <span className="font-semibold text-blue-600">{category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Representative:</span>
                      <span className="text-slate-700">{repName || 'Official'} ({repDesignation || 'Lead'})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Capabilities Selected:</span>
                      <span className="text-slate-700">{capabilities.length} capabilities</span>
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow-md transition"
                  >
                    Activate & Issue Official Verification Badge ✓
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-w-lg mx-auto animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase mb-2">
                      ✓ Verified Organization
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Welcome to ECO-SMART Ecosystem!
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Your organization profile is now active on the national grid. You can now accept tasks, participate in collaborations, and submit environmental telemetry.
                    </p>
                  </div>

                  {/* API Key Box */}
                  <div className="bg-[#0b192e] text-white p-3.5 rounded-lg text-left text-xs font-mono border border-[#1e3b68]">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                      <span>API SANDBOX CREDENTIALS</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                    <p className="text-sky-300 break-all select-all">{generatedKey}</p>
                  </div>

                  <div className="pt-2 flex items-center space-x-3 justify-center">
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs shadow transition"
                    >
                      Enter Organization Workspace →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        {currentStep < 6 && (
          <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
              className="px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center space-x-1 shadow-sm"
            >
              <span>{currentStep === 5 ? 'Proceed to Verification' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
