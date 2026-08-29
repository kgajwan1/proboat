import React from 'react';
import { EmployeePayroll, TaxDeadline, BusinessStats } from '../../types';
import { 
  FileSpreadsheet, 
  PlayCircle, 
  CreditCard, 
  Building2, 
  Calendar, 
  TrendingUp, 
  ArrowRight, 
  Eye, 
  Gavel, 
  ShieldCheck, 
  CheckCircle2,
  Clock
} from 'lucide-react';

interface PayrollScreenProps {
  stats: BusinessStats;
  employees: EmployeePayroll[];
  deadlines: TaxDeadline[];
  onRunPayroll: () => void;
  onExportTaxForms: () => void;
  onViewPayStub: (employee: EmployeePayroll) => void;
  onViewAllPayStubs: () => void;
  onConfigureAutoPay: () => void;
}

export const PayrollScreen: React.FC<PayrollScreenProps> = ({
  stats,
  employees,
  deadlines,
  onRunPayroll,
  onExportTaxForms,
  onViewPayStub,
  onViewAllPayStubs,
  onConfigureAutoPay,
}) => {
  const getBadgeStyle = (badgeColor: string) => {
    switch (badgeColor) {
      case 'primary':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'tertiary':
        return 'bg-amber-50 text-amber-800 border border-amber-200';
      case 'secondary':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
              Compensation &amp; Withholdings
            </span>
            <span className="text-xs text-slate-400 font-medium">IRS Form 941 compliant</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Payroll &amp; Tax Escrow
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Execute direct deposit disbursements, audit pay stubs, and file statutory taxes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="export-tax-forms-btn"
            onClick={onExportTaxForms}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 bg-white shadow-xs cursor-pointer active:scale-98"
          >
            <FileSpreadsheet size={15} />
            <span>Export 941 Forms</span>
          </button>
          <button
            id="run-payroll-btn"
            onClick={onRunPayroll}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <PlayCircle size={16} />
            <span>Run Payroll Cycle</span>
          </button>
        </div>
      </div>

      {/* Top Section: Key Geometric Balance Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Total Monthly Payroll */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Gross Monthly Payroll
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 my-2 tabular-nums">
            ${stats.totalMonthlyPayroll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mt-2">
            <span className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp size={12} />
              5 Active Direct Deposits
            </span>
          </div>
        </div>

        {/* Metric 2: Total Taxes Withheld */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Statutory Taxes Withheld
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <Building2 size={16} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 my-2 tabular-nums">
            ${stats.totalTaxesWithheld.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            Federal, State &amp; FICA escrowed
          </div>
        </div>

        {/* Metric 3: Next Pay Date */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Upcoming Pay Date
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <Calendar size={16} />
            </div>
          </div>
          <div className="text-4xl font-bold text-indigo-600 my-2">
            Oct 15
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
              Ready for Review
            </span>
            <span className="text-xs text-slate-400 font-medium">Bi-weekly</span>
          </div>
        </div>
      </section>

      {/* Main Content Area: Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Payroll Breakdown Table (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Team Compensation Ledger
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Active Employee Direct Deposits
              </h2>
            </div>
            <button 
              id="view-all-payroll-btn"
              onClick={onViewAllPayStubs}
              className="text-indigo-600 text-xs font-bold hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Records</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Employee
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Gross Pay
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Statutory Taxes
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Net Direct Deposit
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    Pay Stub
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {employees.map((emp) => (
                  <tr 
                    key={emp.id} 
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onViewPayStub(emp)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${getBadgeStyle(emp.badgeColor)}`}>
                          {emp.initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            {emp.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {emp.role} &bull; {emp.directDepositAccount}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold text-slate-900 tabular-nums">
                      ${emp.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right text-rose-600 tabular-nums font-semibold">
                      -${emp.taxDeduction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right font-bold text-emerald-700 tabular-nums">
                      ${emp.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        id={`view-paystub-btn-${emp.id}`}
                        onClick={() => onViewPayStub(emp)}
                        aria-label={`View Pay Stub for ${emp.name}`}
                        className="text-slate-500 hover:text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              id="view-all-paystubs-link"
              onClick={onViewAllPayStubs}
              className="text-indigo-600 text-xs font-bold hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Download Full PDF Package</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Tax Compliance Panel (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Tax Compliance Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                <Gavel size={16} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Tax Escrow &amp; Deadlines
                </h2>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  IRS Compliance
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {/* YTD Contribution */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  YTD Tax Escrow Paid
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2 tabular-nums">
                  ${stats.ytdTaxContributions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-1.5 overflow-hidden p-0.5 border border-slate-200">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-700 ease-out" 
                    style={{ width: '65%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>65% of annual forecast</span>
                  <span>Est. Annual $65k</span>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Upcoming Deadlines */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-3 flex items-center justify-between">
                  <span>Filing Schedule</span>
                  <Clock size={13} className="text-slate-400" />
                </h3>
                <ul className="space-y-2.5">
                  {deadlines.map((dl) => (
                    <li 
                      key={dl.id}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:border-slate-300 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center leading-none shrink-0 border ${
                        dl.isUrgent 
                          ? 'bg-rose-50 border-rose-200 text-rose-700' 
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <span className="text-[9px] font-bold uppercase">{dl.month}</span>
                        <span className="text-xs font-bold mt-0.5">{dl.day}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {dl.title}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">
                          {dl.subtitle}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Auto-Pay Taxes Dark Contrast Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={18} className="text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                Automated IRS 941 Filing
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed font-medium">
              Lock in scheduled direct deposit settlement and automated state tax agency transmissions.
            </p>
            <button
              id="configure-autopay-btn"
              onClick={onConfigureAutoPay}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Configure Automated Filing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
