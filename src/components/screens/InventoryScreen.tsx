import React, { useState } from 'react';
import { InventoryItem, LowStockActionItem, BusinessStats } from '../../types';
import { 
  Download, 
  Plus, 
  Package, 
  Layers, 
  AlertTriangle, 
  TrendingUp, 
  Minus, 
  Printer, 
  Coffee, 
  PenTool, 
  Truck, 
  Box, 
  Mouse, 
  ShoppingCart,
  CheckCircle,
  Filter,
  Search
} from 'lucide-react';

interface InventoryScreenProps {
  stats: BusinessStats;
  items: InventoryItem[];
  alerts: LowStockActionItem[];
  onOpenNewItemModal: () => void;
  onOpenRestockModal: (item: LowStockActionItem) => void;
  onExportInventory: () => void;
  onViewAllAlerts: () => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({
  stats,
  items,
  alerts,
  onOpenNewItemModal,
  onOpenRestockModal,
  onExportInventory,
  onViewAllAlerts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [tableSearch, setTableSearch] = useState<string>('');

  const categories = ['All', 'Office Supplies', 'Pantry', 'Packaging', 'IT Equipment'];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(tableSearch.toLowerCase()) || 
                          item.sku.toLowerCase().includes(tableSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemIcon = (iconType: string) => {
    switch (iconType) {
      case 'print':
        return <Printer size={16} />;
      case 'coffee_maker':
        return <Coffee size={16} />;
      case 'edit':
        return <PenTool size={16} />;
      case 'local_shipping':
        return <Truck size={16} />;
      case 'mouse':
        return <Mouse size={16} />;
      default:
        return <Box size={16} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header with Title and Geometric Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
              Asset Tracking
            </span>
            <span className="text-xs text-slate-400 font-medium">Auto-reorder telemetry</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Inventory &amp; Warehousing
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Monitor stock thresholds, batch reorders, and commercial SKU balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="export-inventory-btn"
            onClick={onExportInventory}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 active:scale-98 transition-colors text-xs font-bold bg-white shadow-xs cursor-pointer"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          
          <button
            id="new-item-inventory-btn"
            onClick={onOpenNewItemModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-98 transition-colors text-xs font-bold shadow-md shadow-indigo-100 cursor-pointer"
          >
            <Plus size={15} />
            <span>Add New SKU</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid (3 Geometric Balance Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Total Items */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total In Stock
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 my-2 tabular-nums">
            {stats.totalInventoryItems.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold mt-2">
            <span className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp size={12} />
              +2.4% velocity
            </span>
          </div>
        </div>

        {/* Metric 2: Total SKUs */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Active Catalog SKUs
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <Layers size={16} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 my-2 tabular-nums">
            {stats.totalSkus}
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mt-2">
            <span className="bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Minus size={12} />
              All units active
            </span>
          </div>
        </div>

        {/* Metric 3: Low Stock Alerts */}
        <div className="bg-white rounded-3xl p-7 border border-rose-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
              Low Stock Reorders
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="text-4xl font-bold text-rose-600 my-2 flex items-baseline gap-2 tabular-nums">
            {alerts.length || stats.lowStockAlertsCount}
            <span className="text-xs font-semibold text-slate-500">items below buffer</span>
          </div>
          <div className="flex items-center gap-2 text-rose-700 text-xs font-bold mt-2">
            <span className="bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              Action recommended
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Column: Most Used Items Table (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Storage Telemetry
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Live Inventory Ledger
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60 text-xs">
                {categories.slice(0, 3).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button 
                id="view-all-inventory-table-btn"
                onClick={() => setSelectedCategory('All')} 
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 whitespace-nowrap pl-1 cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-3.5 px-5 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      Item &amp; Description
                    </th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      SKU Code
                    </th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      Category
                    </th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-slate-400 tracking-widest uppercase text-right">
                      In Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredItems.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                            {getItemIcon(item.iconType)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Unit price: ${item.unitPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-slate-500 font-mono text-xs">
                        {item.sku}
                      </td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold border border-slate-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right font-bold text-sm text-slate-900 tabular-nums">
                        {item.inStock.toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 text-xs font-medium">
                        No inventory items found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Showing {filteredItems.length} warehouse items</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle size={14} /> Buffer Synchronization Active
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Low Stock Action Needed (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-rose-500" />
            <h2 className="text-xl font-bold text-slate-900">
              Reorder Buffer Actions
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col gap-3.5 shadow-sm">
            {alerts.slice(0, 3).map((alert) => {
              const isCritical = alert.severity === 'critical';

              return (
                <div
                  key={alert.id}
                  className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider block ${isCritical ? 'text-rose-600' : 'text-amber-600'}`}>
                        {isCritical ? 'Critical Threshold' : 'Buffer Alert'}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 mt-0.5">
                        {alert.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {alert.sku}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className={`text-base font-bold tabular-nums ${isCritical ? 'text-rose-600' : 'text-amber-600'}`}>
                        {alert.inStock}{' '}
                        <span className="text-[10px] font-normal text-slate-400">units</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Min: {alert.threshold}
                      </div>
                    </div>
                  </div>

                  <button
                    id={`order-restock-btn-${alert.id}`}
                    onClick={() => onOpenRestockModal(alert)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      isCritical
                        ? 'bg-slate-900 hover:bg-black text-white'
                        : 'bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 border border-indigo-200'
                    }`}
                  >
                    <ShoppingCart size={13} />
                    <span>Generate Restock PO</span>
                  </button>
                </div>
              );
            })}

            <button
              id="view-all-alerts-link"
              onClick={onViewAllAlerts}
              className="text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors py-1 cursor-pointer"
            >
              View all {alerts.length} reorder notices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
