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

export default function NoticesManagementPage() {
  const [user, setUser] = useState<any>(null)
  const [notices, setNotices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
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
      await fetchNotices()
      setLoading(false)
    }

    checkAdmin()
  }, [supabase, router])

  async function fetchNotices() {
    const { data } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false })

    setNotices(data || [])
  }

  async function handleAddNotice(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !description) return

    try {
      if (editingId) {
        // Update existing
        const response = await fetch(`/api/notices/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content: description }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to update notice')
        }

        setEditingId(null)
      } else {
        // Create new via API
        const response = await fetch('/api/notices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content: description }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to create notice')
        }
      }

      setTitle('')
      setDescription('')
      await fetchNotices()
    } catch (error) {
      console.error('[v0] Error:', error)
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this notice? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/notices/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to delete notice')
        }

        await fetchNotices()
      } catch (error) {
        console.error('[v0] Error deleting notice:', error)
        alert(error instanceof Error ? error.message : 'Failed to delete notice')
      }
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Manage Notices</h1>
              <p className="text-muted-foreground mt-2">Create and manage important campus notices</p>
            </div>
            <Link href="/protected/admin/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <Card className="border-border">
            <CardHeader className="bg-card">
              <CardTitle className="text-2xl text-foreground">{editingId ? 'Edit Notice' : 'Create New Notice'}</CardTitle>
              <CardDescription>Fill in the details below to {editingId ? 'update the' : 'create a new'} notice</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddNotice} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Campus Maintenance Scheduled for Next Weekend"
                    required
                    className="border-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide detailed information about the notice..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  {editingId ? 'Update Notice' : 'Publish Notice'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="bg-card">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-foreground">Published Notices ({notices.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {notices.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No notices published yet. Create your first notice above!</p>
                  </div>
                ) : (
                  notices.map((notice) => (
                    <div key={notice.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-foreground">{notice.title}</h4>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{notice.content}</p>
                          <p className="text-xs text-muted-foreground mt-3">
                            Published: {new Date(notice.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTitle(notice.title)
                              setDescription(notice.description)
                              setEditingId(notice.id)
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(notice.id)}
                          >
                            Delete
                          </Button>
                        </div>
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
