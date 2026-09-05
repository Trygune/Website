import { Mail } from 'lucide-react'
import ContactCard from '@/components/contact/ContactCard'
import AppBreadCrumb from '@/components/shared/AppBreadCrumb'

const ContactPage = () => {
  return (
    <>
      <AppBreadCrumb current="Contact" />

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
            href="mailto:farboddaneshmandfard@gmail.com"
            className="group mt-8 inline-flex items-center gap-3"
          >
            <span className="flex size-10 items-center justify-center rounded-lg border">
              <Mail className="size-4 text-muted-foreground" />
            </span>

            <span className="text-sm font-medium transition-colors group-hover:text-muted-foreground">
              farboddaneshmandfard@gmail.com
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
        <ContactCard />
      </div>
    </>
  )
}

export default ContactPage
