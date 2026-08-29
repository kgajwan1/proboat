import React from 'react';
import { X, Check, Sparkles, Zap, Shield, Building2 } from 'lucide-react';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
}

export const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="text-center max-w-md mx-auto mb-8">
          <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[11px] rounded-full uppercase tracking-wider inline-block mb-2">
            Pricing &amp; Scale
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Scale Your Business Tier
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1.5">
            Unlock advanced multi-warehouse inventory, unlimited team payroll, and automated tax advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan 1: Starter */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-bold text-base text-slate-900">Starter</h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">For solo operators &amp; contractors</p>
              <div className="my-4">
                <span className="text-3xl font-bold text-slate-900">$29</span>
                <span className="text-xs text-slate-400 font-medium">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 mb-6 font-medium">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Up to 500 SKUs</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 3 Payroll Employees</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Basic Invoicing</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('Starter')}
              className="w-full py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              Select Starter
            </button>
          </div>

          {/* Plan 2: Growth (Current) */}
          <div className="p-6 rounded-3xl border-2 border-indigo-600 bg-indigo-50/20 flex flex-col justify-between relative shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
              Current Plan
            </div>
            <div>
              <h3 className="font-bold text-base text-indigo-700">Growth Tier</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">For expanding small businesses</p>
              <div className="my-4">
                <span className="text-3xl font-bold text-indigo-700">$79</span>
                <span className="text-xs text-slate-500 font-medium">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-800 mb-6 font-semibold">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Unlimited Inventory SKUs</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Up to 25 Payroll Members</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Form 941 &amp; Tax Escrow</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Automated Invoice Reminders</li>
              </ul>
            </div>
            <button
              disabled
              className="w-full py-2.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl cursor-default"
            >
              Active Plan
            </button>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-1 text-amber-700 font-bold text-[11px] mb-1">
                <Sparkles size={13} /> Recommended
              </div>
              <h3 className="font-bold text-base text-slate-900">Enterprise</h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">For multi-entity operations</p>
              <div className="my-4">
                <span className="text-3xl font-bold text-slate-900">$199</span>
                <span className="text-xs text-slate-400 font-medium">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 mb-6 font-medium">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Multi-Location Warehouses</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Unlimited Payroll &amp; 1099s</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Dedicated CPA Advisory</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Custom ERP &amp; Webhooks</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('Enterprise')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-100 cursor-pointer transition-colors"
            >
              Upgrade to Enterprise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
