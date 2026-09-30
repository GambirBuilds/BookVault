import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Heart,
  Bookmark,
  CheckCircle2,
  Clock,
  History,
  Flame,
  Target,
  Edit2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext.jsx';
import { books, getBookById } from '../data/books.js';
import BookGrid from '../components/BookGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function MyLibrary() {
  const {
    favorites,
    readingList,
    progressMap,
    recentlyViewed,
    streak,
    readingGoal,
    updateGoal,
    activities,
    completedCount,
    currentlyReadingCount,
    wantToReadCount,
  } = useLibrary();

  const [activeTab, setActiveTab] = useState('reading');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalTargetInput, setGoalTargetInput] = useState(readingGoal.target || 15);

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Derived book collections
  const currentlyReadingBooks = Object.values(progressMap)
    .filter((p) => p.status === 'reading' && p.currentPage > 0)
    .map((p) => getBookById(p.bookId))
    .filter(Boolean);

  const wantToReadBooks = readingList
    .map((id) => getBookById(id))
    .filter(Boolean);

  const completedBooks = Object.values(progressMap)
    .filter((p) => p.status === 'completed' || p.percentage === 100)
    .map((p) => getBookById(p.bookId))
    .filter(Boolean);

  const favoriteBooks = favorites
    .map((id) => getBookById(id))
    .filter(Boolean);

  const recentBooks = recentlyViewed
    .map((id) => getBookById(id))
    .filter(Boolean);

  // Goal calculation
  const goalProgress = Math.min(
    100,
    Math.round((completedCount / (readingGoal.target || 1)) * 100)
  );

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    updateGoal(goalTargetInput);
    setIsEditingGoal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* 1. Header & Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Personal Dashboard</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{greeting}, Reader</span>
            <span className="inline-block animate-pulse">👋</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            Track reading habits, manage bookmarks, celebrate milestones, and revisit recent works.
          </p>
        </div>

        {/* Streak & Goal summary pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-xs">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-bounce" />
            <div>
              <div className="text-xs font-bold leading-none">{streak.count} Day Streak</div>
              <div className="text-[10px] opacity-80 mt-0.5">Active today</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Stats & Annual Goal Progress Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Quick Counters */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('reading')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === 'reading'
                ? 'bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400'
                : 'bg-white dark:bg-[#151B23] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-500/40'
            }`}
          >
            <BookOpen className="w-5 h-5 text-purple-500 mb-2" />
            <span className="font-serif text-2xl sm:text-3xl font-bold block">
              {currentlyReadingCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Reading
            </span>
          </button>

          <button
            onClick={() => setActiveTab('want-to-read')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === 'want-to-read'
                ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'bg-white dark:bg-[#151B23] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
            }`}
          >
            <Clock className="w-5 h-5 text-indigo-500 mb-2" />
            <span className="font-serif text-2xl sm:text-3xl font-bold block">
              {wantToReadCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Want to Read
            </span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === 'completed'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'bg-white dark:bg-[#151B23] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <span className="font-serif text-2xl sm:text-3xl font-bold block">
              {completedCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Completed
            </span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === 'favorites'
                ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                : 'bg-white dark:bg-[#151B23] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-500/40'
            }`}
          >
            <Heart className="w-5 h-5 text-rose-500 mb-2" />
            <span className="font-serif text-2xl sm:text-3xl font-bold block">
              {favorites.length}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Favorites
            </span>
          </button>
        </div>

        {/* Annual Reading Goal Card */}
        <div className="md:col-span-4 p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-purple-500" />
              <span>{readingGoal.year} Reading Goal</span>
            </h3>
            <button
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEditingGoal ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditingGoal ? (
            <form onSubmit={handleGoalSubmit} className="my-auto space-y-2">
              <label className="block text-xs text-slate-500">Target Books Count</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={goalTargetInput}
                  onChange={(e) => setGoalTargetInput(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold shrink-0"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-baseline justify-between text-slate-900 dark:text-slate-100 mb-2">
                <span className="font-serif text-2xl font-black">
                  {completedCount} / {readingGoal.target}
                </span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {goalProgress}% Complete
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 mt-2">
                {completedCount >= readingGoal.target
                  ? '🎉 Congratulations! You achieved your annual reading goal!'
                  : `${readingGoal.target - completedCount} more books to reach your target.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Continue Reading Spotlight (Section 33) */}
      {currentlyReadingBooks.length > 0 && (
        <section className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/30 to-indigo-950/20 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>Continue Reading</span>
            </h2>
            <span className="text-xs font-medium text-slate-400">
              Pick up right where you left off
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyReadingBooks.map((book) => {
              const p = progressMap[book.id];
              return (
                <div
                  key={book.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                      {book.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">{book.author}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${p?.percentage || 0}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-purple-500">
                        {p?.percentage || 0}%
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/book/${book.id}`}
                    className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shrink-0 shadow-xs"
                    title="Continue Reading"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'reading', label: 'Currently Reading', count: currentlyReadingCount, icon: BookOpen },
          { id: 'want-to-read', label: 'Want to Read', count: wantToReadCount, icon: Clock },
          { id: 'completed', label: 'Completed', count: completedCount, icon: CheckCircle2 },
          { id: 'favorites', label: 'Favorites', count: favorites.length, icon: Heart },
          { id: 'recently-viewed', label: 'Recently Viewed', count: recentBooks.length, icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 5. Tab Content Panes */}
      <div>
        {activeTab === 'reading' && (
          <div>
            {currentlyReadingBooks.length > 0 ? (
              <BookGrid books={currentlyReadingBooks} />
            ) : (
              <EmptyState
                icon={BookOpen}
                title="No books currently being read"
                description="Browse our catalogue and mark your first book as 'Reading' to track your pages."
                actionLabel="Discover Books"
                actionLink="/books"
              />
            )}
          </div>
        )}

        {activeTab === 'want-to-read' && (
          <div>
            {wantToReadBooks.length > 0 ? (
              <BookGrid books={wantToReadBooks} />
            ) : (
              <EmptyState
                icon={Clock}
                title="Your Reading List is empty"
                description="Click the '+' button on any book card to save it for future reading sessions."
                actionLabel="Explore Catalog"
                actionLink="/books"
              />
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div>
            {completedBooks.length > 0 ? (
              <BookGrid books={completedBooks} />
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="No completed books yet"
                description="Finish your first book and mark it completed to build your achievements list!"
                actionLabel="Find a Short Read"
                actionLink="/books?sortBy=pages-asc"
              />
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            {favoriteBooks.length > 0 ? (
              <BookGrid books={favoriteBooks} />
            ) : (
              <EmptyState
                icon={Heart}
                title="No favorite books yet"
                description="Start exploring and save books you love to easily find them again."
                actionLabel="Browse Popular Books"
                actionLink="/books"
              />
            )}
          </div>
        )}

        {activeTab === 'recently-viewed' && (
          <div>
            {recentBooks.length > 0 ? (
              <BookGrid books={recentBooks} />
            ) : (
              <EmptyState
                icon={History}
                title="No recently viewed books"
                description="As you explore books across BookVault, your browsing trail will appear here."
                actionLabel="Start Browsing"
                actionLink="/books"
              />
            )}
          </div>
        )}
      </div>

      {/* 6. Reading Activity Timeline (Section 33) */}
      <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
          <History className="w-5 h-5 text-purple-500" />
          <span>Recent Reading Activity</span>
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {activities.slice(0, 8).map((act) => (
            <div key={act.id} className="relative flex items-start gap-3">
              <span className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-white dark:ring-[#0B0F14]" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {act.text}
                </p>
                <span className="text-[11px] text-slate-400">
                  {new Date(act.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
