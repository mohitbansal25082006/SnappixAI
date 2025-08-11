import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Upload, Zap, Code2, Palette, Layers } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Snappix
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Transform your Figma screenshots into production-ready React components with AI-powered precision
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
          How it works
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Upload className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Upload Screenshot</CardTitle>
              <CardDescription>
                Drag and drop your Figma designs or browse to upload
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Our AI analyzes your design and extracts components, colors, and typography
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code2 className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Get Code</CardTitle>
              <CardDescription>
                Receive clean, production-ready React components with Tailwind CSS
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}