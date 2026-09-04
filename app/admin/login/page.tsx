'use client'

import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { login } from '@/services/auth'
import { SubmitEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMe } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AdminLoginPage = () => {
  const router = useRouter()
  const { data, isPending, isError } = useMe()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isError) return

    if (data && data.success && data.user) {
      return router.replace('/admin')
    }
  }, [isPending, isError, data, router])

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!isError && data && data.success && data.user) {
    return <div>Redirecting...</div>
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    try {
      setIsLoading(true)
      const data = await login(email, password)
      if (data.success) {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
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
        <Card className="border shadow-sm">
          <CardHeader className="space-y-5">
            <div className="mb-5 flex size-11 items-center justify-center rounded-xl border">
              <LockKeyhole className="size-5" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Admin login</h1>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sign in to manage your portfolio content.
              </p>
            </div>
          </CardHeader>

          <CardContent>
            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/admin/forgot-password"
              className="transition-colors hover:text-foreground"
            >
              Forgot password
            </Link>

            <span aria-hidden="true">·</span>

            <Link href="/" className="transition-colors hover:text-foreground">
              Back to website
            </Link>
          </div>
        </Card>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          This area is restricted to the site administrator.
        </p>
      </div>
    </main>
  )
}

export default AdminLoginPage
