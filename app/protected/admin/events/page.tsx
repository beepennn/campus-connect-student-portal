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

export default function EventsManagementPage() {
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [eventDate, setEventDate] = useState('')
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
      await fetchEvents()
      setLoading(false)
    }

    checkAdmin()
  }, [supabase, router])

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })

    setEvents(data || [])
  }

  async function handleAddEvent(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !description || !eventDate) {
      alert('Please fill in all required fields')
      return
    }

    try {
      if (editingId) {
        const response = await fetch(`/api/events/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, location, start_date: eventDate }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to update event')
        }

        setEditingId(null)
      } else {
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, location, start_date: eventDate }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to create event')
        }
      }

      setTitle('')
      setDescription('')
      setLocation('')
      setEventDate('')
      await fetchEvents()
      alert(editingId ? 'Event updated successfully!' : 'Event created successfully!')
    } catch (error) {
      console.error('[v0] Error:', error)
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to delete event')
        }

        await fetchEvents()
        alert('Event deleted successfully!')
      } catch (error) {
        console.error('[v0] Error deleting event:', error)
        alert(error instanceof Error ? error.message : 'Failed to delete event')
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
              <h1 className="text-2xl sm:text-3xl font-bold">Manage Events</h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Create and manage campus events</p>
            </div>
            <Link href="/protected/admin/dashboard">
              <Button variant="outline" className="w-full sm:w-auto">Back</Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Event' : 'Create New Event'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Event title"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date & Time</label>
                    <Input
                      type="datetime-local"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Event location"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Event description"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? 'Update Event' : 'Create Event'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Events ({events.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.length === 0 ? (
                  <p className="text-muted-foreground">No events yet</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base break-words">{event.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs sm:text-sm">
                              📅 {new Date(event.start_date).toLocaleDateString()}{' '}
                              {new Date(event.start_date).toLocaleTimeString()}
                            </p>
                            {event.location && <p className="text-xs sm:text-sm break-words">📍 {event.location}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTitle(event.title)
                              setDescription(event.description)
                              setLocation(event.location || '')
                              setEventDate(event.start_date.slice(0, 16))
                              setEditingId(event.id)
                            }}
                            className="flex-1 sm:flex-none"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(event.id)}
                            className="flex-1 sm:flex-none"
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
