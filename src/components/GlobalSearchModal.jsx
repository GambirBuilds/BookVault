import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Book, User, Compass, ArrowRight } from 'lucide-react';
import { books } from '../data/books.js';
import { categories } from '../data/categories.js';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Handled outside or toggled
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Matched books (up to 4)
  const matchedBooks = trimmed
    ? books
        .filter(
          (b) =>
            b.title.toLowerCase().includes(trimmed) ||
            b.author.toLowerCase().includes(trimmed) ||
            b.category.toLowerCase().includes(trimmed) ||
            b.tags.some((t) => t.toLowerCase().includes(trimmed))
        )
        .slice(0, 5)
    : [];

  // Matched authors
  const uniqueAuthors = Array.from(new Set(books.map((b) => b.author)));
  const matchedAuthors = trimmed
    ? uniqueAuthors
        .filter((a) => a.toLowerCase().includes(trimmed))
        .slice(0, 3)
    : [];

  // Matched categories
  const matchedCategories = trimmed
    ? categories
        .filter(
          (c) =>
            c.name.toLowerCase().includes(trimmed) ||
            c.description.toLowerCase().includes(trimmed)
        )
        .slice(0, 2)
    : [];

  const handleSelectBook = (id) => {
    onClose();
    navigate(`/book/${id}`);
  };

  const handleSelectAuthor = (author) => {
    onClose();
    navigate(`/books?author=${encodeURIComponent(author)}`);
  };

  const handleSelectCategory = (categoryName) => {
    onClose();
    navigate(`/books?category=${encodeURIComponent(categoryName)}`);
  };

  const handleFullSearch = () => {
    onClose();
    navigate(`/books?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-purple-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleFullSearch();
              }
            }}
            placeholder="Search books, authors, categories, or keywords..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-6">
          {!trimmed && (
            <div className="py-8 text-center text-slate-400 text-sm">
              <p>Type at least one character to search across 220+ genuine books.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Fiction', 'Technology', 'Science', 'Jane Austen', 'Algorithms'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-500/10 hover:text-purple-500 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && matchedBooks.length === 0 && matchedAuthors.length === 0 && matchedCategories.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              No direct matches found for "{query}". Press Enter to view full catalogue search.
            </div>
          )}

          {/* Books Group */}
          {matchedBooks.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                <Book className="w-3.5 h-3.5 text-purple-500" />
                <span>Books</span>
              </div>
              <div className="space-y-1">
                {matchedBooks.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleSelectBook(book.id)}
                    className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-12 rounded bg-slate-800 shrink-0 overflow-hidden shadow-xs">
                        <img
                          src={book.cover}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-500 transition-colors truncate">
                          {book.title}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">
                          by {book.author} • {book.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 capitalize shrink-0 ml-2">
                      {book.accessType === 'public-domain' ? 'Free' : 'Source'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Authors Group */}
          {matchedAuthors.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Authors</span>
              </div>
              <div className="space-y-1">
                {matchedAuthors.map((author, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAuthor(author)}
                    className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-purple-500">
                      {author}
                    </span>
                    <span className="text-xs text-purple-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View author books</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories Group */}
          {matchedCategories.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-500" />
                <span>Categories</span>
              </div>
              <div className="space-y-1">
                {matchedCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCategory(c.name)}
                    className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <h5 className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-purple-500">
                        {c.name}
                      </h5>
                      <p className="text-xs text-slate-400 line-clamp-1">{c.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Enter action */}
        {trimmed && (
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Press Enter to search all results</span>
            <button
              onClick={handleFullSearch}
              className="font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View all matching books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
