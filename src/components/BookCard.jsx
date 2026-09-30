import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check, ExternalLink, BookOpen, Layers } from 'lucide-react';
import BookAccessBadge from './BookAccessBadge.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function BookCard({ book, viewMode = 'grid' }) {
  const { isFavorite, toggleFavorite, isInReadingList, toggleReadingList, getProgress } = useLibrary();
  const [imageError, setImageError] = useState(false);

  if (!book) return null;

  const favorite = isFavorite(book.id);
  const inReadingList = isInReadingList(book.id);
  const progress = getProgress(book.id, book.pages);

  // Fallback cover generator when external image cannot be loaded
  const fallbackCover = (
    <div className="w-full h-full min-h-[220px] p-4 flex flex-col justify-between bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 border border-slate-700/50 rounded-lg text-white select-none">
      <div className="flex items-center justify-between opacity-70 text-xs">
        <span className="font-semibold uppercase tracking-wider">{book.category}</span>
        <BookOpen className="w-4 h-4 text-purple-400" />
      </div>
      <div className="my-auto">
        <h4 className="font-serif font-bold text-base line-clamp-3 leading-tight text-slate-100">
          {book.title}
        </h4>
        <p className="text-xs text-purple-300 mt-2 font-medium">{book.author}</p>
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
        <span>{book.year > 0 ? book.year : `${Math.abs(book.year)} BC`}</span>
        <span>{book.pages} pgs</span>
      </div>
    </div>
  );

  // List view rendering
  if (viewMode === 'list') {
    return (
      <div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all duration-300 shadow-sm hover:shadow-md">
        {/* Cover thumbnail */}
        <Link
          to={`/book/${book.id}`}
          className="relative shrink-0 w-20 sm:w-24 h-28 sm:h-36 rounded-lg overflow-hidden bg-slate-900 shadow-md group-hover:scale-102 transition-transform duration-300"
        >
          {!imageError && book.cover ? (
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            fallbackCover
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              {book.category}
            </span>
            {book.subcategory && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                • {book.subcategory}
              </span>
            )}
            <BookAccessBadge accessType={book.accessType} />
          </div>

          <Link to={`/book/${book.id}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-1">
              {book.title}
            </h3>
          </Link>

          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5">
            by{' '}
            <Link
              to={`/authors?search=${encodeURIComponent(book.author)}`}
              className="hover:underline hover:text-purple-500 dark:hover:text-purple-400"
            >
              {book.author}
            </Link>
            <span className="mx-2 text-slate-400">•</span>
            <span>{book.year > 0 ? book.year : `${Math.abs(book.year)} BC`}</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>{book.pages} pages</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {book.description}
          </p>

          {/* Reading progress indicator if engaged */}
          {progress && progress.currentPage > 0 && (
            <div className="mt-3 flex items-center gap-3 max-w-xs">
              <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                {progress.percentage}%
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex sm:flex-col items-center gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80">
          <Link
            to={`/book/${book.id}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-xs hover:shadow transition-all"
          >
            Details
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleFavorite(book.id, book.title)}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              title={favorite ? 'Favorited' : 'Add to Favorites'}
              className={`p-2 rounded-xl border transition-all ${
                favorite
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 hover:text-rose-500 border-slate-200 dark:border-slate-700/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => toggleReadingList(book.id, book.title)}
              aria-label={inReadingList ? 'In reading list' : 'Add to reading list'}
              title={inReadingList ? 'In Reading List' : 'Add to Reading List'}
              className={`p-2 rounded-xl border transition-all ${
                inReadingList
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 hover:text-emerald-500 border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {inReadingList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view rendering (Default)
  return (
    <div className="group relative flex flex-col h-full rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/90 dark:border-slate-800/90 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1">
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <Link to={`/book/${book.id}`} className="block w-full h-full">
          {!imageError && book.cover ? (
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            fallbackCover
          )}
        </Link>

        {/* Floating Quick Action Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <BookAccessBadge accessType={book.accessType} className="backdrop-blur-md bg-slate-900/80" />
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => toggleFavorite(book.id, book.title)}
              aria-label="Toggle Favorite"
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                favorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-900/70 text-slate-200 hover:text-white hover:bg-slate-900/90'
              }`}
              title={favorite ? 'Remove Favorite' : 'Save to Favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => toggleReadingList(book.id, book.title)}
              aria-label="Toggle Reading List"
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                inReadingList
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-900/70 text-slate-200 hover:text-white hover:bg-slate-900/90'
              }`}
              title={inReadingList ? 'In Reading List' : 'Add to Reading List'}
            >
              {inReadingList ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Progress bar overlay if active */}
        {progress && progress.currentPage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/60 backdrop-blur-xs">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        )}
      </div>

      {/* Book Metadata */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-[11px]">
            {book.category}
          </span>
          <span>{book.year > 0 ? book.year : `${Math.abs(book.year)} BC`}</span>
        </div>

        <Link to={`/book/${book.id}`} className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 line-clamp-1 leading-snug">
            {book.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
          by{' '}
          <Link
            to={`/authors?search=${encodeURIComponent(book.author)}`}
            className="hover:underline hover:text-purple-600 dark:hover:text-purple-400"
          >
            {book.author}
          </Link>
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
          {book.description}
        </p>

        {/* Bottom Card Actions */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>{book.pages} pgs</span>
          </div>

          <div className="flex items-center gap-2">
            {book.readUrl && (
              <a
                href={book.readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                title="Read free online"
              >
                <BookOpen className="w-3 h-3" />
                Read
              </a>
            )}

            <Link
              to={`/book/${book.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-xs"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
