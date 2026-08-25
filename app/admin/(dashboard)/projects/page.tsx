'use client'
import Link from 'next/link'
import { FolderKanban, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import EmptyState from '@/components/admin/shared/EmptyState'
import AdminPagination from '@/components/admin/shared/AdminPagination'
import ProjectTable, {
  type Project,
} from '@/components/admin/projects/ProjectTable'

const projects: Project[] = [
  {
    id: '1',
    title: 'Habit Tracker',
    slug: 'habit-tracker',
    description:
      'A modern habit tracking PWA built with Next.js and TypeScript.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    coverImage: '',
    githubUrl: '',
    liveUrl: '',
    featured: true,
    status: 'published',
    createdAt: '2026-08-20',
    updatedAt: '2026-08-23',
  },
  {
    id: '2',
    title: 'Eslimi Shop',
    slug: 'eslimi-shop',
    description: 'An e-commerce application for wood and metal products.',
    technologies: ['Next.js', 'Drizzle', 'PostgreSQL'],
    coverImage: '',
    githubUrl: '',
    liveUrl: '',
    featured: true,
    status: 'published',
    createdAt: '2026-08-15',
    updatedAt: '2026-08-20',
  },
  {
    id: '3',
    title: 'Tax Calculator',
    slug: 'tax-calculator',
    description: 'A tax calculation application built with React.',
    technologies: ['React', 'Vite', 'Redux Toolkit'],
    coverImage: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    status: 'draft',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-18',
  },
]

const ProjectsAdminPage = () => {
  const hasProjects = projects.length > 0
  const [deleteProject, setDeleteProject] = useState<Project | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Management</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Projects</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage the projects displayed on your portfolio.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          New project
        </Link>
      </div>

      {/* Content */}
      {hasProjects ? (
        <section className="space-y-5">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-background p-5">
              <div className="flex size-10 items-center justify-center rounded-lg border">
                <FolderKanban className="size-4 text-muted-foreground" />
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                Total projects
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {projects.length}
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Published</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {
                  projects.filter((project) => project.status === 'Published')
                    .length
                }
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Drafts</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {
                  projects.filter((project) => project.status === 'Draft')
                    .length
                }
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              placeholder="Search projects..."
              className="h-11 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Projects */}
          <ProjectTable projects={projects} onDelete={setDeleteProject} />
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <DeleteDialog
            open={Boolean(deleteProject)}
            title="Delete project"
            description="This project will be permanently removed from your portfolio."
            itemName={deleteProject?.title}
            onClose={() => setDeleteProject(null)}
            onConfirm={async () => {
              if (!deleteProject) return

              // بعداً:
              // await deleteProjectApi(deleteProject.id)

              console.log('Delete project:', deleteProject.id)

              setDeleteProject(null)
            }}
          />
        </section>
      ) : (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="You haven't added any projects to your portfolio yet."
          action={{
            label: 'Add your first project',
            href: '/admin/projects/new',
          }}
        />
      )}
    </div>
  )
}

export default ProjectsAdminPage
