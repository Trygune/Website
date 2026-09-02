import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import PostForm from '@/components/admin/posts/PostForm'
import { getPostById } from '@/services/posts'

type PostEditPageProps = {
  params: Promise<{
    id: string
  }>
}

const PostEditPage = async ({ params }: PostEditPageProps) => {
  const { id } = await params
  const post = await getPostById(String(id))

  if (!post) {
    return (
      <main className="py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Post not found
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            The post you are looking for does not exist.
          </p>

          <Link
            href="/admin/posts"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background"
          >
            <ArrowLeft className="size-4" />
            Back to posts
          </Link>
        </div>
      </main>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/posts"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to posts
        </Link>

        <p className="text-sm text-muted-foreground">Blog</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">Edit post</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Update your article and publishing settings.
        </p>
      </div>

      {/* Form */}
      <PostForm isEditing initialData={post.data} />
    </div>
  )
}

export default PostEditPage
