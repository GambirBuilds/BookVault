# BookVault — Online Book Library & Discovery Platform

> **Digital Library + Book Discovery + Reading Tracker + Personal Library**

BookVault is a modern, responsive, production-quality digital library platform designed for avid readers, researchers, and lifelong learners. It catalogs **over 220 genuine, verified books** across classical literature, science, technology, economics, and philosophy with authentic metadata and verified legal sources.

---

## 🌟 Overview

BookVault provides a distraction-free, aesthetically pleasing reading vault. Readers can:
- **Discover & Search Books**: Instant, predictive fuzzy search with suggestions across 220+ genuine volumes.
- **Access Legitimate Public Domain & Open-Access Editions**: Legally read or download direct from verified sources (Project Gutenberg, Standard Ebooks, OpenStax, and authorized university repositories).
- **Find Official & Publisher Editions**: Direct links to authorized publisher pages, Google Books previews, and Open Library catalogs without pirated or fake files.
- **Curate a Personal Library**: Manage Favorites, "Want to Read" lists, and "Currently Reading" progress.
- **Track Reading Progress**: Interactive page-by-page progress bars with celebration animations and completion badges.
- **Reading Streak & Annual Goals**: Build daily reading momentum with an automatic streak counter and customizable annual reading target.

---

## 🚀 Key Features

1. **220+ Genuine Books Database**
   - Verified titles, authentic authors, real publication years, true page counts, and real ISBNs.
   - Six major disciplinary categories: Fiction, Non-Fiction, Technology, Business, Personal Development, and Education & Science.

2. **Legal Access Classification System**
   - 🟢 **FREE / PUBLIC DOMAIN**: Full legal text available on Project Gutenberg / Standard Ebooks with Read Online and direct links.
   - 🟠 **OPEN ACCESS**: Open textbooks and technical books licensed under Creative Commons or open repositories (OpenStax, Green Tea Press, Eloquent JavaScript, Git-SCM).
   - 🔵 **OFFICIAL SOURCE**: Modern copyrighted works directing users to authorized publisher pages, Google Books previews, or bookstore listings.
   - 🟣 **LIBRARY ACCESS**: Digital lending and catalog lookup via Open Library and WorldCat.
   - *Strict anti-piracy guarantee: Zero pirated or fake PDF links.*

3. **Smart Search & Filters**
   - Live predictive suggestions based on actual catalog entries.
   - Multi-criteria filtering by Category, Subcategory, Author, Access Type, and Era (Pre-1900, 20th Century, Contemporary).
   - Dynamic sorting: Curated, Title (A-Z / Z-A), Author, Oldest, Newest, Page count, and Recently Added.
   - View mode toggle: Switch seamlessly between Grid View and List View.

4. **Personal Library Dashboard**
   - Time-aware personalized greeting ("Good morning / afternoon / evening, Reader 👋").
   - At-a-glance counters for Books Read, Currently Reading, Want to Read, and Favorites.
   - Interactive Annual Reading Goal with live progress bar.
   - "Continue Reading" shortcuts to pick up incomplete books with one click.
   - Persistent Reading Activity timeline logging every progress update, bookmark, and completion.

5. **Literary Touchpoints**
   - **Book of the Day**: Deterministic date-based daily recommendation.
   - **Quote of the Day**: Rotating verified literary quote with work attribution.
   - **Surprise Me**: Intelligent random book picker.
   - **Contextual Recommendations ("You May Also Like")**: Similarity scoring based on genre, author, and thematic tags.

6. **Theming & Accessibility**
   - Seamless Dark Mode (default `#0B0F14` palette) and Light Mode toggle.
   - Fully responsive for mobile (375px), tablet, laptop, and ultra-wide screens (1920px).
   - Non-intrusive toast notifications for feedback.

---

## 🛠 Technology Stack

- **React 19**: Modern component-driven frontend architecture.
- **Vite 8**: Next-generation frontend tooling and rapid bundling.
- **JavaScript (ES2024)**: Clean, readable, university-grade code structure without unnecessary TypeScript complexity.
- **Tailwind CSS 4**: Modern utility-first styling with custom typography and CSS variables.
- **React Router 7**: Declarative client-side routing with URL query synchronization.
- **LocalStorage API**: Zero-friction client persistence without mandatory user authentication.
- **Lucide React**: Clean, accessible vector iconography.
- **Canvas Confetti**: Lightweight micro-celebrations upon finishing books or reaching reading goals.

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── AuthorCard.jsx          # Author showcase card with biography snippet & book count
│   ├── BookAccessBadge.jsx     # Visual badge for Public Domain, Open Access, Official, Library
│   ├── BookCard.jsx            # Book card supporting Grid and List view modes
│   ├── BookGrid.jsx            # Responsive grid with progressive loading and empty state
│   ├── CategoryCard.jsx        # Category dashboard card with dynamic book counts
│   ├── EmptyState.jsx          # Reusable fallback illustration for empty lists
│   ├── FilterPanel.jsx         # Category, access, era, and sorting controls
│   ├── Footer.jsx              # Navigation, legal statements, and copyright policy
│   ├── GlobalSearchModal.jsx   # Command-K / modal search across books, authors, & categories
│   ├── Navbar.jsx              # Header with logo, navigation, search, streak, and theme toggle
│   ├── ReadingProgress.jsx     # Interactive page tracker with progress bar & status buttons
│   ├── SearchBar.jsx           # Predictive search bar with dataset autocomplete
│   └── ToastContainer.jsx      # Non-intrusive floating notification system
│
├── context/
│   └── LibraryContext.jsx      # Global state for theme, favorites, reading list, streak, & toasts
│
├── data/
│   ├── books/
│   │   ├── fiction.js          # 40 verified fiction masterpieces
│   │   ├── nonfiction.js       # 40 historical, biographical, & philosophical works
│   │   ├── technology.js       # 40 computer science & software engineering books
│   │   ├── business.js         # 35 finance, management, & startup classics
│   │   ├── personalDev.js      # 35 productivity, habit, & leadership guides
│   │   └── education.js        # 30 physics, mathematics, & learning volumes
│   ├── books.js                # Aggregated 220+ books catalog & query helpers
│   ├── categories.js           # Category definitions, icons, and descriptions
│   ├── authors.js              # Author biographies and historical eras
│   └── quotes.js               # Verified literary quotes & quote-of-the-day generator
│
├── pages/
│   ├── Home.jsx                # Hero, statistics, featured, free books, categories, daily pick
│   ├── Books.jsx               # Complete catalogue with instant search, filters, & sorting
│   ├── BookDetails.jsx         # Large cover, metadata, access buttons, progress tracker, & similar
│   ├── Categories.jsx          # Discipline directory with real-time book counts
│   ├── Authors.jsx             # Author index with bios and direct catalogue filtering
│   ├── MyLibrary.jsx           # Personal dashboard, reading goal, streak, tabs, & timeline
│   ├── About.jsx               # Mission, features, technology stack, and legal copyright policy
│   └── NotFound.jsx            # 404 error page with quick search and recovery links
│
├── utils/
│   ├── storage.js              # LocalStorage persistence helpers (favorites, list, progress, goal)
│   ├── filters.js              # Filter, search suggestion, and multi-criteria sorting logic
│   └── recommendations.js      # Algorithmic similarity engine for "You May Also Like"
│
├── App.tsx                     # Top-level routing and providers
├── main.tsx                    # React DOM entry point
└── index.css                   # Global Tailwind styling, typography, and custom scrollbars
```

---

## 💻 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd bookvault
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Production Build**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 💾 LocalStorage Schema

BookVault stores all user state on the client side using the HTML5 LocalStorage API under discrete keys:

| Key | Type | Description |
|---|---|---|
| `bookvault_theme` | `string` | `'dark'` or `'light'` (defaults to dark) |
| `bookvault_favorites` | `number[]` | Array of favorited book IDs |
| `bookvault_reading_list` | `number[]` | Array of book IDs saved to "Want to Read" |
| `bookvault_reading_progress` | `object` | Map of `{ [bookId]: { status, currentPage, totalPages, percentage, lastUpdated } }` |
| `bookvault_recently_viewed` | `number[]` | Array of up to 10 recently opened book IDs |
| `bookvault_streak` | `object` | `{ count: number, lastActiveDate: 'YYYY-MM-DD' }` |
| `bookvault_reading_goal` | `object` | `{ year: number, target: number }` |
| `bookvault_activities` | `object[]` | Timeline array of recent interactions and progress logs |

---

## ⚖️ Legal & Copyright Approach

BookVault takes intellectual property laws seriously:
1. **Zero Pirated Materials**: BookVault never hosts or distributes copyrighted digital files (PDFs, EPUBs, or scans) without explicit licensing.
2. **Authorized Public Domain**: Public-domain literature is linked directly to authoritative, open non-profit archives (e.g., Project Gutenberg, Standard Ebooks).
3. **Open-Access Textbooks**: Educational and open software manuals are sourced exclusively from official open repositories (e.g., OpenStax, Green Tea Press, Rust Foundation, MIT OpenCourseWare).
4. **Official & Commercial Editions**: Copyrighted contemporary works link directly to legitimate publisher websites (Penguin Random House, Simon & Schuster, HarperCollins, O'Reilly Media) or authorized library indices (Open Library, WorldCat, Google Books).

---

## 📄 License

This application is distributed under the MIT License for educational and non-commercial portfolio use.
