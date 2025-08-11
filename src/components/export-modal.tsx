"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ExportModalProps {
  componentId: string
  componentName: string
}

export function ExportModal({ componentId, componentName }: ExportModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [includeStories, setIncludeStories] = useState(true)
  const [includeTokens, setIncludeTokens] = useState(true)
  const [format, setFormat] = useState('react')

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentId,
          format,
          includeStories,
          includeTokens,
        }),
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${componentName}-export.zip`
      a.click()
      window.URL.revokeObjectURL(url)

      toast.success('Export completed!')
      setIsOpen(false)
    } catch (error) {
      toast.error('Export failed')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Component</DialogTitle>
          <DialogDescription>
            Choose export options for {componentName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Export Format</Label>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="react"
                    value="react"
                    checked={format === 'react'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="radio"
                  />
                  <Label htmlFor="react">React Component</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="nextjs"
                    value="nextjs"
                    checked={format === 'nextjs'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="radio"
                  />
                  <Label htmlFor="nextjs">Next.js Page</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stories"
                  checked={includeStories}
                  onCheckedChange={(checked) => setIncludeStories(!!checked)}
                />
                <Label htmlFor="stories">Include Storybook stories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tokens"
                  checked={includeTokens}
                  onCheckedChange={(checked) => setIncludeTokens(!!checked)}
                />
                <Label htmlFor="tokens">Include design tokens</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}