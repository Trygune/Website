import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getSortIcon } from '@/lib/utils'
import { Skill, SkillSort, SkillSortField } from '@/types/skill'
import { Code2, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

type SkillTableProps = {
  skills: Skill[]
  onDelete: (skill: Skill) => void
  sort?: SkillSort
  onSort: (field: SkillSortField) => void
}

const SkillTable = ({ skills, onDelete, sort, onSort }: SkillTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-12 px-5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onSort('name')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Skill
                  <span className="text-[11px]">
                    {getSortIcon('name', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onSort('category')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Category
                  <span className="text-[11px]">
                    {getSortIcon('category', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('percent')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Proficiency
                  <span className="text-[11px]">
                    {getSortIcon('percent', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium text-center">
                <button
                  type="button"
                  onClick={() => onSort('featured')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Featured
                  <span className="text-[11px]">
                    {getSortIcon('featured', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-right text-xs font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {skills.map((skill) => (
              <TableRow
                key={skill.id}
                className="group transition-colors hover:bg-muted/20"
              >
                {/* Skill */}
                <TableCell className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/20">
                      {skill.icon ? (
                        <span className="text-xs font-semibold uppercase">
                          {skill.icon.slice(0, 2)}
                        </span>
                      ) : (
                        <Code2 className="size-4 text-muted-foreground" />
                      )}
                    </div>

                    <p className="font-medium">{skill.name}</p>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell className="px-5 py-4">
                  <span className="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                    {skill.category}
                  </span>
                </TableCell>

                {/* Proficiency */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  <div className="min-w-48 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-medium">{skill.level}</span>

                      <span className="text-xs text-muted-foreground">
                        {skill.percent}%
                      </span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-foreground transition-all"
                        style={{
                          width: `${skill.percent}%`,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>

                {/* Featured */}
                <TableCell className="px-5 py-4">
                  <div className="flex h-full items-center justify-center">
                    <span
                      className={
                        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium'
                      }
                    >
                      {skill.featured && (
                        <span
                          className={
                            'mr-1.5 size-1.5 rounded-full bg-foreground'
                          }
                        />
                      )}

                      {skill.featured ? 'Featured' : '—'}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Edit */}
                    <Link
                      href={`/admin/skills/${skill.id}`}
                      aria-label={`Edit ${skill.name}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-3.5" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(skill)}
                      aria-label={`Delete ${skill.name}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
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

export default SkillTable
