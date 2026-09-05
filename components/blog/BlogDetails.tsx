import Link from 'next/link'
import { Post } from '@/types/post'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'
import { Badge } from '../ui/badge'

type BlogDetailsProps = {
  post: Post
}

const BlogDetails = ({ post }: BlogDetailsProps) => {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toDateString()
    : 'Unknown'
  return (
    <article>
      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md border px-2.5 py-1 text-xs font-medium">
            {post.category}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {date}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" />
            {post.readTime ?? 'Unknown'}
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {post.excerpt}
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          Written by{' '}
          <span className="font-medium text-foreground">TryGune</span>
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-md px-2.5 py-1 font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Divider */}
      <div className="my-12 border-t" />

      {/* Content */}
      <div className="space-y-8">
        <p className="text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
          {post.content}
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t pt-8">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>
      </footer>
    </article>
  )
}

export default BlogDetails
