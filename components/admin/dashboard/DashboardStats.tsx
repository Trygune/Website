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

const DashboardStats = ({
  projects,
  posts,
  experience,
}: DashboardStatsData) => {
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
          {projects.total}
        </p>

        <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
          <span>{projects.published} published</span>

          <span>{projects.drafts} drafts</span>
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

        <p className="mt-1 text-3xl font-bold tracking-tight">{posts.total}</p>

        <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
          <span>{posts.published} published</span>

          <span>{posts.drafts} drafts</span>
        </div>
      </Link>

      {/* Experience */}
      <Link
        href="/admin/experiences"
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
          {experience.total}
        </p>

        <p className="mt-3 text-xs text-muted-foreground">
          {experience.current} current
        </p>
      </Link>
    </div>
  )
}

export default DashboardStats
