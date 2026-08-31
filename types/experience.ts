export type ExperienceTypes = 'work' | 'internship' | 'education'

export type Experience = {
  id: string
  role: string
  company: string
  type: ExperienceTypes
  startDate: string
  endDate: string | null
  technologies: string[]
  current: boolean
  period: string
  description: string
  responsibilities: string[]
  location: string
  companyUrl: string
  createdAt: string
  updatedAt: string
}

export type ExperienceQuery = {
  page?: number
  limit?: number
  sort?: string
  current?: boolean
  type?: Experience['type']
  location?: string
  role?: string
  technologies?: string
}
