import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import ContactCard from '../contact/ContactCard'

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
              href="mailto:farboddaneshmandfard@gmail.com"
              className="group flex items-center gap-3 text-sm"
            >
              <span className="flex size-9 items-center justify-center rounded-lg border">
                <Mail className="size-4 text-muted-foreground" />
              </span>

              <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                farboddaneshmandfard@gmail.com
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
              href="https://github.com/Trygune"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-medium"
            >
              GitHub
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/farbod-daneshmandfard"
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
        <ContactCard />
      </div>
    </section>
  )
}

export default Contact
