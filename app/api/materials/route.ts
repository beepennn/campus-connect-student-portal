import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('uploaded_at', { ascending: false })

    if (error) {
      console.error('[v0] Error fetching materials:', error)
      return NextResponse.json(
        { error: 'Failed to fetch materials' },
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
