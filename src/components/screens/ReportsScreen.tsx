import React, { useState } from 'react';
import { BusinessStats } from '../../types';
import { 
  Download, 
  TrendingUp, 
  Calendar, 
  PieChart, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

interface ReportsScreenProps {
  stats: BusinessStats;
  onExportReport: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  stats,
  onExportReport,
}) => {
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'ytd'>('monthly');

  const pnlItems = [
    { category: 'Gross Invoiced Revenue', amount: 52400, type: 'income' },
    { category: 'Client Discounts & Refunds', amount: -7170, type: 'deduction' },
    { category: 'Net Revenue', amount: 45230, type: 'total_income', bold: true },
    { category: 'Payroll & Compensation', amount: -24500, type: 'expense' },
    { category: 'Federal & State Tax Withholdings', amount: -6125.50, type: 'expense' },
    { category: 'Hosting & SaaS Tools', amount: -3150, type: 'expense' },
    { category: 'Inventory Reorders & Storage', amount: -2850, type: 'expense' },
    { category: 'Office Facilities & Rent', amount: -1100, type: 'expense' },
    { category: 'Total Operating Expenses', amount: -37725.50, type: 'total_expense', bold: true },
    { category: 'Net Operating Profit (EBITDA)', amount: 7504.50, type: 'net_profit', highlight: true }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
              GAAP &amp; Accrual Accounting
            </span>
            <span className="text-xs text-slate-400 font-medium">Financial auditing</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Financial Statement &amp; P&amp;L
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Profit &amp; Loss statements, cash flow analytics, and operational margin breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60 text-xs">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                period === 'monthly' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current Month
            </button>
            <button
              onClick={() => setPeriod('quarterly')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                period === 'quarterly' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Q3 2026
            </button>
            <button
              onClick={() => setPeriod('ytd')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                period === 'ytd' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              YTD
            </button>
          </div>

          <button
            onClick={onExportReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-xs font-bold transition-colors shadow-md shadow-indigo-100 cursor-pointer"
          >
            <Download size={15} />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Snapshot Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gross Margin</span>
          <div className="text-3xl font-bold text-indigo-600 mt-2">78.4%</div>
          <span className="text-xs text-emerald-700 font-bold mt-1 inline-block">+3.1% vs Q2</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Net Profit Margin</span>
          <div className="text-3xl font-bold text-emerald-700 mt-2">16.6%</div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 inline-block">Healthy Cash Buffer</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payroll Ratio</span>
          <div className="text-3xl font-bold text-slate-900 mt-2">54.1%</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Of Total Operational Spend</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Burn Multiple</span>
          <div className="text-3xl font-bold text-slate-900 mt-2">0.82x</div>
          <span className="text-xs text-emerald-700 font-bold mt-1 inline-block">Highly Capital Efficient</span>
        </div>
      </section>

      {/* Profit & Loss Table */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Audited Statement</span>
            <h3 className="text-xl font-bold text-slate-900">
              Consolidated Statement of Operations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Period: August 1 – August 27, 2026 (USD Accrual)</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1.5">
            <FileCheck size={14} /> GAAP Compliant
          </span>
        </div>

        <div className="p-4 md:p-6">
          <table className="w-full text-left border-collapse text-xs">
            <tbody className="divide-y divide-slate-100">
              {pnlItems.map((item, idx) => {
                const isHighlight = item.highlight;
                const isBold = item.bold;

                return (
                  <tr 
                    key={idx} 
                    className={`py-3.5 transition-colors ${
                      isHighlight 
                        ? 'bg-emerald-50/50 font-bold rounded-2xl' 
                        : isBold 
                        ? 'bg-slate-50/80 font-bold' 
                        : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <td className={`py-3.5 px-5 ${isBold ? 'text-slate-900' : 'text-slate-600'}`}>
                      {item.category}
                    </td>
                    <td className={`py-3.5 px-5 text-right tabular-nums ${
                      isHighlight 
                        ? 'text-emerald-700 text-base font-bold' 
                        : isBold 
                        ? 'text-slate-900 font-bold text-sm' 
                        : item.amount < 0 
                        ? 'text-rose-600 font-medium' 
                        : 'text-indigo-600 font-medium'
                    }`}>
                      {item.amount < 0 
                        ? `-$${Math.abs(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
                        : `$${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
