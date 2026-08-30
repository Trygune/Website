import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react'
import { getPosts } from '@/services/posts'
import Pagination from '@/components/shared/Pagination'

type BlogPageProps = {
  searchParams: Promise<{
    page?: string
  }>
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const { data: posts, pagination } = await getPosts({
    page: currentPage,
    limit: 6,
    status: 'published',
  })

  return (
    <main className="py-16 sm:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Blog
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Thoughts, notes, and things I&apos;ve learned.
        </h1>

        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
          I write about web development, React, Next.js, TypeScript, and things
          I learn while building projects.
        </p>
      </header>

      {/* Posts */}
      <div className="mt-16 divide-y border-y">
        {posts.map((post) => {
          const date = post.publishedAt
            ? new Date(post.publishedAt).toDateString()
            : 'Unknown'
          return (
            <article
              key={`${post.slug}-${post.id}`}
              className="group py-8 sm:py-10"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="grid gap-6 sm:grid-cols-[160px_1fr_auto] sm:items-start"
              >
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  {date}
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border px-2.5 py-1 text-xs font-medium">
                      {post.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="size-3.5" />
                      {post.readTime ?? 'Few Minutes'}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-muted-foreground sm:text-2xl">
                    {post.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="hidden size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
              </Link>
            </article>
          )
        })}
      </div>

      {/* Bottom */}
      <div className="mt-8 mb-16 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {pagination.total} articles
        </p>
      </div>

      <Pagination pagination={pagination} baseUrl="/blog" />
    </main>
  )
}

export default BlogPage
