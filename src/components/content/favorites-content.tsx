'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { AudioButton } from '@/components/ui/audio-button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { 
  Star, 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Hash, 
  FileText,
  Trash2,
  Search,
  Calendar,
  Book
} from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';

export function FavoritesContent() {
  const { favorites, removeFromFavorites, loading } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expression': return <Star className="h-4 w-4" />;
      case 'vocabulary': return <Heart className="h-4 w-4" />;
      case 'conversation': return <MessageCircle className="h-4 w-4" />;
      case 'grammar': return <FileText className="h-4 w-4" />;
      case 'number': return <Hash className="h-4 w-4" />;
      case 'alphabet': return <BookOpen className="h-4 w-4" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'expression': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'vocabulary': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'conversation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'grammar': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'number': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'alphabet': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'expression': return 'Expression';
      case 'vocabulary': return 'Vocabulary';
      case 'conversation': return 'Conversation';
      case 'grammar': return 'Grammar';
      case 'number': return 'Number';
      case 'alphabet': return 'Alphabet';
      default: return 'Unknown';
    }
  };

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter(fav => {
      const matchesSearch = fav.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fav.english.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || fav.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'oldest':
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        case 'alphabetical':
          return a.french.localeCompare(b.french);
        default:
          return 0;
      }
    });

  const handleRemoveFavorite = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this item from your favorites?')) {
      await removeFromFavorites(id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground mt-2">
            {favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        {!isAuthenticated && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p>Sign in to sync your favorites across devices</p>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start adding items to your favorites by clicking the star or heart icons on any content.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <EnhancedButton variant="outline" onClick={() => window.location.href = '/expressions'}>
                Browse Expressions
              </EnhancedButton>
              <EnhancedButton variant="outline" onClick={() => window.location.href = '/vocabulary'}>
                Browse Vocabulary
              </EnhancedButton>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted/50 transition-colors dark:bg-background dark:text-foreground"
                >
                  <option value="all">All Types</option>
                  <option value="expression">Expressions</option>
                  <option value="vocabulary">Vocabulary</option>
                  <option value="conversation">Conversations</option>
                  <option value="grammar">Grammar</option>
                  <option value="number">Numbers</option>
                  <option value="alphabet">Alphabet</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical')}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted/50 transition-colors dark:bg-background dark:text-foreground"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFavorites.map((favorite) => (
              <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(favorite.type)}
                      <Badge className={getTypeColor(favorite.type)}>
                        {getTypeName(favorite.type)}
                      </Badge>
                    </div>
                    <SimpleTooltip content="Remove from favorites">
                      <EnhancedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </EnhancedButton>
                    </SimpleTooltip>
                  </div>
                  {favorite.category && (
                    <Badge variant="outline" className="w-fit">
                      {favorite.category}
                    </Badge>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-1">
                      {favorite.french}
                    </h3>
                    <p className="text-muted-foreground">
                      {favorite.english}
                    </p>
                  </div>
                  
                  {favorite.pronunciation && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Pronunciation:</span>
                      <AudioButton 
                        text={favorite.french}
                        size="sm"
                        tooltipContent={`Listen: ${favorite.french}`}
                      />
                    </div>
                  )}
                  
                  {favorite.example && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Example: </span>
                      <em className="text-foreground">&ldquo;{favorite.example}&rdquo;</em>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Added {new Date(favorite.addedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFavorites.length === 0 && favorites.length > 0 && (
            <Card className="text-center py-8">
              <CardContent>
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search term or filter settings.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
