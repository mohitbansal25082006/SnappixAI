import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { LiveEditor } from '@/components/live-editor'
import { VersionHistory } from '@/components/version-history'

interface ComponentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) {
    redirect('/sign-in')
  }

  const component = await db.component.findUnique({
    where: { 
      id,
      project: {
        userId,
      },
    },
    include: {
      project: true,
      versions: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!component) {
    notFound()
  }

  // Fix for initialTokens: ensure non-null object
  const safeDesignTokens =
    component.designTokens && typeof component.designTokens === 'object'
      ? (component.designTokens as Record<string, unknown>)
      : {}

  // Fix for versions: replace null changelog with empty string
  const safeVersions = component.versions.map((v) => ({
    ...v,
    changelog: v.changelog ?? '',
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {component.name}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          From project: {component.project.name}
        </p>
      </div>

      <LiveEditor
        component={component}
        initialCode={component.code}
        initialTokens={safeDesignTokens}
      />

      <VersionHistory componentId={component.id} versions={safeVersions} />
    </div>
  )
}
