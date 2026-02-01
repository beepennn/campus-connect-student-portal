import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })

    if (error) {
      console.error('[v0] Error fetching events:', error)
      return NextResponse.json(
        { error: 'Failed to fetch events' },
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

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const isAdmin = user.user_metadata?.user_type === 'admin'
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Only admins can create events' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, start_date, location } = body

    if (!title || !description || !start_date) {
      return NextResponse.json(
        { error: 'Title, description, and start_date are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          start_date,
          location: location || null,
          created_by: user.id,
        },
      ])
      .select()

    if (error) {
      console.error('[v0] Error creating event:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to create event' },
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
