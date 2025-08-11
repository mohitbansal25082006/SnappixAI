import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export default async function NewProjectPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  async function createProject(formData: FormData) {
    'use server'

    const name = formData.get('name') as string
    const description = formData.get('description') as string

    if (!name?.trim()) {
      throw new Error('Project name is required')
    }

    await db.project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        userId: userId!,  // <-- non-null assertion here to fix TS error
      },
    })

    revalidatePath('/dashboard')
    redirect('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Create New Project
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Start a new design system project
          </p>
        </div>

        <form action={createProject} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
              placeholder="My Design System"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
              placeholder="A brief description of your design system"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <a
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
