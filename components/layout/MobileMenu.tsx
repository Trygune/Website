'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Mail, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.aside
            className="fixed inset-x-0 top-0 z-50 min-h-screen bg-background md:hidden"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b px-6">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2 font-semibold tracking-tight"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-sm text-background">
                  F
                </span>

                <span className="text-lg">
                  Farbod<span className="text-muted-foreground">.</span>
                </span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-6 py-10">
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.25,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between border-b py-4 text-3xl font-semibold tracking-tight transition-colors hover:text-muted-foreground"
                    >
                      {link.label}

                      <ArrowUpRight className="size-6 text-muted-foreground" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="rounded-lg border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Mail className="size-4" />
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-lg border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Mail className="size-4" />
                  </Link>
                </div>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-sm font-medium"
                >
                  Let&apos;s talk
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
