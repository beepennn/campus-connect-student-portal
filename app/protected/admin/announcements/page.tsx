'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/navbar'
import Link from 'next/link'

export default function AnnouncementsManagementPage() {
  const [user, setUser] = useState<any>(null)
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user || user.user_metadata?.user_type !== 'admin') {
        router.push('/protected/dashboard')
        return
      }

      setUser(user)
      await fetchAnnouncements()
      setLoading(false)
    }

    checkAdmin()
  }, [supabase, router])

  async function fetchAnnouncements() {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })

    setAnnouncements(data || [])
  }

  async function handleAddAnnouncement(e: React.FormEvent) {
    e.preventDefault()
    if (!title) return

    try {
      if (editingId) {
        const response = await fetch(`/api/announcements/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description: title }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to update announcement')
        }

        setEditingId(null)
      } else {
        const response = await fetch('/api/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description: title }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to create announcement')
        }
      }

      setTitle('')
      await fetchAnnouncements()
    } catch (error) {
      console.error('[v0] Error:', error)
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this announcement? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/announcements/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to delete announcement')
        }

        await fetchAnnouncements()
        alert('Announcement deleted successfully!')
      } catch (error) {
        console.error('[v0] Error deleting announcement:', error)
        alert(error instanceof Error ? error.message : 'Failed to delete announcement')
      }
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Manage Announcements</h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Post quick announcements</p>
            </div>
            <Link href="/protected/admin/dashboard">
              <Button variant="outline" className="w-full sm:w-auto">Back</Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Announcement' : 'Post New Announcement'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Announcement Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Quick announcement title"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? 'Update Announcement' : 'Post Announcement'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Announcements ({announcements.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.length === 0 ? (
                  <p className="text-muted-foreground">No announcements yet</p>
                ) : (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base break-words">{announcement.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(announcement.created_at).toLocaleDateString()}{' '}
                          {new Date(announcement.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setTitle(announcement.title)
                            setEditingId(announcement.id)
                          }}
                          className="flex-1 sm:flex-none"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(announcement.id)}
                          className="flex-1 sm:flex-none"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
