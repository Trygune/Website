import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getSkills } from '@/services/skills'
import { createMetadata } from '@/lib/seo/metadata'
import AppBreadCrumb from '@/components/shared/AppBreadCrumb'

export const metadata = createMetadata({
  title: 'About',
  description:
    'Learn more about Farbod, a Front-End Developer focused on React, Next.js, and TypeScript.',
  path: '/about',
})

const AboutPage = async () => {
  const { data: skills } = await getSkills({
    featured: true,
  })

  return (
    <>
      <AppBreadCrumb current="About" />

      {/* Intro */}
      <header className="max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          About me
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          I build interfaces that are simple, useful, and thoughtfully designed.
        </h1>
      </header>

      {/* Main content */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-20">
        <div className="max-w-3xl space-y-12">
          {/* About */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              A little about me
            </h2>

            <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                I&apos;m Farbod, a front-end web developer who enjoys turning
                ideas and designs into functional, responsive, and polished web
                experiences.
              </p>

              <p>
                My main focus is the React ecosystem. I work primarily with
                React, Next.js, and TypeScript, while also exploring the backend
                side of web development with Node.js and Express.
              </p>

              <p>
                I care about more than just making things work. Typography,
                spacing, accessibility, performance, responsive behavior, and
                small interaction details are all part of how I approach
                building a product.
              </p>
            </div>
          </section>

          {/* Current focus */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              What I&apos;m focused on
            </h2>

            <ul className="mt-5 space-y-4">
              {[
                'Building production-ready React and Next.js applications.',
                'Improving my TypeScript and software architecture skills.',
                'Learning backend development with Node.js and Express.',
                'Building accessible and responsive user interfaces.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-7 text-muted-foreground"
                >
                  <span className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Featured skills */}
          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Technologies
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Some of the technologies I work with most often.
                </p>
              </div>

              <Link
                href="/skills"
                className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium sm:inline-flex"
              >
                View all
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group rounded-xl border p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{skill.name}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {skill.category}
                      </p>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {skill.percent}%
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground transition-all"
                      style={{
                        width: `${skill.percent}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/skills"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium sm:hidden"
            >
              View all skills
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="h-fit border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8">
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Based</dt>

              <dd className="mt-1 font-medium">Available remotely</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Focus</dt>

              <dd className="mt-1 font-medium">Front-End Development</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Currently learning</dt>

              <dd className="mt-1 font-medium">Backend &amp; System Design</dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* CTA */}
      <section className="mt-20 border-t pt-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Let&apos;s build something together.
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Have an idea or an opportunity? I&apos;d love to hear about it.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default AboutPage
