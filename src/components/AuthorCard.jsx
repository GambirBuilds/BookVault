import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen, ArrowRight } from 'lucide-react';

export default function AuthorCard({ authorName, bookCount, bioData }) {
  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 dark:hover:border-purple-500/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="flex items-center gap-4 mb-4">
          {bioData?.image ? (
            <img
              src={bioData.image}
              alt={authorName}
              loading="lazy"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/20 shadow-md shrink-0"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center ring-2 ring-purple-500/20 shadow-xs shrink-0 font-serif font-bold text-xl">
              {authorName.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
              {authorName}
            </h3>
            {bioData?.era && (
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium truncate">
                {bioData.era}
              </p>
            )}
            {bioData?.born && (
              <p className="text-[11px] text-slate-400 truncate">{bioData.born}</p>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
          {bioData?.bio || `Author represented in BookVault's curated library collection.`}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <BookOpen className="w-3.5 h-3.5 text-purple-500" />
          {bookCount} {bookCount === 1 ? 'Book' : 'Books'}
        </span>

        <Link
          to={`/books?author=${encodeURIComponent(authorName)}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          <span>View Books</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
