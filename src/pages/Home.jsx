import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Shuffle,
  Quote,
  Library,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  books,
  getFeaturedBooks,
  getPopularBooks,
  getFreeLegalBooks,
  getRecentlyAddedBooks,
  getBookOfTheDay,
  getRandomBook,
} from '../data/books.js';
import { categories } from '../data/categories.js';
import { getQuoteOfTheDay } from '../data/quotes.js';
import SearchBar from '../components/SearchBar.jsx';
import BookCard from '../components/BookCard.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function Home() {
  const navigate = useNavigate();
  const { streak } = useLibrary();

  // Dataset analytics (dynamically calculated)
  const totalBooks = books.length;
  const totalCategories = categories.length;
  const uniqueAuthors = new Set(books.map((b) => b.author)).size;
  const freeBooks = getFreeLegalBooks();
  const freeBooksCount = freeBooks.length;

  const featuredBooks = getFeaturedBooks(8);
  const popularBooks = getPopularBooks(8);
  const freeHighlights = freeBooks.slice(0, 8);
  const recentlyAdded = getRecentlyAddedBooks(6);
  const bookOfTheDay = getBookOfTheDay();
  const quote = getQuoteOfTheDay();

  // Random book picker modal/state
  const [isFindingRandom, setIsFindingRandom] = useState(false);

  const handleSurpriseMe = () => {
    setIsFindingRandom(true);
    setTimeout(() => {
      const random = getRandomBook();
      setIsFindingRandom(false);
      navigate(`/book/${random.id}`);
    }, 600);
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & Search */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Modern Digital Library for Lifelong Readers</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Discover Your Next <br />
                <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
                  Great Read
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore {totalBooks}+ verified books, discover celebrated authors, access legally free public
                domain works, and track your personal reading journey in one seamless vault.
              </p>

              {/* Hero Search Bar */}
              <div className="max-w-xl mx-auto lg:mx-0 pt-2">
                <SearchBar
                  placeholder="Search 220+ books, authors, or topics..."
                  onSearch={(q) => navigate(`/books?search=${encodeURIComponent(q)}`)}
                />
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all hover:scale-102"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Books</span>
                </Link>

                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 transition-all hover:scale-102 shadow-xs"
                >
                  <Compass className="w-4 h-4 text-purple-500" />
                  <span>Browse Categories</span>
                </Link>

                <button
                  onClick={handleSurpriseMe}
                  disabled={isFindingRandom}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-all"
                  title="Pick a random book from the vault"
                >
                  <Shuffle className={`w-4 h-4 ${isFindingRandom ? 'animate-spin' : ''}`} />
                  <span>{isFindingRandom ? 'Finding read...' : 'Surprise Me'}</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Genuine Metadata</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>Legitimate Access Links</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>No Registration Required</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visually Attractive Book-Stack Composition */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center">
                {/* Background decorative rotation cards */}
                <div className="absolute w-56 sm:w-64 aspect-[3/4] rounded-2xl bg-gradient-to-tr from-indigo-900 to-purple-900 opacity-60 transform -rotate-12 translate-x-4 shadow-xl border border-purple-500/30 -z-10" />
                <div className="absolute w-56 sm:w-64 aspect-[3/4] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 opacity-70 transform rotate-8 -translate-x-6 shadow-xl border border-slate-700/50 -z-10" />

                {/* Main Featured Showcase Card (Book of the Day or Classic) */}
                <div className="relative w-60 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 group">
                  <img
                    src={bookOfTheDay.cover}
                    alt={bookOfTheDay.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500 text-white w-fit mb-1.5">
                      Book of the Day
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white leading-tight">
                      {bookOfTheDay.title}
                    </h3>
                    <p className="text-xs text-purple-300 mt-1">{bookOfTheDay.author}</p>
                    <Link
                      to={`/book/${bookOfTheDay.id}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-purple-600/90 hover:bg-purple-600 px-3.5 py-1.5 rounded-xl backdrop-blur-sm w-fit transition-colors"
                    >
                      <span>Explore Today's Selection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC LIBRARY STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <span className="block font-serif text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">
              {totalBooks}+
            </span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
              Verified Books
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <span className="block font-serif text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
              {totalCategories}+
            </span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
              Disciplines & Categories
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <span className="block font-serif text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
              {uniqueAuthors}+
            </span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
              World Renowned Authors
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <span className="block font-serif text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {freeBooksCount}+
            </span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
              Free & Public Domain
            </span>
          </div>
        </div>
      </section>

      {/* 3. QUOTE OF THE DAY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-900/10 via-slate-900/40 to-slate-900/60 border border-purple-500/20 shadow-md text-center">
          <Quote className="w-10 h-10 text-purple-500/40 mx-auto mb-4" />
          <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-slate-100 leading-relaxed max-w-2xl mx-auto">
            "{quote.quote}"
          </p>
          <div className="mt-4 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            — {quote.author}, <span className="opacity-80 italic lowercase">{quote.work}</span>
          </div>
        </div>
      </section>

      {/* 4. FEATURED BOOKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Featured Books
            </h2>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <span>View All Books</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 5. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Disciplines</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Browse by Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <span>All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 6. FREE & PUBLIC DOMAIN SHOWCASE */}
      <section className="relative overflow-hidden py-12 rounded-3xl bg-emerald-950/20 border border-emerald-500/20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free & Legitimate</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Read Free & Legally
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Public domain classics and open-access educational texts available to read directly online
              or download via verified repositories like Project Gutenberg and OpenStax.
            </p>
          </div>
          <Link
            to="/books?accessType=free-only"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors shrink-0"
          >
            <span>Explore All {freeBooksCount} Free Books</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {freeHighlights.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 7. POPULAR IN BOOKVAULT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Community Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Popular in BookVault
            </h2>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 8. RECENTLY ADDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Newest Catalog Additions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Recently Added Books
            </h2>
          </div>
          <Link
            to="/books?sortBy=recently-added"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <span>View Recent</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {recentlyAdded.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
