// Use platform files directly via React Native resolver (sqlite.native.ts / sqlite.web.ts)
import { openDb as openPlatformDb } from './sqlite.native';

export async function openDb() {
  const db = await openPlatformDb();
  // Ensure basic tables exist
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      iters INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      key TEXT NOT NULL,
      value INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL,
      UNIQUE(username, key),
      FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE
    );
  `);
  dbInstance = db;
  return db;
}


