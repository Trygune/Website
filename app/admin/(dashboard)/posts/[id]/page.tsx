import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import PostForm from '@/components/admin/posts/PostForm'

const posts = [
  {
    id: '1',
    title: 'Building Modern React Applications',
    slug: 'building-modern-react-applications',
    excerpt:
      'A practical look at building modern React applications with a clean and maintainable architecture.',
    category: 'react',
    tags: ['React', 'TypeScript', 'Frontend'],
    coverImage: '',
    status: 'published' as const,
    content: `# Building Modern React Applications

React has become one of the most popular tools for building modern web applications.

In this article, we'll look at some practical approaches to building React applications that are maintainable, scalable, and enjoyable to work with.

## Component architecture

A good component structure makes a project easier to understand and maintain.

## State management

Choose the simplest state management solution that fits your application.

## Conclusion

A clean architecture and consistent conventions can make a huge difference as your project grows.`,
  },
  {
    id: '2',
    title: 'What I Learned Building with Next.js',
    slug: 'what-i-learned-building-with-nextjs',
    excerpt:
      'Lessons learned while building applications with the Next.js App Router.',
    category: 'nextjs',
    tags: ['Next.js', 'React', 'App Router'],
    coverImage: '',
    status: 'published' as const,
    content: `# What I Learned Building with Next.js

Next.js provides a powerful set of tools for building production-ready React applications.

## Server and Client Components

Understanding when to use each type of component is essential.

## Routing

The App Router provides a structured approach to application routing.

## Conclusion

Next.js makes it possible to build full-featured applications while keeping the architecture organized.`,
  },
  {
    id: '3',
    title: 'TypeScript for JavaScript Developers',
    slug: 'typescript-for-javascript-developers',
    excerpt:
      'A practical introduction to TypeScript for developers who already know JavaScript.',
    category: 'typescript',
    tags: ['TypeScript', 'JavaScript'],
    coverImage: '',
    status: 'draft' as const,
    content: `# TypeScript for JavaScript Developers

TypeScript adds static typing and powerful developer tooling to JavaScript.

## Why TypeScript?

Types can help catch many mistakes before your application reaches production.

## Getting started

You don't need to learn every TypeScript feature before using it.

Start with the basics and gradually introduce more advanced concepts.`,
  },
]

type PostEditPageProps = {
  params: Promise<{
    id: string
  }>
}

const PostEditPage = async ({ params }: PostEditPageProps) => {
  const { id } = await params

  const post = posts.find((post) => post.id === id)

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
      <PostForm isEditing initialData={post} />
    </div>
  )
}

export default PostEditPage
