'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useUserStorage } from '@/contexts/UserStorageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import { User, Mail, Phone, Globe, Languages, Target, Clock, Settings, Calendar, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProfileModal } from '@/components/ui/profile-modal';
import { UploadPictureModal } from '@/components/ui/upload-picture-modal';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { userProfile } = useUserStorage();
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  // Load custom photo from localStorage
  useEffect(() => {
    if (user?.uid) {
      const savedPhoto = localStorage.getItem(`profile-photo-${user.uid}`);
      if (savedPhoto) {
        setCustomPhoto(savedPhoto);
      }
    }
  }, [user]);

  const handlePhotoUpload = async (imageUrl: string) => {
    try {
      // For now, store the base64 image in localStorage as a simple solution
      // This avoids Firebase Storage costs on free tier
      localStorage.setItem(`profile-photo-${user?.uid}`, imageUrl);
      
      // Trigger a page refresh to show the new image
      window.location.reload();
    } catch (error) {
      console.error('Error saving profile picture:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/action');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <Button variant="outline" size="sm" onClick={() => setShowProfileModal(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div 
                  className="relative h-20 w-20 rounded-full bg-primary/10 overflow-hidden cursor-pointer group"
                  onClick={() => setShowUploadModal(true)}
                >
                  {customPhoto || user.photoURL ? (
                    <Image 
                      src={customPhoto || user.photoURL || ''} 
                      alt={user.displayName || 'User'} 
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">
                    {user.displayName || 'User'}
                  </h2>
                  <p className="text-muted-foreground">French Learner</p>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    Change picture
                  </button>
                </div>
              </div>

              {/* User Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="pl-6">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Display Name</span>
                  </div>
                  <p className="pl-6">{userProfile?.displayName || user.displayName || 'Not set'}</p>
                </div>

                {userProfile?.phoneNumber && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">Phone Number</span>
                    </div>
                    <p className="pl-6">{userProfile.phoneNumber}</p>
                  </div>
                )}

                {userProfile?.country && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">Country</span>
                    </div>
                    <p className="pl-6">{userProfile.country}</p>
                  </div>
                )}

                {userProfile?.nativeLanguage && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Languages className="h-4 w-4" />
                      <span className="font-medium">Native Language</span>
                    </div>
                    <p className="pl-6">{userProfile.nativeLanguage}</p>
                  </div>
                )}

                {userProfile?.timezone && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Timezone</span>
                    </div>
                    <p className="pl-6">{userProfile.timezone}</p>
                  </div>
                )}

                {userProfile?.dateOfBirth && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Date of Birth</span>
                    </div>
                    <p className="pl-6">
                      {new Date(userProfile.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {userProfile?.preferredLearningStyle && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span className="font-medium">Learning Style</span>
                    </div>
                    <p className="pl-6 capitalize">{userProfile.preferredLearningStyle}</p>
                  </div>
                )}
              </div>

              {/* Learning Goals */}
              {userProfile?.learningGoals && userProfile.learningGoals.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span className="font-medium">Learning Goals</span>
                  </div>
                  <div className="pl-6 flex flex-wrap gap-2">
                    {userProfile.learningGoals.map((goal, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <p className="text-3xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground mt-1">Lessons Completed</p>
                </div>
                <div className="text-center p-4 bg-green-500/5 rounded-lg">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">0</p>
                  <p className="text-sm text-muted-foreground mt-1">Words Learned</p>
                </div>
                <div className="text-center p-4 bg-blue-500/5 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
                  <p className="text-sm text-muted-foreground mt-1">Study Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
         
        </div>
      </div>

      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <UploadPictureModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handlePhotoUpload}
        currentPhotoURL={customPhoto || user.photoURL}
      />
    </MainLayout>
  );
}
