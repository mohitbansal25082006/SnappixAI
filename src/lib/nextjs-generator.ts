interface Component {
  id: string
  name: string
  description?: string | null
}

interface Project {
  name: string
}

export function generateNextjsProject(components: Component[], project: Project) {
  const pages = components.map(component => {
    const componentName = component.name.replace(/\s+/g, '')
    return {
      path: `pages/${componentName.toLowerCase()}.tsx`,
      content: `import ${componentName} from '../components/${componentName}'

export default function ${componentName}Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">${component.name}</h1>
        <${componentName} />
      </div>
    </div>
  )
}`
    }
  })

  const indexPage = `import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>${project.name} - Design System</title>
      </Head>
      
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">${project.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${components.map(c => `
          <Link href="/${c.name.toLowerCase().replace(/\s+/g, '-')}" key="${c.id}">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold">${c.name}</h3>
              <p className="text-gray-600 mt-2">${c.description || 'AI-generated component'}</p>
            </div>
          </Link>`).join('')}
        </div>
      </div>
    </div>
  )
}`

  return {
    pages,
    indexPage,
    tailwindConfig: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    nextConfig: `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
}

module.exports = nextConfig`
  }
}
