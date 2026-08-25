import Link from 'next/link'
import { ArrowUpRight, FolderKanban } from 'lucide-react'

export type RecentProject = {
  id: string
  title: string
  slug: string
  technologies: string[]
  status: 'draft' | 'published'
  featured: boolean
  updatedAt: string
}

type RecentProjectsProps = {
  projects: RecentProject[]
}

const formatDate = (date: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const RecentProjects = ({ projects }: RecentProjectsProps) => {
  return (
    <section className="rounded-xl border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold">Recent projects</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your latest portfolio projects.
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Projects */}
      {projects.length > 0 ? (
        <div className="divide-y">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30"
            >
              {/* Icon */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/20">
                <FolderKanban className="size-4 text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium">
                    {project.title}
                  </h3>

                  {project.featured && (
                    <span className="hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium sm:inline-flex">
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="truncate">
                    {project.technologies.slice(0, 2).join(' · ')}
                  </span>

                  <span>·</span>

                  <span className="shrink-0">
                    {formatDate(project.updatedAt)}
                  </span>
                </div>
              </div>

              {/* Status */}
              <span
                className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium sm:inline-flex ${
                  project.status === 'published'
                    ? 'bg-foreground/10 text-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {project.status === 'published' ? 'Published' : 'Draft'}
              </span>

              {/* Arrow */}
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <FolderKanban className="mx-auto size-5 text-muted-foreground" />

          <p className="mt-3 text-sm font-medium">No projects yet</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Add your first project to your portfolio.
          </p>

          <Link
            href="/admin/projects/new"
            className="mt-4 inline-flex text-xs font-medium underline underline-offset-4"
          >
            Create project
          </Link>
        </div>
      )}
    </section>
  )
}

export default RecentProjects
