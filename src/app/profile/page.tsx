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
import { AvatarGenerator } from '@/components/ui/avatar-generator';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { userProfile } = useUserStorage();
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [avatarStyle, setAvatarStyle] = useState<'avataaars' | 'lorelei' | 'initials' | 'personas' | null>(null);
  const [avatarGender, setAvatarGender] = useState<'male' | 'female' | null>(null);
  const [avatarSeed, setAvatarSeed] = useState(0);
  const [hasAvatarStyle, setHasAvatarStyle] = useState(false);

  // Format timezone with UTC offset
  const formatTimezone = (timezone: string) => {
    try {
      const date = new Date();
      
      // Get short timezone abbreviation (EST, PST, IST, etc.)
      const shortFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short'
      });
      const shortParts = shortFormatter.formatToParts(date);
      const shortTZ = shortParts.find(part => part.type === 'timeZoneName')?.value || '';
      
      // Get UTC offset
      const offsetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'shortOffset'
      });
      const offsetParts = offsetFormatter.formatToParts(date);
      const offset = offsetParts.find(part => part.type === 'timeZoneName')?.value || '';
      
      // Extract city/region name (everything after the last /)
      const parts2 = timezone.split('/');
      const cityName = parts2[parts2.length - 1].replace(/_/g, ' ');
      
      return `${cityName} (${shortTZ}, ${offset})`;
    } catch {
      return timezone;
    }
  };

  // Load custom photo and avatar settings from localStorage
  useEffect(() => {
    if (user?.uid) {
      const savedPhoto = localStorage.getItem(`profile-photo-${user.uid}`);
      const savedStyle = localStorage.getItem(`profile-avatar-style-${user.uid}`) as 'avataaars' | 'lorelei' | 'initials' | 'personas' | null;
      const savedGender = localStorage.getItem(`profile-avatar-gender-${user.uid}`) as 'male' | 'female' | null;
      const savedSeed = localStorage.getItem(`profile-avatar-seed-${user.uid}`);
      
      
      // Avatar style takes priority over custom photo
      if (savedStyle) {
        setAvatarStyle(savedStyle);
        setHasAvatarStyle(true);
        setCustomPhoto(null); // Clear custom photo when avatar is set
      } else if (savedPhoto) {
        setCustomPhoto(savedPhoto);
        setHasAvatarStyle(false);
      }
      
      if (savedGender) {
        setAvatarGender(savedGender);
      }
      if (savedSeed) {
        setAvatarSeed(parseInt(savedSeed));
      }
    }
  }, [user]);

  // Generate avatar seed (only if gender is set)
  const getProfileAvatarSeed = () => {
    if (!avatarGender) return '';
    const baseSeed = user?.email || user?.displayName || user?.uid || 'user';
    return `${baseSeed}-${avatarGender}-${avatarSeed}`;
  };

  const handlePhotoUpload = async (imageUrl: string) => {
    try {
      if (!user?.uid) return;
      
      // For now, store the base64 image in localStorage as a simple solution
      // This avoids Firebase Storage costs on free tier
      localStorage.setItem(`profile-photo-${user.uid}`, imageUrl);
      
      // Clear avatar settings when uploading custom photo
      localStorage.removeItem(`profile-avatar-style-${user.uid}`);
      localStorage.removeItem(`profile-avatar-gender-${user.uid}`);
      localStorage.removeItem(`profile-avatar-seed-${user.uid}`);
    } catch (error) {
      console.error('Error saving profile picture:', error);
      throw error;
    }
  };

  // Listen for avatar updates
  useEffect(() => {
    const handleAvatarUpdate = () => {
      if (user?.uid) {
        const savedPhoto = localStorage.getItem(`profile-photo-${user.uid}`);
        const savedStyle = localStorage.getItem(`profile-avatar-style-${user.uid}`) as 'avataaars' | 'lorelei' | 'initials' | 'personas' | null;
        const savedGender = localStorage.getItem(`profile-avatar-gender-${user.uid}`) as 'male' | 'female' | null;
        const savedSeed = localStorage.getItem(`profile-avatar-seed-${user.uid}`);
        
        if (savedStyle) {
          setAvatarStyle(savedStyle);
          setHasAvatarStyle(true);
          setCustomPhoto(null);
        } else if (savedPhoto) {
          setCustomPhoto(savedPhoto);
          setHasAvatarStyle(false);
        }
        
        if (savedGender) setAvatarGender(savedGender);
        if (savedSeed) setAvatarSeed(parseInt(savedSeed));
      }
    };

    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, [user]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/action');
    }
  }, [isAuthenticated, loading, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
            <Button variant="outline" size="sm" onClick={() => setShowProfileModal(true)} className="w-full sm:w-auto">
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
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div 
                  className="relative h-24 w-24 sm:h-20 sm:w-20 rounded-full bg-primary/10 overflow-hidden cursor-pointer group flex-shrink-0"
                  onClick={() => setShowUploadModal(true)}
                >
                  {hasAvatarStyle && avatarStyle && avatarGender ? (
                    <AvatarGenerator 
                      seed={getProfileAvatarSeed()}
                      size={80}
                      style={avatarStyle}
                      gender={avatarGender}
                      className="h-full w-full"
                    />
                  ) : customPhoto ? (
                    <Image 
                      src={customPhoto} 
                      alt={user.displayName || 'User'} 
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : user.photoURL ? (
                    <Image 
                      src={user.photoURL} 
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
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {user.displayName || 'User'}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">French Learner</p>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    Change picture
                  </button>
                </div>
              </div>

              {/* User Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <div className="px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background break-all">
                    {user.email}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    Display Name
                  </label>
                  <div className="px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background">
                    {userProfile?.displayName || user.displayName || 'Not set'}
                  </div>
                </div>

                {userProfile?.phoneNumber && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <div className="px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background">
                      {userProfile.phoneNumber}
                    </div>
                  </div>
                )}

                {userProfile?.country && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      Country
                    </label>
                    <div className="px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background">
                      {userProfile.country}
                    </div>
                  </div>
                )}

                {userProfile?.nativeLanguage && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Languages className="h-4 w-4" />
                      Native Language
                    </label>
                    <div className="px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background">
                      {userProfile.nativeLanguage}
                    </div>
                  </div>
                )}

                {userProfile?.timezone && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Timezone
                    </label>
                    <div className="px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background">
                      {formatTimezone(userProfile.timezone)}
                    </div>
                  </div>
                )}

                {userProfile?.dateOfBirth && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Date of Birth
                    </label>
                    <div className="px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background">
                      {new Date(userProfile.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
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
              <CardTitle className="text-lg sm:text-xl">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="text-center p-3 sm:p-4 bg-primary/5 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">0</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Lessons Completed</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-500/5 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">0</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Words Learned</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-blue-500/5 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Study Streak</p>
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
      />
    </MainLayout>
  );
}
