'use client'

import Link from 'next/link'
import { useState } from 'react'
import ConfirmDialog from '../shared/ConfirmDialog'
import PostFormFields from './PostFormFields'

type PostStatus = 'draft' | 'published'

type PostFormData = {
  title?: string
  slug?: string
  excerpt?: string
  category?: string
  tags?: string[]
  content?: string
  status?: PostStatus
  coverImage?: string
}

type PostFormProps = {
  initialData?: PostFormData
  isEditing?: boolean
}

const categories = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Backend',
  'Career',
]

const PostForm = ({ initialData, isEditing = false }: PostFormProps) => {
  const [status, setStatus] = useState<PostStatus>(
    initialData?.status ?? 'draft'
  )
  const [publishPost, setPublishPost] = useState<string | null>(null)

  return (
    <form className="space-y-8">
      <PostFormFields initialData={initialData} />

      {/* Actions */}
      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {status === 'published'
            ? 'This post will be visible on your website.'
            : 'This post is saved as a draft.'}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Link
            href="/admin/posts"
            className="inline-flex h-11 items-center justify-center rounded-lg border px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={() => setPublishPost('title')}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            {isEditing
              ? 'Update post'
              : status === 'published'
                ? 'Publish post'
                : 'Save draft'}
          </button>
          <ConfirmDialog
            open={Boolean(publishPost)}
            title="Publish post?"
            description="This post will become visible on your public blog."
            confirmLabel="Publish"
            onClose={() => setPublishPost(null)}
            onConfirm={async () => {
              if (!publishPost) return

              // بعداً:
              // await publishPostApi(publishPost)

              console.log('Publish:', publishPost)
            }}
          />
        </div>
      </div>
    </form>
  )
}

export default PostForm
