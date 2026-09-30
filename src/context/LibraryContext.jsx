import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredFavorites,
  toggleBookFavorite as toggleFavStorage,
  getStoredReadingList,
  toggleBookReadingList as toggleListStorage,
  getStoredProgressMap,
  updateBookProgress as updateProgressStorage,
  getBookProgress as getProgressStorage,
  getStoredStreak,
  getStoredReadingGoal,
  setStoredReadingGoal,
  getStoredActivities,
  getStoredRecentlyViewed,
  addRecentlyViewed as addRecentlyViewedStorage,
} from '../utils/storage.js';

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(getStoredTheme);

  // Favorites & Reading list state
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [readingList, setReadingList] = useState(getStoredReadingList);

  // Progress state
  const [progressMap, setProgressMap] = useState(getStoredProgressMap);

  // Streak & Goals
  const [streak, setStreak] = useState(getStoredStreak);
  const [readingGoal, setReadingGoal] = useState(getStoredReadingGoal);
  const [activities, setActivities] = useState(getStoredActivities);
  const [recentlyViewed, setRecentlyViewed] = useState(getStoredRecentlyViewed);

  // Toast notification system
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Favorite toggle
  const toggleFavorite = useCallback((bookId, bookTitle = '') => {
    const isNowFav = toggleFavStorage(bookId, bookTitle);
    setFavorites(getStoredFavorites());
    setStreak(getStoredStreak());
    setActivities(getStoredActivities());
    addToast(
      isNowFav ? `Added "${bookTitle || 'Book'}" to favorites ❤️` : `Removed "${bookTitle || 'Book'}" from favorites`,
      'favorite'
    );
    return isNowFav;
  }, [addToast]);

  const isFavorite = useCallback(
    (bookId) => favorites.includes(Number(bookId)),
    [favorites]
  );

  // Reading list toggle
  const toggleReadingList = useCallback((bookId, bookTitle = '') => {
    const isNowInList = toggleListStorage(bookId, bookTitle);
    setReadingList(getStoredReadingList());
    setStreak(getStoredStreak());
    setActivities(getStoredActivities());
    addToast(
      isNowInList ? `Added to Reading List 📚` : `Removed from Reading List`,
      'list'
    );
    return isNowInList;
  }, [addToast]);

  const isInReadingList = useCallback(
    (bookId) => readingList.includes(Number(bookId)),
    [readingList]
  );

  // Update reading progress
  const updateProgress = useCallback((bookId, data) => {
    const updated = updateProgressStorage(bookId, data);
    setProgressMap(getStoredProgressMap());
    setStreak(getStoredStreak());
    setActivities(getStoredActivities());
    addToast(
      updated.percentage === 100
        ? `Book marked as completed! 🎉`
        : `Progress updated: ${updated.percentage}% 📖`,
      'progress'
    );
    return updated;
  }, [addToast]);

  const getProgress = useCallback(
    (bookId, totalPages) => getProgressStorage(bookId, totalPages),
    []
  );

  // Add recently viewed
  const recordViewed = useCallback((bookId) => {
    addRecentlyViewedStorage(bookId);
    setRecentlyViewed(getStoredRecentlyViewed());
  }, []);

  // Update annual goal
  const updateGoal = useCallback((target) => {
    const newGoal = setStoredReadingGoal(target);
    setReadingGoal(newGoal);
    addToast(`Annual reading goal updated to ${newGoal.target} books 🎯`, 'success');
  }, [addToast]);

  // Derived counts for My Library
  const completedCount = Object.values(progressMap).filter(p => p.status === 'completed').length;
  const currentlyReadingCount = Object.values(progressMap).filter(p => p.status === 'reading').length;
  const wantToReadCount = readingList.length;

  return (
    <LibraryContext.Provider
      value={{
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        isFavorite,
        readingList,
        toggleReadingList,
        isInReadingList,
        progressMap,
        updateProgress,
        getProgress,
        streak,
        readingGoal,
        updateGoal,
        activities,
        recentlyViewed,
        recordViewed,
        toasts,
        addToast,
        removeToast,
        completedCount,
        currentlyReadingCount,
        wantToReadCount,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
