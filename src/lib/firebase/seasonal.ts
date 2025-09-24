import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, Unsubscribe } from 'firebase/firestore';
import { db } from './config';

export type AdminSeasonalTheme = 'default' | 'halloween' | 'christmas' | 'spring' | 'summer' | 'autumn';

const SETTINGS_DOC = doc(db, 'systemSettings', 'seasonalTheme');

export async function getAdminSelectedTheme(): Promise<AdminSeasonalTheme> {
  const snap = await getDoc(SETTINGS_DOC);
  if (snap.exists()) {
    const data = snap.data() as { currentTheme?: AdminSeasonalTheme };
    return (data.currentTheme || 'default');
  }
  return 'default';
}

export async function setAdminSelectedTheme(theme: AdminSeasonalTheme): Promise<void> {
  await setDoc(SETTINGS_DOC, { currentTheme: theme, updatedAt: serverTimestamp() }, { merge: true });
}

export function subscribeAdminSelectedTheme(cb: (theme: AdminSeasonalTheme) => void): Unsubscribe {
  return onSnapshot(
    SETTINGS_DOC,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as { currentTheme?: AdminSeasonalTheme };
        cb((data.currentTheme || 'default'));
      } else {
        cb('default');
      }
    },
    // Gracefully handle permission errors (fallback to default)
    (_err) => {
      // eslint-disable-next-line no-console
      console.warn('[seasonal] Could not subscribe to global theme (permission). Falling back to default.');
      cb('default');
    }
  );
}


