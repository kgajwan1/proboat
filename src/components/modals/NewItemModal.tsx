import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { X, Package, Plus } from 'lucide-react';

interface NewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Omit<InventoryItem, 'id'>) => void;
}

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<'Office Supplies' | 'Pantry' | 'Packaging' | 'IT Equipment' | 'Hardware'>('Office Supplies');
  const [inStock, setInStock] = useState('100');
  const [threshold, setThreshold] = useState('20');
  const [unitPrice, setUnitPrice] = useState('15.00');
  const [iconType, setIconType] = useState<any>('box');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku) return;

    onAddItem({
      name,
      sku: sku.toUpperCase(),
      category,
      inStock: parseInt(inStock, 10) || 0,
      threshold: parseInt(threshold, 10) || 0,
      unitPrice: parseFloat(unitPrice) || 0,
      iconType: iconType || 'box',
      lastRestocked: 'Just now'
    });

    onClose();
    setName('');
    setSku('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
            <Package size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">Warehouse Master</span>
            <h3 className="text-xl font-bold text-slate-900">Add New Inventory SKU</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Item Title / Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ergonomic Office Chairs"
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">SKU Number</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. OFF-CHR-012"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 uppercase font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Office Supplies">Office Supplies</option>
                <option value="Pantry">Pantry</option>
                <option value="Packaging">Packaging</option>
                <option value="IT Equipment">IT Equipment</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Initial Stock</label>
              <input
                type="number"
                min="0"
                required
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Min Threshold</label>
              <input
                type="number"
                min="1"
                required
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Unit Cost ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category Icon</label>
            <div className="flex gap-2">
              {[
                { id: 'box', label: 'Box' },
                { id: 'print', label: 'Printer' },
                { id: 'coffee_maker', label: 'Coffee' },
                { id: 'edit', label: 'Pens' },
                { id: 'local_shipping', label: 'Shipping' },
                { id: 'mouse', label: 'Tech' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setIconType(opt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    iconType === opt.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 cursor-pointer"
            >
              <Plus size={15} />
              <span>Catalog SKU</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
