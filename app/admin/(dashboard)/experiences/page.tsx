'use client'
import Link from 'next/link'
import { BriefcaseBusiness, NotebookPen, Plus, Search } from 'lucide-react'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useState } from 'react'
import ExperienceTable from '@/components/admin/experiences/ExperienceTable'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import { useDeleteExperience, useExperiences } from '@/hooks/useExperiences'
import {
  Experience,
  ExperienceSort,
  ExperienceSortField,
} from '@/types/experience'
import Pagination from '@/components/shared/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDashboard } from '@/hooks/useDashboard'
import StatsGrid from '@/components/admin/dashboard/StatsGrid'
import { isExperienceSort } from '@/components/admin/experiences/ExperienceValidator'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ExperienceAdminPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const sortParam = searchParams.get('sort')
  const search = searchParams.get('search') || undefined
  const sort: ExperienceSort = isExperienceSort(sortParam)
    ? sortParam
    : '-current,-startDate'
  const { data, isPending, isError } = useExperiences({
    page,
    sort,
    search,
  })
  const {
    data: statData,
    isPending: statIsPending,
    isError: statIsError,
  } = useDashboard({ categories: 'experience' })
  const deleteMutation = useDeleteExperience()
  const experiences = data?.data ?? []
  const pagination = data?.pagination
  const hasExperiences = experiences.length > 0
  const status = statData?.data.experience ?? {
    total: 0,
    current: 0,
  }
  const stats = [
    {
      icon: NotebookPen,
      title: 'Total entries',
      length: status.total,
      subtitle: 'All experiences or educations',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Current',
      length: status.current,
      subtitle: 'Active experience or education',
    },
  ]
  const [deleteExperience, setDeleteExperience] = useState<Experience | null>(
    null
  )
  const [searchInput, setSearchInput] = useState('')
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchInput) {
      params.set('search', searchInput)
    } else {
      params.delete('search')
    }
    router.push(`?${params.toString()}`)
  }
  const handleSort = (field: ExperienceSortField) => {
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

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Experience</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your professional experience and education.
          </p>
        </div>

        <Link
          href="/admin/experiences/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Add experience
        </Link>
      </div>

      {hasExperiences ? (
        <>
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

          <ExperienceTable
            experiences={experiences}
            onDelete={setDeleteExperience}
            sort={sort}
            onSort={handleSort}
          />
          <Pagination pagination={pagination} baseUrl="/admin/experiences" />
          <DeleteDialog
            open={Boolean(deleteExperience)}
            title="Delete experience"
            description="This experience will be permanently removed from your portfolio."
            itemName={
              deleteExperience
                ? `${deleteExperience.role} at ${deleteExperience.company}`
                : undefined
            }
            onClose={() => setDeleteExperience(null)}
            onConfirm={async () => {
              if (!deleteExperience) return

              await deleteMutation.mutateAsync(deleteExperience.id)

              console.log('Delete experience:', deleteExperience.id)
            }}
          />
        </>
      ) : (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No experience yet"
          description="Add your first work or internship experience."
          action={{
            label: 'Add experience',
            href: '/admin/experience/new',
          }}
        />
      )}
    </div>
  )
}

export default ExperienceAdminPage
