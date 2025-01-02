// // app/api/turso/route.js
// import { createClient } from '@libsql/client';


// const dbUrl = process.env.TURSO_DB_URL || "libsql://hi-adnanwahab.turso.io"
// const dbToken = process.env.TURSO_DB_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzU2OTEzOTcsImlkIjoiMmM1NmM2ZjYtNjQ4MC00NjQ5LWEwZjctZjg2ZDE0MjlkYWQ3In0.x6kUzBhD710Muhxv_gah3BLjQ7Bb-Es_6daXC6XIK_A1-y8BDF8WALhXh8noppga2Fodl9lMA4oElP-T4JAHDA"

// if (!dbUrl || !dbToken) {
//   throw new Error('Missing TURSO_DB_URL or TURSO_DB_TOKEN in environment');
// }

// const db = createClient({
//   url: dbUrl,
//   authToken: dbToken
// });
// export async function GET() {
//   try {
//     // Simple query example
//     const { rows } = await db.execute('SELECT * FROM your_table;');
    
//     return new Response(JSON.stringify(rows), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500
//     });
//   }
// }


export async function GET() {
  return new Response("Hello World");
}