'use client'
import Link from 'next/link'
import { BriefcaseBusiness, Plus } from 'lucide-react'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useState } from 'react'
import ExperienceTable from '@/components/admin/experiences/ExperienceTable'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import { useDeleteExperience, useExperiences } from '@/hooks/useExperiences'
import { Experience } from '@/types/experience'

const ExperienceAdminPage = () => {
  const { data, isPending, isError } = useExperiences()
  const deleteMutation = useDeleteExperience()
  const experiences = data?.data ?? []
  const hasExperiences = experiences.length > 0
  const [deleteExperience, setDeleteExperience] = useState<Experience | null>(
    null
  )

  if (isError) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">Failed to load projects</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    )
  }

  if (isPending) {
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
          href="/admin/experience/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Add experience
        </Link>
      </div>

      {hasExperiences ? (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-background p-5">
              <div className="flex size-10 items-center justify-center rounded-lg border">
                <BriefcaseBusiness className="size-4 text-muted-foreground" />
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                Total entries
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {experiences.length}
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Current</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {experiences.filter((item) => item.current).length}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Active experience or education
              </p>
            </div>
          </div>

          <ExperienceTable
            experiences={experiences}
            onDelete={setDeleteExperience}
          />
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
