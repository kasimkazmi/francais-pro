# Firebase Setup Guide

This guide will help you set up Firebase for the Français Pro application to resolve the "Missing or insufficient permissions" error.

## Prerequisites

1. A Google account
2. Access to the Firebase Console
3. A Firebase project (or create a new one)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "francais-pro")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Optionally enable "Google" authentication

## Step 3: Set up Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll update rules later)
4. Select a location for your database
5. Click "Done"

## Step 4: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname (e.g., "francais-pro-web")
5. Copy the Firebase configuration object

## Step 5: Create Environment File

Create a `.env.local` file in your project root with the following content:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace the placeholder values with your actual Firebase configuration values.

## Step 6: Deploy Firestore Rules

1. Go to "Firestore Database" → "Rules" tab
2. Replace the existing rules with the content from `firestore.rules` in this project
3. Click "Publish"

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/welcome`
3. Check the browser console for any Firebase errors
4. The stats should now load without permission errors

## Troubleshooting

### Common Issues

1. **"Missing or insufficient permissions"**
   - Ensure Firestore rules are deployed correctly
   - Check that your Firebase project ID is correct in `.env.local`

2. **"Firebase not configured"**
   - Verify all environment variables are set correctly
   - Make sure `.env.local` is in the project root
   - Restart your development server after creating the environment file

3. **Authentication errors**
   - Ensure Authentication is enabled in Firebase Console
   - Check that the correct sign-in methods are enabled

### Verification Steps

1. Check browser console for Firebase initialization logs
2. Verify that stats load on the welcome page
3. Test user registration/login functionality
4. Check Firestore for created documents

## Security Notes

- The current Firestore rules allow public read access for stats calculation
- User data is protected by authentication requirements
- Consider implementing more restrictive rules for production

## Next Steps

After successful setup:
1. Test all authentication flows
2. Verify data persistence in Firestore
3. Test the admin dashboard functionality
4. Consider implementing additional security measures for production

## Support

If you encounter issues:
1. Check the browser console for detailed error messages
2. Verify your Firebase project configuration
3. Ensure all environment variables are correctly set
4. Check that Firestore rules are properly deployed
