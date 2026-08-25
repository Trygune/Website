import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ProjectGrid from '@/components/projects/ProjectGrid'
import type { Project } from '@/types/project'

const projects: Project[] = [
  {
    title: 'Habit Tracker',
    description:
      'A modern habit tracking PWA focused on simplicity, offline support, and a smooth user experience.',
    image: '/images/projects/habit-tracker.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PWA'],
    href: '/projects/habit-tracker',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    title: 'Eslimi Shop',
    description:
      'A modern e-commerce application for selling wood and metal products with a responsive shopping experience.',
    image: '/images/projects/eslimi-shop.webp',
    technologies: ['Next.js', 'TypeScript', 'Drizzle', 'PostgreSQL'],
    href: '/projects/eslimi-shop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    title: 'Tax Calculator',
    description:
      'A responsive web application for calculating and visualizing tax-related data with a clean interface.',
    image: '/images/projects/tax-app.webp',
    technologies: ['React', 'Vite', 'TypeScript', 'Redux Toolkit'],
    href: '/projects/tax-calculator',
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

const ProjectsPage = () => {
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

      {/* Header */}
      <header className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Projects
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Things I&apos;ve built.
        </h1>

        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
          A collection of projects where I&apos;ve explored different
          technologies, solved real problems, and experimented with new ideas.
        </p>
      </header>

      {/* Projects */}
      <section className="mt-16">
        <ProjectGrid projects={projects} />
      </section>
    </main>
  )
}

export default ProjectsPage
