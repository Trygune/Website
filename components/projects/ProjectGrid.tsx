import ProjectCard from './ProjectCard'

export type Project = {
  title: string
  description: string
  image: string
  technologies: string[]
  href: string
  github?: string
  live?: string
  featured?: boolean
}

type ProjectGridProps = {
  projects: Project[]
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  )
}

export default ProjectGrid
