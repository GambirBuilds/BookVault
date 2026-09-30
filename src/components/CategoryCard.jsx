import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, Cpu, TrendingUp, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { books } from '../data/books.js';

const iconMap = {
  BookOpen,
  Compass,
  Cpu,
  TrendingUp,
  Sparkles,
  GraduationCap,
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || BookOpen;

  // Real dynamic count directly derived from dataset
  const count = books.filter(
    (b) => b.category.toLowerCase() === category.name.toLowerCase()
  ).length;

  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 dark:hover:border-purple-500/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center ring-1 ring-purple-500/20 group-hover:scale-110 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {count} Books
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          {category.description}
        </p>

        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {category.subcategories.slice(0, 3).map((sub, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
              >
                {sub}
              </span>
            ))}
            {category.subcategories.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                +{category.subcategories.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <Link
        to={`/books?category=${encodeURIComponent(category.name)}`}
        className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 dark:border-slate-800/80 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors"
      >
        <span>Explore Collection</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
