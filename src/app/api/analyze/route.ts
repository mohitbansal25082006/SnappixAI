import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { openai } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { imageUrl, projectId } = await request.json()

    if (!imageUrl || !projectId) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    // AI Analysis Prompt
    const prompt = `Analyze this UI screenshot and generate:
    1. Clean React component code with Tailwind CSS
    2. Design tokens (colors, typography, spacing)
    3. Responsive design considerations
    4. shadcn/ui component mapping where applicable

    Return JSON format:
    {
      "componentName": "string",
      "code": "React component code",
      "designTokens": {
        "colors": {},
        "typography": {},
        "spacing": {}
      },
      "description": "What this component does",
      "shadcnComponents": ["list", "of", "components"]
    }`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: { url: imageUrl }
            }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.3,
    })

    const analysis = response.choices[0]?.message?.content
    if (!analysis) {
      throw new Error('No response from AI')
    }

    // Parse AI response
    let parsedAnalysis
    try {
      parsedAnalysis = JSON.parse(analysis)
    } catch {
      // Fallback if AI returns non-JSON
      parsedAnalysis = {
        componentName: 'GeneratedComponent',
        code: '/* AI response was not in expected format */',
        designTokens: {},
        description: 'Component analysis',
        shadcnComponents: []
      }
    }

    return NextResponse.json(parsedAnalysis)
  } catch (error) {
    console.error('AI analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' }, 
      { status: 500 }
    )
  }
}