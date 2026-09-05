'use client'

import Link from 'next/link'
import { ArrowLeft, KeyRound, MailCheck } from 'lucide-react'
import { SubmitEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPassword } from '@/services/auth'

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      setIsLoading(true)

      await forgotPassword(email)

      setIsSubmitted(true)
    } catch (error) {
      console.error('Forgot password failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Back to login */}

        <Link
          href="/admin/login"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to login
        </Link>

        <Card className="border shadow-sm">
          <CardHeader className="space-y-5">
            <div className="flex size-11 items-center justify-center rounded-xl border bg-background">
              <KeyRound className="size-5" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Forgot password?
              </h1>

              <p className="text-sm leading-6 text-muted-foreground">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </div>
          </CardHeader>

          <CardContent>
            {isSubmitted ? (
              <div className="space-y-5">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="flex gap-3">
                    <MailCheck className="mt-0.5 size-5 shrink-0" />

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Check your email</p>

                      <p className="text-sm leading-6 text-muted-foreground">
                        If an account with that email exists, you&apos;ll
                        receive a password reset link shortly.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/admin/login"
                  className="bg-gray-100 flex h-12 w-full justify-center items-center hover:bg-gray-200 rounded-full font-medium transition-colors"
                >
                  Back to login
                </Link>
              </div>
            ) : (
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full"
                >
                  {isLoading ? 'Sending...' : 'Send reset link'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          This area is restricted to the site administrator.
        </p>
      </div>
    </main>
  )
}

export default ForgotPasswordPage
