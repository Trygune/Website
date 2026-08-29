'use client'

import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, Pencil, Trash2 } from 'lucide-react'
import { Experience } from '@/types/experience'

type ExperienceTableProps = {
  experiences: Experience[]
  onDelete: (experience: Experience) => void
}

const formatDate = (date: string) => {
  if (!date) return ''

  const [year, month] = date.split('-')

  if (!year || !month) {
    return date
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(Number(year), Number(month) - 1))
}

const ExperienceTable = ({ experiences, onDelete }: ExperienceTableProps) => {
  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      {/* Desktop header */}
      <div className="hidden grid-cols-[1fr_180px_130px_110px_110px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
        <span>Experience</span>
        <span>Technologies</span>
        <span>Duration</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="divide-y">
        {experiences.map((experience) => (
          <article
            key={experience.id}
            className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_180px_130px_110px_110px] md:items-center"
          >
            {/* Experience */}
            <div className="flex min-w-0 gap-3">
              <div className="hidden size-10 shrink-0 items-center justify-center rounded-lg border sm:flex">
                <BriefcaseBusiness className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-medium">
                  {experience.role}
                </h2>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {experience.company}
                  {experience.location && ` · ${experience.location}`}
                </p>

                {experience.type && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {experience.type}
                  </p>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.slice(0, 3).map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {technology}
                </span>
              ))}

              {experience.technologies.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{experience.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="text-xs text-muted-foreground">
              <p>
                {formatDate(experience.startDate)}
                {' — '}
                {experience.current
                  ? 'Present'
                  : formatDate(experience.endDate ?? '')}
              </p>
            </div>

            {/* Status */}
            <div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  experience.current
                    ? 'bg-foreground/10 text-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {experience.current ? 'Current' : 'Past'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-start gap-2 md:justify-end">
              <Link
                href={`/admin/experience/${experience.id}`}
                aria-label={`Edit ${experience.role}`}
                className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Pencil className="size-4" />
              </Link>

              <button
                type="button"
                aria-label={`Delete ${experience.position}`}
                onClick={() => onDelete(experience)}
                className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>

              {experience.companyUrl && (
                <Link
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${experience.company}`}
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

export default ExperienceTable
