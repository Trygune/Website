import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ProjectForm from '@/components/admin/projects/ProjectForm'

const NewProjectPage = () => {
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

        <h1 className="mt-1 text-3xl font-bold tracking-tight">New project</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Add a new project to your portfolio.
        </p>
      </div>

      {/* Form */}
      <ProjectForm />
    </div>
  )
}

export default NewProjectPage
