import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type SavedSource = 'deck' | 'dictionary';

export interface SavedItem {
  id: string; // unique id
  prompt: string; // English prompt
  answer: string; // target language answer
  language: 'dz' | 'qu';
  explanation: string; // rich text explanation
  notes?: string;
  source: SavedSource;
  deckId?: string;
  cardId?: string;
  createdAt: string; // ISO
}

interface SavedState {
  items: SavedItem[];
  loadSaved: () => Promise<void>;
  saveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => Promise<SavedItem>;
  removeItem: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

const STORAGE_KEY = 'saved_items';

export const useSaved = create<SavedState>((set, get) => ({
  items: [],

  loadSaved: async () => {
    let stored: string | null;
    if (Platform.OS === 'web') {
      stored = localStorage.getItem(STORAGE_KEY);
    } else {
      stored = await SecureStore.getItemAsync(STORAGE_KEY);
    }
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SavedItem[];
        set({ items: parsed });
      } catch {
        // ignore corrupt
      }
    }
  },

  saveItem: async (item) => {
    const id = Math.random().toString(36).slice(2);
    const createdAt = new Date().toISOString();
    const newItem: SavedItem = { id, createdAt, ...item };
    const next = [...get().items, newItem];
    set({ items: next });
    const payload = JSON.stringify(next);
    if (Platform.OS === 'web') {
      localStorage.setItem(STORAGE_KEY, payload);
    } else {
      await SecureStore.setItemAsync(STORAGE_KEY, payload);
    }
    return newItem;
  },

  removeItem: async (id: string) => {
    const next = get().items.filter(i => i.id !== id);
    set({ items: next });
    const payload = JSON.stringify(next);
    if (Platform.OS === 'web') {
      localStorage.setItem(STORAGE_KEY, payload);
    } else {
      await SecureStore.setItemAsync(STORAGE_KEY, payload);
    }
  },

  clearAll: async () => {
    set({ items: [] });
    if (Platform.OS === 'web') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    }
  },
}));


