import React, { useState } from 'react';
import { LowStockActionItem } from '../../types';
import { X, ShoppingCart, Truck, CheckCircle2 } from 'lucide-react';

interface RestockModalProps {
  item: LowStockActionItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRestock: (item: LowStockActionItem, quantity: number) => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmRestock,
}) => {
  const [quantity, setQuantity] = useState<number>(item?.suggestedReorder || 25);
  const [shippingMethod, setShippingMethod] = useState<'Standard Ground' | 'Expedited Freight'>('Standard Ground');

  if (!isOpen || !item) return null;

  const totalCost = quantity * item.unitCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmRestock(item, quantity);
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
            <ShoppingCart size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">Purchase Order Dispatch</span>
            <h3 className="text-xl font-bold text-slate-900">Restock Buffer PO</h3>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-200/80 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest block">
                {item.severity === 'critical' ? 'Critical Reorder' : 'Standard Reorder'}
              </span>
              <h4 className="font-bold text-sm text-slate-900 mt-0.5">{item.name}</h4>
              <p className="text-[10px] font-mono text-slate-400">SKU: {item.sku}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">In Buffer</span>
              <span className="text-base font-bold text-rose-600 tabular-nums">{item.inStock} units</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/60 flex justify-between text-xs text-slate-600 font-medium">
            <span>Supplier: <strong>{item.supplier}</strong></span>
            <span>Unit Cost: <strong>${item.unitCost.toFixed(2)}</strong></span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Reorder Quantity (Units)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-bold"
              />
              <div className="flex gap-1.5">
                {[20, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className="px-2.5 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 cursor-pointer"
                  >
                    +{preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Freight Priority</label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value as any)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Standard Ground">Standard Ground (2-3 Business Days)</option>
              <option value="Expedited Freight">Expedited Overnight Freight</option>
            </select>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Estimated Purchase Cost:</span>
            <span className="font-bold text-base text-slate-900 tabular-nums">
              ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
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
              <Truck size={15} />
              <span>Confirm Purchase PO</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
