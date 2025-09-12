'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  FileText,
  Hash,
  MessageCircle,
  Lightbulb,
  Globe,
  Users,
  TrendingUp
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'alphabet' | 'numbers' | 'greetings' | 'vocabulary' | 'expressions' | 'grammar' | 'conversations';
  title: string;
  content: Record<string, unknown>;
  lastModified: Date;
  usage: number;
}

export function ContentManagement() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from your content files
  const mockContent: ContentItem[] = [
    {
      id: 'alphabet-1',
      type: 'alphabet',
      title: 'French Alphabet',
      content: { letters: ['A', 'B', 'C', 'D', 'E'] },
      lastModified: new Date(),
      usage: 1250
    },
    {
      id: 'numbers-1',
      type: 'numbers',
      title: 'Numbers 1-20',
      content: { numbers: [1, 2, 3, 4, 5] },
      lastModified: new Date(),
      usage: 980
    },
    {
      id: 'greetings-1',
      type: 'greetings',
      title: 'Basic Greetings',
      content: { greetings: ['Bonjour', 'Bonsoir', 'Salut'] },
      lastModified: new Date(),
      usage: 2100
    },
    {
      id: 'vocabulary-1',
      type: 'vocabulary',
      title: 'Family Vocabulary',
      content: { words: ['mère', 'père', 'sœur', 'frère'] },
      lastModified: new Date(),
      usage: 1500
    },
    {
      id: 'expressions-1',
      type: 'expressions',
      title: 'Common Expressions',
      content: { expressions: ['Comment allez-vous?', 'Merci beaucoup'] },
      lastModified: new Date(),
      usage: 1800
    }
  ];

  useEffect(() => {
    // Simulate loading content
    setTimeout(() => {
      setContentItems(mockContent);
      setLoading(false);
    }, 1000);
  }, []);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'alphabet':
        return <FileText className="h-4 w-4" />;
      case 'numbers':
        return <Hash className="h-4 w-4" />;
      case 'greetings':
        return <MessageCircle className="h-4 w-4" />;
      case 'vocabulary':
        return <BookOpen className="h-4 w-4" />;
      case 'expressions':
        return <Lightbulb className="h-4 w-4" />;
      case 'grammar':
        return <FileText className="h-4 w-4" />;
      case 'conversations':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'alphabet':
        return 'bg-blue-500';
      case 'numbers':
        return 'bg-green-500';
      case 'greetings':
        return 'bg-purple-500';
      case 'vocabulary':
        return 'bg-orange-500';
      case 'expressions':
        return 'bg-pink-500';
      case 'grammar':
        return 'bg-indigo-500';
      case 'conversations':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
  };

  const handleSave = () => {
    if (editingItem) {
      setContentItems(prev => 
        prev.map(item => 
          item.id === editingItem.id 
            ? { ...editingItem, lastModified: new Date() }
            : item
        )
      );
      setEditingItem(null);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Content Management
          </h2>
          <p className="text-muted-foreground">
            Manage learning content and materials
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alphabet">Alphabet</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contentItems.length}</div>
                <p className="text-xs text-muted-foreground">
                  Content pieces
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contentItems.reduce((sum, item) => sum + item.usage, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  User interactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contentItems.reduce((max, item) => Math.max(max, item.usage), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Highest usage
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(contentItems.map(item => item.type)).size}
                </div>
                <p className="text-xs text-muted-foreground">
                  Content types
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Content List */}
          <Card>
            <CardHeader>
              <CardTitle>All Content</CardTitle>
              <CardDescription>
                Manage all learning content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getContentTypeColor(item.type)} text-white`}>
                        {getContentIcon(item.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {item.usage} uses
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            Modified {item.lastModified.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Category Tabs */}
        {['alphabet', 'vocabulary', 'grammar'].map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{category} Content</CardTitle>
                <CardDescription>
                  Manage {category} learning materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentItems
                    .filter(item => item.type === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${getContentTypeColor(item.type)} text-white`}>
                            {getContentIcon(item.type)}
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.usage} uses • Modified {item.lastModified.toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  
                  {contentItems.filter(item => item.type === category).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No {category} content found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Edit Content
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCancel}
                  className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover:scale-105 active:scale-95"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    title: e.target.value
                  })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select
                  value={editingItem.type}
                  onValueChange={(value: string) => setEditingItem({
                    ...editingItem,
                    type: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabet">Alphabet</SelectItem>
                    <SelectItem value="numbers">Numbers</SelectItem>
                    <SelectItem value="greetings">Greetings</SelectItem>
                    <SelectItem value="vocabulary">Vocabulary</SelectItem>
                    <SelectItem value="expressions">Expressions</SelectItem>
                    <SelectItem value="grammar">Grammar</SelectItem>
                    <SelectItem value="conversations">Conversations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content (JSON)</label>
                <Textarea
                  value={JSON.stringify(editingItem.content, null, 2)}
                  onChange={(e) => {
                    try {
                      const content = JSON.parse(e.target.value);
                      setEditingItem({
                        ...editingItem,
                        content
                      });
                    } catch (error) {
                      // Invalid JSON, keep the text as is
                    }
                  }}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
