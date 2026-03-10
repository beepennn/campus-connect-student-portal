'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TextWithLinks } from '@/components/text-with-links'

export default function EventsList() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true })
          .limit(5)

        if (error) throw error
        setEvents(data || [])
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [supabase])

  return (
    <Card>
      <CardHeader>
        <CardTitle>🎉 Upcoming Events</CardTitle>
        <CardDescription>Activities happening on campus</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-muted-foreground">No upcoming events</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border border-border rounded-lg p-3 sm:p-4 hover:bg-card hover:shadow-sm transition">
                <div className="flex flex-col gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground break-words">{event.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                      <TextWithLinks text={event.description} />
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-3 space-y-1 text-xs sm:text-sm">
                  <p className="text-muted-foreground">
                    📅 {new Date(event.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-muted-foreground break-words">
                    📍 {event.location ? <TextWithLinks text={event.location} /> : 'TBA'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button className="w-full mt-4 bg-transparent" variant="outline">
          View All Events
        </Button>
      </CardContent>
    </Card>
  )
}
