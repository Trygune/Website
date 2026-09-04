import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getExperiences } from '@/services/experiences'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Experience',
  description:
    'Explore my professional experience, internships, and work in front-end web development.',
  path: '/experiences',
})

const ExperiencePage = async () => {
  const { data: experiences } = await getExperiences()
  return (
    <main className="py-16 sm:py-24">
      {/* Back */}
      <Link
        href="/"
        className="group mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back home
      </Link>

      {/* Header */}
      <header className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Experience
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          My experience and journey so far.
        </h1>

        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
          A closer look at the experiences, responsibilities, and technologies
          that have shaped how I approach web development.
        </p>
      </header>

      {/* Timeline */}
      <div className="relative mt-16">
        {/* Line */}
        <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-border sm:block" />

        <div className="space-y-16">
          {experiences.map((experience) => (
            <article
              key={`${experience.id}-${experience.company}-${experience.role}`}
              className="relative sm:grid sm:grid-cols-[180px_1fr] sm:gap-10"
            >
              {/* Period */}
              <div className="mb-5 text-sm font-medium text-muted-foreground sm:mb-0 sm:pl-7">
                {experience.period ?? 'Unknown'}
              </div>

              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 hidden size-3 rounded-full border-2 border-background bg-foreground ring-1 ring-border sm:block" />

              {/* Content */}
              <div className="max-w-3xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {experience.role}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {experience.company}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                    {experience.type}
                  </span>
                </div>

                <p className="mt-6 text-base leading-8 text-muted-foreground">
                  {experience.description ?? 'Unknown'}
                </p>

                {/* Responsibilities */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold">Responsibilities</h3>

                  <ul className="mt-4 space-y-3">
                    {experience.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-7 text-muted-foreground"
                      >
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold">Technologies</h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="mt-20 border-t pt-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Interested in working together?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              I&apos;m always open to interesting projects and opportunities.
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
    </main>
  )
}

export default ExperiencePage
