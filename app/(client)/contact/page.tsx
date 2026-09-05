'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { sendContactMessage } from '@/services/contact'

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    setError('')
    setIsSubmitted(false)

    const form = e.currentTarget
    const formData = new FormData(form)

    const website = formData.get('website') as string

    // Honeypot: bots may fill this hidden field
    if (website) {
      setIsLoading(false)
      setIsSubmitted(true)
      form.reset()
      return
    }

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      await sendContactMessage(data)

      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      console.error('Contact form failed:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="py-16 sm:py-24">
      {/* Back */}
      <Link
        href="/"
        className="group mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back home
      </Link>

      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        {/* Intro */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s work together.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Have a project, an opportunity, or just want to say hello? Send me a
            message and I&apos;ll get back to you.
          </p>

          {/* Email */}
          <a
            href="mailto:hello@example.com"
            className="group mt-8 inline-flex items-center gap-3"
          >
            <span className="flex size-10 items-center justify-center rounded-lg border">
              <Mail className="size-4 text-muted-foreground" />
            </span>

            <span className="text-sm font-medium transition-colors group-hover:text-muted-foreground">
              hello@example.com
            </span>
          </a>

          {/* Availability */}
          <div className="mt-10 border-t pt-6">
            <p className="text-sm text-muted-foreground">Availability</p>

            <p className="mt-2 text-sm font-medium">
              Open to freelance projects and opportunities
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="border shadow-sm">
          <CardContent className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex size-12 items-center justify-center rounded-full border">
                  <Mail className="size-5" />
                </div>

                <h2 className="mt-5 text-xl font-semibold">
                  Message sent successfully
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  Thanks for reaching out. I&apos;ll get back to you as soon as
                  possible.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      maxLength={50}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      maxLength={100}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>

                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What would you like to talk about?"
                    required
                    maxLength={150}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>

                  <Textarea
                    id="message"
                    name="message"
                    rows={8}
                    placeholder="Tell me about your project or opportunity..."
                    required
                    maxLength={2000}
                    className="resize-none leading-6"
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                  >
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group h-12 gap-2 px-6"
                >
                  {isLoading ? 'Sending...' : 'Send message'}

                  {!isLoading && (
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ContactPage
