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

  async function handleRoleSelect() {
    setLoading(true)
    try {
      // All OAuth users default to student role
      const { error } = await supabase.auth.updateUser({
        data: {
          user_type: 'student',
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
              onClick={handleRoleSelect}
              disabled={loading}
              className="w-full h-24 text-lg"
              variant="default"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👨‍🎓</div>
                <div>Continue as Student</div>
                <div className="text-xs text-gray-400">View materials and announcements</div>
              </div>
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Admin/Faculty access is granted by administrators only. Contact your campus administrator to request admin access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
