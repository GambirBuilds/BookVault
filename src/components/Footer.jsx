import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { books } from '../data/books.js';

export default function Footer() {
  const freeBooksCount = books.filter(
    (b) => b.accessType === 'public-domain' || b.accessType === 'open-access'
  ).length;

  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-[#0B0F14]/90 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif font-black text-xl text-slate-900 dark:text-white">
                Book<span className="text-purple-600 dark:text-purple-400">Vault</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              A modern digital library and book discovery platform cataloging {books.length}+ genuine
              titles with verified metadata, legitimate public domain editions, and official publisher sources.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20">
                {books.length}+ Books Verified
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                {freeBooksCount} Legally Free
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20">
                Zero Pirated Files
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/books" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/authors" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/my-library" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Personal Library
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About BookVault
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Legal & Copyright</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              BookVault strictly respects copyright law and intellectual property rights. All reading
              links point exclusively to authorized repositories including Project Gutenberg, Standard
              Ebooks, Open Library, OpenStax, and publisher previews.
            </p>
            <div className="pt-1">
              <Link
                to="/about#copyright"
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Read our Copyright Policy</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BookVault. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for readers, lifelong learners, and bibliophiles.
          </p>
        </div>
      </div>
    </footer>
  );
}
