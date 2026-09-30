import React, { useState } from 'react';
import BookCard from './BookCard.jsx';
import EmptyState from './EmptyState.jsx';
import { ChevronDown, Search } from 'lucide-react';

export default function BookGrid({
  books = [],
  viewMode = 'grid',
  isLoading = false,
  emptyTitle = 'No books found',
  emptyDescription = 'Try adjusting your filters or search terms to find what you are looking for.',
  pageSize = 16,
}) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  if (isLoading) {
    return (
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-200/50 dark:bg-slate-800/40 animate-pulse aspect-[3/4] p-4 flex flex-col justify-end"
          >
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return <EmptyState icon={Search} title={emptyTitle} description={emptyDescription} />;
  }

  const displayedBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;

  return (
    <div>
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {displayedBooks.map((book) => (
          <BookCard key={book.id} book={book} viewMode={viewMode} />
        ))}
      </div>

      {/* Progressive loading */}
      {hasMore && (
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {displayedBooks.length} of {books.length} books
          </p>
          <button
            onClick={() => setVisibleCount((prev) => prev + pageSize)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 transition-all shadow-xs hover:shadow"
          >
            <span>Load More Books</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
