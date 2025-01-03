// // lib/turso.js
// import { createClient } from '@libsql/client'

// const url = process.env.TURSO_DB_URL
// const authToken = process.env.TURSO_DB_TOKEN

// export const db = createClient({ url, authToken })

// export async function getComments() {
//   const { rows } = await db.execute('SELECT * FROM comments ORDER BY created_at DESC')
//   return rows
// }

export function getComments() {
  return []
}