'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SelectRolePage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRoleSelect(role: 'student' | 'admin') {
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          user_type: role,
        },
      })

      if (error) throw error

      router.push('/protected/dashboard')
    } catch (err) {
      console.error('Error updating role:', err)
      alert('Failed to set role. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Select Your Role</CardTitle>
          <CardDescription>Choose how you'll use CampusConnect</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              onClick={() => handleRoleSelect('student')}
              disabled={loading}
              className="w-full h-24 text-lg"
              variant="outline"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👨‍🎓</div>
                <div>I'm a Student</div>
                <div className="text-xs text-gray-500">View materials and announcements</div>
              </div>
            </Button>
            <Button
              onClick={() => handleRoleSelect('admin')}
              disabled={loading}
              className="w-full h-24 text-lg"
              variant="outline"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👨‍🏫</div>
                <div>I'm Faculty/Admin</div>
                <div className="text-xs text-gray-500">Manage content and students</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
