import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '@/services/posts'
import { createMetadata } from '@/lib/seo/metadata'
import AppBreadCrumb from '@/components/shared/AppBreadCrumb'
import BlogDetails from '@/components/blog/BlogDetails'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params

  try {
    const { data: post } = await getPostBySlug(slug)

    return createMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${slug}`,
    })
  } catch {
    return createMetadata({
      title: 'Blog Post',
      description:
        'Read articles about web development and modern web technologies.',
      path: `/blog/${slug}`,
    })
  }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params
  const { data: post } = await getPostBySlug(slug)

  if (!post) {
    return (
      <div className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            404
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Post not found
          </h1>

          <p className="mt-4 text-muted-foreground">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>

          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <AppBreadCrumb before="Blog" current={slug} />
      <BlogDetails post={post} />
    </div>
  )
}

export default BlogPostPage
