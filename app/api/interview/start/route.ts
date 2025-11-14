import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { user_id, notes, duration } = await req.json()

    // Authentication check commented out - app is now public
    // Use a placeholder user_id if not provided
    const sessionUserId = user_id || 'public-user-' + Date.now()

    // if (!user_id) {
    //   return NextResponse.json(
    //     { error: 'user_id is required' },
    //     { status: 400 }
    //   )
    // }

    const { data, error } = await supabase
      .from('interview_sessions')
      .insert([{ user_id: sessionUserId, notes, duration }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ sessionId: data.id })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    )
  }
}

