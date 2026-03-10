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

  // Check if user is in admin_users table (the only valid way to be an admin)
  const { data: adminData, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .single()

  // IMPORTANT: User MUST be in admin_users table to access admin panel
  // Even if they somehow set user_type to 'admin' in metadata, they won't be authorized
  if (!adminData || error) {
    // Redirect non-admins to student dashboard
    redirect('/protected/dashboard')
  }

  return <>{children}</>
}
