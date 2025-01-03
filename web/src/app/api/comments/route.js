import { db } from '../../../lib/turso'

export async function GET() {
    const { rows } = await db.execute('SELECT * FROM comments ORDER BY created_at DESC')
    return NextResponse.json(rows)
  }
  
  // app/api/comments/route.js
import { NextResponse } from 'next/server'


export async function POST(request) {
  try {
    const { comment, mood } = await request.json()

    // Validate input
    if (!comment) {
      return NextResponse.json({ error: 'Comment is required' }, { status: 400 })
    }

    const result = await db.execute({
      sql: 'INSERT INTO comments (comment, mood) VALUES (?, ?)',
      args: [comment, mood]
    })

    return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 200 })
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      cause: error.cause
    })
    return NextResponse.json(
      { error: 'Database connection error. Please try again.' }, 
      { status: 502 }
    )
  }
}
