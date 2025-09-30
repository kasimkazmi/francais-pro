'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon, User } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { AvatarGenerator } from '@/components/ui/avatar-generator';
import { useAuth } from '@/contexts/AuthContext';

interface UploadPictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageUrl: string) => void;
}

export function UploadPictureModal({ 
  isOpen, 
  onClose, 
  onUpload
}: UploadPictureModalProps) {
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState<'avataaars' | 'lorelei' | 'initials' | 'personas' | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [randomSeed, setRandomSeed] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved avatar settings when modal opens
  useEffect(() => {
    if (isOpen && user?.uid) {
      const savedStyle = localStorage.getItem(`profile-avatar-style-${user.uid}`) as 'avataaars' | 'lorelei' | 'initials' | 'personas' | null;
      const savedGender = localStorage.getItem(`profile-avatar-gender-${user.uid}`) as 'male' | 'female' | null;
      const savedSeed = localStorage.getItem(`profile-avatar-seed-${user.uid}`);
      
      if (savedStyle) setSelectedAvatarStyle(savedStyle);
      if (savedGender) setGender(savedGender);
      if (savedSeed) setRandomSeed(parseInt(savedSeed));
    }
  }, [isOpen, user]);

  const avatarStyles = [
    { name: 'lorelei', label: 'Lorelei' },
    { name: 'avataaars', label: 'Avataaars' },
    { name: 'initials', label: 'Initials' },
    { name: 'personas', label: 'Personas' }
  ] as const;

  // Generate unique seed based on user info, gender, and random number
  const getAvatarSeed = (includeRandom = true) => {
    if (!gender) return '';
    const baseSeed = user?.email || user?.displayName || user?.uid || 'user';
    return includeRandom ? `${baseSeed}-${gender}-${randomSeed}` : `${baseSeed}-${gender}`;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setSelectedAvatarStyle(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSelect = (style: 'avataaars' | 'lorelei' | 'initials' | 'personas') => {
    setSelectedAvatarStyle(style);
    setPreview(null);
    setRandomSeed(0); // Reset seed when changing style
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatarStyle || !gender) {
      toast.error('Please select both gender and avatar style');
      return;
    }
    
    setIsUploading(true);
    try {
      // Save the avatar style preference to localStorage
      if (user?.uid) {
        localStorage.setItem(`profile-avatar-style-${user.uid}`, selectedAvatarStyle);
        localStorage.setItem(`profile-avatar-gender-${user.uid}`, gender);
        localStorage.setItem(`profile-avatar-seed-${user.uid}`, randomSeed.toString());
        localStorage.removeItem(`profile-photo-${user.uid}`);
      }
      toast.success('Avatar updated!');
      onClose();
      // Trigger a custom event to refresh the profile page
      window.dispatchEvent(new Event('avatar-updated'));
    } catch (error) {
      console.error('Error saving avatar:', error);
      toast.error('Failed to save avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!preview) {
      toast.error('Please select an image first');
      return;
    }

    setIsUploading(true);
    try {
      // Pass the preview (base64) to parent component
      await onUpload(preview);
      toast.success('Profile picture updated!');
      onClose();
      // Trigger a custom event to refresh the profile page
      window.dispatchEvent(new Event('avatar-updated'));
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] p-4 animate-in fade-in duration-300"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        minHeight: '100vh',
        minWidth: '100vw',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex items-center justify-center min-h-full">
        <Card 
          className="w-full max-w-md bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Upload Profile Picture</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Preview */}
            <div className="flex justify-center">
              <div className="relative h-40 w-40 rounded-full bg-primary/10 overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                {preview ? (
                  <Image 
                    src={preview} 
                    alt="Profile preview" 
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                ) : selectedAvatarStyle && gender ? (
                  <AvatarGenerator 
                    seed={getAvatarSeed()}
                    size={160}
                    style={selectedAvatarStyle}
                    gender={gender}
                    className="h-full w-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <User className="h-16 w-16 text-muted-foreground mx-auto" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-center">Avatar Gender</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 border-2 ${
                    gender === 'male' 
                      ? 'border-blue-500 bg-blue-500 text-white shadow-lg scale-105 ring-2 ring-blue-500 ring-offset-2' 
                      : gender === null
                      ? 'border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 hover:shadow-sm hover:scale-102'
                      : 'border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 hover:shadow-sm hover:scale-102'
                  } active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  👨 Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 border-2 ${
                    gender === 'female' 
                      ? 'border-pink-500 bg-pink-500 text-white shadow-lg scale-105 ring-2 ring-pink-500 ring-offset-2' 
                      : gender === null
                      ? 'border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:border-pink-400 hover:shadow-sm hover:scale-102'
                      : 'border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:border-pink-400 hover:shadow-sm hover:scale-102'
                  } active:scale-95 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`}
                >
                  👩 Female
                </button>
              </div>
            </div>

            {/* Avatar Style Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Choose Avatar Style</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setRandomSeed(prev => prev + 1)}
                  disabled={!selectedAvatarStyle}
                  className="text-xs transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-sm hover:scale-105 active:scale-95 focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  🎲 Generate New
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {avatarStyles.map((style) => (
                  <button
                    key={style.name}
                    type="button"
                    onClick={() => handleAvatarSelect(style.name)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedAvatarStyle === style.name 
                        ? 'border-primary border-4 bg-primary/20 shadow-lg scale-110 ring-2 ring-primary ring-offset-2' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm hover:scale-102'
                    } active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {gender ? (
                        <AvatarGenerator 
                          seed={getAvatarSeed(false)}
                          size={48}
                          style={style.name}
                          gender={gender}
                          className="h-full w-full"
                        />
                      ) : (
                        <User className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-xs font-medium">{style.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex items-center gap-2">
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* Upload Section */}
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="picture-upload"
              />
              
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Custom Image
                </Button>

                {preview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemove}
                    className="w-full text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    Remove Image
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Supported: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={selectedAvatarStyle ? handleSaveAvatar : handleUpload}
                disabled={(!preview && !selectedAvatarStyle) || isUploading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isUploading ? '⏳ Saving...' : selectedAvatarStyle ? '✨ Save Avatar' : '📸 Save Picture'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
