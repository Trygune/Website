'use client'

import Link from 'next/link'
import { ArrowLeft, KeyRound } from 'lucide-react'
import { SubmitEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

      // TODO: connect to resetPassword service
      console.log({
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
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
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
                Reset password
              </h1>

              <p className="text-sm leading-6 text-muted-foreground">
                Create a new password for your administrator account.
              </p>
            </div>
          </CardHeader>

          <CardContent>
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

                <Link
                  href="/admin/login"
                  className="bg-black text-white flex h-12 w-full justify-center items-center hover:text-white/90 rounded-full font-medium transition-colors"
                >
                  Go to login
                </Link>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
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
                    className="h-12"
                  />

                  <p className="text-xs text-muted-foreground">
                    Use at least 8 characters.
                  </p>
                </div>

                <div className="space-y-2">
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
                    className="h-12"
                  />

                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-destructive">
                      Passwords do not match.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                  className="h-12 w-full"
                >
                  {isLoading ? 'Updating...' : 'Reset password'}
                </Button>
              </form>
            )}
          </CardContent>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/admin/login"
              className="transition-colors hover:text-foreground"
            >
              Login
            </Link>

            <span aria-hidden="true">·</span>

            <Link
              href="/admin/forgot-password"
              className="transition-colors hover:text-foreground"
            >
              Forgot password
            </Link>
          </div>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          This area is restricted to the site administrator.
        </p>
      </div>
    </main>
  )
}

export default ResetPasswordPage
