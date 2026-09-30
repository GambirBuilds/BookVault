import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Bookmark,
  Heart,
  Compass,
  Users,
  Flame,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext.jsx';
import GlobalSearchModal from './GlobalSearchModal.jsx';

export default function Navbar() {
  const { theme, toggleTheme, favorites, readingList, streak } = useLibrary();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalSaved = favorites.length + readingList.length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Categories', path: '/categories' },
    { name: 'Authors', path: '/authors' },
    { name: 'My Library', path: '/my-library' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#0B0F14]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Book<span className="text-purple-600 dark:text-purple-400">Vault</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Digital Library
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reading Streak Indicator */}
            {streak?.count > 0 && (
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold"
                title={`${streak.count} day reading streak! Active today.`}
              >
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
                <span>{streak.count} Day Streak</span>
              </div>
            )}

            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search dialog"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium transition-all"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F14] px-4 py-4 space-y-2 animate-in slide-in-from-top-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {streak?.count > 0 && (
              <div className="pt-2 flex items-center justify-between text-xs px-4 text-amber-500 font-bold border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-amber-500" />
                  Reading Streak
                </span>
                <span>{streak.count} Days</span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
