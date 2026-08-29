import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const highlights = [
  {
    value: 'React',
    label: 'Primary UI library',
  },
  {
    value: 'Next.js',
    label: 'Modern web framework',
  },
  {
    value: 'TypeScript',
    label: 'Typed development',
  },
  {
    value: 'UI/UX',
    label: 'Design-minded development',
  },
]

const About = () => {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        {/* Heading */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            About me
          </p>

          <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
            Building interfaces with code and intention.
          </h2>
        </div>

        {/* Content */}
        <div>
          <div className="max-w-3xl space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              I&apos;m Farbod, a front-end web developer focused on creating
              modern, responsive, and accessible digital experiences.
            </p>

            <p>
              I enjoy turning ideas and designs into interfaces that feel simple
              to use, perform well, and have a strong visual identity. My main
              focus is the React ecosystem, especially Next.js and TypeScript.
            </p>

            <p>
              Beyond writing code, I care about the details that make a product
              feel polished — from typography and spacing to interaction,
              accessibility, and responsive behavior.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
          >
            More about me
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-20 grid border-y sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => (
          <div
            key={item.value}
            className={`px-6 py-8 ${
              index !== highlights.length - 1
                ? 'border-b sm:border-r lg:border-b-0'
                : ''
            }`}
          >
            <p className="text-xl font-semibold tracking-tight">{item.value}</p>

            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About
