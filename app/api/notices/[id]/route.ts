import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const isAdmin = user.user_metadata?.user_type === 'admin'
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Only admins can update notices' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('notices')
      .update({ title, content })
      .eq('id', id)
      .select()

    if (error) {
      console.error('[v0] Error updating notice:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to update notice' },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0])
  } catch (err) {
    console.error('[v0] API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id || id === 'undefined') {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const isAdmin = user.user_metadata?.user_type === 'admin'
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Only admins can delete notices' },
        { status: 403 }
      )
    }

    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[v0] Error deleting notice:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to delete notice' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[v0] API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
