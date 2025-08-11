import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Folder, Image } from 'lucide-react'
import { ProjectsList } from '@/components/projects-list'

export default async function DashboardPage() {
  const { userId } = await auth()  // <-- await here

  if (!userId) {
    redirect('/sign-in')
  }

  const projects = await db.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { components: true }
      }
    }
  })

  const totalComponents = await db.component.count({
    where: {
      project: {
        userId
      }
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your design projects and components
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{projects.length}</CardTitle>
            <CardDescription>Total Projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Folder className="h-8 w-8 text-purple-600" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{totalComponents}</CardTitle>
            <CardDescription>Total Components</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              className="h-8 w-8 text-purple-600"
              role="img"
              aria-hidden="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">0</CardTitle>
            <CardDescription>Design Tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
              <div className="w-6 h-6 bg-pink-600 rounded"></div>
              <div className="w-6 h-6 bg-slate-600 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
        <ProjectsList projects={projects} />
      </div>
    </div>
  )
}
