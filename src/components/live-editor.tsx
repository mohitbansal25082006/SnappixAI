'use client'

import { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Save, Play, Copy } from 'lucide-react'

interface LiveEditorProps {
  component: {
    id: string
    name: string
    imageUrl: string
  }
  initialCode: string
  initialTokens: Record<string, unknown>
}

export function LiveEditor({ component, initialCode, initialTokens }: LiveEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/components/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentId: component.id,
          code,
          designTokens: initialTokens,
          changelog: 'Manual edit',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save version')
      }

      toast.success('Version saved!')
    } catch {
      toast.error('Failed to save version')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    toast.success('Code copied to clipboard!')
  }

  const files = {
    '/App.tsx': code,
    '/index.tsx': `import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)`,
    '/index.html': `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
      {/* Code Editor */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Code Editor</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Version'}
            </Button>
          </div>
        </div>

        <Card className="flex-1">
          <MonacoEditor
            height="100%"
            language="typescript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </Card>
      </div>

      {/* Live Preview */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <Play className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Card className="flex-1">
          <SandpackProvider
            template="react-ts"
            files={files}
            options={{
              recompileDelay: 300,
              autorun: true,
            }}
            theme="dark"
          >
            <div className="h-full">
              <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton={false} />
            </div>
          </SandpackProvider>
        </Card>
      </div>
    </div>
  )
}
