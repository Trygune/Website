import {
  Code2,
  Database,
  GitBranch,
  Globe,
  Palette,
  Server,
} from 'lucide-react'

const skillGroups = [
  {
    title: 'Frontend',
    description: 'Building modern and responsive user interfaces.',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  },
  {
    title: 'Styling & UI',
    description: 'Creating consistent and polished visual experiences.',
    icon: Palette,
    skills: ['Tailwind CSS', 'shadcn/ui', 'Responsive Design', 'UI/UX'],
  },
  {
    title: 'Backend',
    description: 'Building APIs and server-side applications.',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'REST API'],
  },
  {
    title: 'Database',
    description: 'Working with data and application persistence.',
    icon: Database,
    skills: ['MongoDB', 'Mongoose', 'PostgreSQL'],
  },
  {
    title: 'Tools',
    description: 'Development workflow and collaboration.',
    icon: GitBranch,
    skills: ['Git', 'GitHub', 'VS Code', 'npm'],
  },
  {
    title: 'Web',
    description: 'Fundamentals of building production-ready websites.',
    icon: Globe,
    skills: ['Accessibility', 'SEO', 'Performance', 'PWA'],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="scroll-mt-24 border-t py-24 sm:py-32">
      {/* Header */}
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Skills
        </p>

        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Tools I use to turn ideas into products.
        </h2>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          A collection of technologies and tools I use to build, style, and ship
          modern web applications.
        </p>
      </div>

      {/* Skills */}
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon

          return (
            <article
              key={group.title}
              className="bg-background p-6 transition-colors hover:bg-muted/40 sm:p-8"
            >
              <div className="mb-6 flex size-10 items-center justify-center rounded-lg border bg-background">
                <Icon className="size-5 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-semibold tracking-tight">
                {group.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {group.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {skill}
                  </span>
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
