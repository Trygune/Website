'use client'

import { ArrowUpRight } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { sendContactMessage } from '@/services/contact'
import { useState } from 'react'

const ContactForm = ({
  setIsSubmitted,
}: {
  setIsSubmitted: (state: boolean) => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    setError('')
    setIsSubmitted(false)

    const form = e.currentTarget
    const formData = new FormData(form)

    const website = formData.get('website') as string

    // Honeypot
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
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
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
  )
}

export default ContactForm
