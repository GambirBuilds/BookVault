import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight } from 'lucide-react';

export default function EmptyState({
  icon: Icon = BookOpen,
  title = 'No books found',
  description = 'Try adjusting your search criteria or explore our curated categories.',
  actionLabel = 'Explore All Books',
  actionLink = '/books',
  onAction = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-slate-50/50 dark:bg-[#151B23]/50 border border-slate-200/80 dark:border-slate-800/80 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 ring-8 ring-purple-500/5">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
        {description}
      </p>

      {onAction ? (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : actionLink ? (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : null}
    </div>
  );
}
