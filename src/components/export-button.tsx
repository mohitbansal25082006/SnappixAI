'use client'

import React from 'react'
import { toast } from 'sonner'

interface ExportButtonProps {
  projectId: string
  projectName: string
}

export function ExportButton({ projectId, projectName }: ExportButtonProps) {
  async function handleBulkExport() {
    try {
      const response = await fetch('/api/export/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, format: 'react' }),
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${projectName}-design-system.zip`
      a.click()
      window.URL.revokeObjectURL(url)

      toast.success('Design system exported!')
    } catch {
      toast.error('Export failed')
    }
  }

  return (
    <button onClick={handleBulkExport} className="btn-primary flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-4 4m4-4l4 4" />
      </svg>
      Export Design System
    </button>
  )
}
