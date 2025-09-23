'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStorage } from '@/contexts/UserStorageContext';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import type { GroupBase, StylesConfig } from 'react-select';
import countryList from 'react-select-country-list';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, setUserDisplayName, isAuthenticated } = useAuth();
  const { userProfile, updateProfile, refreshProfile, loading } = useUserStorage();

  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [timezone, setTimezone] = useState('');
  const [saving, setSaving] = useState(false);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const timezoneOptions = useMemo(() => {
    const anyIntl = Intl as unknown as { supportedValuesOf?: (key: string) => string[] };
    if (typeof anyIntl.supportedValuesOf === 'function') {
      return anyIntl.supportedValuesOf('timeZone') as string[];
    }
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return tz ? [tz] : [];
    } catch {
      return [];
    }
  }, []);
  const selectStyles: StylesConfig<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>> = useMemo(() => ({
    control: (base, state) => ({
      ...base,
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      borderColor: 'hsl(var(--border))',
      borderWidth: 2,
      minHeight: 40,
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59,130,246,0.35)' : 'none',
      ':hover': { borderColor: state.isFocused ? '#3b82f6' : 'hsl(var(--border))' },
    }),
    singleValue: (base) => ({ ...base, color: 'hsl(var(--foreground))' }),
    input: (base) => ({ ...base, color: 'hsl(var(--foreground))' }),
    placeholder: (base) => ({ ...base, color: 'hsl(var(--muted-foreground))' }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '1px solid',
      borderColor: 'hsl(var(--border))',
      zIndex: 10000,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'hsl(var(--accent))'
        : state.isFocused
        ? 'hsl(var(--muted))'
        : 'transparent',
      color: state.isSelected ? 'hsl(var(--accent-foreground))' : 'hsl(var(--foreground))',
      ':active': { backgroundColor: 'hsl(var(--muted))' },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? '#3b82f6' : 'hsl(var(--muted-foreground))',
      ':hover': { color: '#3b82f6' },
    }),
    indicatorSeparator: (base) => ({ ...base, backgroundColor: 'hsl(var(--border))' }),
    menuPortal: (base) => ({ ...base, zIndex: 10000 }),
  }), []);

  useEffect(() => {
    if (!isOpen) return;
    if (!user || !isAuthenticated) return;
    setDisplayName(userProfile?.displayName || user.displayName || '');
    setPhoneNumber(userProfile?.phoneNumber || '');
    setDateOfBirth(userProfile?.dateOfBirth || '');
    setCountry(userProfile?.country || '');
    setNativeLanguage(userProfile?.nativeLanguage || '');
    setLearningGoals((userProfile?.learningGoals || []).join(', '));
    setTimezone(userProfile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || '');
  }, [isOpen, user, isAuthenticated, userProfile]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isSaveDisabled = useMemo(() => saving || !displayName.trim(), [saving, displayName]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const goals = learningGoals
        .split(',')
        .map(g => g.trim())
        .filter(Boolean);

      // Compute changed fields for success toast
      const current = userProfile;
      const payload = {
        displayName: displayName.trim(),
        phoneNumber: phoneNumber.trim() || null,
        dateOfBirth: dateOfBirth || null,
        country: country.trim() || null,
        nativeLanguage: nativeLanguage.trim() || null,
        learningGoals: goals,
        timezone: timezone || null,
      };
      const labelMap: Record<string, string> = {
        displayName: 'Display Name',
        phoneNumber: 'Phone Number',
        dateOfBirth: 'Date of Birth',
        country: 'Country',
        nativeLanguage: 'Native Language',
        learningGoals: 'Learning Goals',
        timezone: 'Timezone',
      };
      const changed: string[] = [];
      if (current) {
        Object.entries(payload).forEach(([key, value]) => {
          const prev = (current as unknown as Record<string, unknown>)[key];
          const isArray = Array.isArray(value) || Array.isArray(prev);
          const equal = isArray ? JSON.stringify(prev || []) === JSON.stringify(value || []) : prev === value;
          if (!equal) changed.push(labelMap[key] || key);
        });
      }

      await updateProfile({
        displayName: displayName.trim(),
        phoneNumber: phoneNumber.trim() || null,
        dateOfBirth: dateOfBirth || null,
        country: country.trim() || null,
        nativeLanguage: nativeLanguage.trim() || null,
        learningGoals: goals,
        timezone: timezone || null,
      });

      if (displayName && displayName !== (user.displayName || '')) {
        try { await setUserDisplayName(displayName); } catch (err) { console.error('Auth name sync failed:', err); }
      }

      await refreshProfile();
      if (changed.length > 0) {
        toast.success(`Profile updated: ${changed.join(', ')}`);
      } else {
        toast.success('Profile updated');
      }
      onClose();
    } catch (err) {
      console.error('Profile update failed:', err);
      toast.error('Could not update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300"
      data-backdrop="true"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, minHeight: '100vh', minWidth: '100vw', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', isolation: 'isolate' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex items-center justify-center min-h-full pointer-events-none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Card className="profile-modal w-full max-w-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl relative animate-in zoom-in-95 duration-300 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <CardHeader className="relative">
            <Button variant="ghost" size="sm" onClick={onClose} className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition-transform transition-colors duration-200 text-gray-700 dark:text-gray-300" aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Edit Profile</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Update your personal information and learning preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-gray-900 dark:text-gray-100">Display Name</Label>
                  <Input id="displayName" className='placeholder:text-muted-foreground dark:placeholder:text-muted-foreground border-2 text-gray-900 dark:text-gray-100' placeholder="Your name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className='text-gray-900 dark:text-gray-100'>Email</Label>
                  <Input id="email" value={user?.email || ''} readOnly disabled className='border-2 text-gray-900 dark:text-gray-100 placeholder:text-muted-foreground dark:placeholder:text-muted-foreground' />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className='text-gray-900 dark:text-gray-100'>Phone Number</Label>
                  <div className="rounded-md border-2 border-input bg-background px-2 py-1.5">
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={phoneNumber}
                      onChange={(v) => setPhoneNumber(v || '')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob" className='text-gray-900 dark:text-gray-100'>Date of Birth</Label>
                  <Input id="dob" type="date" value={dateOfBirth || ''} onChange={(e) => setDateOfBirth(e.target.value)} className='border-2 text-gray-900 dark:text-gray-100 placeholder:text-muted-foreground dark:placeholder:text-muted-foreground' />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className='text-gray-900 dark:text-gray-100'>Country</Label>
                  <Select
                    inputId="country"
                    options={countryOptions}
                    className="universal-card hover:bg-muted/50 transition-colors"
                    value={countryOptions.find((o: { value: string; }) => o.value === country) || null}
                    onChange={(opt) => setCountry((opt as { value: string } | null)?.value || '')}
                    classNamePrefix="react-select"
                    styles={selectStyles}
                    placeholder="Select country"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nativeLanguage" className='text-gray-900 dark:text-gray-100'>Native Language</Label>
                  <Input id="nativeLanguage" value={nativeLanguage} onChange={(e) => setNativeLanguage(e.target.value)} className='border-2 placeholder:text-muted-foreground dark:placeholder:text-muted-foreground' placeholder='e.g., English' />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className='text-gray-900 dark:text-gray-100'>Timezone</Label>
                  <Select
                    inputId="timezone"
                    options={timezoneOptions.map(z => ({ label: z, value: z }))}
                    value={{ label: timezone, value: timezone }}
                    onChange={(opt) => setTimezone((opt as { value: string } | null)?.value || '')}
                    classNamePrefix="react-select"
                    styles={selectStyles}
                    placeholder="Select timezone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals" className='text-gray-900 dark:text-gray-100' >Learning Goals (comma separated)</Label>
                <Input id="goals" value={learningGoals} onChange={(e) => setLearningGoals(e.target.value)} placeholder="e.g., TEF preparation, daily conversation" className='border-2 placeholder:text-muted-foreground dark:placeholder:text-muted-foreground' />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSaveDisabled || loading} className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
                  {saving ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>) : 'Save Changes'}
                </Button>
                <Button type="button" variant="outline" onClick={() => refreshProfile()} disabled={loading} className="hover:shadow active:scale-95 transition-all duration-200">Reset</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


