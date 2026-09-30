// LocalStorage helper utilities for BookVault

const KEYS = {
  THEME: 'bookvault_theme',
  FAVORITES: 'bookvault_favorites',
  READING_LIST: 'bookvault_reading_list',
  READING_PROGRESS: 'bookvault_reading_progress',
  RECENTLY_VIEWED: 'bookvault_recently_viewed',
  STREAK: 'bookvault_streak',
  READING_GOAL: 'bookvault_reading_goal',
  ACTIVITIES: 'bookvault_activities',
};

// Safe JSON parse wrapper
function getStored(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return defaultValue;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
  }
}

// ----------------- THEME -----------------
export function getStoredTheme() {
  try {
    const theme = localStorage.getItem(KEYS.THEME);
    return theme || 'dark';
  } catch {
    return 'dark';
  }
}

export function setStoredTheme(theme) {
  try {
    localStorage.setItem(KEYS.THEME, theme);
  } catch (e) {
    console.warn('Error setting theme:', e);
  }
}

// ----------------- FAVORITES -----------------
export function getStoredFavorites() {
  return getStored(KEYS.FAVORITES, []);
}

export function isBookFavorite(bookId) {
  const favs = getStoredFavorites();
  return favs.includes(Number(bookId));
}

export function toggleBookFavorite(bookId, bookTitle = '') {
  const id = Number(bookId);
  const favs = getStoredFavorites();
  const exists = favs.includes(id);
  let updated;
  if (exists) {
    updated = favs.filter((item) => item !== id);
    logActivity(`Removed "${bookTitle || 'Book'}" from favorites`, 'favorite', id);
  } else {
    updated = [id, ...favs];
    logActivity(`Added "${bookTitle || 'Book'}" to favorites ❤️`, 'favorite', id);
    updateStreak();
  }
  setStored(KEYS.FAVORITES, updated);
  return !exists;
}

// ----------------- READING LIST (Want to read) -----------------
export function getStoredReadingList() {
  return getStored(KEYS.READING_LIST, []);
}

export function isBookInReadingList(bookId) {
  const list = getStoredReadingList();
  return list.includes(Number(bookId));
}

export function toggleBookReadingList(bookId, bookTitle = '') {
  const id = Number(bookId);
  const list = getStoredReadingList();
  const exists = list.includes(id);
  let updated;
  if (exists) {
    updated = list.filter((item) => item !== id);
    logActivity(`Removed "${bookTitle || 'Book'}" from Reading List`, 'list', id);
  } else {
    updated = [id, ...list];
    logActivity(`Added "${bookTitle || 'Book'}" to Reading List 📚`, 'list', id);
    updateStreak();
  }
  setStored(KEYS.READING_LIST, updated);
  return !exists;
}

// ----------------- READING PROGRESS -----------------
// Structure: { [bookId]: { status: 'want-to-read' | 'reading' | 'completed', currentPage: number, totalPages: number, percentage: number, lastUpdated: string } }
export function getStoredProgressMap() {
  return getStored(KEYS.READING_PROGRESS, {});
}

export function getBookProgress(bookId, defaultTotalPages = 300) {
  const map = getStoredProgressMap();
  const existing = map[Number(bookId)];
  if (existing) return existing;
  return {
    status: 'want-to-read',
    currentPage: 0,
    totalPages: defaultTotalPages || 300,
    percentage: 0,
    lastUpdated: null,
  };
}

export function updateBookProgress(bookId, { status, currentPage, totalPages, bookTitle = '' }) {
  const id = Number(bookId);
  const map = getStoredProgressMap();
  const currentTotal = totalPages || map[id]?.totalPages || 300;
  const validPage = Math.max(0, Math.min(Number(currentPage) || 0, currentTotal));
  const percentage = currentTotal > 0 ? Math.round((validPage / currentTotal) * 100) : 0;
  
  let finalStatus = status || map[id]?.status || 'reading';
  if (percentage === 100 && finalStatus !== 'completed') {
    finalStatus = 'completed';
  }

  const updatedEntry = {
    bookId: id,
    status: finalStatus,
    currentPage: validPage,
    totalPages: currentTotal,
    percentage: Math.min(100, Math.max(0, percentage)),
    lastUpdated: new Date().toISOString(),
  };

  map[id] = updatedEntry;
  setStored(KEYS.READING_PROGRESS, map);

  updateStreak();

  if (finalStatus === 'completed') {
    logActivity(`Completed reading "${bookTitle || 'Book'}"! 🎉`, 'completed', id);
  } else if (finalStatus === 'reading') {
    logActivity(`Read up to page ${validPage} (${percentage}%) of "${bookTitle || 'Book'}"`, 'reading', id);
  }

  return updatedEntry;
}

// ----------------- RECENTLY VIEWED -----------------
export function getStoredRecentlyViewed() {
  return getStored(KEYS.RECENTLY_VIEWED, []);
}

export function addRecentlyViewed(bookId) {
  const id = Number(bookId);
  if (!id) return;
  const list = getStoredRecentlyViewed().filter((item) => item !== id);
  // Keep max 10
  const updated = [id, ...list].slice(0, 10);
  setStored(KEYS.RECENTLY_VIEWED, updated);
}

// ----------------- STREAK TRACKING -----------------
export function getStoredStreak() {
  return getStored(KEYS.STREAK, { count: 1, lastActiveDate: new Date().toISOString().slice(0, 10) });
}

export function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const streak = getStoredStreak();

  if (!streak.lastActiveDate) {
    const initial = { count: 1, lastActiveDate: today };
    setStored(KEYS.STREAK, initial);
    return initial;
  }

  if (streak.lastActiveDate === today) {
    return streak; // Already active today
  }

  const lastDate = new Date(streak.lastActiveDate);
  const currDate = new Date(today);
  const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  let newCount = streak.count;
  if (diffDays === 1) {
    // Consecutive day
    newCount += 1;
  } else if (diffDays > 1) {
    // Broken streak
    newCount = 1;
  }

  const updated = { count: newCount, lastActiveDate: today };
  setStored(KEYS.STREAK, updated);
  return updated;
}

// ----------------- ANNUAL READING GOAL -----------------
export function getStoredReadingGoal() {
  const currentYear = new Date().getFullYear();
  return getStored(KEYS.READING_GOAL, { year: currentYear, target: 15 });
}

export function setStoredReadingGoal(target) {
  const currentYear = new Date().getFullYear();
  const updated = { year: currentYear, target: Math.max(1, Number(target) || 10) };
  setStored(KEYS.READING_GOAL, updated);
  return updated;
}

// ----------------- ACTIVITY TIMELINE -----------------
export function getStoredActivities() {
  return getStored(KEYS.ACTIVITIES, [
    {
      id: 'init-1',
      text: 'Welcome to BookVault! Discover over 200 classic and modern works.',
      type: 'system',
      timestamp: new Date().toISOString()
    }
  ]);
}

export function logActivity(text, type = 'general', bookId = null) {
  const list = getStoredActivities();
  const newActivity = {
    id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    text,
    type,
    bookId,
    timestamp: new Date().toISOString(),
  };
  // Store up to 30 recent actions
  const updated = [newActivity, ...list].slice(0, 30);
  setStored(KEYS.ACTIVITIES, updated);
}
