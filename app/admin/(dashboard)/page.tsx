'use client'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import DashboardStats from '@/components/admin/dashboard/DashboardStats'
import RecentPosts from '@/components/admin/dashboard/RecentPosts'
import RecentProjects from '@/components/admin/dashboard/RecentProjects'
import { useDashboard } from '@/hooks/useDashboard'

const AdminDashboardPage = () => {
  const { data, isPending, isError } = useDashboard()

  const stats = data?.data ?? {
    projects: {
      total: 0,
      published: 0,
      drafts: 0,
    },
    posts: {
      total: 0,
      published: 0,
      drafts: 0,
    },
    experience: {
      total: 0,
      current: 0,
    },
    recentProjects: [],
    recentPosts: [],
  }

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
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Welcome back, Farbod
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your portfolio and keep your content up to date.
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

      {/* Stats */}
      <DashboardStats
        projects={stats.projects}
        posts={stats.posts}
        experience={stats.experience}
      />

      {/* Recent content */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Projects */}
        <RecentProjects projects={stats.recentProjects} />

        {/* Posts */}
        <RecentPosts posts={stats.recentPosts} />
      </div>
    </div>
  )
}

export default AdminDashboardPage
