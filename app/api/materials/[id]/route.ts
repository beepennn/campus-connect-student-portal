import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
        { error: 'Only admins can delete materials' },
        { status: 403 }
      )
    }

    // Get the material to find file_url
    const { data: material } = await supabase
      .from('materials')
      .select('file_url')
      .eq('id', id)
      .single()

    // Delete file from storage if it exists
    if (material?.file_url) {
      await supabase.storage
        .from('materials')
        .remove([material.file_url])
    }

    // Delete from database
    const { error } = await supabase
      .from('materials')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting material:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete material' },
      { status: 500 }
    )
  }
}
