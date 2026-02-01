import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if user already has user_type metadata (existing user from email/password)
      if (data.user.user_metadata?.user_type) {
        // Existing user, go to dashboard
        return NextResponse.redirect(new URL('/protected/dashboard', request.url))
      } else {
        // New OAuth user, redirect to role selection
        return NextResponse.redirect(new URL('/auth/select-role', request.url))
      }
    }
  }

  return NextResponse.redirect(new URL('/auth/login', request.url))
}
