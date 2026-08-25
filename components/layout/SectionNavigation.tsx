'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const sections = [
  {
    id: 'about',
    label: 'About',
  },
  {
    id: 'skills',
    label: 'Skills',
  },
  {
    id: 'projects',
    label: 'Projects',
  },
  {
    id: 'experience',
    label: 'Experience',
  },
  {
    id: 'contact',
    label: 'Contact',
  },
]

const SectionNavigation = () => {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sectionElements.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [pathname])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  if (pathname !== '/') {
    return null
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex flex-col gap-2 rounded-full border bg-background/80 p-2 shadow-sm backdrop-blur-md">
        {sections.map((section) => {
          const isActive = activeSection === section.id

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-label={`Go to ${section.label}`}
              className="group relative flex size-8 items-center justify-center rounded-full"
            >
              {/* Indicator */}
              <span
                className={`size-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'scale-125 bg-foreground'
                    : 'bg-muted-foreground/40 group-hover:bg-foreground'
                }`}
              />

              {/* Tooltip */}
              <span className="pointer-events-none absolute left-10 whitespace-nowrap rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                {section.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default SectionNavigation
