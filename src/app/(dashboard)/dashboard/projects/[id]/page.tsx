import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Upload, Image } from 'lucide-react'
import ImageNext from 'next/image'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { userId } = await auth()
  const { id } = await params // ✅ Await params

  if (!userId) {
    redirect('/sign-in')
  }

  const project = await db.project.findUnique({
    where: { 
      id,
      userId,
    },
    include: {
      components: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {project.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {project.description || 'No description provided'}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/projects/${id}/upload`}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Component
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {project.components.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <ImageNext
                className="mx-auto h-12 w-12 text-slate-400 mb-4"
                src="/placeholder-image.svg"
                alt="No components"
                width={48}
                height={48}
              />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                No components yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Upload your first Figma screenshot to get started
              </p>
              <Button asChild>
                <Link href={`/dashboard/projects/${id}/upload`}>
                  Upload Component
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.components.map((component) => (
              <Card key={component.id}>
                <CardHeader>
                  <CardTitle>{component.name}</CardTitle>
                  <CardDescription>
                    Created {new Date(component.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/components/${component.id}`}>
                      View Component
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}