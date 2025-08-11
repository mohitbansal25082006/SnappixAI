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
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Improved AI Prompt for JSON response
    const prompt = `Analyze this UI screenshot and generate EXACTLY this JSON format:

{
  "componentName": "GeneratedComponent",
  "code": "import React from 'react';\\n\\nexport default function GeneratedComponent() {\\n  return (\\n    <div className=\\"p-4 bg-white rounded-lg shadow\\">\\n      <h1 className=\\"text-2xl font-bold\\">Hello World</h1>\\n    </div>\\n  );\\n}",
  "designTokens": {
    "colors": ["#ffffff", "#000000"],
    "typography": { "fontSize": "16px", "fontWeight": "bold" },
    "spacing": { "padding": "16px", "margin": "8px" }
  },
  "description": "Simple generated component",
  "shadcnComponents": ["Button", "Card"]
}

Generate a React component with Tailwind CSS based on the screenshot. Return ONLY valid JSON.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.2,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    // Clean and parse JSON
    let parsed
    try {
      // Try to extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : content
      parsed = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json({
        componentName: 'GeneratedComponent',
        code: `export default function GeneratedComponent() {\n  return <div className="p-4 bg-gray-100 rounded-lg">Generated component</div>;\n}`,
        designTokens: { colors: [], typography: {}, spacing: {} },
        description: 'Default fallback component',
        shadcnComponents: []
      })
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('AI analysis error:', error)
    return NextResponse.json({
      componentName: 'ErrorComponent',
      code: `export default function ErrorComponent() {\n  return <div className="p-4 bg-red-100 text-red-800">Error generating component</div>;\n}`,
      designTokens: {},
      description: 'Error fallback',
      shadcnComponents: []
    }, { status: 200 })
  }
}