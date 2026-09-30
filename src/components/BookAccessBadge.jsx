import React from 'react';
import { BookOpen, ShieldCheck, Library, Globe } from 'lucide-react';

export default function BookAccessBadge({ accessType, className = '' }) {
  switch (accessType) {
    case 'public-domain':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xs ${className}`}
          title="Legally free in the public domain"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <BookOpen className="w-3 h-3" />
          Free to Read
        </span>
      );

    case 'open-access':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-xs ${className}`}
          title="Freely available under an open-access license"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <Globe className="w-3 h-3" />
          Open Access
        </span>
      );

    case 'library':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-xs ${className}`}
          title="Available through legitimate digital lending catalogs & libraries"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          <Library className="w-3 h-3" />
          Library Access
        </span>
      );

    case 'official':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-xs ${className}`}
          title="Official copyrighted edition via authorized publisher or preview"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <ShieldCheck className="w-3 h-3" />
          Official Source
        </span>
      );
  }
}
