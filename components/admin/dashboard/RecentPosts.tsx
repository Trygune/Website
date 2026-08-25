import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'

export type RecentPost = {
  id: string
  title: string
  slug: string
  category: string
  published: boolean
  updatedAt: string
}

type RecentPostsProps = {
  posts: RecentPost[]
}

const formatDate = (date: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <section className="rounded-xl border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold">Recent posts</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your latest blog posts.
          </p>
        </div>

        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="divide-y">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30"
            >
              {/* Icon */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/20">
                <FileText className="size-4 text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium">{post.title}</h3>

                  <span
                    className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium sm:inline-flex ${
                      post.published
                        ? 'bg-foreground/10 text-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.category}</span>

                  <span>·</span>

                  <span>{formatDate(post.updatedAt)}</span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <FileText className="mx-auto size-5 text-muted-foreground" />

          <p className="mt-3 text-sm font-medium">No posts yet</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Create your first blog post.
          </p>

          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex text-xs font-medium underline underline-offset-4"
          >
            Create post
          </Link>
        </div>
      )}
    </section>
  )
}

export default RecentPosts
