'use client'

import Link from 'next/link'
import { ArrowLeft, KeyRound } from 'lucide-react'
import { SubmitEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPassword } from '@/services/auth'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'

type ResetPasswordPageProps = {
  params: Promise<{
    token: string
  }>
}

const ResetPasswordPage = ({ params }: ResetPasswordPageProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    try {
      setIsLoading(true)

      const { token } = await params

      await resetPassword({
        token,
        password,
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error('Reset password failed:', error)
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
                    <KeyRound className="size-6" />
                  </div>
                </div>
                <h1 className="text-xl font-bold">Reset password</h1>
                <FieldDescription className="text-center px-4">
                  Create a new password for your administrator account.
                </FieldDescription>
              </div>
              {isSubmitted ? (
                <div className="space-y-5">
                  <div className="rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm font-medium">
                      Password updated successfully.
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      You can now sign in with your new password.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Field>
                    <Label htmlFor="password">New password</Label>

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="text-xs text-muted-foreground">
                      Use at least 8 characters.
                    </p>
                  </Field>
                  <Field>
                    <Label htmlFor="confirm-password">Confirm password</Label>

                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-destructive">
                        Passwords do not match.
                      </p>
                    )}
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      disabled={
                        isLoading ||
                        !password ||
                        !confirmPassword ||
                        password !== confirmPassword
                      }
                    >
                      {isLoading ? 'Updating...' : 'Reset password'}
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

export default ResetPasswordPage
