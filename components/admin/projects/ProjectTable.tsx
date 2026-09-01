import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn, formatDate, getSortIcon } from '@/lib/utils'
import { Project, ProjectSort, ProjectSortField } from '@/types/project'
import { ArrowUpRight, FolderKanban, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

type ProjectTableProps = {
  projects: Project[]
  onDelete: (project: Project) => void
  sort?: ProjectSort
  onSort: (field: ProjectSortField) => void
}

const ProjectTable = ({
  projects,
  onDelete,
  sort,
  onSort,
}: ProjectTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-12 px-5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onSort('title')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Project
                  <span className="text-[11px]">
                    {getSortIcon('title', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onSort('year')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Year
                  <span className="text-[11px]">
                    {getSortIcon('year', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium">
                Technologies
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
                  onClick={() => onSort('status')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Status
                  <span className="text-[11px]">
                    {getSortIcon('status', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-right text-xs font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="group transition-colors hover:bg-muted/20"
              >
                {/* Project */}
                <TableCell className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Image */}
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt=""
                        className="size-11 shrink-0 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
                        <FolderKanban className="size-4 text-muted-foreground" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-2">
                        <h2 className="truncate text-sm font-medium">
                          {project.title}
                        </h2>

                        {project.featured && (
                          <span className="shrink-0 rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        /{project.slug}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Year */}
                <TableCell className="px-5 py-4">
                  <div className="flex h-full items-center justify-center">
                    <span
                      className={
                        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium'
                      }
                    >
                      {project.year}
                    </span>
                  </div>
                </TableCell>

                {/* Technologies */}
                <TableCell className="px-5 py-4">
                  <div className="flex max-w-[260px] flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {technology}
                      </span>
                    ))}

                    {project.technologies.length > 3 && (
                      <span className="flex items-center px-1 text-[11px] text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Updated */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {project.updatedAt ? formatDate(project.updatedAt) : '—'}
                </TableCell>
                {/* Created */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {project.createdAt ? formatDate(project.createdAt) : '—'}
                </TableCell>

                {/* Status */}
                <TableCell className="px-5 py-4">
                  <div className="flex h-full items-center justify-center">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
                        project.status === 'published' &&
                          'bg-muted/50 text-muted-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'mr-1.5 size-1.5 rounded-full',
                          project.status === 'published'
                            ? 'bg-foreground'
                            : 'bg-muted-foreground'
                        )}
                      />

                      {project.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Edit */}
                    <Link
                      href={`/admin/projects/${project.id}`}
                      aria-label={`Edit ${project.title}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-3.5" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(project)}
                      aria-label={`Delete ${project.title}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>

                    {/* View */}
                    {project.status === 'published' && (
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title}`}
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

export default ProjectTable
