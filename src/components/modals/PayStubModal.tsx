import React from 'react';
import { EmployeePayroll } from '../../types';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface PayStubModalProps {
  employee: EmployeePayroll | null;
  isOpen: boolean;
  onClose: () => void;
  onPrintOrDownload: () => void;
}

export const PayStubModal: React.FC<PayStubModalProps> = ({
  employee,
  isOpen,
  onClose,
  onPrintOrDownload,
}) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Company and Pay Period Header */}
        <div className="border-b border-slate-100 pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-bold text-lg text-indigo-600">FinGage Direct Payroll</span>
              <p className="text-xs text-slate-500 mt-0.5">Employer: My Business Ltd. &bull; EIN: 84-2918402</p>
            </div>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
              Verified &amp; Escrowed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Pay Period: Oct 01, 2026 – Oct 15, 2026 &bull; Disbursed: {employee.payDate}
          </p>
        </div>

        {/* Employee Info */}
        <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-200/80 flex justify-between items-center text-xs">
          <div>
            <h4 className="font-bold text-sm text-slate-900">{employee.name}</h4>
            <p className="text-slate-500">{employee.role}</p>
          </div>
          <div className="text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Direct Deposit</span>
            <p className="font-mono font-medium text-slate-900">{employee.directDepositAccount}</p>
          </div>
        </div>

        {/* Earnings & Deductions Breakdown */}
        <div className="space-y-4 text-xs">
          {/* Earnings */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1.5">Gross Compensation</h5>
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Regular Base Salary ({employee.hoursWorked} hrs @ standard rate)</span>
                <span className="font-bold text-slate-900 tabular-nums">${employee.grossPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1.5 border-t border-slate-200/60 text-slate-900">
                <span>Total Gross Pay</span>
                <span className="tabular-nums">${employee.grossPay.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Withholdings */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1.5">Statutory Deductions (Form 941)</h5>
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Federal Income Tax</span>
                <span className="text-rose-600 font-bold tabular-nums">-${employee.taxBreakdown.federal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>State Income Tax</span>
                <span className="text-rose-600 font-bold tabular-nums">-${employee.taxBreakdown.state.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Social Security (FICA 6.2%)</span>
                <span className="text-rose-600 font-bold tabular-nums">-${employee.taxBreakdown.fica.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Medicare (1.45%)</span>
                <span className="text-rose-600 font-bold tabular-nums">-${employee.taxBreakdown.medicare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1.5 border-t border-slate-200/60 text-rose-600">
                <span>Total Deductions</span>
                <span className="tabular-nums">-${employee.taxDeduction.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Net Pay Total */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900 text-sm">Net Direct Deposit:</span>
            <span className="text-xl font-bold text-emerald-700 tabular-nums">
              ${employee.netPay.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-5 mt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onPrintOrDownload}
            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-md shadow-indigo-100 cursor-pointer"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
