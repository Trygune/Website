import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ProjectGrid from '../projects/ProjectGrid'
import { Project } from '@/types/project'

const projects: Project[] = [
  {
    title: 'Habit Tracker',
    description:
      'A modern habit tracking PWA focused on simplicity, offline support, and a smooth user experience.',
    image: '/images/projects/habit-tracker.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'PWA'],
    href: '/projects/habit-tracker',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    title: 'Eslimi Shop',
    description:
      'A modern e-commerce application for selling wood and metal products.',
    image: '/images/projects/eslimi-shop.webp',
    technologies: ['Next.js', 'TypeScript', 'Drizzle', 'PostgreSQL'],
    href: '/projects/eslimi-shop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-24 border-t py-24 sm:py-32">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Selected work
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects I&apos;ve built.
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            A selection of projects where I&apos;ve focused on the intersection
            of thoughtful design and solid engineering.
          </p>
        </div>

        <Link
          href="/projects"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium"
        >
          View all projects
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Projects */}
      <ProjectGrid projects={projects} />
    </section>
  )
}

export default Projects
