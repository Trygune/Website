'use client'

import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-24 border-t py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Intro */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a project in mind?
            <span className="block text-muted-foreground">
              Let&apos;s talk.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            Whether you have a project idea, a question, or just want to
            connect, feel free to reach out. I&apos;d love to hear from you.
          </p>

          {/* Contact info */}
          <div className="mt-8 space-y-4">
            <a
              href="mailto:hello@example.com"
              className="group flex items-center gap-3 text-sm"
            >
              <span className="flex size-9 items-center justify-center rounded-lg border">
                <Mail className="size-4 text-muted-foreground" />
              </span>

              <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                hello@example.com
              </span>
            </a>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex size-9 items-center justify-center rounded-lg border">
                <MapPin className="size-4 text-muted-foreground" />
              </span>

              <span className="text-muted-foreground">Available remotely</span>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-medium"
            >
              GitHub
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-medium"
            >
              LinkedIn
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="h-11 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="What is this about?"
              className="h-11 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Tell me a little about your project..."
              className="w-full resize-none rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Send message
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
