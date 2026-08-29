import React from 'react';
import { InvoiceItem } from '../../types';
import { X, FileText, Mail, CheckCircle2 } from 'lucide-react';

interface InvoicesModalProps {
  invoices: InvoiceItem[];
  isOpen: boolean;
  onClose: () => void;
  onSendReminder: (invoice: InvoiceItem) => void;
  onMarkPaid: (invoiceId: string) => void;
}

export const InvoicesModal: React.FC<InvoicesModalProps> = ({
  invoices,
  isOpen,
  onClose,
  onSendReminder,
  onMarkPaid,
}) => {
  if (!isOpen) return null;

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
            <FileText size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">Receivables Directory</span>
            <h3 className="text-xl font-bold text-slate-900">All Client Invoices</h3>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[11px] flex items-center justify-center">
                    {inv.initial}
                  </span>
                  <span className="font-bold text-xs text-slate-900">{inv.client}</span>
                  <span className="text-[10px] font-mono text-slate-400">({inv.invoiceNumber})</span>
                </div>
                <div className="text-[11px] text-slate-500 pl-8">
                  <span className={inv.isOverdue ? 'text-rose-600 font-bold' : ''}>
                    {inv.dueDateText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="font-bold text-sm text-slate-900 tabular-nums">
                  ${inv.amount.toLocaleString()}
                </span>
                {inv.status === 'paid' ? (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Paid
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSendReminder(inv)}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Mail size={12} /> Remind
                    </button>
                    <button
                      onClick={() => onMarkPaid(inv.id)}
                      className="px-3 py-1.5 bg-slate-900 text-white hover:bg-black text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Mark Paid
                    </button>
                  </div>
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
