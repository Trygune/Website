'use client'

import { useState } from 'react'
import PostFormFields from './PostFormFields'
import { Post } from '@/types/post'
import { useRouter } from 'next/navigation'
import { useCreatePost, useUpdatePost } from '@/hooks/usePosts'

type PostFormProps = {
  initialData?: Post
  isEditing?: boolean
}

const PostForm = ({ initialData, isEditing = false }: PostFormProps) => {
  const router = useRouter()

  const [status, setStatus] = useState<Post['status']>(
    initialData?.status ?? 'draft'
  )

  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost()

  const isPending = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.set('status', status)

    try {
      if (isEditing && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: formData,
        })
      } else {
        await createMutation.mutateAsync(formData)
      }

      router.push('/admin/posts')
    } catch (error) {
      console.error('Failed to save post:', error)
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <PostFormFields
        initialData={initialData}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Actions */}
      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {status === 'published'
            ? 'This post will be visible on your website.'
            : 'This post is saved as a draft.'}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="h-10 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="h-10 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? isEditing
                ? 'Saving...'
                : 'Creating...'
              : isEditing
                ? 'Save changes'
                : 'Create project'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PostForm
