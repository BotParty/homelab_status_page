import { Database } from "bun:sqlite";

/**
 * Generate a random word of a given length
 */
function generateRandomWord(length = 5) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// 1. CREATE (or open) the database file on disk
//    Passing a string filename instructs Bun:sqlite to create (if missing) or open the file.
const db = new Database("kvstore.sqlite", { create: true });

// 2. Create a table for key-value storage
//    - key will store the timestamp
//    - value will store the random word
db.exec(`
  CREATE TABLE IF NOT EXISTS kv (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// 3. Insert 10 random timestamp → word pairs
const insertStmt = db.prepare("INSERT INTO kv (key, value) VALUES (?, ?)");
for (let i = 0; i < 10; i++) {
  const timestamp = new Date().toISOString();
  const randomWord = generateRandomWord();
  insertStmt.run(timestamp, randomWord);
}

// 4. Read back all rows from the database
const allRows = db.query("SELECT * FROM kv").all();
console.log("All rows from kv table:", allRows);

// 5. Close the database to ensure everything is written to disk
db.close();

// --- Later, or in a different script, we can open "kvstore.sqlite" again and read its contents ---
//    For demonstration, we'll just re-open it here in the same file.
const db2 = new Database("kvstore.sqlite");

// Read again to confirm data was persisted
const allRowsAgain = db2.query("SELECT * FROM kv").all();
console.log("Rows after re-opening kvstore.sqlite:", allRowsAgain);

// Close the second DB connection
db2.close();
