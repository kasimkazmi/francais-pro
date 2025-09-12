'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/ui/search-bar';
import { SearchPageLoader } from '@/components/ui/page-loader';
import { useSearch } from '@/contexts/search-context';
import { 
  BookOpen, 
  Hash, 
  MessageCircle, 
  Book, 
  Users, 
  Globe, 
  Lightbulb, 
  FileText,
  ArrowRight,
  Search as SearchIcon
} from 'lucide-react';
import Link from 'next/link';

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

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchResults, isSearching, performSearch } = useSearch();

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, performSearch]);

  const handleSearch = (searchQuery: string) => {
    performSearch(searchQuery);
  };

  const groupedResults = searchResults.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, typeof searchResults>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Search Results</h1>
            <div className="max-w-2xl">
              <SearchBar 
                placeholder="Search French lessons, vocabulary, grammar..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
          </div>

          {/* Search Status */}
          {isSearching && <SearchPageLoader />}

          {/* No Results */}
          {!isSearching && query && searchResults.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn&apos;t find any results for &ldquo;{query}&rdquo;. Try different keywords or check your spelling.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Try searching for:</p>
                <ul className="mt-2 space-y-1">
                  <li>• French words or phrases</li>
                  <li>• Grammar topics (articles, verbs, etc.)</li>
                  <li>• Vocabulary categories (food, family, etc.)</li>
                  <li>• Cultural topics</li>
                </ul>
              </div>
            </div>
          )}

          {/* Search Results */}
          {!isSearching && searchResults.length > 0 && (
            <div className="space-y-8">
              <div className="text-sm text-muted-foreground">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </div>

              {Object.entries(groupedResults).map(([type, results]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                const colorClass = typeColors[type as keyof typeof typeColors];
                
                return (
                  <div key={type} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-xl font-semibold capitalize">{type}</h2>
                      <Badge variant="secondary" className={colorClass}>
                        {results.length} result{results.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>

                    <div className="grid gap-4">
                      {results.map((result) => (
                        <Card key={result.id} className="universal-card hover:shadow-lg transition-all duration-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-1">{result.title}</CardTitle>
                                {result.category && (
                                  <Badge variant="outline" className="text-xs mb-2">
                                    {result.category}
                                  </Badge>
                                )}
                              </div>
                              <Link 
                                href={result.url}
                                className="flex items-center text-primary hover:text-primary/80 transition-colors"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="text-sm leading-relaxed">
                              {result.content}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!query && !isSearching && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Search French Learning Content</h3>
              <p className="text-muted-foreground mb-6">
                Find vocabulary, grammar rules, conversations, and cultural content across our French learning platform.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium">Alphabet & Pronunciation</h4>
                  <p className="text-sm text-muted-foreground">Search letters and sounds</p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <Hash className="h-6 w-6 text-green-600 mb-2" />
                  <h4 className="font-medium">Numbers</h4>
                  <p className="text-sm text-muted-foreground">Find number words and counting</p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <MessageCircle className="h-6 w-6 text-purple-600 mb-2" />
                  <h4 className="font-medium">Greetings</h4>
                  <p className="text-sm text-muted-foreground">Common French greetings</p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <Book className="h-6 w-6 text-orange-600 mb-2" />
                  <h4 className="font-medium">Grammar</h4>
                  <p className="text-sm text-muted-foreground">Grammar rules and examples</p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <Users className="h-6 w-6 text-pink-600 mb-2" />
                  <h4 className="font-medium">Vocabulary</h4>
                  <p className="text-sm text-muted-foreground">Words by category</p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <Globe className="h-6 w-6 text-yellow-600 mb-2" />
                  <h4 className="font-medium">Culture</h4>
                  <p className="text-sm text-muted-foreground">French culture and traditions</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
