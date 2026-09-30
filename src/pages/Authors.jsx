import React, { useState, useMemo } from 'react';
import { Users, Search, BookOpen } from 'lucide-react';
import { books } from '../data/books.js';
import { authorsBio } from '../data/authors.js';
import AuthorCard from '../components/AuthorCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

export default function Authors() {
  const [search, setSearch] = useState('');

  // Extract all distinct authors from the dataset and count their books
  const authorsList = useMemo(() => {
    const authorCounts = {};
    books.forEach((book) => {
      authorCounts[book.author] = (authorCounts[book.author] || 0) + 1;
    });

    return Object.entries(authorCounts)
      .map(([name, count]) => ({
        name,
        count,
        bio: authorsBio[name] || null,
      }))
      .sort((a, b) => {
        // Prioritize authors with biographical entries, then by count descending, then alphabetically
        if (a.bio && !b.bio) return -1;
        if (!a.bio && b.bio) return 1;
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
      });
  }, []);

  const filteredAuthors = authorsList.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    (a.bio && a.bio.era && a.bio.era.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Voices & Visionaries</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Featured Authors
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Explore {authorsList.length} influential writers, philosophers, scientists, and software architects
            featured in BookVault.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search authors by name..."
          />
        </div>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.map((author) => (
          <AuthorCard
            key={author.name}
            authorName={author.name}
            bookCount={author.count}
            bioData={author.bio}
          />
        ))}
      </div>

      {filteredAuthors.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          No authors found matching "{search}".
        </div>
      )}
    </div>
  );
}
