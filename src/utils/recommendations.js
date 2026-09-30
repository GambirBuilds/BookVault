import { books } from '../data/books.js';

export function getRecommendationsForBook(currentBook, limit = 4) {
  if (!currentBook) return [];

  const candidates = books.filter((b) => b.id !== currentBook.id);

  // Score candidate books based on real categorical, tag, and author similarity
  const scored = candidates.map((book) => {
    let score = 0;

    // Heavy weight for same author
    if (book.author.toLowerCase() === currentBook.author.toLowerCase()) {
      score += 15;
    }

    // High weight for same subcategory
    if (book.subcategory && book.subcategory === currentBook.subcategory) {
      score += 8;
    }

    // Moderate weight for same main category
    if (book.category === currentBook.category) {
      score += 4;
    }

    // Shared tags
    if (Array.isArray(book.tags) && Array.isArray(currentBook.tags)) {
      const currentTags = currentBook.tags.map((t) => t.toLowerCase());
      book.tags.forEach((tag) => {
        if (currentTags.includes(tag.toLowerCase())) {
          score += 3;
        }
      });
    }

    // Era proximity (within 30 years)
    if (Math.abs(book.year - currentBook.year) <= 30) {
      score += 1;
    }

    return { book, score };
  });

  // Sort by highest score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.book);
}
