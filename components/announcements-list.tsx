'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) throw error
        setAnnouncements(data || [])
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [supabase])

  return (
    <Card>
      <CardHeader>
        <CardTitle>📝 Announcements</CardTitle>
        <CardDescription>Quick updates</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : announcements.length === 0 ? (
          <p className="text-sm text-muted-foreground">No announcements yet</p>
        ) : (
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="text-sm border-b pb-3 last:border-b-0">
                <p className="font-medium">{announcement.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(announcement.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
