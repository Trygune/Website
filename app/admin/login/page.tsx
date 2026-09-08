'use client'

import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { getMe, login } from '@/services/auth'
import { SubmitEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field'

const AdminLoginPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isChecking = false

    const checkAuth = async () => {
      if (isChecking) return

      isChecking = true

      try {
        const response = await getMe()

        if (response.success) {
          router.replace('/admin')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        isChecking = false
      }
    }

    checkAuth()
  }, [])

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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <LogIn className="size-6" />
                  </div>
                </div>
                <h1 className="text-xl font-bold">Admin Login</h1>
              </div>
              <Field>
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  Sign in
                </Button>
              </Field>
              <FieldSeparator>Or</FieldSeparator>
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <FieldDescription className="flex flex-col items-center text-center space-y-2">
            <Link
              href="/admin/forgot-password"
              className="transition-colors hover:text-foreground no-underline!"
            >
              Forgot your password?
            </Link>
            <Link
              href="/"
              className="transition-colors hover:text-foreground no-underline!"
            >
              Back to website
            </Link>
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
