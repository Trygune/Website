export type ProjectStatus = 'draft' | 'published'

export type Project = {
  id: string
  title: string
  slug: string
  role: string
  year: string
  description: string
  fullDescription?: string
  overview: string
  features: string[]
  technologies: string[]
  challengesSolutions: {
    challenge: string
    solution: string
  }[]
  coverImage?: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  status: ProjectStatus
  createdAt: string
  updatedAt: string
}
