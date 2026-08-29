import React, { useState } from 'react';
import { InvoiceItem, BusinessStats } from '../../types';
import { 
  Plus, 
  Download, 
  Search, 
  Mail, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Filter,
  ArrowUpRight,
  TrendingUp,
  Receipt
} from 'lucide-react';

interface IncomeScreenProps {
  invoices: InvoiceItem[];
  stats: BusinessStats;
  onSendReminder: (invoice: InvoiceItem) => void;
  onNewInvoice: (invoice: Omit<InvoiceItem, 'id'>) => void;
  onMarkPaid: (invoiceId: string) => void;
  onExportInvoices: () => void;
}

export const IncomeScreen: React.FC<IncomeScreenProps> = ({
  invoices,
  stats,
  onSendReminder,
  onNewInvoice,
  onMarkPaid,
  onExportInvoices,
}) => {
  const [filter, setFilter] = useState<'all' | 'due' | 'paid'>('all');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Invoice form state
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const filteredInvoices = invoices.filter(inv => {
    const matchesFilter = 
      filter === 'all' ? true : 
      filter === 'due' ? (inv.status === 'due' || inv.status === 'not_due') : 
      inv.status === 'paid';
    const matchesSearch = inv.client.toLowerCase().includes(search.toLowerCase()) || 
                          inv.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !amount) return;

    onNewInvoice({
      client,
      initial: client.charAt(0).toUpperCase(),
      amount: parseFloat(amount) || 0,
      dueDateText: `Due on ${dueDate || 'Sept 15'}`,
      dueDate: dueDate || '2026-09-15',
      isOverdue: false,
      status: 'not_due',
      avatarColor: 'primary',
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      items: [itemDescription || 'Professional Services']
    });

    setShowCreateModal(false);
    setClient('');
    setAmount('');
    setItemDescription('');
  };

  const totalCollected = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 45230);
  const totalReceivables = invoices.filter(i => i.status !== 'paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
              Receivables Ledger
            </span>
            <span className="text-xs text-slate-400 font-medium">Billed revenue &amp; collections</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Income &amp; Client Invoices
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Issue electronic invoices, track settlement cycles, and trigger automated reminders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportInvoices}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors shadow-xs bg-white cursor-pointer"
          >
            <Download size={15} />
            <span>Export Invoices</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-xs font-bold transition-colors shadow-md shadow-indigo-100 cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Collected Revenue</span>
          <div className="text-4xl font-bold text-indigo-600 mt-2 tabular-nums">
            ${totalCollected.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> +12.0% growth vs last period
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Outstanding Receivables</span>
          <div className="text-4xl font-bold text-amber-700 mt-2 tabular-nums">
            ${totalReceivables.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-2">{invoices.filter(i => i.status !== 'paid').length} invoices pending settlement</p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Collection Velocity</span>
          <div className="text-4xl font-bold text-slate-900 mt-2 tabular-nums">
            14.2 <span className="text-sm font-normal text-slate-400">days</span>
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-2">4 days ahead of industry benchmark</p>
        </div>
      </section>

      {/* Invoices List Section */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Invoices
            </button>
            <button
              onClick={() => setFilter('due')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'due' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unpaid
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'paid' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paid
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search client or INV #..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                <th className="py-3.5 px-5">Invoice #</th>
                <th className="py-3.5 px-5">Client Entity</th>
                <th className="py-3.5 px-5">Due Date</th>
                <th className="py-3.5 px-5 text-right">Amount</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-mono text-xs font-bold text-indigo-600">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold text-xs">
                        {inv.initial}
                      </div>
                      <span className="font-bold text-slate-900">{inv.client}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-500 font-medium">
                    <span className={inv.isOverdue ? 'text-rose-600 font-bold' : ''}>
                      {inv.dueDateText}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right font-bold text-sm text-slate-900 tabular-nums">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-center">
                    {inv.status === 'paid' ? (
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
                        Paid
                      </span>
                    ) : inv.status === 'reminded' ? (
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded-full">
                        Reminded
                      </span>
                    ) : inv.isOverdue ? (
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold rounded-full">
                        Overdue
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status !== 'paid' && (
                        <>
                          <button
                            onClick={() => onSendReminder(inv)}
                            title="Send email reminder"
                            className="px-3 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-xl border border-indigo-200 font-bold cursor-pointer"
                          >
                            Remind
                          </button>
                          <button
                            onClick={() => onMarkPaid(inv.id)}
                            title="Mark as paid"
                            className="px-3 py-1.5 text-xs bg-slate-900 text-white hover:bg-black rounded-xl font-bold cursor-pointer"
                          >
                            Mark Paid
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal for creating a new invoice */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Create New Client Invoice</h3>
            <p className="text-xs text-slate-500 mb-5">Draft and issue an invoice to bill for commercial deliverables.</p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Entity</label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Acme Corporation"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="2500.00"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Line Items / Scope</label>
                <textarea
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="Service deliverables, consulting hours, milestone completion..."
                  rows={3}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 cursor-pointer shadow-sm"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
