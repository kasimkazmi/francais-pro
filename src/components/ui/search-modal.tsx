'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  Hash, 
  MessageCircle, 
  Book, 
  Users, 
  Globe, 
  Lightbulb, 
  FileText,
  X
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons = {
  alphabet: BookOpen,
  numbers: Hash,
  greetings: MessageCircle,
  grammar: Book,
  vocabulary: Users,
  conversations: MessageCircle,
  culture: Globe,
  expressions: Lightbulb,
  immigration: FileText
};

const typeColors = {
  alphabet: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  numbers: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  greetings: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  grammar: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  vocabulary: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  conversations: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  culture: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  expressions: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  immigration: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { searchResults, isSearching, performSearch, clearSearch } = useSearch();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = useCallback((result: { url: string }) => {
    router.push(result.url);
    onClose();
    setQuery('');
    clearSearch();
  }, [router, onClose, clearSearch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          handleResultClick(searchResults[selectedIndex]);
        }
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, onClose, handleResultClick]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Perform search with debounce
  useEffect(() => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch, clearSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClose = () => {
    onClose();
    setQuery('');
    clearSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="bg-white dark:bg-gray-900 border border-border rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[70vh] flex flex-col">
        {/* Search Input */}
        <div className="flex items-center border-b border-gray-300 dark:border-gray-600 p-4">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search French lessons, vocabulary, grammar..."
            value={query}
            onChange={handleInputChange}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
              Searching...
            </div>
          ) : query && searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50 text-gray-500 dark:text-gray-400" />
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm mt-1">Try different keywords</p>
            </div>
          ) : query && searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((result, index) => {
                const Icon = typeIcons[result.type];
                const colorClass = typeColors[result.type];
                const isSelected = index === selectedIndex;

                return (
                  <div
                    key={result.id}
                    className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex-shrink-0 mr-3">
                        <div className={`p-2 rounded-md ${colorClass}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">{result.title}</h3>
                          {result.category && (
                            <Badge variant="secondary" className="text-xs">
                              {result.category}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {result.content}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50 text-gray-500 dark:text-gray-400" />
              <p>Start typing to search French content</p>
              <p className="text-sm mt-1">Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Esc</kbd> to close</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {query && searchResults.length > 0 && (
          <div className="border-t border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
              <span>{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
