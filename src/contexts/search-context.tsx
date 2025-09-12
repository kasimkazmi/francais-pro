'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Import all data files
import alphabetData from '@/data/alphabet.json';
import numbersData from '@/data/numbers.json';
import greetingsData from '@/data/greetings.json';
import grammarData from '@/data/grammar.json';
import vocabularyData from '@/data/vocabulary.json';
import conversationsData from '@/data/conversations.json';
import cultureData from '@/data/culture.json';
import expressionsData from '@/data/expressions.json';
import immigrationData from '@/data/immigration.json';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'alphabet' | 'numbers' | 'greetings' | 'grammar' | 'vocabulary' | 'conversations' | 'culture' | 'expressions' | 'immigration';
  category?: string;
  url: string;
  relevance: number;
}

interface SearchContextType {
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search alphabet data
    alphabetData.letters.forEach((letter, index) => {
      if (
        letter.letter.toLowerCase().includes(lowerQuery) ||
        letter.pronunciation.toLowerCase().includes(lowerQuery) ||
        letter.example.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: `alphabet-${index}`,
          title: `Letter ${letter.letter}`,
          content: `${letter.letter} - ${letter.pronunciation} (${letter.example})`,
          type: 'alphabet',
          url: '/alphabet',
          relevance: calculateRelevance(letter, lowerQuery)
        });
      }
    });

    // Search numbers data
    numbersData.numbers1to20.forEach((number, index) => {
      if (
        number.french.toLowerCase().includes(lowerQuery) ||
        number.english.toLowerCase().includes(lowerQuery) ||
        number.pronunciation.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: `numbers-${index}`,
          title: `Number ${number.english}`,
          content: `${number.french} - ${number.pronunciation} (${number.english})`,
          type: 'numbers',
          url: '/numbers',
          relevance: calculateRelevance(number, lowerQuery)
        });
      }
    });

    // Search greetings data
    greetingsData.greetings.forEach((greeting, index) => {
      if (
        greeting.french.toLowerCase().includes(lowerQuery) ||
        greeting.english.toLowerCase().includes(lowerQuery) ||
        greeting.pronunciation.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: `greetings-${index}`,
          title: greeting.english,
          content: `${greeting.french} - ${greeting.pronunciation}`,
          type: 'greetings',
          url: '/greetings',
          relevance: calculateRelevance(greeting, lowerQuery)
        });
      }
    });

    // Search grammar data
    grammarData.sections.forEach((section, sectionIndex) => {
      if (section.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: `grammar-section-${sectionIndex}`,
          title: section.title,
          content: section.description,
          type: 'grammar',
          category: section.title,
          url: '/grammar',
          relevance: calculateRelevance(section, lowerQuery)
        });
      }

      section.rules.forEach((rule, ruleIndex) => {
        if (
          rule.rule.toLowerCase().includes(lowerQuery) ||
          rule.example.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            id: `grammar-rule-${sectionIndex}-${ruleIndex}`,
            title: rule.rule,
            content: rule.example,
            type: 'grammar',
            category: section.title,
            url: '/grammar',
            relevance: calculateRelevance(rule, lowerQuery)
          });
        }
      });
    });

    // Search vocabulary data
    Object.entries(vocabularyData).forEach(([category, words]) => {
      if (Array.isArray(words)) {
        words.forEach((word, index) => {
          if (
            word.french.toLowerCase().includes(lowerQuery) ||
            word.english.toLowerCase().includes(lowerQuery) ||
            word.pronunciation.toLowerCase().includes(lowerQuery) ||
            word.example.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              id: `vocabulary-${category}-${index}`,
              title: word.english,
              content: `${word.french} - ${word.pronunciation} (${word.example})`,
              type: 'vocabulary',
              category: category.charAt(0).toUpperCase() + category.slice(1),
              url: '/vocabulary',
              relevance: calculateRelevance(word, lowerQuery)
            });
          }
        });
      }
    });

    // Search conversations data
    conversationsData.scenarios.forEach((scenario, index) => {
      if (
        scenario.title.toLowerCase().includes(lowerQuery) ||
        scenario.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: `conversation-${index}`,
          title: scenario.title,
          content: scenario.description,
          type: 'conversations',
          url: '/conversations',
          relevance: calculateRelevance(scenario, lowerQuery)
        });
      }

      scenario.dialogue.forEach((line, lineIndex) => {
        if (
          line.french.toLowerCase().includes(lowerQuery) ||
          line.english.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            id: `conversation-line-${index}-${lineIndex}`,
            title: `${scenario.title} - Dialogue`,
            content: `${line.french} - ${line.english}`,
            type: 'conversations',
            url: '/conversations',
            relevance: calculateRelevance(line, lowerQuery)
          });
        }
      });
    });

    // Search culture data
    Object.entries(cultureData).forEach(([category, items]) => {
      if (Array.isArray(items)) {
        items.forEach((item, index) => {
          if (
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              id: `culture-${category}-${index}`,
              title: item.title,
              content: item.description,
              type: 'culture',
              category: category.charAt(0).toUpperCase() + category.slice(1),
              url: '/culture',
              relevance: calculateRelevance(item, lowerQuery)
            });
          }
        });
      }
    });

    // Search expressions data
    Object.entries(expressionsData).forEach(([category, expressions]) => {
      if (Array.isArray(expressions)) {
        expressions.forEach((expression, index) => {
          if (
            expression.french.toLowerCase().includes(lowerQuery) ||
            expression.english.toLowerCase().includes(lowerQuery) ||
            expression.pronunciation.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              id: `expression-${category}-${index}`,
              title: expression.english,
              content: `${expression.french} - ${expression.pronunciation}`,
              type: 'expressions',
              category: category.charAt(0).toUpperCase() + category.slice(1),
              url: '/expressions',
              relevance: calculateRelevance(expression, lowerQuery)
            });
          }
        });
      }
    });

    // Search immigration data
    if (immigrationData.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        id: 'immigration-title',
        title: immigrationData.title,
        content: immigrationData.description,
        type: 'immigration',
        url: '/immigration',
        relevance: 10
      });
    }

    // Sort by relevance and limit results
    const sortedResults = results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 50);

    setSearchResults(sortedResults);
    setIsSearching(false);

    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }, [router]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      searchResults,
      isSearching,
      performSearch,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

// Helper function to calculate relevance score
function calculateRelevance(item: Record<string, unknown>, query: string): number {
  let score = 0;
  const lowerQuery = query.toLowerCase();

  // Check each field and assign scores
  Object.values(item).forEach((value: unknown) => {
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      if (lowerValue === lowerQuery) {
        score += 10; // Exact match
      } else if (lowerValue.startsWith(lowerQuery)) {
        score += 8; // Starts with query
      } else if (lowerValue.includes(lowerQuery)) {
        score += 5; // Contains query
      }
    }
  });

  return score;
}
