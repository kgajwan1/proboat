import React from 'react';
import { TabType } from '../types';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  TrendingUp, 
  CreditCard, 
  FileText, 
  User, 
  Sparkles,
  Building2,
  ChevronRight
} from 'lucide-react';

interface SideNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  lowStockCount?: number;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  onTabChange,
  lowStockCount = 0,
}) => {
  const navItems = [
    {
      id: 'overview' as TabType,
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Unified financial health'
    },
    {
      id: 'inventory' as TabType,
      label: 'Inventory',
      icon: Package,
      badge: lowStockCount > 0 ? `${lowStockCount}` : undefined,
      badgeColor: 'bg-rose-500 text-white',
      description: 'Stock & reorders'
    },
    {
      id: 'payroll' as TabType,
      label: 'Payroll',
      icon: Users,
      description: 'Compensation & taxes'
    },
    {
      id: 'income' as TabType,
      label: 'Income Ledger',
      icon: TrendingUp,
      description: 'Receivables & inflows'
    },
    {
      id: 'expenses' as TabType,
      label: 'Expenses',
      icon: CreditCard,
      description: 'Vendor bills & outflows'
    },
    {
      id: 'reports' as TabType,
      label: 'Reports',
      icon: FileText,
      description: 'P&L statements'
    },
    {
      id: 'profile' as TabType,
      label: 'Entity Profile',
      icon: User,
      description: 'Tax entity & accounts'
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between bg-white rounded-3xl p-5 border border-slate-200 shadow-xs h-[calc(100vh-140px)] sticky top-28">
      {/* Top Section: Entity Card & Navigation */}
      <div className="flex flex-col gap-5 overflow-y-auto pr-0.5">
        {/* Entity Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Building2 size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">My Business Ltd.</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Growth Tier
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
            Navigation Menu
          </div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              if (isActive) {
                return (
                  <button
                    key={item.id}
                    id={`side-nav-${item.id}`}
                    onClick={() => onTabChange(item.id)}
                    className="w-full text-left bg-indigo-600 text-white rounded-2xl flex items-center justify-between p-3 shadow-md shadow-indigo-100 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[10px] text-white/80 block leading-none">{item.description}</span>
                      </div>
                    </div>
                    {item.badge ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-indigo-700">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight size={14} className="text-white/60 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`side-nav-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className="w-full text-left text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-2xl flex items-center justify-between p-3 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold block text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400 block leading-none">{item.description}</span>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Promo / Storage Metrics Card */}
      <div className="pt-4 border-t border-slate-100">
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-300">
              Platform Status
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 99.98%
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
            Real-time ACH &amp; automated ledger sync active.
          </p>
        </div>
      </div>
    </aside>
  );
};
