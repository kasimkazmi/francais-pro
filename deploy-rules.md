# Deploy Firestore Rules

To fix the "Missing or insufficient permissions" error, you need to deploy the updated Firestore rules.

## Option 1: Using Firebase CLI (Recommended)

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase project** (if not already done):
   ```bash
   firebase init firestore
   ```

4. **Deploy the rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Option 2: Using Firebase Console (Manual)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Rules**
4. Copy the contents of `firestore.rules` file
5. Paste it into the rules editor
6. Click **Publish**

## Option 3: Temporary Workaround

If you can't deploy the rules immediately, the favorites system will fallback to localStorage only. The updated code now handles permission errors gracefully and won't break the application.

## What the Rules Do

The updated rules allow:
- Users to read, write, and delete their own favorites
- Users to create new favorites with their own userId
- Prevents users from accessing other users' favorites

```javascript
// User favorites - users can only access their own favorites
match /userFavorites/{favoriteId} {
  allow read, write, delete: if request.auth != null && 
    resource.data.userId == request.auth.uid;
  allow create: if request.auth != null && 
    request.resource.data.userId == request.auth.uid;
}
```
