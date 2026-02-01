'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/navbar'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    notices: 0,
    materials: 0,
    events: 0,
    announcements: 0,
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdminAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      if (user.user_metadata?.user_type !== 'admin') {
        router.push('/protected/dashboard')
        return
      }

      setUser(user)

      // Fetch stats
      const [noticesRes, materialsRes, eventsRes, announcementsRes] = await Promise.all([
        supabase.from('notices').select('id', { count: 'exact' }),
        supabase.from('materials').select('id', { count: 'exact' }),
        supabase.from('events').select('id', { count: 'exact' }),
        supabase.from('announcements').select('id', { count: 'exact' }),
      ])

      setStats({
        notices: noticesRes.count || 0,
        materials: materialsRes.count || 0,
        events: eventsRes.count || 0,
        announcements: announcementsRes.count || 0,
      })

      setLoading(false)
    }

    checkAdminAccess()
  }, [supabase, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage campus content, notices, materials, events, and announcements</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.notices}</div>
                <p className="text-xs text-muted-foreground mt-2">Published notices</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.materials}</div>
                <p className="text-xs text-muted-foreground mt-2">Course materials</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.events}</div>
                <p className="text-xs text-muted-foreground mt-2">Campus events</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.announcements}</div>
                <p className="text-xs text-muted-foreground mt-2">Quick announcements</p>
              </CardContent>
            </Card>
          </div>

          {/* Management Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Content Management</CardTitle>
                <CardDescription>Create and manage all campus content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/protected/admin/notices" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Manage Notices
                  </Button>
                </Link>
                <Link href="/protected/admin/materials" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Manage Materials
                  </Button>
                </Link>
                <Link href="/protected/admin/events" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Manage Events
                  </Button>
                </Link>
                <Link href="/protected/admin/announcements" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Manage Announcements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
                <CardDescription>System settings and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  View Analytics
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  User Reports
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  System Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
