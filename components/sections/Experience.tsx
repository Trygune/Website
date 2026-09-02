import { getExperiences } from '@/services/experiences'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const Experience = async () => {
  const data = await getExperiences({ limit: 3 })
  const experiences = data?.data ?? []
  return (
    <section id="experience" className="scroll-mt-24 border-t py-24 sm:py-32">
      {/* Header */}
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Experience
        </p>

        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve been learning and building.
        </h2>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          My journey so far, from learning the fundamentals to working on
          real-world projects and experiences.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-border sm:block" />

        <div className="space-y-12">
          {experiences.map((experience) => (
            <article
              key={`${experience.company}-${experience.role}`}
              className="relative sm:grid sm:grid-cols-[160px_1fr] sm:gap-8"
            >
              {/* Period */}
              <div className="mb-4 text-sm font-medium text-muted-foreground sm:mb-0 sm:pl-7">
                {experience.period}
              </div>

              {/* Dot */}
              <div className="absolute left-0 top-1.5 hidden size-3 rounded-full border-2 border-background bg-foreground ring-1 ring-border sm:block" />

              {/* Content */}
              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {experience.role}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {experience.company}
                    </p>
                  </div>

                  <span className="mt-2 w-fit rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground sm:mt-0">
                    {experience.type}
                  </span>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                  {experience.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 border-t pt-6">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm font-medium"
        >
          More about my journey
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}

export default Experience
