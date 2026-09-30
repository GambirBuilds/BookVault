import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home, Search, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto ring-8 ring-purple-500/5">
        <BookOpen className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Error 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          Page Not Found in the Vault
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          The shelf or chapter you are looking for doesn't exist or may have been relocated.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <Search className="w-4 h-4 text-purple-500" />
          <span>Browse All Books</span>
        </Link>
      </div>
    </div>
  );
}
