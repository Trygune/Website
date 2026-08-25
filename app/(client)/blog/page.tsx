import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react'

const posts = [
  {
    slug: 'building-modern-react-apps',
    title: 'Building Modern React Applications',
    excerpt:
      'A practical look at the architecture, patterns, and tools I use when building modern React applications.',
    date: 'Aug 20, 2026',
    readTime: '5 min read',
    category: 'React',
  },
  {
    slug: 'learning-nextjs',
    title: 'What I Learned Building with Next.js',
    excerpt:
      'Notes and lessons from working with the Next.js App Router and building production-oriented applications.',
    date: 'Aug 12, 2026',
    readTime: '7 min read',
    category: 'Next.js',
  },
  {
    slug: 'typescript-for-javascript-developers',
    title: 'TypeScript for JavaScript Developers',
    excerpt:
      'How I approached TypeScript after working primarily with JavaScript and what changed in my development workflow.',
    date: 'Aug 05, 2026',
    readTime: '6 min read',
    category: 'TypeScript',
  },
]

const BlogPage = () => {
  return (
    <main className="py-16 sm:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Blog
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Thoughts, notes, and things I&apos;ve learned.
        </h1>

        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
          I write about web development, React, Next.js, TypeScript, and things
          I learn while building projects.
        </p>
      </header>

      {/* Posts */}
      <div className="mt-16 divide-y border-y">
        {posts.map((post) => (
          <article key={post.slug} className="group py-8 sm:py-10">
            <Link
              href={`/blog/${post.slug}`}
              className="grid gap-6 sm:grid-cols-[160px_1fr_auto] sm:items-start"
            >
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4" />
                {post.date}
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border px-2.5 py-1 text-xs font-medium">
                    {post.category}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-muted-foreground sm:text-2xl">
                  {post.title}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>

              {/* Arrow */}
              <ArrowUpRight className="hidden size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
            </Link>
          </article>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{posts.length} articles</p>
      </div>
    </main>
  )
}

export default BlogPage
