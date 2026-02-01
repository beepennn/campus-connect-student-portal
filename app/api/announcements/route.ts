import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('[v0] Error fetching announcements:', error)
      return NextResponse.json(
        { error: 'Failed to fetch announcements' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('[v0] API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const isAdmin = user.user_metadata?.user_type === 'admin'
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Only admins can create announcements' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description } = body

    // Validate input
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Insert announcement
    const { data, error } = await supabase
      .from('announcements')
      .insert([
        {
          title,
          description: description || title,
        },
      ])
      .select()

    if (error) {
      console.error('[v0] Error creating announcement:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to create announcement' },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (err) {
    console.error('[v0] API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
