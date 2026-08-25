import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  date: string
  readTime: string
  category: string
  author: string
}

const posts: BlogPost[] = [
  {
    slug: 'building-modern-react-apps',
    title: 'Building Modern React Applications',
    excerpt:
      'A practical look at the architecture, patterns, and tools I use when building modern React applications.',
    date: 'August 20, 2026',
    readTime: '5 min read',
    category: 'React',
    author: 'Farbod',
    content: [
      'Modern React applications are no longer just about writing components and connecting them together. As applications grow, architecture, data fetching, state management, accessibility, and performance become increasingly important.',
      'I try to keep the architecture as simple as possible while still giving every part of the application a clear responsibility. Components should focus on presentation, while data fetching and business logic should live in appropriate layers.',
      'TypeScript also plays an important role in this process. Having well-defined types makes refactoring safer and makes the relationship between different parts of an application much easier to understand.',
      'The goal is not to add more abstractions. The goal is to create an application that remains easy to understand and maintain as it grows.',
    ],
  },
  {
    slug: 'learning-nextjs',
    title: 'What I Learned Building with Next.js',
    excerpt:
      'Notes and lessons from working with the Next.js App Router and building production-oriented applications.',
    date: 'August 12, 2026',
    readTime: '7 min read',
    category: 'Next.js',
    author: 'Farbod',
    content: [
      'Next.js provides many tools for building modern web applications, but understanding when to use each feature is more important than simply knowing that the features exist.',
      'The App Router introduces server and client components, layouts, loading states, error boundaries, and several different approaches to data fetching.',
      'One of the biggest lessons is to keep client-side JavaScript to a minimum and move logic to the server whenever interactivity is not required.',
    ],
  },
  {
    slug: 'typescript-for-javascript-developers',
    title: 'TypeScript for JavaScript Developers',
    excerpt:
      'How I approached TypeScript after working primarily with JavaScript and what changed in my development workflow.',
    date: 'August 05, 2026',
    readTime: '6 min read',
    category: 'TypeScript',
    author: 'Farbod',
    content: [
      'Moving from JavaScript to TypeScript initially feels like adding extra work, but the benefits become more obvious as a project grows.',
      'Types make APIs, component props, function parameters, and application data easier to understand.',
      'The most useful part of TypeScript for me is catching incorrect assumptions before they become runtime bugs.',
    ],
  },
]

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params

  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return (
      <main className="py-24">
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
      </main>
    )
  }

  return (
    <main className="py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to blog
        </Link>

        {/* Header */}
        <header>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md border px-2.5 py-1 text-xs font-medium">
              {post.category}
            </span>

            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {post.date}
            </span>

            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {post.excerpt}
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Written by{' '}
            <span className="font-medium text-foreground">{post.author}</span>
          </p>
        </header>

        {/* Divider */}
        <div className="my-12 border-t" />

        {/* Content */}
        <div className="space-y-8">
          {post.content.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t pt-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </Link>
        </footer>
      </article>
    </main>
  )
}

export default BlogPostPage
