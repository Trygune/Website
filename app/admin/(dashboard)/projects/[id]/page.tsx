import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ProjectForm from '@/components/admin/projects/ProjectForm'
import { getProjectById } from '@/services/projects'

type ProjectEditPageProps = {
  params: Promise<{
    id: string
  }>
}

const ProjectEditPage = async ({ params }: ProjectEditPageProps) => {
  const { id } = await params

  const project = await getProjectById(String(id))

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
      <ProjectForm isEditing initialData={project.data} />
    </div>
  )
}

export default ProjectEditPage
