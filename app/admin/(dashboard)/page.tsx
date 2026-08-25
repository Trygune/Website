import Link from 'next/link'
import { Plus } from 'lucide-react'
import DashboardStats from '@/components/admin/dashboard/DashboardStats'
import RecentPosts, {
  type RecentPost,
} from '@/components/admin/dashboard/RecentPosts'
import RecentProjects, {
  type RecentProject,
} from '@/components/admin/dashboard/RecentProjects'

const stats = {
  projects: {
    total: 3,
    published: 2,
    drafts: 1,
  },
  posts: {
    total: 3,
    published: 2,
    drafts: 1,
  },
  experience: {
    total: 2,
    current: 1,
  },
}

const recentProjects: RecentProject[] = [
  {
    id: '1',
    title: 'Habit Tracker',
    slug: 'habit-tracker',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    status: 'published',
    featured: true,
    updatedAt: '2026-08-23',
  },
  {
    id: '2',
    title: 'Eslimi Shop',
    slug: 'eslimi-shop',
    technologies: ['Next.js', 'Drizzle', 'PostgreSQL'],
    status: 'published',
    featured: true,
    updatedAt: '2026-08-20',
  },
  {
    id: '3',
    title: 'Tax Calculator',
    slug: 'tax-calculator',
    technologies: ['React', 'Vite', 'Redux Toolkit'],
    status: 'draft',
    featured: false,
    updatedAt: '2026-08-18',
  },
]

const recentPosts: RecentPost[] = [
  {
    id: '1',
    title: 'Building Modern React Applications',
    slug: 'building-modern-react-applications',
    category: 'React',
    published: true,
    updatedAt: '2026-08-23',
  },
  {
    id: '2',
    title: 'What I Learned Building with Next.js',
    slug: 'what-i-learned-building-with-nextjs',
    category: 'Next.js',
    published: true,
    updatedAt: '2026-08-18',
  },
  {
    id: '3',
    title: 'TypeScript for JavaScript Developers',
    slug: 'typescript-for-javascript-developers',
    category: 'TypeScript',
    published: false,
    updatedAt: '2026-08-11',
  },
]

const AdminDashboardPage = () => {
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
      <DashboardStats stats={stats} />

      {/* Recent content */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Projects */}
        <RecentProjects projects={recentProjects} />

        {/* Posts */}
        <RecentPosts posts={recentPosts} />
      </div>
    </div>
  )
}

export default AdminDashboardPage
