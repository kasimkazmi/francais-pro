'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStorage } from '@/contexts/UserStorageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const { user, setUserDisplayName, isAuthenticated } = useAuth();
  const { userProfile, updateProfile, refreshProfile, loading } = useUserStorage();

  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [preferredLearningStyle, setPreferredLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic' | 'reading'>('visual');
  const [timezone, setTimezone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !isAuthenticated) return;
    // Populate from profile (fallback to auth if missing)
    setDisplayName(userProfile?.displayName || user.displayName || '');
    setPhoneNumber(userProfile?.phoneNumber || '');
    setDateOfBirth(userProfile?.dateOfBirth || '');
    setCountry(userProfile?.country || '');
    setNativeLanguage(userProfile?.nativeLanguage || '');
    setLearningGoals((userProfile?.learningGoals || []).join(', '));
    setPreferredLearningStyle(userProfile?.preferredLearningStyle || 'visual');
    setTimezone(userProfile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || '');
  }, [user, isAuthenticated, userProfile]);

  const isSaveDisabled = useMemo(() => saving || !displayName.trim(), [saving, displayName]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      // Update profile fields in Firestore
      const goals = learningGoals
        .split(',')
        .map(g => g.trim())
        .filter(Boolean);

      await updateProfile({
        displayName: displayName.trim(),
        phoneNumber: phoneNumber.trim() || null,
        dateOfBirth: dateOfBirth || null,
        country: country.trim() || null,
        nativeLanguage: nativeLanguage.trim() || undefined,
        learningGoals: goals,
        preferredLearningStyle,
        timezone: timezone || null,
      });

      // Sync Auth display name if changed
      if (displayName && displayName !== (user.displayName || '')) {
        try {
          await setUserDisplayName(displayName);
        } catch (err) {
          // Non-fatal: surface info but don't fail the whole save
          console.error('Failed to sync auth display name:', err);
        }
      }

      await refreshProfile();
      toast.success('Profile updated');
    } catch (err) {
      console.error('Profile update failed:', err);
      toast.error('Could not update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information and learning preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={dateOfBirth || ''} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nativeLanguage">Native Language</Label>
                <Input id="nativeLanguage" value={nativeLanguage} onChange={(e) => setNativeLanguage(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Learning Goals (comma separated)</Label>
              <Input id="goals" value={learningGoals} onChange={(e) => setLearningGoals(e.target.value)} placeholder="e.g., TEF preparation, daily conversation" />
            </div>

            <div className="space-y-2">
              <Label>Preferred Learning Style</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['visual','auditory','kinesthetic','reading'] as const).map((style) => (
                  <Button
                    type="button"
                    key={style}
                    variant={preferredLearningStyle === style ? 'default' : 'outline'}
                    onClick={() => setPreferredLearningStyle(style)}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isSaveDisabled || loading}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => refreshProfile()} disabled={loading}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


