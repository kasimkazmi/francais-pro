import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';
import { FavoriteItem } from '@/contexts/FavoritesContext';

const COLLECTION_NAME = 'userFavorites';

export interface FirebaseFavoriteItem {
  id: string;
  type: 'expression' | 'vocabulary' | 'conversation' | 'grammar' | 'number' | 'alphabet';
  french: string;
  english: string;
  category?: string;
  pronunciation?: string;
  example?: string;
  addedAt: Timestamp;
  userId: string;
}

// Convert Firebase document to FavoriteItem
const firebaseToFavoriteItem = (doc: FirebaseFavoriteItem): FavoriteItem => ({
  id: doc.id,
  type: doc.type,
  french: doc.french,
  english: doc.english,
  category: doc.category || undefined,
  pronunciation: doc.pronunciation || undefined,
  example: doc.example || undefined,
  addedAt: doc.addedAt.toDate()
});

// Convert FavoriteItem to Firebase document
const favoriteItemToFirebase = (item: FavoriteItem, userId: string): FirebaseFavoriteItem => {
  const firebaseItem: Partial<FirebaseFavoriteItem> = {
    id: item.id,
    type: item.type,
    french: item.french,
    english: item.english,
    addedAt: Timestamp.fromDate(item.addedAt),
    userId
  };

  // Only add optional fields if they have values (not undefined or empty)
  if (item.category) firebaseItem.category = item.category;
  if (item.pronunciation) firebaseItem.pronunciation = item.pronunciation;
  if (item.example) firebaseItem.example = item.example;

  return firebaseItem as FirebaseFavoriteItem;
};

export const favoritesService = {
  // Get all favorites for a user
  async getUserFavorites(userId: string): Promise<FavoriteItem[]> {
    try {
      const favoritesRef = collection(db, COLLECTION_NAME);
      // First try with the composite index query
      let q = query(
        favoritesRef,
        where('userId', '==', userId),
        orderBy('addedAt', 'desc')
      );
      
      let querySnapshot;
      try {
        querySnapshot = await getDocs(q);
      } catch {
        // If composite index is not available, use simple query without ordering
        console.log('Composite index not available, using simple query');
        q = query(
          favoritesRef,
          where('userId', '==', userId)
        );
        querySnapshot = await getDocs(q);
      }
      
      const favorites: FavoriteItem[] = [];
      
      querySnapshot.forEach((doc) => {
        favorites.push(firebaseToFavoriteItem(doc.data() as FirebaseFavoriteItem));
      });
      
      // Sort manually if we couldn't use the ordered query
      favorites.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
      
      return favorites;
    } catch (error) {
      console.error('Error getting user favorites:', error);
      // Return empty array instead of throwing to allow fallback to localStorage
      return [];
    }
  },

  // Add a favorite item
  async addFavorite(userId: string, item: FavoriteItem): Promise<void> {
    try {
      const favoriteRef = doc(db, COLLECTION_NAME, item.id);
      const firebaseItem = favoriteItemToFirebase(item, userId);
      await setDoc(favoriteRef, firebaseItem);
    } catch (error) {
      console.error('Error adding favorite:', error);
      // Don't throw error to allow fallback to localStorage
    }
  },

  // Remove a favorite item
  async removeFavorite(userId: string, favoriteId: string): Promise<void> {
    try {
      const favoriteRef = doc(db, COLLECTION_NAME, favoriteId);
      await deleteDoc(favoriteRef);
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Don't throw error to allow fallback to localStorage
    }
  },

  // Check if an item is favorited
  async isFavorite(userId: string, type: string, french: string): Promise<boolean> {
    try {
      const favoritesRef = collection(db, COLLECTION_NAME);
      const q = query(
        favoritesRef,
        where('userId', '==', userId),
        where('type', '==', type),
        where('french', '==', french)
      );
      
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking if favorite:', error);
      return false;
    }
  },

  // Sync local favorites to Firebase (for when user logs in)
  async syncLocalFavoritesToFirebase(userId: string, localFavorites: FavoriteItem[]): Promise<void> {
    try {
      // Get existing Firebase favorites
      const existingFavorites = await this.getUserFavorites(userId);
      const existingIds = new Set(existingFavorites.map(fav => fav.id));

      // Add only new favorites that don't exist in Firebase
      const newFavorites = localFavorites.filter(fav => !existingIds.has(fav.id));
      
      for (const favorite of newFavorites) {
        await this.addFavorite(userId, favorite);
      }
    } catch (error) {
      console.error('Error syncing local favorites to Firebase:', error);
      // Don't throw error to allow graceful fallback
    }
  }
};
