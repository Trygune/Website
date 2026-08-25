import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

type ProjectCardProps = {
  title: string
  description: string
  image: string
  technologies: string[]
  href: string
  github?: string
  live?: string
  featured?: boolean
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  href,
  github,
  live,
  featured = false,
}: ProjectCardProps) => {
  return (
    <article className={featured ? 'lg:col-span-2' : ''}>
      {/* Preview */}
      <Link
        href={href}
        className="group block overflow-hidden rounded-xl border bg-muted"
      >
        <div
          className={`relative overflow-hidden ${
            featured ? 'aspect-[2.1/1]' : 'aspect-video'
          }`}
        >
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            sizes={
              featured
                ? '(min-width: 1024px) 100vw, 100vw'
                : '(min-width: 1024px) 50vw, 100vw'
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="mt-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <Link href={href} className="group inline-flex items-center gap-2">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          {/* External links */}
          <div className="flex shrink-0 items-center gap-4 text-sm">
            {live && (
              <Link
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                Live
                <ExternalLink className="size-3.5" />
              </Link>
            )}

            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </Link>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((technology) => (
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
  )
}

export default ProjectCard
