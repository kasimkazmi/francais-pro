'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StyledTabs, TabsContent } from "@/components/ui/styled-tabs";
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
  TrendingUp,
  BarChart3,
  Type,
  BookMarked
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'alphabet' | 'numbers' | 'greetings' | 'vocabulary' | 'expressions' | 'grammar' | 'conversations' | 'foundations';
  title: string;
  content: Record<string, unknown>;
  lastModified: Date;
  usage: number;
}

// Content types mapping
const CONTENT_TYPES = {
  'alphabet': 'Alphabet',
  'numbers': 'Numbers', 
  'greetings': 'Greetings',
  'vocabulary': 'Vocabulary',
  'expressions': 'Expressions',
  'grammar': 'Grammar',
  'conversations': 'Conversations',
  'foundations': 'Foundations'
} as const;

export function ContentManagement() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Function to fetch real content and usage data from Firebase
  const fetchContentData = async () => {
    try {
      // Get all user activities for usage data
      const activitiesSnapshot = await getDocs(collection(db, 'userActivities'));
      const activities = activitiesSnapshot.docs.map(doc => doc.data());
      
      console.log('🔍 All Activities Debug:', {
        totalActivities: activities.length,
        activities: activities.map(activity => ({
          activityType: activity.activityType,
          moduleId: activity.activityData?.moduleId,
          lessonId: activity.activityData?.lessonId,
          timestamp: activity.timestamp
        }))
      });
      
      // Count activities by content type/module
      const usageByType: { [key: string]: number } = {};
      
      // Count all activity types for debugging
      const activityTypeCounts: { [key: string]: number } = {};
      activities.forEach(activity => {
        const type = activity.activityType || 'unknown';
        activityTypeCounts[type] = (activityTypeCounts[type] || 0) + 1;
      });
      console.log('📈 Activity Type Counts:', activityTypeCounts);
      
      activities.forEach(activity => {
        if (activity.activityType === 'lesson_complete' || activity.activityType === 'lesson_start') {
          // Try different possible field names for moduleId
          const moduleId = activity.activityData?.moduleId || 
                          activity.activityData?.module || 
                          activity.moduleId || 
                          'unknown';
          usageByType[moduleId] = (usageByType[moduleId] || 0) + 1;
        }
      });
      
      console.log('📊 Usage by Type Debug:', usageByType);

      // If no lesson activities found, try to count all activities as a fallback
      if (Object.keys(usageByType).length === 0 && activities.length > 0) {
        console.log('⚠️ No lesson activities found, counting all activities as fallback');
        activities.forEach(activity => {
          const type = activity.activityType || 'general';
          usageByType[type] = (usageByType[type] || 0) + 1;
        });
      }

      // Create content items based on available data types
      const contentItems: ContentItem[] = Object.entries(CONTENT_TYPES).map(([type, title]) => {
        const usage = usageByType[type] || 0;
        return {
          id: `${type}-content`,
          type: type as ContentItem['type'],
          title: title,
          content: { type: type, description: `${title} learning content` },
          lastModified: new Date(),
          usage: usage
        };
      });

      return contentItems;
    } catch (error) {
      console.error('Error fetching content data:', error);
      return [];
    }
  };

 
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Fetch real content data from Firebase
        const contentData = await fetchContentData();
        setContentItems(contentData);
      } catch (error) {
        console.error('Error loading content:', error);
        setContentItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
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
      case 'foundations':
        return <BookOpen className="h-4 w-4" />;
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
      case 'foundations':
        return 'bg-amber-500';
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
      <StyledTabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        tabs={[
          {
            value: 'overview',
            label: 'Overview',
            shortLabel: 'Overview',
            icon: <BarChart3 className="h-4 w-4" />,
            color: 'text-blue-600',
            hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
            activeColor: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500'
          },
          {
            value: 'alphabet',
            label: 'Alphabet',
            shortLabel: 'Alphabet',
            icon: <Type className="h-4 w-4" />,
            color: 'text-green-600',
            hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/30',
            activeColor: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500'
          },
          {
            value: 'vocabulary',
            label: 'Vocabulary',
            shortLabel: 'Vocab',
            icon: <BookMarked className="h-4 w-4" />,
            color: 'text-purple-600',
            hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/30',
            activeColor: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500'
          },
          {
            value: 'grammar',
            label: 'Grammar',
            shortLabel: 'Grammar',
            icon: <FileText className="h-4 w-4" />,
            color: 'text-orange-600',
            hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/30',
            activeColor: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500'
          }
        ]}
      >

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
      </StyledTabs>

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
                    type: value as ContentItem['type']
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
                    } catch {
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
