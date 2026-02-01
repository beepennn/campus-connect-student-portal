'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/navbar'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      setEmail(user.email || '')
      setFullName(user.user_metadata?.full_name || '')
      setUserType(user.user_metadata?.user_type || 'student')

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [supabase, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your account information</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input value={fullName} readOnly className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input value={email} readOnly className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">User Type</label>
                <Input value={userType} readOnly className="bg-gray-100" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                Email Status: <span className="font-semibold text-green-600">Verified</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Member since {new Date(user?.created_at).toLocaleDateString()}
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
