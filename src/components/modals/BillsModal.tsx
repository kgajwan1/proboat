import React from 'react';
import { BillItem } from '../../types';
import { X, CreditCard, CheckCircle2, AlertCircle, Building } from 'lucide-react';

interface BillsModalProps {
  bills: BillItem[];
  isOpen: boolean;
  onClose: () => void;
  onPayBill: (billId: string) => void;
}

export const BillsModal: React.FC<BillsModalProps> = ({
  bills,
  isOpen,
  onClose,
  onPayBill,
}) => {
  if (!isOpen) return null;

  const totalPending = bills
    .filter(b => b.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
            <CreditCard size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">Payables Ledger</span>
            <h3 className="text-xl font-bold text-slate-900">Review Pending Bills</h3>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl mb-4 text-xs border border-slate-200/80 flex justify-between items-center">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Total Outstanding Payables</span>
            <p className="text-lg font-bold text-rose-600 tabular-nums">${totalPending.toLocaleString()}</p>
          </div>
          <span className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded-full font-bold text-[10px]">
            {bills.filter(b => b.isDueSoon && b.status === 'pending').length} Due Soon
          </span>
        </div>

        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building size={15} className="text-indigo-600" />
                  <span className="font-bold text-xs text-slate-900">{bill.vendor}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex gap-2">
                  <span>{bill.category}</span>
                  <span>&bull;</span>
                  <span className={bill.isDueSoon && bill.status === 'pending' ? 'text-rose-600 font-bold' : ''}>
                    Due {bill.dueDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="font-bold text-sm text-slate-900 tabular-nums">
                  ${bill.amount.toLocaleString()}
                </span>
                {bill.status === 'paid' ? (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Paid
                  </span>
                ) : (
                  <button
                    onClick={() => onPayBill(bill.id)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Disburse
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-black cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
