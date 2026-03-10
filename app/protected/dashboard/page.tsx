'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/navbar'
import NoticesList from '@/components/notices-list'
import MaterialsList from '@/components/materials-list'
import EventsList from '@/components/events-list'
import AnnouncementsList from '@/components/announcements-list'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState<'student' | 'admin' | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      setUserType(user.user_metadata?.user_type || 'student')
      setLoading(false)
    }

    checkUser()
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
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 sm:p-6 lg:p-8 text-primary-foreground">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">Welcome back, {user?.user_metadata?.full_name || 'Student'}!</h1>
            <p className="text-sm sm:text-base lg:text-lg opacity-90">Stay connected with your campus community. Explore notices, materials, events, and announcements.</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <NoticesList />
              <MaterialsList />
              <EventsList />
            </div>

            {/* Sidebar */}
            <div className="space-y-4 lg:space-y-6">
              <AnnouncementsList />

              {userType === 'admin' && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-primary">Admin Controls</CardTitle>
                    <CardDescription>Manage campus content and settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-transparent" variant="outline" size="sm">
                      Go to Admin Dashboard
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline" size="sm">
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage your profile and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    My Profile
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
