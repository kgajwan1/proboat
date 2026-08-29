import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  Sparkles, 
  Check, 
  Mail, 
  Globe, 
  MapPin,
  Save
} from 'lucide-react';
import { PROFILE_AVATARS } from '../../data/initialData';

interface ProfileSettingsScreenProps {
  onOpenUpgradeModal: () => void;
  onSaveProfile: () => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  onOpenUpgradeModal,
  onSaveProfile,
}) => {
  const [businessName, setBusinessName] = useState('My Business Ltd.');
  const [taxId, setTaxId] = useState('EIN: 84-2918402');
  const [email, setEmail] = useState('finance@mybusiness.com');
  const [currency, setCurrency] = useState('USD ($)');
  const [fiscalYear, setFiscalYear] = useState('January - December (Calendar)');
  const [autoSync, setAutoSync] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
              Legal Entity &amp; Configuration
            </span>
            <span className="text-xs text-slate-400 font-medium">SOC-2 Type II Secure</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Company Profile &amp; Settings
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Manage your corporate entity details, subscription tier, and automated compliance policies.
          </p>
        </div>

        <button
          onClick={onSaveProfile}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-xs font-bold transition-colors shadow-md shadow-indigo-100 self-start sm:self-auto cursor-pointer"
        >
          <Save size={15} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Profile & Entity Settings */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                <Building2 size={16} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Business Entity Details
              </h2>
            </div>

            <div className="space-y-5 text-xs">
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  <img src={PROFILE_AVATARS.default} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Company Administrator</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Alex Morgan &bull; alex@mybusiness.com</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                    Verified Signatory
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Legal Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Federal Tax ID (EIN)</label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Billing Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Operating Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                  >
                    <option value="USD ($)">USD ($) - United States Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                <Bell size={16} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Automated Alerts &amp; Compliance Sync
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Critical Low Stock Alerts</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Immediate notifications when items fall below inventory reorder threshold</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Automatic Tax Form Filing (Form 941 / FUTA)</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Pre-fill quarterly payroll return summaries with direct state submission</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={autoSync} 
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right 4 cols: Subscription Tier */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-7 border border-slate-800 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">Current Plan</span>
                <h3 className="text-2xl font-bold text-white mt-1">Growth Tier</h3>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                Active
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5 font-medium">
              You are currently on the Growth Tier plan ($79/mo billed annually). Unlimited inventory SKUs, up to 25 team payroll members, and automated invoice reminders.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200 mb-6 font-medium">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" /> Real-time Warehouse Barcode Sync
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" /> Direct Deposit Payroll Integration
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" /> Federal &amp; State Tax Compliance
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" /> 5 Team Member Admin Seats
              </li>
            </ul>

            <button
              onClick={onOpenUpgradeModal}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Upgrade to Enterprise Tier</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <h4 className="font-bold text-xs text-slate-900">
                Data Security &amp; Encryption
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              FinGage uses 256-bit bank-grade encryption for all payroll and accounts data. SOC-2 Type II Certified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
