'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TextWithLinks } from '@/components/text-with-links'

export default function NoticesList() {
  const [notices, setNotices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) throw error
        setNotices(data || [])
      } catch (error) {
        console.error('Error fetching notices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [supabase])

  return (
    <Card>
      <CardHeader>
        <CardTitle>📢 Latest Notices</CardTitle>
        <CardDescription>Important updates from your campus</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : notices.length === 0 ? (
          <p className="text-muted-foreground">No notices available</p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="border-l-4 border-primary pl-4 py-2">
                <h5 className="font-semibold text-foreground">{notice.title}</h5>
                <p className="text-sm text-muted-foreground">
                  <TextWithLinks text={notice.content} />
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
