import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';

// Helper function to create an admin user
export async function createAdminUser(uid: string, email: string, displayName: string) {
  try {
    const adminData = {
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_content'],
      email,
      displayName,
      createdAt: new Date(),
      lastActive: new Date()
    };

    console.log('Attempting to create admin user:', { uid, email, displayName });
    await setDoc(doc(db, 'adminUsers', uid), adminData);
    console.log('Admin user created successfully:', uid);
    return true;
  } catch (error) {
    console.error('Error creating admin user:', error);
    console.error('Error details:', {
      code: (error as { code?: string })?.code,
      message: (error as { message?: string })?.message,
      uid,
      email
    });
    throw error; // Re-throw to provide more details to the UI
  }
}

// Helper function to create a moderator user
export async function createModeratorUser(uid: string, email: string, displayName: string) {
  try {
    const moderatorData = {
      role: 'moderator',
      permissions: ['read', 'write', 'manage_content'],
      email,
      displayName,
      createdAt: new Date(),
      lastActive: new Date()
    };

    console.log('Attempting to create moderator user:', { uid, email, displayName });
    await setDoc(doc(db, 'adminUsers', uid), moderatorData);
    console.log('Moderator user created successfully:', uid);
    return true;
  } catch (error) {
    console.error('Error creating moderator user:', error);
    console.error('Error details:', {
      code: (error as { code?: string })?.code,
      message: (error as { message?: string })?.message,
      uid,
      email
    });
    throw error; // Re-throw to provide more details to the UI
  }
}

// Check if any admin users exist (for initial setup)
export async function checkAdminUsersExist(): Promise<boolean> {
  try {
    const adminUsersRef = collection(db, 'adminUsers');
    const snapshot = await getDocs(adminUsersRef);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking admin users:', error);
    return false;
  }
}

// Instructions for setting up the first admin user
export const ADMIN_SETUP_INSTRUCTIONS = `
To set up the first admin user:

1. Sign up or sign in to your application
2. Open the browser console (F12)
3. Run the following command with your user ID:

// For admin access:
createAdminUser('YOUR_USER_ID', 'your-email@example.com', 'Your Name');

// For moderator access:
createModeratorUser('YOUR_USER_ID', 'your-email@example.com', 'Your Name');

4. Refresh the page and you should see the Admin Panel link in the sidebar

Note: Replace 'YOUR_USER_ID' with your actual Firebase user ID.
You can find your user ID in the Firebase console or by checking the user object in your app.
`;
