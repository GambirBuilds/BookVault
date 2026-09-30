import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Book, User, Tag, ArrowRight } from 'lucide-react';
import { books } from '../data/books.js';
import { getSearchSuggestions } from '../utils/filters.js';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search by title, author, keyword, or topic...',
  className = '',
  autoFocus = false,
}) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Handle typing & update suggestions
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onChange) onChange(val);

    if (val.trim().length >= 2) {
      const results = getSearchSuggestions(books, val, 6);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/books?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setIsOpen(false);
    if (suggestion.type === 'book' && suggestion.id) {
      navigate(`/book/${suggestion.id}`);
    } else if (suggestion.type === 'author') {
      navigate(`/books?author=${encodeURIComponent(suggestion.text)}`);
    } else {
      setQuery(suggestion.text);
      if (onChange) onChange(suggestion.text);
      if (onSearch) onSearch(suggestion.text);
      else navigate(`/books?search=${encodeURIComponent(suggestion.text)}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim().length >= 2 && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 shadow-sm transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Instant Search Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Suggested Matches
          </div>
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(item)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400">
                  {item.type === 'book' ? (
                    <Book className="w-3.5 h-3.5" />
                  ) : item.type === 'author' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Tag className="w-3.5 h-3.5" />
                  )}
                </span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                  {item.text}
                </span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 capitalize shrink-0 ml-2">
                {item.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
