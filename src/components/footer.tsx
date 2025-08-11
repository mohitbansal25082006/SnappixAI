import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Snappix
            </Link>
            <span className="ml-4 text-sm text-slate-600 dark:text-slate-400">
              © 2024 AI Design System Generator
            </span>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/docs" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              Documentation
            </Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              Pricing
            </Link>
            <Link href="/support" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}