import React, { useState } from 'react';
import { InvoiceItem } from '../../types';
import { X, Mail, Send, CheckCircle2 } from 'lucide-react';

interface SendReminderModalProps {
  invoice: InvoiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSend: (invoice: InvoiceItem, customMessage: string) => void;
}

export const SendReminderModal: React.FC<SendReminderModalProps> = ({
  invoice,
  isOpen,
  onClose,
  onConfirmSend,
}) => {
  const [subject, setSubject] = useState(
    invoice ? `Friendly Reminder: Outstanding Invoice ${invoice.invoiceNumber} for ${invoice.client}` : ''
  );
  const [message, setMessage] = useState(
    invoice 
      ? `Hi ${invoice.client} team,\n\nHope you're having a great week! This is a gentle reminder that invoice ${invoice.invoiceNumber} ($${invoice.amount.toLocaleString()}) was due on ${invoice.dueDateText}. Please let us know if you have any questions or need an updated copy.\n\nThank you for your business,\nMy Business Finance Team` 
      : ''
  );

  if (!isOpen || !invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSend(invoice, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
            <Mail size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">Collections Automated Dispatch</span>
            <h3 className="text-xl font-bold text-slate-900">Send Invoice Reminder</h3>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl mb-4 text-xs border border-slate-200/80 flex justify-between items-center">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Outstanding Receivables</span>
            <p className="text-base font-bold text-slate-900 tabular-nums">${invoice.amount.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Schedule</span>
            <p className="font-bold text-rose-600">{invoice.dueDateText}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Message Body</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed font-medium"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-md shadow-indigo-100 cursor-pointer"
            >
              <Send size={14} />
              <span>Send Reminder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
