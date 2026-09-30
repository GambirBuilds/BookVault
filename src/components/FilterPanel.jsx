import React, { useState } from 'react';
import { Filter, RotateCcw, LayoutGrid, List, ChevronDown, Check } from 'lucide-react';
import { categories } from '../data/categories.js';

export default function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  viewMode,
  onViewModeChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const accessOptions = [
    { value: 'all', label: 'All Access Types' },
    { value: 'free-only', label: '🟢 Free & Open Access Only' },
    { value: 'public-domain', label: '🟢 Public Domain' },
    { value: 'open-access', label: '🟠 Open Access' },
    { value: 'official', label: '🔵 Official Source' },
    { value: 'library', label: '🟣 Library Access' },
  ];

  const yearOptions = [
    { value: 'all', label: 'All Eras' },
    { value: 'pre-1900', label: 'Classics (Pre-1900)' },
    { value: '1900-1999', label: '20th Century (1900–1999)' },
    { value: '2000-present', label: 'Contemporary (2000+)' },
  ];

  const sortOptions = [
    { value: 'default', label: 'Curated Order' },
    { value: 'title-asc', label: 'Title: A to Z' },
    { value: 'title-desc', label: 'Title: Z to A' },
    { value: 'author-asc', label: 'Author: A to Z' },
    { value: 'year-asc', label: 'Oldest First' },
    { value: 'year-desc', label: 'Newest First' },
    { value: 'pages-desc', label: 'Most Pages' },
    { value: 'recently-added', label: 'Recently Added' },
  ];

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.accessType !== 'all' ||
    filters.yearRange !== 'all' ||
    filters.sortBy !== 'default' ||
    Boolean(filters.query);

  return (
    <div className="bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-all mb-8">
      {/* Top Bar with Results Count & Toggle Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Filter className="w-4 h-4 text-purple-500" />
            <span>Filters</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 ml-1">
            <strong className="text-slate-900 dark:text-slate-100 font-semibold">{totalResults}</strong>{' '}
            books found
          </span>
        </div>

        {/* View Mode Toggle & Sort Quick Selector */}
        <div className="flex items-center gap-2">
          {/* Quick Sort Select */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="appearance-none bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid vs List toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-5 animate-in fade-in duration-200">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Access Type Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Legal Access Type
            </label>
            <select
              value={filters.accessType}
              onChange={(e) => onFilterChange('accessType', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              {accessOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Historical Era / Year */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Time Period / Era
            </label>
            <select
              value={filters.yearRange}
              onChange={(e) => onFilterChange('yearRange', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              {yearOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
