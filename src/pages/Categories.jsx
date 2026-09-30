import React, { useState } from 'react';
import { Compass, BookOpen, Layers } from 'lucide-react';
import { categories } from '../data/categories.js';
import CategoryCard from '../components/CategoryCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { books } from '../data/books.js';

export default function Categories() {
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter((cat) => {
    const q = search.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.subcategories.some((sub) => sub.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover Disciplines</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Book Categories
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Browse through {categories.length} major literary and academic fields containing {books.length}+
            curated volumes.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search categories & topics..."
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          No categories found matching "{search}".
        </div>
      )}
    </div>
  );
}
