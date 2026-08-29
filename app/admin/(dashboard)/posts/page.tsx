'use client'
import Link from 'next/link'
import { FileText, Plus, Search } from 'lucide-react'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useState } from 'react'
import PostTable from '@/components/admin/posts/PostTable'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import { useDeletePost, usePosts } from '@/hooks/usePosts'
import { Post } from '@/types/post'

const PostsAdminPage = () => {
  const { data, isPending, isError } = usePosts()
  const deleteMutation = useDeletePost()
  const posts = data?.data ?? []
  const hasPosts = posts.length > 0
  const [deletePost, setDeletePost] = useState<Post | null>(null)

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
                {posts.filter((post) => post.publishedAt).length}
              </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Drafts</p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {posts.filter((post) => !post.publishedAt).length}
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

              await deleteMutation.mutateAsync(deletePost.id)

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
