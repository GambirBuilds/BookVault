export function filterAndSortBooks(books, {
  query = '',
  category = 'all',
  subcategory = 'all',
  author = 'all',
  accessType = 'all',
  yearRange = 'all',
  sortBy = 'default'
}) {
  let result = [...books];

  // 1. Text Search across Title, Author, Category, Tags, and Description
  const trimmed = query.trim().toLowerCase();
  if (trimmed) {
    result = result.filter((book) => {
      const matchTitle = book.title?.toLowerCase().includes(trimmed);
      const matchAuthor = book.author?.toLowerCase().includes(trimmed);
      const matchCategory = book.category?.toLowerCase().includes(trimmed);
      const matchSub = book.subcategory?.toLowerCase().includes(trimmed);
      const matchTags = Array.isArray(book.tags) && book.tags.some(t => t.toLowerCase().includes(trimmed));
      const matchDesc = book.description?.toLowerCase().includes(trimmed);
      const matchIsbn = book.isbn ? String(book.isbn).includes(trimmed) : false;

      return matchTitle || matchAuthor || matchCategory || matchSub || matchTags || matchDesc || matchIsbn;
    });
  }

  // 2. Category filter
  if (category && category !== 'all') {
    result = result.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }

  // 3. Subcategory filter
  if (subcategory && subcategory !== 'all') {
    result = result.filter((b) => b.subcategory.toLowerCase() === subcategory.toLowerCase());
  }

  // 4. Author filter
  if (author && author !== 'all') {
    result = result.filter((b) => b.author.toLowerCase() === author.toLowerCase());
  }

  // 5. Access Type filter
  if (accessType && accessType !== 'all') {
    if (accessType === 'free-only') {
      result = result.filter((b) => b.accessType === 'public-domain' || b.accessType === 'open-access');
    } else {
      result = result.filter((b) => b.accessType === accessType);
    }
  }

  // 6. Year range filter
  if (yearRange && yearRange !== 'all') {
    if (yearRange === 'pre-1900') {
      result = result.filter((b) => b.year < 1900);
    } else if (yearRange === '1900-1999') {
      result = result.filter((b) => b.year >= 1900 && b.year < 2000);
    } else if (yearRange === '2000-present') {
      result = result.filter((b) => b.year >= 2000);
    }
  }

  // 7. Sorting
  switch (sortBy) {
    case 'title-asc':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'author-asc':
      result.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case 'year-asc': // Oldest
      result.sort((a, b) => a.year - b.year);
      break;
    case 'year-desc': // Newest
      result.sort((a, b) => b.year - a.year);
      break;
    case 'pages-desc':
      result.sort((a, b) => b.pages - a.pages);
      break;
    case 'pages-asc':
      result.sort((a, b) => a.pages - b.pages);
      break;
    case 'recently-added':
      result.sort((a, b) => b.id - a.id);
      break;
    default:
      // Keep natural curated order
      break;
  }

  return result;
}

// Generate smart search suggestions based purely on dataset
export function getSearchSuggestions(books, input, maxResults = 5) {
  const query = input.trim().toLowerCase();
  if (!query || query.length < 2) return [];

  const suggestions = new Set();

  for (const book of books) {
    if (book.title.toLowerCase().includes(query)) {
      suggestions.add({ text: book.title, type: 'book', id: book.id });
    }
    if (book.author.toLowerCase().includes(query)) {
      suggestions.add({ text: book.author, type: 'author' });
    }
    if (Array.isArray(book.tags)) {
      for (const tag of book.tags) {
        if (tag.toLowerCase().includes(query)) {
          suggestions.add({ text: tag, type: 'topic' });
        }
      }
    }
    if (suggestions.size >= maxResults * 2) break;
  }

  return Array.from(suggestions).slice(0, maxResults);
}
