import React from 'react';
import { BusinessStats, InvoiceItem, BillItem, TabType } from '../../types';
import { 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  TrendingUp, 
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Receipt
} from 'lucide-react';

interface OverviewScreenProps {
  stats: BusinessStats;
  invoices: InvoiceItem[];
  bills: BillItem[];
  setActiveTab: (tab: TabType) => void;
  onSendReminder: (invoice: InvoiceItem) => void;
  onReviewBills: () => void;
  onViewAllInvoices: () => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  stats,
  invoices,
  bills,
  setActiveTab,
  onSendReminder,
  onReviewBills,
  onViewAllInvoices,
}) => {
  const pendingInvoices = invoices.slice(0, 3);
  const dueSoonBills = bills.filter(b => b.isDueSoon);

  const getAvatarBg = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-indigo-50 text-indigo-600 border border-indigo-200';
      case 'secondary':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header with Geometric Balance Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
              Financial Overview
            </span>
            <span className="text-xs text-slate-400 font-medium">Real-time sync active</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Executive Ledger &amp; Cash Flow
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Real-time balance, outstanding receivables, and current operational liabilities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('reports')}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <FileText size={15} />
            Export P&amp;L Report
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100 flex items-center gap-2 cursor-pointer"
          >
            <ArrowUpRight size={15} />
            New Invoice
          </button>
        </div>
      </div>

      {/* Top Section: Hero Geometric Balance Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Revenue Card (White Geometric Card) */}
        <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Fiscal Revenue
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <TrendingUp size={14} />
              +{stats.revenueGrowthPct}% this month
            </span>
          </div>

          <div className="my-2">
            <div className="text-4xl md:text-5xl font-bold text-indigo-600 tracking-tight tabular-nums">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Gross billed revenue recognized across all commercial accounts.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <button
              id="view-income-details-btn"
              onClick={() => setActiveTab('income')}
              className="flex items-center gap-2 text-indigo-600 text-xs font-bold hover:text-indigo-800 transition-colors cursor-pointer group/btn"
            >
              <span>View detailed income ledger</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <span className="text-[11px] font-semibold text-slate-400">Updated just now</span>
          </div>
        </div>

        {/* Pending Bills Card (High-Contrast Dark Slate Geometric Card) */}
        <div className="bg-slate-900 text-white rounded-3xl p-7 md:p-8 border border-slate-800 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Pending Liabilities &amp; Bills
            </span>
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <AlertCircle size={14} />
              {dueSoonBills.length} Due Soon
            </span>
          </div>

          <div className="my-2">
            <div className="text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
              ${stats.pendingBillsTotal.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Upcoming supplier invoices, hosting infrastructure, and utilities.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-3">
            <button
              id="review-bills-btn"
              onClick={onReviewBills}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Review Bills ({stats.pendingBillsCount})
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Manage Payables
            </button>
          </div>
        </div>
      </section>

      {/* Middle Section: Two-Column Bento Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Money Owed to You (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-7 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  Receivables Pipeline
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Money Owed to You
                </h2>
              </div>
              <button
                id="see-all-invoices-btn"
                onClick={onViewAllInvoices}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                See all invoices ({invoices.length})
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Outstanding client invoices. Send one-click gentle reminders to accelerate settlement.
            </p>

            <div className="flex flex-col gap-3">
              {pendingInvoices.map((inv) => {
                const isOverdue = inv.isOverdue;
                const isReminded = inv.status === 'reminded';
                const isDueToday = inv.dueDateText === 'Due today';

                return (
                  <div
                    key={inv.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs ${getAvatarBg(inv.avatarColor)}`}>
                        {inv.initial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-slate-900">
                            {inv.client}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-400">
                            {inv.invoiceNumber}
                          </span>
                        </div>
                        <p className={`text-xs font-semibold mt-0.5 ${
                          isOverdue 
                            ? 'text-rose-600' 
                            : isDueToday 
                            ? 'text-amber-600' 
                            : 'text-slate-500'
                        }`}>
                          {inv.dueDateText}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0">
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        ${inv.amount.toLocaleString()}
                      </span>
                      
                      {inv.status === 'not_due' ? (
                        <span className="px-3 py-1.5 border border-slate-200 text-slate-400 rounded-xl text-xs font-semibold bg-white cursor-default">
                          Scheduled
                        </span>
                      ) : isReminded ? (
                        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          Nudged
                        </span>
                      ) : (
                        <button
                          id={`send-reminder-btn-${inv.id}`}
                          onClick={() => onSendReminder(inv)}
                          className="px-3.5 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <Mail size={13} />
                          Remind
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Total Pending Receivables: <strong className="text-slate-900 font-bold">$5,450.00</strong></span>
            <button 
              onClick={() => setActiveTab('income')} 
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              Issue Invoice <Receipt size={13} />
            </button>
          </div>
        </div>

        {/* Right Column: Business Outlook (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-7 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Forecast Simulation
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Monthly Outlook
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Projection based on recurring clients and verified payable schedules.
            </p>

            {/* Visual Indicators with Geometric Bars */}
            <div className="space-y-5">
              {/* Income Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Projected Inflow
                  </span>
                  <span className="text-xs font-bold text-indigo-600 tabular-nums">
                    ${stats.expectedIncome.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              {/* Expenses Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Projected Outflow
                  </span>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    ${stats.expectedExpenses.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div 
                    className="h-full bg-slate-800 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Geometric Callout Card */}
          <div className="mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Surplus Forecast: ${stats.projectedProfit.toLocaleString()}
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Operating margin remains stable with healthy buffer coverage across all categories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
