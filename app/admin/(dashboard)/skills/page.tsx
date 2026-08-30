'use client'

import Link from 'next/link'
import { Code2, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useDeleteSkill, useSkills } from '@/hooks/useSkills'
import type { Skill } from '@/types/skill'
import Pagination from '@/components/shared/Pagination'

const SkillsAdminPage = () => {
  const { data, isPending, isError } = useSkills()
  const deleteMutation = useDeleteSkill()

  const skills = data?.data ?? []
  const hasSkills = skills.length > 0

  const [deleteSkill, setDeleteSkill] = useState<Skill | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 1

  const featuredCount = skills.filter((skill) => skill.featured).length

  const categoriesCount = new Set(skills.map((skill) => skill.category)).size

  if (isError) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">Failed to load skills</h2>

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-background p-5">
              <div className="flex size-10 items-center justify-center rounded-lg border">
                <Code2 className="size-4 text-muted-foreground" />
              </div>

              <p className="mt-5 text-sm text-muted-foreground">Total skills</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {skills.length}
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Featured</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {featuredCount}
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Categories</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {categoriesCount}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              placeholder="Search skills..."
              className="h-11 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border bg-background">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="px-5 py-4 text-left font-medium">Skill</th>

                    <th className="px-5 py-4 text-left font-medium">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left font-medium">
                      Proficiency
                    </th>

                    <th className="px-5 py-4 text-left font-medium">
                      Featured
                    </th>

                    <th className="px-5 py-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {skills.map((skill) => (
                    <tr
                      key={skill.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      {/* Skill */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/20">
                            {skill.icon ? (
                              <span className="text-xs font-semibold uppercase">
                                {skill.icon.slice(0, 2)}
                              </span>
                            ) : (
                              <Code2 className="size-4 text-muted-foreground" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium">{skill.name}</p>

                            <p className="mt-1 max-w-xs truncate text-xs text-muted-foreground">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                          {skill.category}
                        </span>
                      </td>

                      {/* Proficiency */}
                      <td className="px-5 py-4">
                        <div className="min-w-48 space-y-2">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs font-medium">
                              {skill.level}
                            </span>

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
                      </td>

                      {/* Featured */}
                      <td className="px-5 py-4">
                        {skill.featured ? (
                          <span className="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                            Featured
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/skills/${skill.id}`}
                            className="inline-flex size-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
                            aria-label={`Edit ${skill.name}`}
                          >
                            <Pencil className="size-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteSkill(skill)}
                            disabled={deleteMutation.isPending}
                            className="inline-flex size-9 items-center justify-center rounded-lg border text-destructive transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
                            aria-label={`Delete ${skill.name}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
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
