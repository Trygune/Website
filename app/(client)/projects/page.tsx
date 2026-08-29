import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ProjectGrid from '@/components/projects/ProjectGrid'
import { getProjects } from '@/services/projects'

const ProjectsPage = async () => {
  const { data: projects } = await getProjects()

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
