'use client'
import Link from 'next/link'
import { FileText, Plus, Search } from 'lucide-react'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useState } from 'react'
import PostTable, { type Post } from '@/components/admin/posts/PostTable'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'

const posts: Post[] = [
  {
    id: '1',
    title: 'Building Modern React Applications',
    slug: 'building-modern-react-applications',
    excerpt:
      'A practical guide to building modern React applications with a clean and scalable architecture.',
    category: 'React',
    tags: ['React', 'JavaScript', 'Frontend'],
    coverImage: '',
    published: true,
    createdAt: '2026-08-23',
    updatedAt: '2026-08-23',
  },
  {
    id: '2',
    title: 'What I Learned Building with Next.js',
    slug: 'what-i-learned-building-with-nextjs',
    excerpt: 'Lessons learned while building modern applications with Next.js.',
    category: 'Next.js',
    tags: ['Next.js', 'React', 'TypeScript'],
    coverImage: '',
    published: true,
    createdAt: '2026-08-18',
    updatedAt: '2026-08-18',
  },
  {
    id: '3',
    title: 'TypeScript for JavaScript Developers',
    slug: 'typescript-for-javascript-developers',
    excerpt:
      'A practical introduction to TypeScript for developers coming from JavaScript.',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript'],
    coverImage: '',
    published: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11',
  },
]

const PostsAdminPage = () => {
  const hasPosts = posts.length > 0
  const [deletePost, setDeletePost] = useState<Post | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Management</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Blog posts</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create, edit, and manage your articles.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          New post
        </Link>
      </div>

      {hasPosts ? (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-background p-5">
              <div className="flex size-10 items-center justify-center rounded-lg border">
                <FileText className="size-4 text-muted-foreground" />
              </div>

              <p className="mt-5 text-sm text-muted-foreground">Total posts</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {posts.length}
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Published</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {posts.filter((post) => post.published).length}
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Drafts</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {posts.filter((post) => !post.published).length}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              placeholder="Search posts..."
              className="h-11 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Posts table */}
          <PostTable posts={posts} onDelete={setDeletePost} />
          <DeleteDialog
            open={Boolean(deletePost)}
            title="Delete post"
            description="This post will be permanently removed from your blog."
            itemName={deletePost?.title}
            onClose={() => setDeletePost(null)}
            onConfirm={async () => {
              if (!deletePost) return

              // بعداً:
              // await deletePostApi(deletePost.id)

              console.log('Delete post:', deletePost.id)
            }}
          />
        </>
      ) : (
        <EmptyState
          icon={FileText}
          title="No posts yet"
          description="Start writing your first article for your blog."
          action={{
            label: 'Create your first post',
            href: '/admin/posts/new',
          }}
        />
      )}
    </div>
  )
}

export default PostsAdminPage
