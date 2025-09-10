# Deploy Firestore Indexes

To fix the "The query requires an index" error, you need to deploy the Firestore indexes.

## Option 1: Using Firebase CLI (Recommended)

1. **Deploy the indexes**:
   ```bash
   firebase deploy --only firestore:indexes
   ```

2. **Or deploy both rules and indexes together**:
   ```bash
   firebase deploy --only firestore
   ```

## Option 2: Using Firebase Console (Manual)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Indexes**
4. Click **Create Index**
5. Configure the index:
   - **Collection ID**: `userFavorites`
   - **Fields**:
     - `userId` (Ascending)
     - `addedAt` (Descending)
6. Click **Create**

## Option 3: Direct Link (Quick)

Click this link to create the index directly:
https://console.firebase.google.com/v1/r/project/francais-pro/firestore/indexes?create_composite=ClJwcm9qZWN0cy9mcmFuY2Fpcy1wcm8vZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3VzZXJGYXZvcml0ZXMvaW5kZXhlcy9fEAEaCgoGdXNlcklkEAEaCwoHYWRkZWRBdBACGgwKCF9fbmFtZV9fEAI

## What the Index Does

The composite index allows efficient querying of user favorites by:
- Filtering by `userId` (to get only the current user's favorites)
- Ordering by `addedAt` in descending order (newest first)

## Fallback Solution

The updated code now includes a fallback mechanism:
1. First tries to use the composite index query
2. If the index is not available, falls back to a simple query without ordering
3. Sorts the results manually in the application

This ensures the favorites system works even before the index is deployed.
