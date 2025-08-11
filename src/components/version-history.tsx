'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ChevronDown, ChevronRight, Code, History } from 'lucide-react'

interface VersionHistoryProps {
  componentId: string
  versions: Array<{
    id: string
    version: number
    code: string
    changelog: string
    createdAt: Date
  }>
}

export function VersionHistory({ componentId, versions }: VersionHistoryProps) {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {versions.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            No versions saved yet
          </p>
        ) : (
          <div className="space-y-4">
            {versions.map((version) => (
              <div key={version.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">v{version.version}</Badge>
                    <span className="text-sm text-slate-600">
                      {format(new Date(version.createdAt), 'PPp')}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedVersion(
                      expandedVersion === version.id ? null : version.id
                    )}
                  >
                    {expandedVersion === version.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <p className="text-sm text-slate-600 mt-2">{version.changelog}</p>
                
                {expandedVersion === version.id && (
                  <div className="mt-4">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{version.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}