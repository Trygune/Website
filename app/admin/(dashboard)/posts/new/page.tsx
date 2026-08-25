import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import PostForm from '@/components/admin/posts/PostForm'

const NewPostPage = () => {
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

        <h1 className="mt-1 text-3xl font-bold tracking-tight">New post</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Write and publish a new article.
        </p>
      </div>

      {/* Form */}
      <PostForm />
    </div>
  )
}

export default NewPostPage
