import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, code, imageUrl, designTokens, projectId } = await request.json()

    if (!name || !code || !imageUrl || !projectId) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    // Verify project belongs to user
    const project = await db.project.findUnique({
      where: { id: projectId, userId }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const component = await db.component.create({
      data: {
        name,
        description: 'AI-generated component',
        imageUrl,
        code,
        designTokens,
        projectId,
      },
    })

    return NextResponse.json(component)
  } catch (error) {
    console.error('Error creating component:', error)
    return NextResponse.json(
      { error: 'Failed to create component' }, 
      { status: 500 }
    )
  }
}