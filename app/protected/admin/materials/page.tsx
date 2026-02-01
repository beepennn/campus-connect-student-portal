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

export default function MaterialsManagementPage() {
  const [user, setUser] = useState<any>(null)
  const [materials, setMaterials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')
  const [file, setFile] = useState<File | null>(null)
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
      await fetchMaterials()
      setLoading(false)
    }

    checkAdmin()
  }, [supabase, router])

  async function fetchMaterials() {
    try {
      const { data } = await supabase
        .from('materials')
        .select('*')
        .order('uploaded_at', { ascending: false })

      setMaterials(data || [])
    } catch (error) {
      console.error('[v0] Error fetching materials:', error)
      alert('Failed to fetch materials')
    }
  }

  async function handleAddMaterial(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !subject || !description) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      let fileUrl = null

      // Upload file if provided
      if (file) {
        const fileName = `${Date.now()}-${file.name}`
        const { data, error: uploadError } = await supabase.storage
          .from('materials')
          .upload(`materials/${fileName}`, file)

        if (uploadError) {
          console.error('[v0] Upload error:', uploadError)
          throw new Error(`File upload failed: ${uploadError.message}`)
        }

        fileUrl = data?.path || null
      }

      if (editingId) {
        const { error } = await supabase
          .from('materials')
          .update({
            title,
            description,
            subject,
            ...(fileUrl && { file_url: fileUrl }),
          })
          .eq('id', editingId)

        if (error) throw error
        setEditingId(null)
      } else {
        const { error } = await supabase.from('materials').insert([
          {
            title,
            description,
            subject,
            uploaded_by: user?.id,
            file_url: fileUrl,
          },
        ])

        if (error) throw error
      }

      setTitle('')
      setSubject('')
      setDescription('')
      setFile(null)
      
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
      await fetchMaterials()
      alert(editingId ? 'Material updated successfully!' : 'Material published successfully!')
    } catch (error) {
      console.error('[v0] Error:', error)
      const message = error instanceof Error ? error.message : 'An error occurred'
      alert(`Failed to save material: ${message}`)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this material? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/materials/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to delete material')
        }

        await fetchMaterials()
        alert('Material deleted successfully!')
      } catch (error) {
        console.error('[v0] Error deleting material:', error)
        alert(error instanceof Error ? error.message : 'Failed to delete material')
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
              <h1 className="text-4xl font-bold text-foreground">Manage Materials</h1>
              <p className="text-muted-foreground mt-2">Upload and organize course materials by subject</p>
            </div>
            <Link href="/protected/admin/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <Card className="border-border">
            <CardHeader className="bg-card">
              <CardTitle className="text-2xl text-foreground">
                {editingId ? 'Edit Material' : 'Upload New Material'}
              </CardTitle>
              <CardDescription>Add course materials with subject classification and optional file attachment</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddMaterial} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Chapter 5 Lecture Notes"
                      required
                      className="border-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Subject *</label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Mathematics, Physics, Chemistry"
                      required
                      className="border-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about this material - what it covers, learning objectives, etc."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Upload File (Optional)
                  </label>
                  <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary transition cursor-pointer"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <input
                      id="file-input"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                    />
                    {file ? (
                      <div>
                        <p className="text-sm font-medium text-foreground">📄 {file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, or images
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full" 
                  disabled={submitting}
                >
                  {submitting ? 'Publishing...' : editingId ? 'Update Material' : 'Publish Material'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="bg-card">
              <CardTitle className="text-2xl text-foreground">Published Materials ({materials.length})</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {materials.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No materials uploaded yet. Create your first material above!</p>
                  </div>
                ) : (
                  materials.map((material) => (
                    <div key={material.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg text-foreground">{material.title}</h4>
                            {material.subject && (
                              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                {material.subject}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
                          <div className="mt-3 flex items-center gap-2">
                            {material.file_url && (
                              <a
                                href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/materials/${material.file_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded hover:bg-primary/20 transition"
                              >
                                📥 Download File
                              </a>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Uploaded: {new Date(material.uploaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTitle(material.title)
                              setDescription(material.description)
                              setSubject(material.subject || '')
                              setEditingId(material.id)
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(material.id)}
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
