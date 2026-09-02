'use client'

import Link from 'next/link'
import { Code2, Gem, Plus, Search } from 'lucide-react'
import { useState } from 'react'

import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useDeleteSkill, useSkills } from '@/hooks/useSkills'
import type { Skill, SkillSort, SkillSortField } from '@/types/skill'
import StatsGrid from '@/components/admin/dashboard/StatsGrid'
import { useDashboard } from '@/hooks/useDashboard'
import SkillTable from '@/components/admin/skills/SkillTable'
import { useRouter, useSearchParams } from 'next/navigation'
import { isSkillSort } from '@/components/admin/skills/SkillValidator'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SkillsAdminPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sortParam = searchParams.get('sort')
  const sort: SkillSort = isSkillSort(sortParam) ? sortParam : 'order'
  const search = searchParams.get('search') || undefined
  const { data, isPending, isError } = useSkills({ sort, search })
  const {
    data: statData,
    isPending: statIsPending,
    isError: statIsError,
  } = useDashboard({ categories: 'skills' })
  const deleteMutation = useDeleteSkill()

  const skills = data?.data ?? []
  const hasSkills = skills.length > 0
  const status = statData?.data.skills ?? {
    total: 0,
    featured: 0,
  }
  const [deleteSkill, setDeleteSkill] = useState<Skill | null>(null)

  const stats = [
    {
      icon: Code2,
      title: 'Total skills',
      length: status.total,
    },
    {
      icon: Gem,
      title: 'Featured',
      length: status.featured,
    },
  ]
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
  const handleSort = (field: SkillSortField) => {
    const params = new URLSearchParams(searchParams.toString())

    const currentSort = params.get('sort')

    if (currentSort === field) {
      params.set('sort', `-${field}`)
    } else if (currentSort === `-${field}`) {
      params.delete('sort')
    } else {
      params.set('sort', field)
    }

    router.push(`?${params.toString()}`)
  }

  if (isError || statIsError) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">Failed to load skills</h2>

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

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Skills</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage the skills displayed on your portfolio.
          </p>
        </div>

        <Link
          href="/admin/skills/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          New skill
        </Link>
      </div>

      {/* Content */}
      {hasSkills ? (
        <section className="space-y-5">
          {/* Stats */}
          <StatsGrid stats={stats} />

          {/* Search */}
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

          {/* Table */}
          <SkillTable
            skills={skills}
            onDelete={setDeleteSkill}
            sort={sort}
            onSort={handleSort}
          />

          {/* Delete Dialog */}
          <DeleteDialog
            open={Boolean(deleteSkill)}
            title="Delete skill"
            description="This skill will be permanently removed from your portfolio."
            itemName={deleteSkill?.name}
            onClose={() => setDeleteSkill(null)}
            onConfirm={async () => {
              if (!deleteSkill) return

              try {
                await deleteMutation.mutateAsync(deleteSkill.id)
                setDeleteSkill(null)
              } catch {
                // Error is handled by the mutation.
              }
            }}
          />
        </section>
      ) : (
        <EmptyState
          icon={Code2}
          title="No skills yet"
          description="You haven't added any skills to your portfolio yet."
          action={{
            label: 'Add your first skill',
            href: '/admin/skills/new',
          }}
        />
      )}
    </div>
  )
}

export default SkillsAdminPage
