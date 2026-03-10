'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TextWithLinks } from '@/components/text-with-links'

export default function MaterialsList() {
  const [materials, setMaterials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data, error } = await supabase
          .from('materials')
          .select('*')
          .order('uploaded_at', { ascending: false })
          .limit(5)

        if (error) throw error
        setMaterials(data || [])
      } catch (error) {
        console.error('Error fetching materials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [supabase])

  return (
    <Card>
      <CardHeader>
        <CardTitle>📚 Course Materials</CardTitle>
        <CardDescription>Resources shared by faculty</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading materials...</p>
        ) : materials.length === 0 ? (
          <p className="text-muted-foreground">No materials available yet</p>
        ) : (
          <div className="space-y-4">
            {materials.map((material) => (
              <div key={material.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <h4 className="font-semibold">{material.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <TextWithLinks text={material.description} />
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {material.subject || 'General'}
                  </span>
                  {material.file_url && (
                    <a
                      href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/materials/${material.file_url}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90 transition inline-block font-medium"
                    >
                      Open
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <Button className="w-full mt-4 bg-transparent" variant="outline">
          View All Materials
        </Button>
      </CardContent>
    </Card>
  )
}
