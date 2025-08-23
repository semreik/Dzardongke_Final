import { openDb } from '../../lib/db/sqlite';
import { Platform } from 'react-native';
import * as SecureStore from '../../lib/utils/secureStore';

const PROGRESS_PREFIX = 'flashcard_progress:user:';
const SAVED_PREFIX = 'saved_items:user:';
const AUTH_KEY = 'auth.currentUser';

export async function wipeAllData(): Promise<void> {
  // SQL tables (users + stats)
  try {
    const db = await openDb();
    await db.execAsync(`DELETE FROM stats; DELETE FROM users;`);
  } catch {}

  // Key-Value stores (web only can enumerate)
  if (Platform.OS === 'web') {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (k.startsWith(PROGRESS_PREFIX) || k.startsWith(SAVED_PREFIX) || k === AUTH_KEY) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch {}
  } else {
    // On native we cannot enumerate SecureStore; best-effort: clear current auth key
    try { await SecureStore.deleteItemAsync(AUTH_KEY); } catch {}
  }
}


