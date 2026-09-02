'use client'
import Link from 'next/link'
import { FolderKanban, Paperclip, Plus, Search, Upload } from 'lucide-react'
import { useState } from 'react'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import EmptyState from '@/components/admin/shared/EmptyState'
import ProjectTable from '@/components/admin/projects/ProjectTable'
import { useDeleteProject, useProjects } from '@/hooks/useProjects'
import { Project, ProjectSort, ProjectSortField } from '@/types/project'
import Pagination from '@/components/shared/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import StatsGrid from '@/components/admin/dashboard/StatsGrid'
import { useDashboard } from '@/hooks/useDashboard'
import { isProjectSort } from '@/components/admin/projects/ProjectValidator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

const ProjectsAdminPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const sortParam = searchParams.get('sort')
  const search = searchParams.get('search') || undefined
  const sort: ProjectSort = isProjectSort(sortParam)
    ? sortParam
    : '-year,-createdAt'
  const { data, isPending, isError } = useProjects({
    page,
    sort,
    search,
  })
  const {
    data: statData,
    isPending: statIsPending,
    isError: statIsError,
  } = useDashboard({ categories: 'projects' })
  const deleteMutation = useDeleteProject()
  const projects = data?.data ?? []
  const pagination = data?.pagination
  const hasProjects = projects.length > 0
  const status = statData?.data.projects ?? {
    total: 0,
    published: 0,
    drafts: 0,
  }
  const stats = [
    {
      icon: FolderKanban,
      title: 'Total projects',
      length: status.total,
    },
    {
      icon: Upload,
      title: 'Published',
      length: status.published,
    },
    {
      icon: Paperclip,
      title: 'Drafts',
      length: status.drafts,
    },
  ]
  const [deleteProject, setDeleteProject] = useState<Project | null>(null)
  const [searchInput, setSearchInput] = useState('')

  const handleSort = (field: ProjectSortField) => {
    const params = new URLSearchParams(searchParams.toString())

    const currentSort = params.get('sort')

    if (currentSort === field) {
      params.set('sort', `-${field}`)
    } else if (currentSort === `-${field}`) {
      params.delete('sort')
    } else {
      params.set('sort', field)
    }

    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchInput) {
      params.set('search', searchInput)
    } else {
      params.delete('search')
    }
    router.push(`?${params.toString()}`)
  }

  if (isError || statIsError) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">Failed to load projects</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    )
  }

  if (isPending || statIsPending) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    )
  }

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
          <StatsGrid stats={stats} />

          {/* Search */}
          <ButtonGroup className="relative max-w-md w-full">
            <Input
              type="search"
              id="input-button-group"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="Type to search..."
            />
            <Button variant="outline" size="icon" onClick={handleSearch}>
              <Search className="text-muted-foreground" />
            </Button>
          </ButtonGroup>

          {/* Projects */}
          <ProjectTable
            projects={projects}
            onDelete={setDeleteProject}
            sort={sort}
            onSort={handleSort}
          />
          <Pagination pagination={pagination} baseUrl="/admin/projects" />
          <DeleteDialog
            open={Boolean(deleteProject)}
            title="Delete project"
            description="This project will be permanently removed from your portfolio."
            itemName={deleteProject?.title}
            onClose={() => setDeleteProject(null)}
            onConfirm={async () => {
              if (!deleteProject) return

              await deleteMutation.mutateAsync(deleteProject.id)

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
