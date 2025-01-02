//this is for collisions or music soujnd 
//karaoke


import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.SUPABASE_URL || "https://ewkxvbgbzikwwudriebh.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y"
const supabase = createClient(supabaseUrl, supabaseKey)

// GET endpoint to read all KV pairs
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('group_chat_messages')
      .select('*')
    
    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST endpoint to write a new KV pair
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('group_chat_messages')
        .insert([{ content }])
      .select()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
