'use client'

import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { login } from '@/services/auth'
import { SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'

const AdminLoginPage = () => {
  const router = useRouter()

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    try {
      const data = await login(email, password)
      if (data.success) {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Back to website */}
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to website
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-5 flex size-11 items-center justify-center rounded-xl border">
            <LockKeyhole className="size-5" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Admin login</h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Sign in to manage your portfolio content.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} method="POST">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-12 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className="h-12 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          This area is restricted to the site administrator.
        </p>
      </div>
    </main>
  )
}

export default AdminLoginPage
