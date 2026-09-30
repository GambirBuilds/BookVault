import React from 'react';
import {
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Heart,
  Globe,
  Sparkles,
  Database,
  Lock,
} from 'lucide-react';
import { books } from '../data/books.js';

export default function About() {
  const freeCount = books.filter(
    (b) => b.accessType === 'public-domain' || b.accessType === 'open-access'
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>About BookVault</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          A Modern Digital Library Built for Readers
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          BookVault bridges classical literature with cutting-edge software, providing a legitimate,
          clutter-free discovery and reading experience.
        </p>
      </div>

      {/* Core Platform Capabilities */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100">
          What can you do with BookVault?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              🔍
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Smart Book Discovery
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore 220+ genuine volumes across fiction, psychology, technology, business, and science
              with instant predictive search.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              🟢
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Legitimate Free Reading
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Access over {freeCount} public domain and open-access editions legally through Project Gutenberg,
              Standard Ebooks, and OpenStax.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              📖
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Personal Reading Tracker
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Log your current page, calculate reading percentages, maintain daily streaks, and set annual
              reading targets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              ❤️
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Private Local Vault
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Save favorites and curate a reading list securely stored in your browser without requiring
              account signups or sharing personal data.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-purple-500" />
          <span>Technology Stack</span>
        </h2>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            BookVault is engineered as a responsive, lightning-fast Single Page Application (SPA) designed
            with high modularity and zero third-party tracking:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: 'React 19', desc: 'Component Architecture' },
              { title: 'Vite', desc: 'Build Tool & Dev Engine' },
              { title: 'JavaScript (ES2024)', desc: 'Clean, Student-Friendly Logic' },
              { title: 'Tailwind CSS', desc: 'Modern Design System' },
              { title: 'React Router', desc: 'Seamless Client-Side Routing' },
              { title: 'LocalStorage API', desc: 'Private Persistent State' },
              { title: 'Lucide React', desc: 'Accessible Icons' },
              { title: 'Canvas Confetti', desc: 'Micro-Celebrations' },
            ].map((tech, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  {tech.title}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  {tech.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal & Copyright Section (Section 31) */}
      <div id="copyright" className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100">
            Legal & Copyright Policy
          </h2>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">
                No Hosting of Copyright-Infringing or Pirated Content
              </strong>
              BookVault does not host, upload, or store unauthorized digital copies of any copyrighted
              materials. All reading links point strictly to authorized external sources.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">
                Public Domain & Open-Access Works
              </strong>
              Books marked as <strong>FREE TO READ</strong> or <strong>OPEN ACCESS</strong> are works that
              have entered the public domain (such as those curated by Project Gutenberg or Standard
              Ebooks) or are openly distributed by their authors under Creative Commons licenses (such as
              OpenStax or Green Tea Press).
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">
                Copyrighted Works & Official Previews
              </strong>
              Books marked as <strong>OFFICIAL SOURCE</strong> link directly to the respective publishers
              (e.g., Penguin Random House, HarperCollins, Simon & Schuster, O'Reilly Media) or legitimate
              library indices such as Open Library and Google Books.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">
                Intellectual Property Inquiries
              </strong>
              BookVault respects intellectual property ownership. If any link or metadata entry is
              identified as misattributed, please contact our catalog administrators for immediate verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
