'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { favoritesService } from '@/lib/firebase/favorites';

export interface FavoriteItem {
  id: string;
  type: 'expression' | 'vocabulary' | 'conversation' | 'grammar' | 'number' | 'alphabet';
  french: string;
  english: string;
  category?: string;
  pronunciation?: string;
  example?: string;
  addedAt: Date;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => Promise<void>;
  removeFromFavorites: (id: string) => Promise<void>;
  isFavorite: (type: string, french: string) => boolean;
  toggleFavorite: (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => Promise<void>;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const loadFavoritesFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        const parsedFavorites = JSON.parse(stored).map((fav: FavoriteItem) => ({
          ...fav,
          addedAt: new Date(fav.addedAt)
        }));
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  };

  const loadFavoritesFromFirebase = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const firebaseFavorites = await favoritesService.getUserFavorites(user.uid);
      setFavorites(firebaseFavorites);
      
      // Sync any local favorites that aren't in Firebase
      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (localFavorites.length > 0) {
        await favoritesService.syncLocalFavoritesToFirebase(user.uid, localFavorites);
        // Reload favorites after sync
        const updatedFavorites = await favoritesService.getUserFavorites(user.uid);
        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from Firebase:', error);
      loadFavoritesFromLocalStorage();
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load favorites from localStorage (for non-authenticated users) or Firebase (for authenticated users)
  useEffect(() => {
    if (isAuthenticated && user) {
      loadFavoritesFromFirebase();
    } else {
      loadFavoritesFromLocalStorage();
    }
  }, [isAuthenticated, user, loadFavoritesFromFirebase]);

  const saveFavoritesToLocalStorage = (newFavorites: FavoriteItem[]) => {
    try {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  };

  const saveFavoritesToFirebase = async (newFavorites: FavoriteItem[]) => {
    if (!user) return;
    
    try {
      // Save each favorite to Firebase
      for (const favorite of newFavorites) {
        await favoritesService.addFavorite(user.uid, favorite);
      }
    } catch (error) {
      console.error('Error saving favorites to Firebase:', error);
    }
  };

  const addToFavorites = async (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: `${item.type}-${item.french}-${Date.now()}`,
      addedAt: new Date()
    };

    const newFavorites = [...favorites, newFavorite];
    setFavorites(newFavorites);

    // Save to storage
    saveFavoritesToLocalStorage(newFavorites);
    if (isAuthenticated && user) {
      await saveFavoritesToFirebase(newFavorites);
    }
  };

  const removeFromFavorites = async (id: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(newFavorites);

    // Save to storage
    saveFavoritesToLocalStorage(newFavorites);
    if (isAuthenticated && user) {
      await favoritesService.removeFavorite(user.uid, id);
    }
  };

  const isFavorite = (type: string, french: string): boolean => {
    return favorites.some(fav => fav.type === type && fav.french === french);
  };

  const toggleFavorite = async (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    if (isFavorite(item.type, item.french)) {
      const favoriteToRemove = favorites.find(fav => fav.type === item.type && fav.french === item.french);
      if (favoriteToRemove) {
        await removeFromFavorites(favoriteToRemove.id);
      }
    } else {
      await addToFavorites(item);
    }
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    loading
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
