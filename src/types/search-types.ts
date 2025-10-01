/**
 * Search-related Types
 */

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  keywords?: string[];
}

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

