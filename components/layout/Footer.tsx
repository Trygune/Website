import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import LinkedinIcon from '../icons/LinkedinIcon'
import GithubIcon from '../icons/GithubIcon'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/contact', label: 'Contact' },
  { href: '/skills', label: 'Skills' },
]

const Footer = () => {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-sm text-background">
                F
              </span>

              <span className="text-lg">
                Farbod<span className="text-muted-foreground">.</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Front-End Web Developer focused on building modern, accessible,
              and thoughtful web experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-sm font-medium">Navigation</p>

            <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-4 text-sm font-medium">Connect</p>

            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/Trygune"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </Link>

              <Link
                href="https://www.linkedin.com/in/farbod-daneshmandfard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LinkedinIcon className="size-4" />
              </Link>

              <Link
                href="/contact"
                className="ml-2 inline-flex items-center gap-1 text-sm font-medium"
              >
                Get in touch
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Farbod. All rights reserved.</p>

          <p>Built with Next.js & TypeScript</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
