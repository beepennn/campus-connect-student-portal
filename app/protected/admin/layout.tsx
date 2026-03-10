import React from "react"
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user is actually an admin (from database, not just metadata)
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .single()

  // If admin_users table doesn't exist, check user_metadata
  if (!adminData && user.user_metadata?.user_type !== 'admin') {
    redirect('/protected/dashboard')
  }

  return <>{children}</>
}
