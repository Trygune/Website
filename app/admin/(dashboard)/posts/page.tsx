'use client'
import Link from 'next/link'
import { FileText, Paperclip, Plus, Search, Upload } from 'lucide-react'
import EmptyState from '@/components/admin/shared/EmptyState'
import { useState } from 'react'
import PostTable from '@/components/admin/posts/PostTable'
import DeleteDialog from '@/components/admin/shared/DeleteDialog'
import { useDeletePost, usePosts } from '@/hooks/usePosts'
import { Post, PostSort, PostSortField } from '@/types/post'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/components/shared/Pagination'
import { useDashboard } from '@/hooks/useDashboard'
import StatsGrid from '@/components/admin/dashboard/StatsGrid'
import { isPostSort } from '@/components/admin/posts/PostValidator'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const PostsAdminPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const sortParam = searchParams.get('sort')
  const search = searchParams.get('search') || undefined
  const sort: PostSort = isPostSort(sortParam) ? sortParam : 'status,-createdAt'

  const { data, isPending, isError } = usePosts({
    page,
    sort,
    search,
  })
  const {
    data: statData,
    isPending: statIsPending,
    isError: statIsError,
  } = useDashboard({ categories: 'posts' })
  const deleteMutation = useDeletePost()
  const posts = data?.data ?? []
  const pagination = data?.pagination
  const hasPosts = posts.length > 0
  const status = statData?.data.posts ?? {
    total: 0,
    published: 0,
    drafts: 0,
  }
  const stats = [
    {
      icon: FileText,
      title: 'Total posts',
      length: status.total,
    },
    {
      icon: Upload,
      title: 'Published',
      length: status.published,
    },
    {
      icon: Paperclip,
      title: 'Drafts',
      length: status.drafts,
    },
  ]
  const [deletePost, setDeletePost] = useState<Post | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchInput) {
      params.set('search', searchInput)
    } else {
      params.delete('search')
    }
    router.push(`?${params.toString()}`)
  }
  const handleSort = (field: PostSortField) => {
    const params = new URLSearchParams(searchParams.toString())

    const currentSort = params.get('sort')

    if (currentSort === field) {
      params.set('sort', `-${field}`)
    } else if (currentSort === `-${field}`) {
      params.delete('sort')
    } else {
      params.set('sort', field)
    }

    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  if (isError || statIsError) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">Failed to load projects</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    )
  }

  if (isPending || statIsPending) {
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
          <StatsGrid stats={stats} />

          {/* Search */}
          <ButtonGroup className="relative max-w-md w-full">
            <Input
              type="search"
              id="input-button-group"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="Type to search..."
            />
            <Button variant="outline" size="icon" onClick={handleSearch}>
              <Search className="text-muted-foreground" />
            </Button>
          </ButtonGroup>

          {/* Posts table */}
          <PostTable
            posts={posts}
            onDelete={setDeletePost}
            sort={sort}
            onSort={handleSort}
          />
          <Pagination pagination={pagination} baseUrl="/admin/posts" />
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
