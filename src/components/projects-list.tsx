import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Folder, Image, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface Project {
  id: string
  name: string
  description: string | null
  createdAt: Date
  _count?: {
    components: number
  }
}

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Folder className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            No projects yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Get started by creating your first project
          </p>
          <Button asChild>
            <Link href="/dashboard/projects/new">
              Create Project
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{project.name}</span>
              <Folder className="h-5 w-5 text-purple-600" />
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || 'No description provided'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <Image className="h-4 w-4" />
                <span>{project._count?.components || 0} components</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
            <Button asChild className="w-full mt-4">
              <Link href={`/dashboard/projects/${project.id}`}>
                View Project
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}