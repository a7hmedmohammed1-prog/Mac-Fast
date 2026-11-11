import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-5 right-5 sm:right-auto z-[70] bg-[#202124] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 max-w-md border border-gray-700 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-center gap-3">
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-[#FFC72C] shrink-0" />}
        <span className="font-bold text-sm leading-snug">{toast.text}</span>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="text-gray-400 hover:text-white p-1 rounded-md transition"
        aria-label="إغلاق التنبيه"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
