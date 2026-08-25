import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ProjectForm from '@/components/admin/projects/ProjectForm'

const projects = [
  {
    id: '1',
    title: 'Habit Tracker',
    slug: 'habit-tracker',
    description:
      'A modern habit tracking PWA for creating and maintaining daily habits.',
    fullDescription:
      'A modern Progressive Web App designed to help users create, track, and maintain daily habits with a simple and focused interface.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query'],
    coverImage: '',
    githubUrl: 'https://github.com/Trygune/habit-tracker',
    liveUrl: '',
    featured: true,
    status: 'published' as const,
  },
  {
    id: '2',
    title: 'Eslimi Shop',
    slug: 'eslimi-shop',
    description: 'An e-commerce application for wood and metal products.',
    fullDescription:
      'An e-commerce platform focused on selling wood and metal products with a modern shopping experience.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Drizzle ORM',
      'PostgreSQL',
      'Zustand',
    ],
    coverImage: '',
    githubUrl: 'https://github.com/Trygune/eslimi-shop',
    liveUrl: '',
    featured: true,
    status: 'published' as const,
  },
  {
    id: '3',
    title: 'Tax Calculator',
    slug: 'tax-calculator',
    description: 'A tax calculation application built with React.',
    fullDescription:
      'A frontend application for calculating taxes through an easy-to-use interface.',
    technologies: ['React', 'Vite', 'Redux Toolkit'],
    coverImage: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    status: 'draft' as const,
  },
]

type ProjectEditPageProps = {
  params: Promise<{
    id: string
  }>
}

const ProjectEditPage = async ({ params }: ProjectEditPageProps) => {
  const { id } = await params

  const project = projects.find((project) => project.id === id)

  if (!project) {
    return (
      <main className="py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Project not found
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            The project you are looking for does not exist.
          </p>

          <Link
            href="/admin/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/projects"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        <p className="text-sm text-muted-foreground">Portfolio</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">Edit project</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Update your project information and links.
        </p>
      </div>

      {/* Form */}
      <ProjectForm isEditing initialData={project} />
    </div>
  )
}

export default ProjectEditPage
