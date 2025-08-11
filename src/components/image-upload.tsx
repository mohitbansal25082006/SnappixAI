'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

interface ImageUploadProps {
  projectId: string
  onUploadComplete: (imageUrl: string) => void
}

export function ImageUpload({ projectId, onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be less than 5MB')
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const filename = `${projectId}/${Date.now()}-${file.name}`
      
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const result = await response.json()
      onUploadComplete(result.url)
      toast.success('Image uploaded successfully!')
      
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload image')
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [projectId, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: uploading,
  })

  return (
    <Card>
      <CardContent>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors hover:border-purple-400
            ${isDragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600" />
              <p className="text-sm text-gray-600">Uploading...</p>
              <Progress value={progress} className="w-full max-w-xs mx-auto" />
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-medium">
                  {isDragActive ? 'Drop image here' : 'Upload Figma Screenshot'}
                </p>
                <p className="text-sm text-gray-500">
                  Drag & drop or click to select PNG, JPG, or WebP files
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}