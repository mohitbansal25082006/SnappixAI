import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { componentId, code, designTokens, changelog } = await request.json()

    // Verify component belongs to user
    const component = await db.component.findFirst({
      where: { 
        id: componentId,
        project: { userId }
      }
    })

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 })
    }

    // Get next version number
    const lastVersion = await db.componentVersion.findFirst({
      where: { componentId },
      orderBy: { version: 'desc' }
    })

    const nextVersion = (lastVersion?.version || 0) + 1

    const version = await db.componentVersion.create({
      data: {
        version: nextVersion,
        code,
        designTokens,
        changelog: changelog || 'Version saved',
        componentId,
      },
    })

    return NextResponse.json(version)
  } catch (error) {
    console.error('Error creating version:', error)
    return NextResponse.json(
      { error: 'Failed to create version' }, 
      { status: 500 }
    )
  }
}