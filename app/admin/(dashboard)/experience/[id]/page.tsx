import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ExperienceForm from '@/components/admin/experience/ExperienceForm'

const experiences = [
  {
    id: '1',
    role: 'Front-End Developer Intern',
    company: 'Cultural Heritage Organization',
    type: 'internship',
    location: 'Iran',
    startDate: '2026-05-01',
    endDate: '2026-07-31',
    current: false,
    description:
      'Worked on front-end development and UI implementation for web-based projects.',
    responsibilities: [
      'Implemented responsive user interfaces.',
      'Worked with modern CSS and utility-first styling.',
      'Built interactive web interfaces using JavaScript.',
      'Applied UI/UX principles to improve usability.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: '2',
    role: 'Computer Science Student',
    company: 'Computer Science',
    type: 'education',
    location: 'Iran',
    startDate: '2025-09-01',
    endDate: '',
    current: true,
    description:
      'Developing a strong foundation in software engineering while focusing on modern web development.',
    responsibilities: [
      'Studying software engineering fundamentals.',
      'Building projects with modern web technologies.',
      'Exploring frontend architecture and best practices.',
      'Learning backend development and databases.',
    ],
    technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js'],
  },
]

type ExperienceEditPageProps = {
  params: Promise<{
    id: string
  }>
}

const ExperienceEditPage = async ({ params }: ExperienceEditPageProps) => {
  const { id } = await params

  const experience = experiences.find((experience) => experience.id === id)

  if (!experience) {
    return (
      <main className="py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Experience not found
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            The experience you are looking for does not exist.
          </p>

          <Link
            href="/admin/experience"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background"
          >
            <ArrowLeft className="size-4" />
            Back to experience
          </Link>
        </div>
      </main>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/experience"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to experience
        </Link>

        <p className="text-sm text-muted-foreground">Experience</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Edit experience
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Update your experience information and responsibilities.
        </p>
      </div>

      {/* Form */}
      <ExperienceForm isEditing initialData={experience} />
    </div>
  )
}

export default ExperienceEditPage
