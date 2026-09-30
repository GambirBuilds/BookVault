import { fictionBooks } from './books/fiction.js';
import { nonfictionBooks } from './books/nonfiction.js';
import { technologyBooks } from './books/technology.js';
import { businessBooks } from './books/business.js';
import { personalDevBooks } from './books/personalDev.js';
import { educationBooks } from './books/education.js';

export const books = [
  ...fictionBooks,
  ...nonfictionBooks,
  ...technologyBooks,
  ...businessBooks,
  ...personalDevBooks,
  ...educationBooks
];

export function getBookById(id) {
  const numericId = Number(id);
  return books.find((b) => b.id === numericId) || null;
}

export function getBookOfTheDay() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return books[dayOfYear % books.length];
}

export function getRandomBook(excludeId = null) {
  const pool = excludeId ? books.filter((b) => b.id !== Number(excludeId)) : books;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export function getFeaturedBooks(count = 8) {
  // A handpicked showcase of acclaimed titles spanning diverse disciplines
  const featuredIds = [1, 2, 81, 156, 41, 122, 54, 87];
  const list = books.filter((b) => featuredIds.includes(b.id));
  if (list.length >= count) return list.slice(0, count);
  return books.slice(0, count);
}

export function getFreeLegalBooks() {
  return books.filter((b) => b.accessType === 'public-domain' || b.accessType === 'open-access');
}

export function getPopularBooks(count = 8) {
  // Deterministic popular set with diverse classic and modern highlights
  const popularIds = [156, 1, 87, 51, 81, 124, 41, 191];
  return books.filter((b) => popularIds.includes(b.id)).slice(0, count);
}

export function getRecentlyAddedBooks(count = 6) {
  // Show a selection of newer entries in our digital repository
  return [...books].slice(-count).reverse();
}
