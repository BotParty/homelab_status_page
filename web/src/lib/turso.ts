// lib/turso.js
import { createClient } from '@libsql/client';

const dbUrl = process.env.TURSO_DB_URL;
const dbToken = process.env.TURSO_DB_TOKEN;

if (!dbUrl || !dbToken) {
  throw new Error('Missing TURSO_DB_URL or TURSO_DB_TOKEN in environment');
}

export const db = createClient({
  url: dbUrl,
  authToken: dbToken
});