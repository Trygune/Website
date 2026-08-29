import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { getSkills } from '@/services/skills'

const Skills = async () => {
  const { data: skills } = await getSkills({
    featured: true,
  })

  const categories = [...new Set(skills.map((skill) => skill.category))]

  return (
    <section id="skills" className="scroll-mt-24 border-t py-24 sm:py-32">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Skills
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Technologies I use to build products.
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            A selection of technologies and tools I work with across frontend,
            backend, and modern web development.
          </p>
        </div>

        <Link
          href="/skills"
          className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-medium"
        >
          View all skills
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Skills */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categorySkills = skills
            .filter((skill) => skill.category === category)
            .sort((a, b) => a.order - b.order)

          return (
            <article
              key={category}
              className="group rounded-2xl border bg-background p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted/20 sm:p-7"
            >
              {/* Category */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold tracking-tight">{category}</h3>

                <span className="text-xs text-muted-foreground">
                  {categorySkills.length}{' '}
                  {categorySkills.length === 1 ? 'skill' : 'skills'}
                </span>
              </div>

              {/* Skills */}
              <div className="mt-6 space-y-5">
                {categorySkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/20">
                          <span className="text-[10px] font-semibold uppercase">
                            {skill.icon.slice(0, 2)}
                          </span>
                        </div>

                        <span className="truncate text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>

                      <span className="shrink-0 text-xs text-muted-foreground">
                        {skill.percent}%
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-foreground transition-all duration-500"
                        style={{
                          width: `${skill.percent}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
