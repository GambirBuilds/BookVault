import React, { useState } from 'react';
import { Bookmark, CheckCircle2, BookOpen, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function ReadingProgress({ book }) {
  const { getProgress, updateProgress } = useLibrary();
  const currentProgress = getProgress(book.id, book.pages);

  const [page, setPage] = useState(currentProgress.currentPage || 0);
  const [status, setStatus] = useState(currentProgress.status || 'want-to-read');
  const [isEditing, setIsEditing] = useState(false);

  const total = book.pages || 300;
  const percentage = Math.min(100, Math.round(((Number(page) || 0) / total) * 100));

  const handleSave = (e) => {
    e?.preventDefault();
    const updated = updateProgress(book.id, {
      status,
      currentPage: Number(page) || 0,
      totalPages: total,
      bookTitle: book.title,
    });

    if (updated.percentage === 100 || status === 'completed') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback
      }
    }

    setIsEditing(false);
  };

  const handleQuickStatus = (newStatus) => {
    setStatus(newStatus);
    let newPage = page;
    if (newStatus === 'completed') {
      newPage = total;
      setPage(total);
    } else if (newStatus === 'want-to-read') {
      newPage = 0;
      setPage(0);
    }
    updateProgress(book.id, {
      status: newStatus,
      currentPage: newPage,
      totalPages: total,
      bookTitle: book.title,
    });

    if (newStatus === 'completed') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback
      }
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-purple-500" />
          <span>Reading Tracker</span>
        </h4>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline"
        >
          {isEditing ? 'Cancel' : 'Update Progress'}
        </button>
      </div>

      {/* Progress display bar */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-500 dark:text-slate-400">
            Page {currentProgress.currentPage} of {total}
          </span>
          <span className="font-bold text-purple-600 dark:text-purple-400">
            {currentProgress.percentage}%
          </span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${currentProgress.percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Status Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => handleQuickStatus('want-to-read')}
          className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            currentProgress.status === 'want-to-read'
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 ring-1 ring-slate-400'
              : 'bg-slate-100 dark:bg-slate-850 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Want to Read</span>
        </button>

        <button
          onClick={() => handleQuickStatus('reading')}
          className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            currentProgress.status === 'reading'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-850 text-slate-500 hover:text-purple-500'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Reading</span>
        </button>

        <button
          onClick={() => handleQuickStatus('completed')}
          className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            currentProgress.status === 'completed'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-850 text-slate-500 hover:text-emerald-500'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed</span>
        </button>
      </div>

      {/* Inline Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Current Page (Max: {total})
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={total}
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-xs font-bold text-slate-500 shrink-0">
                ({percentage}%)
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            Save Progress
          </button>
        </form>
      )}
    </div>
  );
}
