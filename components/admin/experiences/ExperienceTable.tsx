import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate, getSortIcon } from '@/lib/utils'
import {
  Experience,
  ExperienceSort,
  ExperienceSortField,
} from '@/types/experience'
import { ArrowUpRight, BriefcaseBusiness, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

type ExperienceTableProps = {
  experiences: Experience[]
  onDelete: (experience: Experience) => void
  sort?: ExperienceSort
  onSort: (field: ExperienceSortField) => void
}

const ExperienceTable = ({
  experiences,
  onDelete,
  sort,
  onSort,
}: ExperienceTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-12 px-5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onSort('role')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Experience
                  <span className="text-[11px]">
                    {getSortIcon('role', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onSort('type')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Type
                  <span className="text-[11px]">
                    {getSortIcon('type', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium">
                Technologies
              </TableHead>

              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('startDate')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Started
                  <span className="text-[11px]">
                    {getSortIcon('startDate', sort)}
                  </span>
                </button>
              </TableHead>
              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('endDate')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Ended
                  <span className="text-[11px]">
                    {getSortIcon('endDate', sort)}
                  </span>
                </button>
              </TableHead>
              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('updatedAt')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Updated
                  <span className="text-[11px]">
                    {getSortIcon('updatedAt', sort)}
                  </span>
                </button>
              </TableHead>
              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('createdAt')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Created
                  <span className="text-[11px]">
                    {getSortIcon('createdAt', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium text-center">
                <button
                  type="button"
                  onClick={() => onSort('current')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Status
                  <span className="text-[11px]">
                    {getSortIcon('current', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-right text-xs font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {experiences.map((experience) => (
              <TableRow
                key={experience.id}
                className="group transition-colors hover:bg-muted/20"
              >
                {/* Experience */}
                <TableCell className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
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
                    </div>
                  </div>
                </TableCell>

                {/* Type */}
                <TableCell className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <p className="mt-1 text-xs text-muted-foreground">
                      {experience.type}
                    </p>
                  </div>
                </TableCell>

                {/* Technologies */}
                <TableCell className="px-5 py-4">
                  <div className="flex max-w-[260px] flex-wrap gap-1.5">
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
                </TableCell>

                {/* Started */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {experience.startDate
                    ? formatDate(experience.startDate)
                    : '—'}
                </TableCell>
                {/* Ended */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  <p>
                    {experience.current
                      ? 'Present'
                      : experience.endDate
                        ? formatDate(experience.endDate)
                        : '—'}
                  </p>
                </TableCell>
                {/* Updated */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {experience.updatedAt
                    ? formatDate(experience.updatedAt)
                    : '—'}
                </TableCell>
                {/* Created */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {experience.createdAt
                    ? formatDate(experience.createdAt)
                    : '—'}
                </TableCell>

                {/* Status */}
                <TableCell className="px-5 py-4">
                  <div className="flex h-full items-center justify-center">
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
                </TableCell>

                {/* Actions */}
                <TableCell className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Edit */}
                    <Link
                      href={`/admin/experiences/${experience.id}`}
                      aria-label={`Edit ${experience.role}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-3.5" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(experience)}
                      aria-label={`Delete ${experience.role}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>

                    {/* View */}
                    {experience.companyUrl && (
                      <Link
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${experience.company}`}
                        className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ExperienceTable
