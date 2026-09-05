import ProjectGrid from '@/components/projects/ProjectGrid'
import { getProjects } from '@/services/projects'
import Pagination from '@/components/shared/Pagination'
import { createMetadata } from '@/lib/seo/metadata'
import AppBreadCrumb from '@/components/shared/AppBreadCrumb'

type ProjectPageProps = {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata = createMetadata({
  title: 'Projects',
  description:
    'Explore my web development projects built with React, Next.js, TypeScript, and modern web technologies.',
  path: '/projects',
})

const ProjectsPage = async ({ searchParams }: ProjectPageProps) => {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const { data: projects, pagination } = await getProjects({
    page: currentPage,
    limit: 6,
    status: 'published',
  })

  return (
    <>
      <AppBreadCrumb current="Projects" />

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
      <section className="my-16">
        <ProjectGrid projects={projects} />
      </section>

      <Pagination pagination={pagination} baseUrl="/projects" />
    </>
  )
}

export default ProjectsPage
