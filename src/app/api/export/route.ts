import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Explicit typing to catch unused vars and help TS
    const body = await request.json() as {
      componentId: string
      format?: string
      includeStories?: boolean
      includeTokens?: boolean
    }

    const { componentId, format, includeStories, includeTokens } = body

    const component = await db.component.findFirst({
      where: {
        id: componentId,
        project: { userId }
      },
      include: {
        project: true,
        versions: true
      }
    })

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 })
    }

    const zip = new JSZip()

    // Generate component file
    const componentName = component.name.replace(/\s+/g, '')
    const componentCode = component.code

    // React Component
    zip.file(`components/${componentName}.tsx`, componentCode)

    // Storybook Story
    if (includeStories) {
      const storyCode = generateStory(componentName, componentCode)
      zip.file(`stories/${componentName}.stories.tsx`, storyCode)
    }

    // Design Tokens
    if (includeTokens) {
      const tokens = generateTokens(component.designTokens)
      zip.file('tokens/design-tokens.json', JSON.stringify(tokens, null, 2))
      zip.file('tokens/design-tokens.css', generateCSSVariables(tokens))
    }

    // Package.json
    // format might be unused, so prefix with _
    const packageJson = generatePackageJson(componentName, format ?? '')
    zip.file('package.json', JSON.stringify(packageJson, null, 2))

    // README
    // Safely convert possible null description to undefined
    const safeComponent = {
      name: component.name,
      description: component.description ?? undefined,
    }
    const readme = generateReadme(safeComponent)
    zip.file('README.md', readme)

    const zipBlob = await zip.generateAsync({ type: 'blob' })

    return new NextResponse(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${componentName}-export.zip"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}

// Helper functions
function generateStory(componentName: string, code: string): string {
  return `import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ${componentName} from '../components/${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Interactive: Story = {
  args: {},
};`
}

// DesignTokens with explicit index signatures to satisfy TS
interface DesignTokens {
  colors?: Record<string, string>
  typography?: Record<string, unknown>
  spacing?: Record<string, unknown>
  shadows?: Record<string, unknown>
}

function generateTokens(tokens: unknown): DesignTokens {
  if (typeof tokens !== 'object' || tokens === null) {
    return {
      colors: {},
      typography: {},
      spacing: {},
      shadows: {},
    }
  }

  const t = tokens as Record<string, unknown>

  // To satisfy TS, cast empty object literal as Record<string, unknown>
  const safeObject = (obj?: unknown): Record<string, unknown> =>
    (typeof obj === 'object' && obj !== null) ? obj as Record<string, unknown> : {}

  return {
    colors: (t.colors && typeof t.colors === 'object') ? t.colors as Record<string, string> : {},
    typography: safeObject(t.typography),
    spacing: safeObject(t.spacing),
    shadows: safeObject(t.shadows),
  }
}

function generateCSSVariables(tokens: DesignTokens): string {
  const cssVars: string[] = []

  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      cssVars.push(`--color-${key}: ${value};`)
    })
  }
  return `:root {\n  ${cssVars.join('\n  ')}\n}`
}

function generatePackageJson(componentName: string, _format: string) {
  return {
    name: `@snappix/${componentName.toLowerCase()}`,
    version: "1.0.0",
    description: `Generated React component from Snappix`,
    main: `dist/${componentName}.js`,
    types: `dist/${componentName}.d.ts`,
    scripts: {
      build: "tsc && rollup -c",
      dev: "rollup -c -w",
      storybook: "storybook dev -p 6006",
      buildStorybook: "storybook build" // fixed duplicate key and camelCase to avoid conflicts
    },
    peerDependencies: {
      react: "^18.0.0",
      "react-dom": "^18.0.0"
    },
    devDependencies: {
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      "typescript": "^5.0.0",
      "tailwindcss": "^3.0.0",
      "@storybook/react": "^7.0.0"
    }
  }
}

function generateReadme(component: {
  name: string,
  description?: string
}): string {
  return `# ${component.name}

Generated by **Snappix** - AI Design System Generator

## Description
${component.description ?? 'AI-generated React component'}

## Usage
\`\`\`tsx
import ${component.name} from './components/${component.name}'

function App() {
  return <${component.name} />
}
\`\`\`

## Design Tokens
Included design tokens can be found in \`tokens/design-tokens.json\`

## Development
\`\`\`bash
npm install
npm run dev
npm run build
npm run storybook
\`\`\`

## Storybook
View interactive stories:
\`\`\`bash
npm run storybook
\`\`\`
`
}
