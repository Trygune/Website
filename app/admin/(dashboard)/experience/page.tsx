'use client'
import Link from 'next/link'
import { BriefcaseBusiness, Plus } from 'lucide-react'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useState } from 'react'
import ExperienceTable, {
  type Experience,
} from '@/components/admin/experience/ExperienceTable'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'

const experiences: Experience[] = [
  {
    id: '1',
    position: 'Front-End Developer Intern',
    company: 'Cultural Heritage Organization',
    location: 'Iran',
    type: 'Internship',
    startDate: '2026-05',
    endDate: '2026-07',
    current: false,
    description:
      'Worked on frontend development, UI implementation, and learning modern frontend technologies.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    companyUrl: '',
  },
  {
    id: '2',
    position: 'Computer Science Student',
    company: 'Computer Science',
    location: 'University',
    type: 'Education',
    startDate: '2025-09',
    endDate: undefined,
    current: true,
    description:
      'Studying computer science with a focus on software development and web technologies.',
    technologies: ['Programming', 'Web Development'],
    companyUrl: '',
  },
]

const ExperienceAdminPage = () => {
  const [deleteExperience, setDeleteExperience] = useState<Experience | null>(
    null
  )
  const hasExperiences = experiences.length > 0

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
                ? `${deleteExperience.position} at ${deleteExperience.company}`
                : undefined
            }
            onClose={() => setDeleteExperience(null)}
            onConfirm={async () => {
              if (!deleteExperience) return

              // بعداً:
              // await deleteExperienceApi(deleteExperience.id)

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
