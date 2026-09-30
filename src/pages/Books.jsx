import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles, Filter, X } from 'lucide-react';
import { books } from '../data/books.js';
import { filterAndSortBooks } from '../utils/filters.js';
import SearchBar from '../components/SearchBar.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import BookGrid from '../components/BookGrid.jsx';

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse filters from URL or default
  const queryParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const authorParam = searchParams.get('author') || 'all';
  const accessTypeParam = searchParams.get('accessType') || 'all';
  const yearRangeParam = searchParams.get('yearRange') || 'all';
  const sortByParam = searchParams.get('sortBy') || 'default';

  const [filters, setFilters] = useState({
    query: queryParam,
    category: categoryParam,
    author: authorParam,
    accessType: accessTypeParam,
    yearRange: yearRangeParam,
    sortBy: sortByParam,
  });

  const [viewMode, setViewMode] = useState('grid');

  // Keep state synced with URL changes
  useEffect(() => {
    setFilters({
      query: searchParams.get('search') || '',
      category: searchParams.get('category') || 'all',
      author: searchParams.get('author') || 'all',
      accessType: searchParams.get('accessType') || 'all',
      yearRange: searchParams.get('yearRange') || 'all',
      sortBy: searchParams.get('sortBy') || 'default',
    });
  }, [searchParams]);

  // Update filter helper & URL sync
  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);

    const newParams = new URLSearchParams();
    if (updated.query) newParams.set('search', updated.query);
    if (updated.category !== 'all') newParams.set('category', updated.category);
    if (updated.author !== 'all') newParams.set('author', updated.author);
    if (updated.accessType !== 'all') newParams.set('accessType', updated.accessType);
    if (updated.yearRange !== 'all') newParams.set('yearRange', updated.yearRange);
    if (updated.sortBy !== 'default') newParams.set('sortBy', updated.sortBy);

    setSearchParams(newParams, { replace: true });
  };

  const handleResetFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      author: 'all',
      accessType: 'all',
      yearRange: 'all',
      sortBy: 'default',
    });
    setSearchParams({}, { replace: true });
  };

  // Filtered & sorted book array
  const filteredBooks = useMemo(() => {
    return filterAndSortBooks(books, filters);
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Archive Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Explore All Books
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Browse our complete collection of {books.length} verified titles spanning classic literature,
            technology, economics, science, and philosophy.
          </p>
        </div>

        {/* Global Search Box in Header */}
        <div className="w-full md:w-96">
          <SearchBar
            value={filters.query}
            onChange={(q) => handleFilterChange('query', q)}
            placeholder="Filter title, author, keyword..."
          />
        </div>
      </div>

      {/* Active Filter Badges */}
      {(filters.category !== 'all' ||
        filters.author !== 'all' ||
        filters.accessType !== 'all' ||
        filters.yearRange !== 'all' ||
        filters.query) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Active:
          </span>

          {filters.query && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Keyword: "{filters.query}"
              <button
                onClick={() => handleFilterChange('query', '')}
                className="hover:text-purple-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Category: {filters.category}
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className="hover:text-purple-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.author !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Author: {filters.author}
              <button
                onClick={() => handleFilterChange('author', 'all')}
                className="hover:text-purple-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.accessType !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Access: {filters.accessType}
              <button
                onClick={() => handleFilterChange('accessType', 'all')}
                className="hover:text-emerald-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.yearRange !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Era: {filters.yearRange}
              <button
                onClick={() => handleFilterChange('yearRange', 'all')}
                className="hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-rose-500 hover:underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Filter Control Bar */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={filteredBooks.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Book Grid */}
      <BookGrid
        books={filteredBooks}
        viewMode={viewMode}
        emptyTitle="No books match your criteria"
        emptyDescription="Try clearing active filters or searching for another author, title, or topic."
      />
    </div>
  );
}
