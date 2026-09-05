import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getSkills } from '@/services/skills'
import { createMetadata } from '@/lib/seo/metadata'
import AppBreadCrumb from '@/components/shared/AppBreadCrumb'

export const metadata = createMetadata({
  title: 'Skills',
  description:
    'Explore my technical skills and experience with React, Next.js, TypeScript, JavaScript, and modern web development technologies.',
  path: '/skills',
})

const SkillsPage = async () => {
  const { data: skills } = await getSkills()

  const categories = [...new Set(skills.map((skill) => skill.category))]

  return (
    <>
      <AppBreadCrumb current="Skills" />

      {/* Header */}
      <header className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Skills
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Technologies I work with.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          A collection of technologies, tools, and technologies I&apos;ve worked
          with while building web applications and exploring modern software
          development.
        </p>
      </header>

      {/* Skills */}
      <div className="mt-16 space-y-14">
        {categories.map((category) => {
          const categorySkills = skills.filter(
            (skill) => skill.category === category
          )

          return (
            <section key={category}>
              {/* Category header */}
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>

                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                    {category}
                  </h2>
                </div>

                <span className="text-sm text-muted-foreground">
                  {categorySkills.length}{' '}
                  {categorySkills.length === 1 ? 'skill' : 'skills'}
                </span>
              </div>

              {/* Skill cards */}
              <div className="grid gap-4 md:grid-cols-2">
                {categorySkills.map((skill) => (
                  <article
                    key={skill.id}
                    className="group rounded-xl border bg-background p-5 transition-colors hover:bg-muted/20"
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted/20">
                          <span className="text-xs font-semibold uppercase">
                            {skill.icon.slice(0, 2)}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold">{skill.name}</h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {skill.level}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-sm font-medium">
                        {skill.percent}%
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mt-5">
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-foreground transition-all duration-500"
                          style={{
                            width: `${skill.percent}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    {skill.description && (
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {skill.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* CTA */}
      <section className="mt-20 border-t pt-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Want to see these skills in action?
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Explore my projects.
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            View projects
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default SkillsPage
