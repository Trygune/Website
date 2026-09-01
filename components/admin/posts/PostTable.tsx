import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn, formatDate, getSortIcon } from '@/lib/utils'
import { Post, PostSort, PostSortField } from '@/types/post'
import { ArrowUpRight, FolderKanban, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

type PostTableProps = {
  posts: Post[]
  onDelete: (post: Post) => void
  sort?: PostSort
  onSort: (field: PostSortField) => void
}

const PostTable = ({ posts, onDelete, sort, onSort }: PostTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-12 px-5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onSort('title')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Post
                  <span className="text-[11px]">
                    {getSortIcon('title', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium text-center">
                <button
                  type="button"
                  onClick={() => onSort('category')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Category
                  <span className="text-[11px]">
                    {getSortIcon('category', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('publishedAt')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Published
                  <span className="text-[11px]">
                    {getSortIcon('publishedAt', sort)}
                  </span>
                </button>
              </TableHead>
              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('updatedAt')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Updated
                  <span className="text-[11px]">
                    {getSortIcon('updatedAt', sort)}
                  </span>
                </button>
              </TableHead>
              <TableHead className="h-12 whitespace-nowrap px-5 text-xs font-medium text-left">
                <button
                  type="button"
                  onClick={() => onSort('createdAt')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Created
                  <span className="text-[11px]">
                    {getSortIcon('createdAt', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-medium text-center">
                <button
                  type="button"
                  onClick={() => onSort('status')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Status
                  <span className="text-[11px]">
                    {getSortIcon('status', sort)}
                  </span>
                </button>
              </TableHead>

              <TableHead className="h-12 px-5 text-right text-xs font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className="group transition-colors hover:bg-muted/20"
              >
                {/* Project */}
                <TableCell className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Image */}
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt=""
                        className="size-11 shrink-0 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
                        <FolderKanban className="size-4 text-muted-foreground" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-medium">
                        {post.title}
                      </h2>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        /{post.slug}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell className="px-5 py-4">
                  <div className="flex justify-center items-center">
                    <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </TableCell>

                {/* Published */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                </TableCell>
                {/* Updated */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {post.updatedAt ? formatDate(post.updatedAt) : '—'}
                </TableCell>
                {/* Created */}
                <TableCell className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                  {post.createdAt ? formatDate(post.createdAt) : '—'}
                </TableCell>

                {/* Status */}
                <TableCell className="px-5 py-4">
                  <div className="flex h-full items-center justify-center">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
                        post.status === 'published' &&
                          'bg-muted/50 text-muted-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'mr-1.5 size-1.5 rounded-full',
                          post.status === 'published'
                            ? 'bg-foreground'
                            : 'bg-muted-foreground'
                        )}
                      />

                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Edit */}
                    <Link
                      href={`/admin/posts/${post.id}`}
                      aria-label={`Edit ${post.title}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-3.5" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(post)}
                      aria-label={`Delete ${post.title}`}
                      className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>

                    {/* View */}
                    {post.status === 'published' && (
                      <Link
                        href={`/posts/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${post.title}`}
                        className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PostTable
