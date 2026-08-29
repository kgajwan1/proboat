import React, { useState } from 'react';
import { EmployeePayroll, BusinessStats } from '../../types';
import { X, PlayCircle, CheckCircle2, AlertCircle, Building2, CreditCard } from 'lucide-react';

interface RunPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: EmployeePayroll[];
  stats: BusinessStats;
  onConfirmPayroll: () => void;
}

export const RunPayrollModal: React.FC<RunPayrollModalProps> = ({
  isOpen,
  onClose,
  employees,
  stats,
  onConfirmPayroll,
}) => {
  const [step, setStep] = useState<'review' | 'processing' | 'done'>('review');

  if (!isOpen) return null;

  const handleExecute = () => {
    setStep('processing');
    setTimeout(() => {
      onConfirmPayroll();
      setStep('done');
    }, 1200);
  };

  const handleFinish = () => {
    setStep('review');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={handleFinish}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {step === 'review' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                <PlayCircle size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">ACH Batch Transmission</span>
                <h3 className="text-xl font-bold text-slate-900">Execute Payroll Cycle</h3>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2.5 mb-5 border border-slate-200/80">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">Gross Compensation:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${stats.totalMonthlyPayroll.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">Tax Escrow Withheld:</span>
                <span className="font-bold text-rose-600 tabular-nums">
                  -${stats.totalTaxesWithheld.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex justify-between text-sm">
                <span className="font-bold text-slate-900">Total Net Direct Deposits:</span>
                <span className="font-bold text-emerald-700 tabular-nums">
                  ${(stats.totalMonthlyPayroll - stats.totalTaxesWithheld).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Disbursement Recipients ({employees.length} team members)
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {employees.map((emp) => (
                  <div key={emp.id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200/60">
                    <div>
                      <span className="font-bold text-slate-900">{emp.name}</span>
                      <span className="text-slate-400 ml-2 font-mono text-[10px]">{emp.directDepositAccount}</span>
                    </div>
                    <span className="font-bold text-emerald-700 tabular-nums">
                      ${emp.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleFinish}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecute}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-md shadow-indigo-100 cursor-pointer"
              >
                <CreditCard size={15} />
                <span>Confirm &amp; Disburse</span>
              </button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h4 className="text-lg font-bold text-slate-900">Transmitting Direct Deposits...</h4>
            <p className="text-xs text-slate-500 font-medium">Encrypting ACH payload and securing federal tax escrow withholdings</p>
          </div>
        )}

        {step === 'done' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={26} />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Payroll Successfully Disbursed!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              ${(stats.totalMonthlyPayroll - stats.totalTaxesWithheld).toLocaleString('en-US', { minimumFractionDigits: 2 })} has been scheduled for transmission to {employees.length} team members. Automated Form 941 tax escrow created.
            </p>
            <div className="pt-3">
              <button
                onClick={handleFinish}
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
