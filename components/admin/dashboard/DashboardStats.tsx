'use client'

import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
} from 'lucide-react'
import Link from 'next/link'

type DashboardStatsData = {
  projects: {
    total: number
    published: number
    drafts: number
  }

  posts: {
    total: number
    published: number
    drafts: number
  }

  experience: {
    total: number
    current: number
  }
}

type DashboardStatsProps = {
  stats: DashboardStatsData
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {/* Projects */}
      <Link
        href="/admin/projects"
        className="group rounded-xl border bg-background p-5 transition-colors hover:bg-muted/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg border">
            <FolderKanban className="size-4 text-muted-foreground" />
          </div>

          <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Projects</p>

        <p className="mt-1 text-3xl font-bold tracking-tight">
          {stats.projects.total}
        </p>

        <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
          <span>{stats.projects.published} published</span>

          <span>{stats.projects.drafts} drafts</span>
        </div>
      </Link>

      {/* Posts */}
      <Link
        href="/admin/posts"
        className="group rounded-xl border bg-background p-5 transition-colors hover:bg-muted/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg border">
            <FileText className="size-4 text-muted-foreground" />
          </div>

          <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Blog posts</p>

        <p className="mt-1 text-3xl font-bold tracking-tight">
          {stats.posts.total}
        </p>

        <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
          <span>{stats.posts.published} published</span>

          <span>{stats.posts.drafts} drafts</span>
        </div>
      </Link>

      {/* Experience */}
      <Link
        href="/admin/experience"
        className="group rounded-xl border bg-background p-5 transition-colors hover:bg-muted/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg border">
            <BriefcaseBusiness className="size-4 text-muted-foreground" />
          </div>

          <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Experience</p>

        <p className="mt-1 text-3xl font-bold tracking-tight">
          {stats.experience.total}
        </p>

        <p className="mt-3 text-xs text-muted-foreground">
          {stats.experience.current} current
        </p>
      </Link>
    </div>
  )
}

export default DashboardStats
