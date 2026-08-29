import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'

type ProjectGridProps = {
  projects: Project[]
  page?: 'main' | 'full'
}

const ProjectGrid = ({ projects, page = 'full' }: ProjectGridProps) => {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard
          key={`${project.slug}-${project.id}-${index}`}
          title={project.title}
          description={project.description}
          image={`${process.env.NEXT_PUBLIC_API_URL}${project.coverImage ?? '/uploads/images/sample.jpg'}`}
          technologies={project.technologies}
          href={`/projects/${project.slug}`}
          github={project.githubUrl}
          live={project.liveUrl}
          featured={
            page === 'main' ? (index > 0 ? false : true) : project.featured
          }
        />
      ))}
    </div>
  )
}

export default ProjectGrid
