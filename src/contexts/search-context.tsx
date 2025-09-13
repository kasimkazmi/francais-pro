'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

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
import artsData from '@/data/arts.json';
import businessData from '@/data/business.json';
import historyData from '@/data/history.json';
import literatureData from '@/data/literature.json';
import sportsData from '@/data/sports.json';
import travelData from '@/data/travel.json';
import tefData from '@/data/tef-preparation.json';
import { 
  AlphabetData, 
  NumbersData, 
  GrammarData, 
  ConversationsData, 
  ExpressionsData 
} from '@/types/data-types';

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
    (alphabetData as AlphabetData).alphabet.forEach((letter, index) => {
      if (
        (letter.letter?.toLowerCase() || '').includes(lowerQuery) ||
        (letter.pronunciation?.toLowerCase() || '').includes(lowerQuery) ||
        (letter.example?.toLowerCase() || '').includes(lowerQuery)
      ) {
        results.push({
          id: `alphabet-${index}`,
          title: `Letter ${letter.letter}`,
          content: `${letter.letter} - ${letter.pronunciation} (${letter.example})`,
          type: 'alphabet',
          url: '/alphabet',
          relevance: calculateRelevance(letter as unknown as Record<string, unknown>, lowerQuery)
        });
      }
    });

    // Search numbers data
    (numbersData as NumbersData).numbers1to20.forEach((number, index) => {
      if (
        (number.french?.toLowerCase() || '').includes(lowerQuery) ||
        number.num.toString().includes(lowerQuery) ||
        (number.pronunciation?.toLowerCase() || '').includes(lowerQuery)
      ) {
        results.push({
          id: `numbers-${index}`,
          title: `Number ${number.num}`,
          content: `${number.french} - ${number.pronunciation} (${number.num})`,
          type: 'numbers',
          url: '/numbers',
          relevance: calculateRelevance(number as unknown as Record<string, unknown>, lowerQuery)
        });
      }
    });

    // Search greetings data
    greetingsData.basicGreetings.forEach((greeting, index) => {
      if (
        (greeting.french?.toLowerCase() || '').includes(lowerQuery) ||
        (greeting.english?.toLowerCase() || '').includes(lowerQuery) ||
        (greeting.pronunciation?.toLowerCase() || '').includes(lowerQuery)
      ) {
        results.push({
          id: `greetings-${index}`,
          title: greeting.english,
          content: `${greeting.french} - ${greeting.pronunciation}`,
          type: 'greetings',
          url: '/greetings',
          relevance: calculateRelevance(greeting as unknown as Record<string, unknown>, lowerQuery)
        });
      }
    });

    // Search grammar data
    const grammarTyped = grammarData as GrammarData;
    
    // Search articles
    [...grammarTyped.articles.definite, ...grammarTyped.articles.indefinite].forEach((article, index) => {
      if (
        (article.french?.toLowerCase() || '').includes(lowerQuery) ||
        (article.english?.toLowerCase() || '').includes(lowerQuery) ||
        (article.example?.toLowerCase() || '').includes(lowerQuery)
      ) {
        results.push({
          id: `grammar-article-${index}`,
          title: article.french,
          content: `${article.english} - ${article.example || ''}`,
          type: 'grammar',
          category: 'Articles',
          url: '/grammar',
          relevance: calculateRelevance(article as unknown as Record<string, unknown>, lowerQuery)
        });
      }
    });

    // Search pronouns
    [...grammarTyped.pronouns.subject, ...grammarTyped.pronouns.object].forEach((pronoun, index) => {
      if (
        (pronoun.french?.toLowerCase() || '').includes(lowerQuery) ||
        (pronoun.english?.toLowerCase() || '').includes(lowerQuery)
      ) {
        results.push({
          id: `grammar-pronoun-${index}`,
          title: pronoun.french,
          content: pronoun.english,
          type: 'grammar',
          category: 'Pronouns',
          url: '/grammar',
          relevance: calculateRelevance(pronoun as unknown as Record<string, unknown>, lowerQuery)
        });
      }
    });

    // Search verbs
    Object.values(grammarTyped.verbs).forEach((verb, index) => {
      if (
        (verb.infinitive?.toLowerCase() || '').includes(lowerQuery) ||
        (verb.english?.toLowerCase() || '').includes(lowerQuery)
      ) {
        results.push({
          id: `grammar-verb-${index}`,
          title: verb.infinitive,
          content: verb.english,
          type: 'grammar',
          category: 'Verbs',
          url: '/grammar',
          relevance: calculateRelevance(verb as unknown as Record<string, unknown>, lowerQuery)
        });
      }
    });

    // Search vocabulary data
    Object.entries(vocabularyData).forEach(([category, words]) => {
      if (Array.isArray(words)) {
        words.forEach((word, index) => {
          if (
            (word.french?.toLowerCase() || '').includes(lowerQuery) ||
            (word.english?.toLowerCase() || '').includes(lowerQuery) ||
            (word.pronunciation?.toLowerCase() || '').includes(lowerQuery) ||
            (word.example?.toLowerCase() || '').includes(lowerQuery)
          ) {
            results.push({
              id: `vocabulary-${category}-${index}`,
              title: word.english,
              content: `${word.french} - ${word.pronunciation} (${word.example})`,
              type: 'vocabulary',
              category: category.charAt(0).toUpperCase() + category.slice(1),
              url: '/vocabulary',
              relevance: calculateRelevance(word as unknown as Record<string, unknown>, lowerQuery)
            });
          }
        });
      }
    });

    // Search conversations data
    (conversationsData as ConversationsData).scenarios.forEach((scenario, index) => {
      if (
        (scenario.title?.toLowerCase() || '').includes(lowerQuery) ||
        (scenario.situation?.toLowerCase() || '').includes(lowerQuery)
      ) {
        results.push({
          id: `conversation-${index}`,
          title: scenario.title,
          content: scenario.situation,
          type: 'conversations',
          url: '/conversations',
          relevance: calculateRelevance(scenario as unknown as Record<string, unknown>, lowerQuery)
        });
      }

      scenario.dialogue.forEach((line, lineIndex) => {
        if (
          (line.french?.toLowerCase() || '').includes(lowerQuery) ||
          (line.english?.toLowerCase() || '').includes(lowerQuery)
        ) {
          results.push({
            id: `conversation-line-${index}-${lineIndex}`,
            title: `${scenario.title} - Dialogue`,
            content: `${line.french} - ${line.english}`,
            type: 'conversations',
            url: '/conversations',
            relevance: calculateRelevance(line as unknown as Record<string, unknown>, lowerQuery)
          });
        }
      });
    });

    // Search culture data
    Object.entries(cultureData).forEach(([category, items]) => {
      if (Array.isArray(items)) {
        items.forEach((item, index) => {
          const itemRecord = item as Record<string, unknown>;
          if (
            (((itemRecord.title || itemRecord.name) as string)?.toLowerCase() || '').includes(lowerQuery) ||
            (((itemRecord.description as string)?.toLowerCase() || '').includes(lowerQuery))
          ) {
            results.push({
              id: `culture-${category}-${index}`,
              title: (itemRecord.title || itemRecord.name) as string,
              content: (itemRecord.description as string) || '',
              type: 'culture',
              category: category.charAt(0).toUpperCase() + category.slice(1),
              url: '/culture',
              relevance: calculateRelevance(item as unknown as Record<string, unknown>, lowerQuery)
            });
          }
        });
      }
    });

    // Search expressions data
    Object.entries(expressionsData as ExpressionsData).forEach(([category, expressions]) => {
      if (Array.isArray(expressions)) {
        expressions.forEach((expression, index) => {
          if (
            (expression.french?.toLowerCase() || '').includes(lowerQuery) ||
            (expression.english?.toLowerCase() || '').includes(lowerQuery) ||
            (expression.pronunciation?.toLowerCase() || '').includes(lowerQuery)
          ) {
            results.push({
              id: `expression-${category}-${index}`,
              title: expression.english,
              content: `${expression.french} - ${expression.pronunciation}`,
              type: 'expressions',
              category: category.charAt(0).toUpperCase() + category.slice(1),
              url: '/expressions',
              relevance: calculateRelevance(expression as unknown as Record<string, unknown>, lowerQuery)
            });
          }
        });
      }
    });

    // Search immigration data
    if ((immigrationData.expressEntry?.overview?.title?.toLowerCase() || '').includes(lowerQuery)) {
      results.push({
        id: 'immigration-title',
        title: immigrationData.expressEntry.overview.title,
        content: immigrationData.expressEntry.overview.description,
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
  }, []);

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
