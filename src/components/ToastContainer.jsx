import React from 'react';
import { useLibrary } from '../context/LibraryContext.jsx';
import { X, CheckCircle2, Heart, BookOpen, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useLibrary();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-purple-500/30';
        let bgIconClass = 'bg-purple-500/10 text-purple-500';

        if (toast.type === 'favorite') {
          Icon = Heart;
          borderClass = 'border-rose-500/30';
          bgIconClass = 'bg-rose-500/10 text-rose-500';
        } else if (toast.type === 'completed' || toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-emerald-500/30';
          bgIconClass = 'bg-emerald-500/10 text-emerald-500';
        } else if (toast.type === 'progress' || toast.type === 'list') {
          Icon = BookOpen;
          borderClass = 'border-indigo-500/30';
          bgIconClass = 'bg-indigo-500/10 text-indigo-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#151B23] border ${borderClass} shadow-xl animate-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-1.5 rounded-xl shrink-0 ${bgIconClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
