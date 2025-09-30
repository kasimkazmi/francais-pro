'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, User, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface UploadPictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageUrl: string) => void;
  currentPhotoURL?: string | null;
}

export function UploadPictureModal({ 
  isOpen, 
  onClose, 
  onUpload,
  currentPhotoURL 
}: UploadPictureModalProps) {
  const [preview, setPreview] = useState<string | null>(currentPhotoURL || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) {
      toast.error('Please select an image first');
      return;
    }

    setIsUploading(true);
    try {
      // Pass the preview (base64) to parent component
      // In a full implementation, you would upload to Firebase Storage here
      await onUpload(preview);
      toast.success('Profile picture updated!');
      onClose();
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
              <div className="relative h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                {preview ? (
                  <Image 
                    src={preview} 
                    alt="Profile preview" 
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="h-20 w-20 text-primary" />
                )}
              </div>
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
                  Choose Image
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
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!preview || isUploading}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isUploading ? 'Uploading...' : 'Save Picture'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
