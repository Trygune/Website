import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

import type { Project } from '@/types/project'

type ProjectDetailsProps = {
  project: Project
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <article>
      {/* Header */}
      <header className="max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Project
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          {project.fullDescription}
        </p>

        {/* Technologies */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md border px-3 py-1.5 text-sm font-medium text-muted-foreground"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Live demo
              <ExternalLink className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}

          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              GitHub
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </header>

      {/* Hero image */}
      <div className="relative mt-16 aspect-video overflow-hidden rounded-2xl border bg-muted">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${project.coverImage ?? '/uploads/images/sample.jpg'}`}
          alt={`${project.title} preview`}
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div className="max-w-3xl">
          <div className="space-y-10">
            {project.overview && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Overview
                </h2>

                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {project.overview}
                </p>
              </section>
            )}

            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Key features
                </h2>

                <ul className="mt-5 space-y-3">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-base leading-7 text-muted-foreground"
                    >
                      <span className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.challengesSolutions?.length > 0 && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Challenges &amp; solutions
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Some of the challenges I faced while building the project
                    and how I approached them.
                  </p>
                </div>

                <div className="space-y-6">
                  {project.challengesSolutions.map(
                    ({ challenge, solution }, index) => (
                      <article
                        key={`challenge-solution-${index}`}
                        className="rounded-xl border bg-background p-6"
                      >
                        <div>
                          <p className="text-sm font-medium">Challenge</p>

                          <p className="mt-2 text-base leading-7 text-muted-foreground">
                            {challenge}
                          </p>
                        </div>

                        <div className="mt-6 border-t pt-6">
                          <p className="text-sm font-medium">Solution</p>

                          <p className="mt-2 text-base leading-7 text-muted-foreground">
                            {solution}
                          </p>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="h-fit border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8">
          <dl className="space-y-6 text-sm">
            {project.role && (
              <div>
                <dt className="text-muted-foreground">Role</dt>
                <dd className="mt-1 font-medium">{project.role}</dd>
              </div>
            )}

            {project.year && (
              <div>
                <dt className="text-muted-foreground">Year</dt>
                <dd className="mt-1 font-medium">{project.year}</dd>
              </div>
            )}

            <div>
              <dt className="text-muted-foreground">Stack</dt>

              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md bg-muted px-2 py-1 text-xs"
                  >
                    {technology}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  )
}

export default ProjectDetails
