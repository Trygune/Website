import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ProjectDetails from '@/components/projects/ProjectDetails'
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
    overview:
      'A personal habit tracking application designed to make building and maintaining daily habits simple and enjoyable.',
    features: [
      'Create and manage daily habits.',
      'Track daily progress.',
      'Offline-first experience.',
      'Responsive interface for desktop and mobile.',
    ],
    challenges:
      'The main challenge was designing a simple interaction model while keeping the application reliable when the user is offline.',
    role: 'Front-End Developer',
    year: '2026',
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
    overview:
      'An e-commerce project focused on creating a clean product browsing and shopping experience.',
    features: [
      'Product catalog.',
      'Responsive product pages.',
      'Shopping cart.',
      'Modern and accessible UI.',
    ],
    challenges:
      'The project focused on organizing the application architecture while keeping the shopping experience fast and intuitive.',
    role: 'Full-Stack Developer',
    year: '2026',
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
    overview:
      'A React application created to practice state management and build a practical data-driven interface.',
    features: [
      'Tax calculations.',
      'Interactive data.',
      'State management with Redux Toolkit.',
      'Responsive layout.',
    ],
    challenges:
      'The main focus was managing application state cleanly while keeping the calculation flow easy to understand.',
    role: 'Front-End Developer',
    year: '2026',
  },
]

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params

  const project = projects.find(
    (project) => project.href === `/projects/${slug}`
  )

  if (!project) {
    return (
      <main className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            404
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Project not found
          </h1>

          <p className="mt-4 text-muted-foreground">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      <ProjectDetails project={project} />
    </main>
  )
}

export default ProjectPage
