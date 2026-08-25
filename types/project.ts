export type Project = {
  title: string
  description: string
  image: string

  technologies: string[]

  href: string
  github?: string
  live?: string

  featured?: boolean

  overview?: string
  features?: string[]
  challenges?: string

  role?: string
  year?: string
}
