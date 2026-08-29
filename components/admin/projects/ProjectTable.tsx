'use client'

import Link from 'next/link'
import { ArrowUpRight, Pencil, Trash2, FolderKanban } from 'lucide-react'
import { Project } from '@/types/project'

type ProjectTableProps = {
  projects: Project[]
  onDelete: (project: Project) => void
}

const formatDate = (date: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const ProjectTable = ({ projects, onDelete }: ProjectTableProps) => {
  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      {/* Header */}
      <div className="hidden grid-cols-[1fr_170px_120px_100px_110px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
        <span>Project</span>
        <span>Technologies</span>
        <span>Updated</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {projects.map((project) => (
          <article
            key={project.id}
            className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_170px_120px_100px_110px] md:items-center"
          >
            {/* Project */}
            <div className="flex min-w-0 gap-3">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt=""
                  className="hidden size-12 shrink-0 rounded-lg border object-cover sm:block"
                />
              ) : (
                <div className="hidden size-12 shrink-0 items-center justify-center rounded-lg border bg-muted/30 sm:flex">
                  <FolderKanban className="size-4 text-muted-foreground" />
                </div>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-sm font-medium">
                    {project.title}
                  </h2>

                  {project.featured && (
                    <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium">
                      Featured
                    </span>
                  )}
                </div>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  /{project.slug}
                </p>

                {project.description && (
                  <p className="mt-1 hidden max-w-md truncate text-xs text-muted-foreground lg:block">
                    {project.description}
                  </p>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {technology}
                </span>
              ))}

              {project.technologies.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Updated */}
            <div className="text-xs text-muted-foreground">
              {formatDate(project.updatedAt ?? project.createdAt)}
            </div>

            {/* Status */}
            <div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  project.status === 'published'
                    ? 'bg-foreground/10 text-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {project.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-start gap-2 md:justify-end">
              {/* Edit */}
              <Link
                href={`/admin/projects/${project.id}`}
                aria-label={`Edit ${project.title}`}
                className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Pencil className="size-4" />
              </Link>

              {/* Delete */}
              <button
                type="button"
                onClick={() => onDelete(project)}
                aria-label={`Delete ${project.title}`}
                className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>

              {/* View */}
              {project.status === 'published' && (
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title}`}
                  className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectTable
