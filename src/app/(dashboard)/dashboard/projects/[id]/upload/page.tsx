import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { ComponentGenerator } from '@/components/component-generator'

interface UploadPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function UploadPage({ params }: UploadPageProps) {
  const { userId } = await auth()
  const { id } = await params // ✅ Await params

  if (!userId) {
    redirect('/sign-in')
  }

  const project = await db.project.findUnique({
    where: { 
      id,
      userId 
    }
  })

  if (!project) {
    redirect('/dashboard/projects')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Upload Component to {project.name}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Upload a Figma screenshot and let AI generate the React component
        </p>
      </div>

      <ComponentGenerator 
        projectId={project.id}
        // Removed projectName since it's not expected by ComponentGenerator
      />
    </div>
  )
}
