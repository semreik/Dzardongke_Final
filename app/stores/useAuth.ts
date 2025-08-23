import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { createUser, getUser } from '../db/authRepo';
import { deriveKey, fromHex, makeSalt, toHex } from '../auth/authCrypto';

type AuthState = {
  currentUser: string | null;
  loading: boolean;
  hydrate: () => Promise<void>;
  signup: (username: string, password: string, confirm: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const CURRENT_USER_KEY = 'auth:currentUser';

export const useAuth = create<AuthState>((set) => ({
  currentUser: null,
  loading: false,

  hydrate: async () => {
    const u = await SecureStore.getItemAsync(CURRENT_USER_KEY);
    set({ currentUser: u ?? null });
  },

  signup: async (username, password, confirm) => {
    if (!username || !password || password !== confirm) throw new Error('Invalid input');
    set({ loading: true });
    const exists = await getUser(username);
    if (exists) { set({ loading: false }); throw new Error('Username already exists'); }
    const salt = makeSalt(16);
    const derived = await deriveKey(password, salt);
    await createUser({
      username,
      password_hash: toHex(derived),
      salt: toHex(salt),
      iters: 120_000,
      created_at: Date.now(),
    });
    await SecureStore.setItemAsync(CURRENT_USER_KEY, username);
    set({ currentUser: username, loading: false });
  },

  login: async (username, password) => {
    set({ loading: true });
    const u = await getUser(username);
    if (!u) { set({ loading: false }); throw new Error('User not found'); }
    const derived = await deriveKey(password, fromHex(u.salt), u.iters);
    if (toHex(derived) !== u.password_hash) { set({ loading: false }); throw new Error('Invalid credentials'); }
    await SecureStore.setItemAsync(CURRENT_USER_KEY, username);
    set({ currentUser: username, loading: false });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(CURRENT_USER_KEY);
    set({ currentUser: null });
  },
}));


