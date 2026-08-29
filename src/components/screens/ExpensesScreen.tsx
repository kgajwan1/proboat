import React, { useState } from 'react';
import { BillItem, BusinessStats } from '../../types';
import { 
  Plus, 
  Download, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Building, 
  DollarSign
} from 'lucide-react';

interface ExpensesScreenProps {
  bills: BillItem[];
  stats: BusinessStats;
  onPayBill: (billId: string) => void;
  onNewBill: (bill: Omit<BillItem, 'id'>) => void;
  onExportBills: () => void;
}

export const ExpensesScreen: React.FC<ExpensesScreenProps> = ({
  bills,
  stats,
  onPayBill,
  onNewBill,
  onExportBills,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New bill state
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState('Software & SaaS');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const filteredBills = bills.filter(bill => {
    const matchesFilter = 
      filter === 'all' ? true : 
      filter === 'pending' ? bill.status === 'pending' : 
      bill.status === 'paid';
    const matchesSearch = bill.vendor.toLowerCase().includes(search.toLowerCase()) || 
                          bill.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor || !amount) return;

    onNewBill({
      vendor,
      category,
      amount: parseFloat(amount) || 0,
      dueDate: dueDate || '2026-09-10',
      isDueSoon: true,
      status: 'pending',
      accountNumber: `VEND-${Math.floor(1000 + Math.random() * 9000)}`
    });

    setShowAddModal(false);
    setVendor('');
    setAmount('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
              Payables &amp; Disbursements
            </span>
            <span className="text-xs text-slate-400 font-medium">Cash burn &amp; subscriptions</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Expenses &amp; Vendor Bills
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Audit operational vendor charges, SaaS subscriptions, and scheduled payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportBills}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors shadow-xs bg-white cursor-pointer"
          >
            <Download size={15} />
            <span>Export Payables</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-xs font-bold transition-colors shadow-md shadow-indigo-100 cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Bill</span>
          </button>
        </div>
      </div>

      {/* Metric Breakdown */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Payables</span>
          <div className="text-4xl font-bold text-rose-600 mt-2 tabular-nums">
            ${stats.pendingBillsTotal.toLocaleString()}
          </div>
          <p className="text-xs text-rose-700 font-bold mt-2 flex items-center gap-1">
            <AlertCircle size={14} /> {bills.filter(b => b.isDueSoon && b.status === 'pending').length} bills due within 5 days
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Monthly Ops</span>
          <div className="text-4xl font-bold text-slate-900 mt-2 tabular-nums">
            ${stats.expectedExpenses.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-2">Within approved $6,500 monthly budget</p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Subscriptions</span>
          <div className="text-4xl font-bold text-indigo-600 mt-2">
            8 <span className="text-sm font-normal text-slate-400">services</span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-2">All connected to business auto-pay</p>
        </div>
      </section>

      {/* Bills Table */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Bills
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'pending' ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
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
              Settled
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendor or category..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                <th className="py-3.5 px-5">Vendor</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Due Date</th>
                <th className="py-3.5 px-5 text-right">Amount</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Building size={15} className="text-indigo-600" />
                      <span>{bill.vendor}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 pl-5 block mt-0.5">{bill.accountNumber}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold">
                      {bill.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-500 font-medium">
                    <span className={bill.isDueSoon && bill.status === 'pending' ? 'text-rose-600 font-bold' : ''}>
                      {bill.dueDate}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right font-bold text-sm text-slate-900 tabular-nums">
                    ${bill.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-center">
                    {bill.status === 'paid' ? (
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
                        Paid
                      </span>
                    ) : bill.isDueSoon ? (
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold rounded-full">
                        Due Soon
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold rounded-full">
                        Scheduled
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    {bill.status !== 'paid' ? (
                      <button
                        onClick={() => onPayBill(bill.id)}
                        className="px-3 py-1.5 bg-slate-900 text-white hover:bg-black rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Disburse
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-700 font-bold flex items-center justify-end gap-1">
                        <CheckCircle2 size={13} /> Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Bill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Add Operational Bill</h3>
            <p className="text-xs text-slate-500 mb-5">Record a vendor expense or recurring subscription.</p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vendor / Payee Name</label>
                <input
                  type="text"
                  required
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  placeholder="e.g. AWS Cloud Services"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Software & SaaS">Software &amp; SaaS</option>
                    <option value="Hosting & Infrastructure">Hosting &amp; Infrastructure</option>
                    <option value="Facilities & Rent">Facilities &amp; Rent</option>
                    <option value="Shipping & Logistics">Shipping &amp; Logistics</option>
                    <option value="Legal & Advisory">Legal &amp; Advisory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="450.00"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
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

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 cursor-pointer shadow-sm"
                >
                  Record Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
