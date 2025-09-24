import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  updateProfile,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import { auth, googleProvider } from './config';

export function observeAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function emailSignUp(email: string, password: string, displayName?: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  
  // Set display name if provided
  if (displayName) {
    await updateProfile(res.user, { displayName });
  }
  
  return res.user;
}

export async function emailSignIn(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function resetPassword(email: string, continueUrl?: string) {
  const actionCodeSettings = continueUrl
    ? { url: continueUrl, handleCodeInApp: true }
    : undefined;
  await sendPasswordResetEmail(auth, email, actionCodeSettings);
}

export { verifyPasswordResetCode, confirmPasswordReset };

export async function googleSignIn() {
  const res = await signInWithPopup(auth, googleProvider);
  return res.user;
}

export async function signOutUser() {
  await signOut(auth);
}


