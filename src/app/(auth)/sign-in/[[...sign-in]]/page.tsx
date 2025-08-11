import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white dark:bg-slate-900 shadow-2xl rounded-2xl",
            headerTitle: "text-2xl font-bold text-slate-900 dark:text-slate-100",
            headerSubtitle: "text-slate-600 dark:text-slate-400",
          }
        }}
      />
    </div>
  )
}