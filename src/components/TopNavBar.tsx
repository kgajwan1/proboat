import React, { useState, useRef, useEffect } from 'react';
import { TabType } from '../types';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  Package, 
  Menu, 
  X,
  User,
  ShieldCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PROFILE_AVATARS } from '../data/initialData';

interface TopNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenUpgradeModal: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeTab,
  onTabChange,
  onOpenUpgradeModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setShowHelp(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'income', label: 'Income' },
    { id: 'expenses', label: 'Expenses' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo and Search */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button 
            id="brand-logo-btn"
            onClick={() => onTabChange('overview')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-100 transition-transform group-hover:scale-105">
              <div className="w-4 h-4 border-2 border-white rounded-xs"></div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                FinGage
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                System Active
              </span>
            </div>
          </button>

          {/* Search Input */}
          <div className="relative w-52 lg:w-72 hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400 placeholder:font-normal"
              placeholder={activeTab === 'inventory' ? 'Search inventory SKUs...' : 'Search ledger, accounts...'}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Center/Right: Nav Tabs & Controls */}
        <div className="flex items-center gap-4 lg:gap-6">
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`top-nav-tab-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Action icons & Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                id="notifications-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-600 hover:text-indigo-600 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="View notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                      3 Urgent
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    <div 
                      onClick={() => { onTabChange('inventory'); setShowNotifications(false); }}
                      className="p-3.5 hover:bg-slate-50 cursor-pointer flex gap-3 items-start transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Critical Stock: Ergonomic Mouse</p>
                        <p className="text-xs text-slate-500 mt-0.5">2 units left in storage. Reorder required.</p>
                        <span className="text-[10px] text-slate-400 mt-1 block font-medium">10 mins ago</span>
                      </div>
                    </div>
                    <div 
                      onClick={() => { onTabChange('expenses'); setShowNotifications(false); }}
                      className="p-3.5 hover:bg-slate-50 cursor-pointer flex gap-3 items-start transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <DollarSign size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">AWS Infrastructure Due</p>
                        <p className="text-xs text-slate-500 mt-0.5">$1,450.00 scheduled in 2 days.</p>
                        <span className="text-[10px] text-slate-400 mt-1 block font-medium">1 hour ago</span>
                      </div>
                    </div>
                    <div 
                      onClick={() => { onTabChange('payroll'); setShowNotifications(false); }}
                      className="p-3.5 hover:bg-slate-50 cursor-pointer flex gap-3 items-start transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Oct 15 Payroll Draft Ready</p>
                        <p className="text-xs text-slate-500 mt-0.5">Batch calculated for 5 employees ($24,500.00).</p>
                        <span className="text-[10px] text-slate-400 mt-1 block font-medium">Today at 9:00 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help Dropdown */}
            <div className="relative" ref={helpRef}>
              <button
                id="help-center-btn"
                onClick={() => setShowHelp(!showHelp)}
                className="text-slate-600 hover:text-indigo-600 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Help & Documentation"
              >
                <HelpCircle size={18} />
              </button>

              {showHelp && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <HelpCircle size={15} className="text-indigo-600" />
                    FinGage Assistance
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    Unified ledger, warehouse inventory buffers, and statutory payroll filings.
                  </p>
                  <div className="space-y-1.5 text-xs">
                    <button 
                      onClick={() => { onTabChange('inventory'); setShowHelp(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-indigo-600 font-semibold flex items-center justify-between"
                    >
                      <span>Inventory Restock Guide</span>
                      <Package size={14} />
                    </button>
                    <button 
                      onClick={() => { onTabChange('payroll'); setShowHelp(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-indigo-600 font-semibold flex items-center justify-between"
                    >
                      <span>IRS Form 941 Compliance</span>
                      <ShieldCheck size={14} />
                    </button>
                    <button 
                      onClick={() => { onOpenUpgradeModal(); setShowHelp(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-indigo-600 font-semibold flex items-center justify-between"
                    >
                      <span>Subscription Tier Scale</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                id="profile-avatar-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 hover:ring-2 hover:ring-indigo-500 transition-all active:scale-95 flex items-center justify-center bg-slate-100 cursor-pointer"
              >
                <img
                  src={PROFILE_AVATARS.default}
                  alt="User profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900">My Business Ltd.</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[11px] font-semibold text-emerald-700">
                        Growth Tier Active
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => { onTabChange('profile'); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <User size={15} />
                      Entity Profile &amp; Settings
                    </button>
                    <button
                      onClick={() => { onOpenUpgradeModal(); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center gap-2.5"
                    >
                      <Sparkles size={15} />
                      Upgrade to Enterprise
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile Menu Toggle Button */}
            <div className="relative md:hidden" ref={mobileRef}>
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
                    Navigation
                  </div>
                  <div className="flex flex-col gap-1">
                    {navTabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            onTabChange(tab.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                          }`}
                        >
                          <span>{tab.label}</span>
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        onTabChange('profile');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        activeTab === 'profile'
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                      }`}
                    >
                      <span>Entity Profile</span>
                      {activeTab === 'profile' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
