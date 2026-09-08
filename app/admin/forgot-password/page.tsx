'use client'

import Link from 'next/link'
import { SubmitEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPassword } from '@/services/auth'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { LockKeyhole, MailCheck } from 'lucide-react'

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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <LockKeyhole className="size-6" />
                  </div>
                </div>
                <h1 className="text-xl font-bold">Forgot password?</h1>
                <FieldDescription className="text-center px-4">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </FieldDescription>
              </div>
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
                </div>
              ) : (
                <>
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
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send reset link'}
                    </Button>
                  </Field>
                </>
              )}
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
              href="/admin/login"
              className="transition-colors hover:text-foreground no-underline!"
            >
              Back to login
            </Link>
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
