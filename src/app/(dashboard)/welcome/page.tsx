import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Zap, Code } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Welcome to Snappix
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Transform your Figma designs into production-ready React components
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Design
            </CardTitle>
            <CardDescription>
              Upload your Figma screenshots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/upload">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Processing
            </CardTitle>
            <CardDescription>
              AI analyzes your design
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              Automatic
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Get Code
            </CardTitle>
            <CardDescription>
              Receive React components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              Instant
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Link href="/dashboard/upload">
            Start Converting Designs
          </Link>
        </Button>
      </div>
    </div>
  )
}
