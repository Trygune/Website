import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ProjectGrid from '../projects/ProjectGrid'
import { getProjects } from '@/services/projects'

const Projects = async () => {
  const data = await getProjects()
  const projects = data?.data.slice(0, 3) ?? []
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
      <ProjectGrid projects={projects} page="main" />
    </section>
  )
}

export default Projects
