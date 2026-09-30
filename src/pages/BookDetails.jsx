import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Plus,
  Check,
  BookOpen,
  Download,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Globe,
  FileText,
  Hash,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getBookById } from '../data/books.js';
import { getRecommendationsForBook } from '../utils/recommendations.js';
import BookAccessBadge from '../components/BookAccessBadge.jsx';
import ReadingProgress from '../components/ReadingProgress.jsx';
import BookCard from '../components/BookCard.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isFavorite,
    toggleFavorite,
    isInReadingList,
    toggleReadingList,
    recordViewed,
    addToast,
  } = useLibrary();

  const [imageError, setImageError] = useState(false);
  const book = getBookById(id);

  // Record viewed book in recent history
  useEffect(() => {
    if (book) {
      recordViewed(book.id);
      window.scrollTo(0, 0);
    }
  }, [book, recordViewed]);

  if (!book) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Book Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          The requested book ID #{id} does not exist in our digital repository.
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Books</span>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(book.id);
  const inReadingList = isInReadingList(book.id);
  const recommendations = getRecommendationsForBook(book, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Book link copied to clipboard! 📋', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Book Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Large Book Cover & Action Triggers */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800">
            {!imageError && book.cover ? (
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-white">
                <div className="flex items-center justify-between text-xs opacity-75">
                  <span className="font-bold uppercase tracking-wider">{book.category}</span>
                  <BookOpen className="w-4 h-4 text-purple-400" />
                </div>
                <div className="my-auto">
                  <h3 className="font-serif font-bold text-2xl leading-tight">{book.title}</h3>
                  <p className="text-sm text-purple-300 mt-2">{book.author}</p>
                </div>
                <div className="text-xs text-slate-400 border-t border-slate-800 pt-3 flex justify-between">
                  <span>{book.year > 0 ? book.year : `${Math.abs(book.year)} BC`}</span>
                  <span>{book.pages} pages</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Buttons (Favorite, Reading List, Share) */}
          <div className="w-full max-w-sm mt-5 grid grid-cols-3 gap-3">
            <button
              onClick={() => toggleFavorite(book.id, book.title)}
              className={`py-3 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                favorite
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 shadow-xs'
                  : 'bg-white dark:bg-[#151B23] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-rose-500/30 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              onClick={() => toggleReadingList(book.id, book.title)}
              className={`py-3 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                inReadingList
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-xs'
                  : 'bg-white dark:bg-[#151B23] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 hover:text-emerald-500'
              }`}
            >
              {inReadingList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{inReadingList ? 'In List' : 'Read List'}</span>
            </button>

            <button
              onClick={handleShare}
              className="py-3 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 bg-white dark:bg-[#151B23] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share book link"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Reading Tracker Component */}
          <div className="w-full max-w-sm mt-5">
            <ReadingProgress book={book} />
          </div>
        </div>

        {/* Right Column: Metadata & Access Section */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                {book.category}
              </span>
              {book.subcategory && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {book.subcategory}
                </span>
              )}
              <BookAccessBadge accessType={book.accessType} />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight">
              {book.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-2 font-medium">
              by{' '}
              <Link
                to={`/authors?search=${encodeURIComponent(book.author)}`}
                className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
              >
                {book.author}
              </Link>
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Published
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {book.year > 0 ? book.year : `${Math.abs(book.year)} BC`}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Pages
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {book.pages} pages
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Language
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {book.language || 'English'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                ISBN
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                {book.isbn || 'Pre-ISBN'}
              </p>
            </div>
          </div>

          {/* ACCESS SECTION (Crucial Requirement #4) */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                  <span>Verified Access & Source</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Source Provider: <strong className="text-slate-700 dark:text-slate-300">{book.sourceName}</strong>
                </p>
              </div>
              <BookAccessBadge accessType={book.accessType} />
            </div>

            {/* Access Type Specific Explanation & Buttons */}
            {book.accessType === 'public-domain' && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  This work is legally in the public domain and free to read or download. Preserved by verified non-profit archives.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {book.readUrl && (
                    <a
                      href={book.readUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Online</span>
                    </a>
                  )}

                  {book.pdfUrl && (
                    <a
                      href={book.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 shadow-xs transition-colors"
                    >
                      <Download className="w-4 h-4 text-emerald-500" />
                      <span>PDF / HTML Copy</span>
                    </a>
                  )}

                  {book.officialUrl && (
                    <a
                      href={book.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      <span>Repository Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {book.accessType === 'open-access' && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  This textbook or technical guide is published under an open-access / Creative Commons license by its author or academic institution.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {book.readUrl && (
                    <a
                      href={book.readUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-xs transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Online Free</span>
                    </a>
                  )}

                  {book.pdfUrl && (
                    <a
                      href={book.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 shadow-xs transition-colors"
                    >
                      <Download className="w-4 h-4 text-amber-500" />
                      <span>Download PDF</span>
                    </a>
                  )}

                  {book.officialUrl && (
                    <a
                      href={book.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      <span>Project Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {book.accessType === 'official' && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  This work is copyrighted material. BookVault provides legitimate publisher and authorized preview links. No pirated files are hosted.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {book.officialUrl && (
                    <a
                      href={book.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Official Publisher Page</span>
                    </a>
                  )}

                  {book.libraryUrl && (
                    <a
                      href={book.libraryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 shadow-xs transition-colors"
                    >
                      <span>Find in Open Library</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {book.accessType === 'library' && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Available for digital lending or research lookup through authorized library catalog networks such as Open Library.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {book.libraryUrl && (
                    <a
                      href={book.libraryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Find in Library</span>
                    </a>
                  )}

                  {book.officialUrl && (
                    <a
                      href={book.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      <span>Publisher Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3">
              BookVault adheres strictly to intellectual property rights. All links point solely to legitimate open or publisher-authorized resources.
            </p>
          </div>

          {/* Book Description */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
              Synopsis
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Tags */}
          {book.tags && book.tags.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Subjects & Keywords
              </span>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, i) => (
                  <Link
                    key={i}
                    to={`/books?search=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. RECOMMENDATIONS SECTION: "You May Also Like" */}
      {recommendations.length > 0 && (
        <section className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contextual Similarity</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                You May Also Like
              </h2>
            </div>
            <Link
              to={`/books?category=${encodeURIComponent(book.category)}`}
              className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              More in {book.category}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recommendations.map((rec) => (
              <BookCard key={rec.id} book={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
