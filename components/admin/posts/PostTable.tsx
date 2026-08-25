'use client'

import Link from 'next/link'
import { ArrowUpRight, FileText, Pencil, Trash2 } from 'lucide-react'

export type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  category: string
  tags: string[]
  coverImage?: string
  published: boolean
  createdAt: string
  updatedAt?: string
}

type PostTableProps = {
  posts: Post[]
  onDelete: (post: Post) => void
}

const formatDate = (date: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const PostTable = ({ posts, onDelete }: PostTableProps) => {
  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      {/* Header */}
      <div className="hidden grid-cols-[1fr_140px_130px_100px_110px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
        <span>Post</span>
        <span>Category</span>
        <span>Created</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {posts.map((post) => (
          <article
            key={post.id}
            className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_140px_130px_100px_110px] md:items-center"
          >
            {/* Post */}
            <div className="flex min-w-0 gap-3">
              {/* Cover */}
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt=""
                  className="hidden size-12 shrink-0 rounded-lg border object-cover sm:block"
                />
              ) : (
                <div className="hidden size-12 shrink-0 items-center justify-center rounded-lg border bg-muted/30 sm:flex">
                  <FileText className="size-4 text-muted-foreground" />
                </div>
              )}

              <div className="min-w-0">
                <h2 className="truncate text-sm font-medium">{post.title}</h2>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  /{post.slug}
                </p>

                {post.excerpt && (
                  <p className="mt-1 hidden max-w-md truncate text-xs text-muted-foreground lg:block">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                {post.category}
              </span>
            </div>

            {/* Created */}
            <div className="text-xs text-muted-foreground">
              {formatDate(post.createdAt)}
            </div>

            {/* Status */}
            <div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  post.published
                    ? 'bg-foreground/10 text-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-start gap-2 md:justify-end">
              <Link
                href={`/admin/posts/${post.id}`}
                aria-label={`Edit ${post.title}`}
                className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Pencil className="size-4" />
              </Link>

              <button
                type="button"
                onClick={() => onDelete(post)}
                aria-label={`Delete ${post.title}`}
                className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>

              {post.published && (
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${post.title}`}
                  className="flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PostTable
