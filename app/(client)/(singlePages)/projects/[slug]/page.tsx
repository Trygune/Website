import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProjectDetails from '@/components/projects/ProjectDetails'
import { getProjectBySlug } from '@/services/projects'
import { createMetadata } from '@/lib/seo/metadata'
import AppBreadCrumb from '@/components/shared/AppBreadCrumb'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params

  try {
    const { data: project } = await getProjectBySlug(slug)

    return createMetadata({
      title: project.title,
      description: project.description,
      path: `/projects/${slug}`,
    })
  } catch {
    return createMetadata({
      title: 'Project',
      description: 'Explore my web development projects.',
      path: `/projects/${slug}`,
    })
  }
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params
  const { data: project } = await getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="py-24">
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
      </div>
    )
  }

  return (
    <>
      <AppBreadCrumb before="Projects" current={slug} />
      <ProjectDetails project={project} />
    </>
  )
}

export default ProjectPage
