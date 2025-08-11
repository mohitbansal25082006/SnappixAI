'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageUpload } from './image-upload'
// Removed unused Alert imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface ComponentGeneratorProps {
  projectId: string
  // removed unused projectName
}

export function ComponentGenerator({ projectId }: ComponentGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  // Replaced `any` with a safer type
  const [designTokens, setDesignTokens] = useState<Record<string, unknown> | null>(null)

  // Save initial version after AI generates code
  const saveInitialVersion = async (code: string) => {
    try {
      await fetch('/api/components/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentId: projectId, // use projectId or componentId? Original was component.id but here only projectId available
          code,
          designTokens,
          changelog: 'AI-generated initial version',
        }),
      })
    } catch (error) {
      console.error('Failed to save initial version:', error)
    }
  }

  const handleAnalyze = async () => {
    if (!imageUrl) return

    setAnalyzing(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, projectId }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      setGeneratedCode(result.code)
      setDesignTokens(result.designTokens)
      toast.success('Component generated successfully!')

      // Save initial version after generating code
      saveInitialVersion(result.code)
    } catch {
      // Removed unused error variable
      toast.error('Failed to analyze image')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSave = async () => {
    if (!generatedCode || !imageUrl) return

    try {
      const response = await fetch('/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Component-${Date.now()}`,
          code: generatedCode,
          imageUrl,
          designTokens,
          projectId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save component')
      }

      toast.success('Component saved!')
      // Reset form
      setImageUrl(null)
      setGeneratedCode(null)
      setDesignTokens(null)
    } catch {
      // Removed unused error variable
      toast.error('Failed to save component')
    }
  }

  return (
    <div className="space-y-6">
      {!imageUrl ? (
        <ImageUpload
          projectId={projectId}
          onUploadComplete={setImageUrl}
        />
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 rounded-lg border overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Uploaded design"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setImageUrl(null)}
            >
              Upload Different Image
            </Button>
            <Button
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Component
                </>
              )}
            </Button>
          </div>

          {generatedCode && (
            <>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>Generated Component</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <code>{generatedCode}</code>
                  </pre>
                  <Button onClick={handleSave} className="mt-4">
                    Save Component
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  )
}
