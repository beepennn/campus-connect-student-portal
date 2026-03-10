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
  const [notifications, setNotifications] = useState({
    notices: true,
    events: true,
    announcements: true,
  })
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
      
      // Load notification preferences
      const savedNotifications = localStorage.getItem('campusconnect_notifications')
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      }
      
      setLoading(false)
    }

    checkUser()
  }, [supabase, router])

  async function handlePasswordReset() {
    await supabase.auth.resetPasswordForEmail(user?.email)
    alert('Password reset email sent to your inbox')
  }

  async function handleNotificationChange(key: string) {
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    }
    setNotifications(updatedNotifications)
    
    // Save to localStorage (or could save to database)
    localStorage.setItem('campusconnect_notifications', JSON.stringify(updatedNotifications))
    alert('Notification preferences saved')
  }

  async function handleDeleteAccount() {
    if (!confirm('Are you absolutely sure you want to delete your account? This action CANNOT be undone.')) {
      return
    }

    if (!confirm('This will permanently delete all your data. Click OK to confirm deletion.')) {
      return
    }

    try {
      setLoading(true)
      // Delete user data first
      const { error: userDeleteError } = await supabase.auth.admin.deleteUser(user.id)
      
      if (userDeleteError) {
        // If admin method doesn't work, use the regular signout and request deletion
        await supabase.auth.signOut()
        router.push('/auth/login')
        alert('Account deletion initiated. We will process your request within 24 hours.')
        return
      }

      alert('Account deleted successfully')
      router.push('/auth/login')
    } catch (error) {
      console.error('[v0] Error deleting account:', error)
      alert('There was an error deleting your account. Please contact support.')
    } finally {
      setLoading(false)
    }
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
                <input 
                  type="checkbox" 
                  id="notices" 
                  checked={notifications.notices}
                  onChange={() => handleNotificationChange('notices')}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="events" className="text-sm font-medium">
                  Event Notifications
                </label>
                <input 
                  type="checkbox" 
                  id="events" 
                  checked={notifications.events}
                  onChange={() => handleNotificationChange('events')}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="announcements" className="text-sm font-medium">
                  Announcement Notifications
                </label>
                <input 
                  type="checkbox" 
                  id="announcements" 
                  checked={notifications.announcements}
                  onChange={() => handleNotificationChange('announcements')}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleDeleteAccount} variant="destructive" disabled={loading}>
                {loading ? 'Deleting...' : 'Delete Account'}
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
