// src/app/(dashboard)/page.tsx
import { redirect } from 'next/navigation'

export default function DashboardRootPage() {
  redirect('/dashboard/dashboard')
  return null
}
