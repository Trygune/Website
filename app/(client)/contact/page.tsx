import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'

const ContactPage = () => {
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
                autoComplete="name"
                placeholder="Your name"
                required
                className="h-12 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
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
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
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
              placeholder="What would you like to talk about?"
              required
              className="h-12 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={8}
              placeholder="Tell me about your project or opportunity..."
              required
              className="w-full resize-none rounded-lg border bg-transparent px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Send message
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </main>
  )
}

export default ContactPage
