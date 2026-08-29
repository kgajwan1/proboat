import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl border text-xs animate-in slide-in-from-bottom-4 duration-200 ${
        toast.type === 'success'
          ? 'bg-slate-900 text-white border-slate-700'
          : toast.type === 'error'
          ? 'bg-rose-950 text-rose-100 border-rose-800'
          : 'bg-indigo-950 text-indigo-100 border-indigo-800'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {toast.type === 'success' && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
        {toast.type === 'error' && <AlertCircle size={16} className="text-rose-400 shrink-0" />}
        {toast.type === 'info' && <Info size={16} className="text-indigo-400 shrink-0" />}
        <span className="font-medium">{toast.message}</span>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
      >
        <X size={14} />
      </button>
    </div>
  );
};
