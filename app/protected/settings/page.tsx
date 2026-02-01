'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/navbar'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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
      setLoading(false)
    }

    checkUser()
  }, [supabase, router])

  async function handlePasswordReset() {
    await supabase.auth.resetPasswordForEmail(user?.email)
    alert('Password reset email sent to your inbox')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handlePasswordReset} variant="outline">
                Reset Password
              </Button>
              <p className="text-sm text-muted-foreground">
                We'll send you an email with instructions to reset your password
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="notices" className="text-sm font-medium">
                  Notice Notifications
                </label>
                <input type="checkbox" id="notices" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="events" className="text-sm font-medium">
                  Event Notifications
                </label>
                <input type="checkbox" id="events" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="announcements" className="text-sm font-medium">
                  Announcement Notifications
                </label>
                <input type="checkbox" id="announcements" defaultChecked className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => {}} variant="destructive">
                Delete Account
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => router.push('/protected/dashboard')} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
